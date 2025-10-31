import React, { useState } from 'react';
import { Box, Heading, Text, Spinner, Table, Button, Flex, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGetProdutoresQuery } from '../store/api/produtorApi';
import { DialogWrapper } from '../components/DialogWrapper';
import { CreateProdutorForm } from '../components/CreateProdutorForm';

// OPÇÃO 1: LINHA CLICÁVEL (implementação atual)
export const ProdutoresRowClickable: React.FC = () => {
  const { data: produtores, error, isLoading } = useGetProdutoresQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (produtorId: string) => {
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
          Produtores - Linha Clicável
        </Heading>
        <Button colorScheme="green" onClick={() => setIsModalOpen(true)} size="md">
          Novo Produtor
        </Button>
      </Flex>

      {produtores && produtores.length > 0 ? (
        <Box>
          <Text mb={3} fontSize="sm" color="gray.600">
            💡 Clique em qualquer linha para ver os detalhes do produtor
          </Text>
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
              {produtores.map(produtor => (
                <Table.Row
                  key={produtor.id}
                  cursor="pointer"
                  _hover={{ bg: 'blue.50', transform: 'scale(1.01)' }}
                  onClick={() => handleRowClick(produtor.id)}
                  transition="all 0.2s ease"
                  borderRadius="md"
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

      <DialogWrapper
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        body={<CreateProdutorForm onSuccess={() => setIsModalOpen(false)} />}
      />
    </Box>
  );
};

// OPÇÃO 2: NOME COMO LINK CLICÁVEL
export const ProdutoresNameLink: React.FC = () => {
  const { data: produtores, error, isLoading } = useGetProdutoresQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNameClick = (produtorId: string) => {
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
          Produtores - Nome como Link
        </Heading>
        <Button colorScheme="green" onClick={() => setIsModalOpen(true)} size="md">
          Novo Produtor
        </Button>
      </Flex>

      {produtores && produtores.length > 0 ? (
        <Box>
          <Text mb={3} fontSize="sm" color="gray.600">
            💡 Clique no nome do produtor para ver os detalhes
          </Text>
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
              {produtores.map(produtor => (
                <Table.Row key={produtor.id}>
                  <Table.Cell>
                    <Link
                      color="blue.600"
                      fontWeight="medium"
                      cursor="pointer"
                      _hover={{ color: 'blue.800', textDecoration: 'underline' }}
                      onClick={() => handleNameClick(produtor.id)}
                    >
                      {produtor.name}
                    </Link>
                  </Table.Cell>
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

      <DialogWrapper
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        body={<CreateProdutorForm onSuccess={() => setIsModalOpen(false)} />}
      />
    </Box>
  );
};

export const ProdutoresWithActions: React.FC = () => {
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
          Produtores - Com Ações
        </Heading>
        <Button colorScheme="green" onClick={() => setIsModalOpen(true)} size="md">
          Novo Produtor
        </Button>
      </Flex>

      {produtores && produtores.length > 0 ? (
        <Box>
          <Text mb={3} fontSize="sm" color="gray.600">
            💡 Use os ícones de ação para visualizar, editar ou excluir produtores
          </Text>
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
                <Table.Row key={produtor.id}>
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
                        👁️
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
