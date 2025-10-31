import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartData {
  name: string;
  value: number;
  percentage: number;
}

interface PieChartProps {
  title: string;
  data: PieChartData[];
  colors?: string[];
}

const defaultColors = [
  '#3182CE',
  '#38A169',
  '#ED8936',
  '#9F7AEA',
  '#F56565',
  '#4FD1C7',
  '#ECC94B',
  '#FC8181',
];

export const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  colors = defaultColors,
}) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => color),
        borderWidth: 2,
        hoverOffset: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const item = data[context.dataIndex];
            return `${item.name}: ${item.value} (${item.percentage}%)`;
          },
        },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
        border="1px"
        borderColor="gray.200"
        h="350px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            {title}
          </Text>
          <Text color="gray.500">Nenhum dado disponível</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      border="1px"
      borderColor="gray.200"
      h="350px"
    >
      <Text
        fontSize="lg"
        fontWeight="semibold"
        color="gray.700"
        mb={4}
        textAlign="center"
      >
        {title}
      </Text>
      <Box h="280px">
        <Pie data={chartData} options={options} />
      </Box>
    </Box>
  );
};
