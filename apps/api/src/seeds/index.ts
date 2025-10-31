import { DataSource } from 'typeorm';

export async function runSeeds(dataSource: DataSource) {
  console.log('🌱 Iniciando seeds...');
  
  try {
    // Seeds removidos: Cultura e Safra não são mais tabelas separadas
    console.log('✅ Seeds executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    throw error;
  }
}