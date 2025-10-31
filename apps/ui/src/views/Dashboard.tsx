import React from 'react';
import { 
  Box, 
  Heading
} from '@chakra-ui/react';

export const DashboardView: React.FC = () => {
  return (
    <Box h="full">
      <Heading size="lg" color="teal.700" mb={6}>
        Dashboard
      </Heading>
    </Box>
  );
};
