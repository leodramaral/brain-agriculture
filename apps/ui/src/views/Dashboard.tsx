import React from 'react';
import { Box, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useGetDashboardStatsQuery } from '../store/api/dashboardApi';
import { SummaryCard } from '../components/SummaryCard';
import { PieChart } from '../components/PieChart';

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
        <Heading size="md" color="gray.700" mb={6}>
          Análises por Gráficos
        </Heading>

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
            <Skeleton height="350px" borderRadius="lg" />
            <Skeleton height="350px" borderRadius="lg" />
            <Skeleton height="350px" borderRadius="lg" />
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
            <PieChart
              title="Propriedades por Estado"
              data={dashboardStats?.charts.byState || []}
              colors={['#2B6CB0', '#38A169', '#ED8936', '#9F7AEA', '#F56565']}
            />

            <PieChart
              title="Culturas Plantadas"
              data={dashboardStats?.charts.byCulture || []}
              colors={['#38A169', '#4FD1C7', '#ECC94B', '#FC8181', '#9F7AEA']}
            />

            <PieChart
              title="Uso do Solo"
              data={dashboardStats?.charts.byLandUse?.map(item => ({
                name: item.type === 'agricultural' ? 'Área Agricultável' : 'Vegetação',
                value: item.hectares,
                percentage: item.percentage
              })) || []}
              colors={['#68D391', '#4A5568']}
            />
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};
