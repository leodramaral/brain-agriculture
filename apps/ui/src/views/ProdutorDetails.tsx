import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Card,
  Spinner,
  Grid,
  Flex
} from '@chakra-ui/react';
import { useGetProdutorByIdQuery, useGetPropriedadesByProdutorIdQuery } from '../store/api/produtorApi';
import { DialogWrapper } from '../components/DialogWrapper';
import { CreatePropriedadeForm } from '../components/CreatePropriedadeForm';
import { AddCulturaForm } from '../components/AddCulturaForm';
import { CulturasList } from '../components/CulturasList';

export const ProdutorDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPropriedadeModalOpen, setIsPropriedadeModalOpen] = useState(false);
  const [isCulturaModalOpen, setIsCulturaModalOpen] = useState(false);
  const [propriedadeSelected, setPropriedadeSelected] = useState<string | null>(null);
  const { data: produtor, error, isLoading } = useGetProdutorByIdQuery(id!);

  const {
    data: propriedades,
    error: propriedadesError,
    isLoading: propriedadesLoading
  } = useGetPropriedadesByProdutorIdQuery(id!, {
    skip: !produtor?.id || !produtor || isLoading
  });

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
            <Button
              background='teal.600'
              size="sm"
              onClick={() => {setIsPropriedadeModalOpen(true);}}
            >
              + Propriedade
            </Button>
          </Flex>
        </Card.Header>
        <Card.Body>
          {propriedadesLoading ? (
            <Box display="flex" alignItems="center" gap={3}>
              <Spinner size="sm" color="green.500" />
              <Text color="gray.600">Carregando propriedades...</Text>
            </Box>
          ) : propriedadesError ? (
            <Text color="red.500">
              Erro ao carregar propriedades do produtor.
            </Text>
          ) : propriedades && propriedades.length > 0 ? (
            <Box>
              <Text color="gray.600" mb={4}>
                {propriedades.length} propriedade(s) encontrada(s):
              </Text>
              {propriedades.map((propriedade) => (
                <Card.Root key={propriedade.id} mb={4} variant="outline">
                  <Card.Header>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text fontWeight="bold" fontSize="lg" color="gray.700">
                          {propriedade.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          📍 {propriedade.city} - {propriedade.state}
                        </Text>
                      </Box>
                      <Button
                        background='yellow.600'
                        size="sm"
                        onClick={() => {
                          setPropriedadeSelected(propriedade.id);
                          setIsCulturaModalOpen(true);
                        }}
                      >
                        + Cultura
                      </Button>
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Box mb={4}>
                      <Text fontSize="sm" color="gray.600" mb={3}>
                        📊 Informações de Área
                      </Text>
                      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                        <Box p={3} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
                          <Text fontSize="xs" color="green.600" fontWeight="medium">
                            ÁREA TOTAL
                          </Text>
                          <Text fontSize="lg" fontWeight="bold" color="green.700">
                            {Number(propriedade.total_area_hectares).toLocaleString('pt-BR')} ha
                          </Text>
                        </Box>
                        <Box p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                          <Text fontSize="xs" color="blue.600" fontWeight="medium">
                            ÁREA AGRICULTÁVEL
                          </Text>
                          <Text fontSize="lg" fontWeight="bold" color="blue.700">
                            {Number(propriedade.agricultural_area_hectares).toLocaleString('pt-BR')} ha
                          </Text>
                        </Box>
                        <Box p={3} bg="teal.50" borderRadius="md" border="1px" borderColor="teal.200">
                          <Text fontSize="xs" color="teal.600" fontWeight="medium">
                            ÁREA DE VEGETAÇÃO
                          </Text>
                          <Text fontSize="lg" fontWeight="bold" color="teal.700">
                            {Number(propriedade.vegetation_area_hectares).toLocaleString('pt-BR')} ha
                          </Text>
                        </Box>
                      </Grid>
                    </Box>
                    <CulturasList propriedadeId={propriedade.id} />
                  </Card.Body>
                </Card.Root>
              ))}
            </Box>
          ) : (
            <Text color="gray.500" fontStyle="italic">
              Nenhuma propriedade cadastrada para este produtor.
            </Text>
          )}
        </Card.Body>
      </Card.Root>

      <DialogWrapper
        isModalOpen={isCulturaModalOpen}
        setIsModalOpen={setIsCulturaModalOpen}
        title="Nova Cultura"
        body={
          <AddCulturaForm
            propriedadeId={propriedadeSelected!}
            onSuccess={() => setIsCulturaModalOpen(false)}
          />
        }
      />

      <DialogWrapper
        isModalOpen={isPropriedadeModalOpen}
        setIsModalOpen={setIsPropriedadeModalOpen}
        title="Nova Propriedade"
        body={
          <CreatePropriedadeForm
            produtorId={id!}
            onSuccess={() => setIsPropriedadeModalOpen(false)}
          />
        }
      />
    </Box>
  );
};
