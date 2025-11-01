import React, { useState } from 'react';
import { Box, Heading, Text, Spinner, Table, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGetProdutoresQuery } from '../store/api/produtorApi';
import { DialogWrapper } from '../components/DialogWrapper';
import { CreateProdutorForm } from '../components/CreateProdutorForm';

export const ProdutoresView: React.FC = () => {
  const { data: produtores, error, isLoading } = useGetProdutoresQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (produtorId: string) => {
    navigate(`/produtores/${produtorId}`);
  };

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
        <Text color="red.700">Erro ao carregar produtores. Verifique se a API está rodando.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading color="teal.700" size="lg">
          Produtores
        </Heading>
        <Button background='teal.600' onClick={() => setIsModalOpen(true)} size="md">
          + Produtor
        </Button>
      </Flex>

      {produtores && produtores.length > 0 ? (
        <Box>
          <Table.Root size="sm" variant="outline">
            <Table.Header bg="gray.50">
              <Table.Row>
                <Table.ColumnHeader fontWeight="semibold">Nome</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold">Documento</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold">Propriedades</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold">Criado em</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" textAlign="center">Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {produtores.map(produtor => (
                <Table.Row
                  key={produtor.id}
                  _hover={{ bg: 'gray.50' }}
                  transition="background-color 0.2s"
                >
                  <Table.Cell fontWeight="medium">{produtor.name}</Table.Cell>
                  <Table.Cell>{produtor.document}</Table.Cell>
                  <Table.Cell>
                    {Array.isArray(produtor.propriedades) ? produtor.propriedades.length : 0}
                  </Table.Cell>
                  <Table.Cell fontSize="sm">
                    {new Date(produtor.created_at).toLocaleDateString('pt-BR')}
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2} justify="center">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleViewDetails(produtor.id)}
                        title="Ver detalhes"
                      >
                        📄
                      </Button>
                    </Flex>
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

      <DialogWrapper
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        body={<CreateProdutorForm onSuccess={() => setIsModalOpen(false)} />}
      />
    </Box>
  );
};
