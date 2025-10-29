import { DataSource } from 'typeorm';
import { Safra } from '../entities/safra.entity';

export async function seedSafras(dataSource: DataSource) {
  const safraRepository = dataSource.getRepository(Safra);

  const safrasExistentes = await safraRepository.count();
  if (safrasExistentes > 0) {
    console.log('Safras já existem, pulando seed...');
    return;
  }

  const safras = [
    {
      name: 'Safra 2020/2021',
      year: 2020,
      description: 'Safra do período 2020/2021 - Plantio e colheita'
    },
    {
      name: 'Safra 2021/2022',
      year: 2021,
      description: 'Safra do período 2021/2022 - Plantio e colheita'
    },
    {
      name: 'Safra 2022/2023',
      year: 2022,
      description: 'Safra do período 2022/2023 - Plantio e colheita'
    },
    {
      name: 'Safra 2023/2024',
      year: 2023,
      description: 'Safra do período 2023/2024 - Plantio e colheita'
    },
    {
      name: 'Safra 2024/2025',
      year: 2024,
      description: 'Safra do período 2024/2025 - Plantio e colheita'
    },
    {
      name: 'Safra 2025/2026',
      year: 2025,
      description: 'Safra do período 2025/2026 - Plantio e colheita'
    }
  ];

  await safraRepository.save(safras);
  console.log(`✅ ${safras.length} safras inseridas com sucesso!`);
}