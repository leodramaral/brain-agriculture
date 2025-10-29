import { DataSource } from 'typeorm';
import { seedCulturas } from './cultura.seed';
import { seedSafras } from './safra.seed';

export async function runSeeds(dataSource: DataSource) {
  console.log('🌱 Iniciando seeds...');
  
  try {
    await seedCulturas(dataSource);
    await seedSafras(dataSource);
    console.log('✅ Seeds executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    throw error;
  }
}