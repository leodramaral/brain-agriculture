import React from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  Grid,
  Skeleton,
  Card
} from '@chakra-ui/react';
import { useGetPropriedadeCulturasQuery } from '../../store/api/propriedadeApi';

interface CulturasListProps {
  propriedadeId: string;
}

export const CulturasList: React.FC<CulturasListProps> = ({ propriedadeId }) => {
  const { data, isLoading, error } = useGetPropriedadeCulturasQuery(propriedadeId);

  if (isLoading) {
    return (
      <Box mt={4}>
        <Text fontSize="sm" color="gray.600" mb={3}>
          🌱 Culturas Plantadas
        </Text>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3}>
          <Skeleton height="80px" borderRadius="md" />
          <Skeleton height="80px" borderRadius="md" />
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Text fontSize="sm" color="gray.600" mb={3}>
          🌱 Culturas Plantadas
        </Text>
        <Text color="red.500" fontSize="sm">
          Erro ao carregar culturas
        </Text>
      </Box>
    );
  }

  if (!data || data.culturas.length === 0) {
    return (
      <Box mt={4}>
        <Text fontSize="sm" color="gray.600" mb={3}>
          🌱 Culturas Plantadas
        </Text>
        <Text color="gray.500" fontSize="sm" fontStyle="italic">
          Nenhuma cultura cadastrada
        </Text>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Text fontSize="sm" color="gray.600" mb={3}>
        🌱 Culturas Plantadas ({data.culturas.length})
      </Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={3}>
        {data.culturas.map((cultura) => (
          <Card.Root key={cultura.id} size="sm" variant="outline">
            <Card.Body p={3}>
              <Flex justify="space-between" align="start" mb={2}>
                <Text fontWeight="semibold" color="gray.700" fontSize="sm">
                  {cultura.name}
                </Text>
                <Badge colorScheme="blue" size="sm">
                  {cultura.safra}
                </Badge>
              </Flex>
              <Text fontSize="xs" color="gray.600">
                Área: {Number(cultura.planted_area_hectares).toLocaleString('pt-BR')} ha
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Box>
  );
};

export default CulturasList;
