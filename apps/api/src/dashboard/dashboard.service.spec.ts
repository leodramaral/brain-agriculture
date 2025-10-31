import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardService } from './dashboard.service';
import { Propriedade } from '../entities/propriedade.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';

describe('DashboardService', () => {
  let service: DashboardService;
  let propriedadeRepository: Repository<Propriedade>;
  let propriedadeCulturaRepository: Repository<PropriedadeCultura>;

  const mockPropriedadeRepository = {
    createQueryBuilder: jest.fn(),
  };

  const mockPropriedadeCulturaRepository = {
    createQueryBuilder: jest.fn(),
  };

  const createMockQueryBuilder = (mockData: any) => ({
    select: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockResolvedValue(mockData),
    getRawMany: jest.fn().mockResolvedValue(mockData),
  });

  const setupDashboardMocks = (data: {
    summary: any;
    states: any[];
    cultures: any[];
    landUse: any;
  }) => {
    const summaryQuery = createMockQueryBuilder(data.summary);
    const stateQuery = createMockQueryBuilder(data.states);
    const cultureQuery = createMockQueryBuilder(data.cultures);
    const landUseQuery = createMockQueryBuilder(data.landUse);

    mockPropriedadeRepository.createQueryBuilder
      .mockReturnValueOnce(summaryQuery)
      .mockReturnValueOnce(stateQuery)
      .mockReturnValueOnce(landUseQuery);

    mockPropriedadeCulturaRepository.createQueryBuilder
      .mockReturnValueOnce(cultureQuery);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(Propriedade),
          useValue: mockPropriedadeRepository,
        },
        {
          provide: getRepositoryToken(PropriedadeCultura),
          useValue: mockPropriedadeCulturaRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    propriedadeRepository = module.get<Repository<Propriedade>>(
      getRepositoryToken(Propriedade),
    );
    propriedadeCulturaRepository = module.get<Repository<PropriedadeCultura>>(
      getRepositoryToken(PropriedadeCultura),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardStats', () => {
    it('should return dashboard stats with summary and charts data', async () => {
      setupDashboardMocks({
        summary: {
          totalFarms: '10',
          totalHectares: '1500.50',
        },
        states: [
          { state: 'SP', count: '5' },
          { state: 'MG', count: '3' },
          { state: 'RJ', count: '2' },
        ],
        cultures: [
          { cultura: 'Soja', count: '15' },
          { cultura: 'Milho', count: '10' },
          { cultura: 'Algodão', count: '5' },
        ],
        landUse: {
          totalAgricultural: '1200.30',
          totalVegetation: '300.20',
        },
      });

      const result = await service.getDashboardStats();

      expect(result).toEqual({
        summary: {
          totalFarms: 10,
          totalHectares: 1500.5,
        },
        charts: {
          byState: [
            { name: 'SP', value: 5, percentage: 50.0 },
            { name: 'MG', value: 3, percentage: 30.0 },
            { name: 'RJ', value: 2, percentage: 20.0 },
          ],
          byCulture: [
            { name: 'Soja', value: 15, percentage: 50.0 },
            { name: 'Milho', value: 10, percentage: 33.33 },
            { name: 'Algodão', value: 5, percentage: 16.67 },
          ],
          byLandUse: [
            { type: 'agricultural', hectares: 1200.3, percentage: 79.99 },
            { type: 'vegetation', hectares: 300.2, percentage: 20.01 },
          ],
        },
      });

      expect(mockPropriedadeRepository.createQueryBuilder).toHaveBeenCalledTimes(3);
      expect(mockPropriedadeCulturaRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    });

    it('should handle empty data gracefully', async () => {
      setupDashboardMocks({
        summary: {
          totalFarms: '0',
          totalHectares: '0',
        },
        states: [],
        cultures: [],
        landUse: {
          totalAgricultural: '0',
          totalVegetation: '0',
        },
      });

      const result = await service.getDashboardStats();

      expect(result.summary.totalPropriedades).toBe(0);
      expect(result.summary.totalHectares).toBe(0);
      expect(result.charts.byState).toEqual([]);
      expect(result.charts.byCulture).toEqual([]);
      expect(result.charts.byLandUse).toEqual([
        { type: 'agricultural', hectares: 0, percentage: 0 },
        { type: 'vegetation', hectares: 0, percentage: 0 },
      ]);
    });

    it('should calculate percentages correctly', async () => {
      setupDashboardMocks({
        summary: {
          totalFarms: '100',
          totalHectares: '2000.00',
        },
        states: [
          { state: 'SP', count: '60' },
          { state: 'MG', count: '40' },
        ],
        cultures: [
          { cultura: 'Soja', count: '30' },
          { cultura: 'Milho', count: '20' },
        ],
        landUse: {
          totalAgricultural: '1600.00',
          totalVegetation: '400.00',
        },
      });

      const result = await service.getDashboardStats();

      expect(result.charts.byState[0].percentage).toBe(60.0);
      expect(result.charts.byState[1].percentage).toBe(40.0);
      expect(result.charts.byCulture[0].percentage).toBe(60.0);
      expect(result.charts.byCulture[1].percentage).toBe(40.0);
      expect(result.charts.byLandUse[0].percentage).toBe(80.0);
      expect(result.charts.byLandUse[1].percentage).toBe(20.0);
    });
  });
});