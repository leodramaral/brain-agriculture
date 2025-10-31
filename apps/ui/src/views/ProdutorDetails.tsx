import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Card,
  Spinner,
  Grid,
  Badge,
  Flex
} from '@chakra-ui/react';
import { useGetProdutoresQuery } from '../store/api/produtorApi';
import { useGetPropriedadesQuery } from '../store/api/propriedadesApi';

export const ProdutorDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: produtores, error, isLoading } = useGetProdutoresQuery();
  const { data: propriedades } = useGetPropriedadesQuery();

  console.log('Propriedades carregadas:', propriedades);

  const produtor = produtores?.find(p => p.id === id);

  const handleGoBack = () => {
    navigate('/produtores');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" color="green.500" />
        <Text ml={4}>Carregando detalhes do produtor...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.100" borderRadius="md" border="1px" borderColor="red.300">
        <Text color="red.700">Erro ao carregar dados do produtor.</Text>
        <Button mt={3} onClick={handleGoBack} variant="outline" size="sm">
          Voltar para Produtores
        </Button>
      </Box>
    );
  }

  if (!produtor) {
    return (
      <Box textAlign="center" py={10}>
        <Heading size="md" color="gray.600" mb={4}>
          Produtor não encontrado
        </Heading>
        <Text color="gray.500" mb={6}>
          O produtor com ID "{id}" não foi encontrado.
        </Text>
        <Button onClick={handleGoBack} colorScheme="blue">
          Voltar para Produtores
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading color="teal.700" size="lg">
            Detalhes do Produtor
          </Heading>
        </Box>
      </Flex>

      <Card.Root mb={6}>
        <Card.Header>
          <Heading size="md" color="gray.700">
            Informações Pessoais
          </Heading>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Nome Completo
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                {produtor.name}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Documento
              </Text>
              <Text fontSize="lg">
                {produtor.document}
              </Text>
            </Box>
          </Grid>
        </Card.Body>
      </Card.Root>

      <Card.Root mb={6}>
        <Card.Header>
          <Flex justify="space-between" align="center">
            <Heading size="md" color="gray.700">
              Propriedades
            </Heading>
            <Badge colorScheme="green" fontSize="sm">
              {Array.isArray(produtor.propriedades) ? produtor.propriedades.length : 0} propriedade(s)
            </Badge>
          </Flex>
        </Card.Header>
        <Card.Body>
          {Array.isArray(produtor.propriedades) && produtor.propriedades.length > 0 ? (
            <Text color="gray.600">
              Lista de propriedades será implementada aqui quando a API fornecer os detalhes.
            </Text>
          ) : (
            <Text color="gray.500" fontStyle="italic">
              Nenhuma propriedade cadastrada para este produtor.
            </Text>
          )}
        </Card.Body>
      </Card.Root>
    </Box>
  );
};
