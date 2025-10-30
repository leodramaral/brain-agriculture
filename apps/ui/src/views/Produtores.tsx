import React, { useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Spinner,
  Table
} from '@chakra-ui/react';
import { useGetProdutoresQuery } from '../store/api/produtorApi';

export const ProdutoresView: React.FC = () => {
  const { data: produtores, error, isLoading } = useGetProdutoresQuery();

  useEffect(() => {
    if (produtores) {
      console.log('Produtores na view:', produtores);
    }
  }, [produtores]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" color="green.500" />
        <Text ml={4}>Carregando produtores...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.100" borderRadius="md" border="1px" borderColor="red.300">
        <Text color="red.700">
          Erro ao carregar produtores. Verifique se a API está rodando.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={6} color="green.600" size="xl">
        Produtores
      </Heading>
      
      {produtores && produtores.length > 0 ? (
        <Box>          
            <Table.Root size="sm" variant="outline">
              <Table.Header bg="gray.50">
                <Table.Row>
                  <Table.ColumnHeader fontWeight="semibold">Nome</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="semibold">Documento</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="semibold">Propriedades</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="semibold">Criado em</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {produtores.map((produtor) => (
                  <Table.Row 
                    key={produtor.id}
                  >
                    <Table.Cell fontWeight="medium">{produtor.name}</Table.Cell>
                    <Table.Cell>{produtor.document}</Table.Cell>
                    <Table.Cell>
                        {Array.isArray(produtor.propriedades) ? produtor.propriedades.length : 0}
                    </Table.Cell>
                    <Table.Cell fontSize="sm">
                      {new Date(produtor.created_at).toLocaleDateString('pt-BR')}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
        </Box>
      ) : (
        <Box textAlign="center" py={10}>
          <Text color="gray.500" fontSize="lg">
            Nenhum produtor encontrado.
          </Text>
        </Box>
      )}
    </Box>
  );
};
