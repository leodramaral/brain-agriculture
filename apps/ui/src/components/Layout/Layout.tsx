import React from 'react';
import { Box, Heading, Text, Grid, GridItem, Container } from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="teal.600" color="white" py={4} shadow="sm">
        <Container maxW="container.xl">
          <Heading size="lg">Brain Agriculture</Heading>
        </Container>
      </Box>

      <Container maxW="container.xl" py={6}>
        <Grid templateColumns="300px 1fr" gap={6} h="calc(100vh - 140px)">
          <GridItem>
            <Box>
              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                shadow="md"
                _hover={{
                  shadow: 'lg',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
                cursor="pointer"
                border={location.pathname === '/' ? '2px solid' : 'none'}
                borderColor={location.pathname === '/' ? 'teal.500' : 'transparent'}
              >
                <RouterLink to="/">
                  <Box display="flex" alignItems="center" gap={4}>
                    <Box w={10} h={10} bg="blue.100" borderRadius="md" />
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color={location.pathname === '/' ? 'teal.700' : 'green.700'}
                        mb={1}
                      >
                        Dashboard
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Visão geral
                      </Text>
                    </Box>
                  </Box>
                </RouterLink>
              </Box>

              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                shadow="md"
                _hover={{
                  shadow: 'lg',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
                cursor="pointer"
                mt={4}
                border={location.pathname === '/produtores' ? '2px solid' : 'none'}
                borderColor={location.pathname === '/produtores' ? 'teal.500' : 'transparent'}
              >
                <RouterLink to="/produtores">
                  <Box display="flex" alignItems="center" gap={4}>
                    <Box w={10} h={10} bg="green.100" borderRadius="md" />
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color={location.pathname === '/produtores' ? 'teal.700' : 'green.700'}
                        mb={1}
                      >
                        Produtores
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Gerenciar produtores
                      </Text>
                    </Box>
                  </Box>
                </RouterLink>
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <Box bg="white" borderRadius="lg" shadow="md" h="full" p={6}>
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
