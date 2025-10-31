import React from 'react';
import { Box, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useGetDashboardStatsQuery } from '../store/api/dashboardApi';
import { SummaryCard } from '../components/SummaryCard';

export const DashboardView: React.FC = () => {
  const { data: dashboardStats, isLoading } = useGetDashboardStatsQuery();

  return (
    <Box h="full">
      <Heading size="lg" color="teal.700" mb={6}>
        Dashboard
      </Heading>

      <Box mb={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} maxW="600px">
          {isLoading ? (
            <>
              <Skeleton height="120px" borderRadius="lg" />
              <Skeleton height="120px" borderRadius="lg" />
            </>
          ) : (
            <>
              <SummaryCard
                value={dashboardStats?.summary.totalPropriedades || 0}
                label="Total de Propriedades"
                color="teal.600"
              />
              <SummaryCard
                value={dashboardStats?.summary.totalHectares || 0}
                label="Total de Hectares"
                color="green.600"
              />
            </>
          )}
        </SimpleGrid>
      </Box>

      <Box>
        <Heading size="md" color="gray.700" mb={4}>
          Gráficos e Análises
        </Heading>
        <Box
          bg="gray.50"
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="lg"
          h="400px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size="sm" color="gray.500">
            Gráficos serão adicionados aqui
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};
