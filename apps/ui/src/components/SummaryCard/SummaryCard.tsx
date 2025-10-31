import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface SummaryCardProps {
  value: number;
  label: string;
  color?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  value,
  label,
  color = 'teal.600'
}) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      border="1px"
      borderColor="gray.200"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <VStack gap={2} align="center">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color={color}
          lineHeight="1"
        >
          {value.toLocaleString('pt-BR')}
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
          textAlign="center"
          textTransform="uppercase"
          fontWeight="medium"
          letterSpacing="wide"
        >
          {label}
        </Text>
      </VStack>
    </Box>
  );
};
