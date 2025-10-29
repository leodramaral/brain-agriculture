import { DataSource } from 'typeorm';
import { Cultura } from '../entities/cultura.entity';

export async function seedCulturas(dataSource: DataSource) {
  const culturaRepository = dataSource.getRepository(Cultura);

  const culturasExistentes = await culturaRepository.count();
  if (culturasExistentes > 0) {
    console.log('Culturas já existem, pulando seed...');
    return;
  }

  const culturas = [
    {
      name: 'Soja',
      description: 'Glycine max - Leguminosa rica em proteínas'
    },
    {
      name: 'Milho',
      description: 'Zea mays - Cereal base da alimentação'
    },
    {
      name: 'Algodão',
      description: 'Gossypium - Fibra têxtil natural'
    },
    {
      name: 'Café',
      description: 'Coffea - Grão para bebida estimulante'
    },
    {
      name: 'Cana-de-açúcar',
      description: 'Saccharum officinarum - Fonte de açúcar e etanol'
    },
    {
      name: 'Feijão',
      description: 'Phaseolus vulgaris - Leguminosa rica em proteínas'
    },
    {
      name: 'Trigo',
      description: 'Triticum - Cereal para panificação'
    },
    {
      name: 'Arroz',
      description: 'Oryza sativa - Cereal base alimentar'
    }
  ];

  await culturaRepository.save(culturas);
  console.log(`✅ ${culturas.length} culturas inseridas com sucesso!`);
}