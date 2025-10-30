import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const DashboardView: React.FC = () => {
  return (
    <Box>
      <Heading mb={6} color="green.600">
        Dashboard
      </Heading>
      <Text>
        Bem-vindo ao sistema Brain Agriculture!
      </Text>
      <RouterLink to="/produtores">
        <Button>
          Produtores
        </Button>
      </RouterLink>
    </Box>
  );
};