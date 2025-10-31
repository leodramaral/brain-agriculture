import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  const mockDashboardService = {
    getDashboardStats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /dashboard/stats', () => {
    it('should return dashboard statistics', async () => {
      const mockStats: DashboardStatsDto = {
        summary: {
          totalFarms: 25,
          totalHectares: 5000.75,
        },
        charts: {
          byState: [
            { name: 'SP', value: 15, percentage: 60.0 },
            { name: 'MG', value: 10, percentage: 40.0 },
          ],
          byCulture: [
            { name: 'Soja', value: 20, percentage: 66.67 },
            { name: 'Milho', value: 10, percentage: 33.33 },
          ],
          byLandUse: [
            { type: 'agricultural', hectares: 4000.5, percentage: 80.0 },
            { type: 'vegetation', hectares: 1000.25, percentage: 20.0 },
          ],
        },
      };

      mockDashboardService.getDashboardStats.mockResolvedValue(mockStats);

      const result = await controller.getStats();

      expect(result).toEqual(mockStats);
      expect(service.getDashboardStats).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors gracefully', async () => {
      const errorMessage = 'Database connection failed';
      mockDashboardService.getDashboardStats.mockRejectedValue(new Error(errorMessage));

      await expect(controller.getStats()).rejects.toThrow(errorMessage);
      expect(service.getDashboardStats).toHaveBeenCalledTimes(1);
    });

    it('should return empty data when no farms exist', async () => {
      const emptyStats: DashboardStatsDto = {
        summary: {
          totalFarms: 0,
          totalHectares: 0,
        },
        charts: {
          byState: [],
          byCulture: [],
          byLandUse: [
            { type: 'agricultural', hectares: 0, percentage: 0 },
            { type: 'vegetation', hectares: 0, percentage: 0 },
          ],
        },
      };

      mockDashboardService.getDashboardStats.mockResolvedValue(emptyStats);

      const result = await controller.getStats();

      expect(result).toEqual(emptyStats);
      expect(result.summary.totalFarms).toBe(0);
      expect(result.summary.totalHectares).toBe(0);
      expect(service.getDashboardStats).toHaveBeenCalledTimes(1);
    });
  });
});