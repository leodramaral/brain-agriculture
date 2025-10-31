import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export const DashboardView: React.FC = () => {
  return (
    <Box h="full">
      <Heading size="lg" color="teal.700" mb={6}>
        Dashboard
      </Heading>

      <Box
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        borderRadius="md"
        border="2px dashed"
        borderColor="gray.300"
        minH="400px"
      >
        <Box textAlign="center">
          <Text color="gray.500" fontSize="lg" mb={2}>
            Área dos Gráficos
          </Text>
          <Text color="gray.400" fontSize="sm">
            Os gráficos serão exibidos aqui
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
