import React from 'react';
import { Box, Heading, Text, Grid, GridItem, Container } from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="teal.600" color="white" py={4} shadow="sm">
        <Container maxW="container.xl">
          <Heading size="lg">🌾Brain Agriculture</Heading>
        </Container>
      </Box>

      <Container maxW="container.xl" py={6}>
        <Grid templateColumns="300px 1fr" gap={6} h="calc(100vh - 140px)">
          <GridItem>
            <Box>
              <Box
                bg={location.pathname === '/' ? 'blue.500' : 'white'}
                p={4}
                borderRadius="lg"
                shadow="md"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: location.pathname === '/' ? 'blue.600' : 'blue.50',
                  transform: 'translateY(-1px)',
                  shadow: 'lg'
                }}
              >
                <RouterLink to="/">
                  <Box display="flex" alignItems="center" gap={4}>
                    <Box w={10} h={10} bg={location.pathname === '/' ? 'blue.200' : 'blue.100'} borderRadius="md" display="flex" alignItems="center" justifyContent="center" fontSize="xl">📶</Box>
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color={location.pathname === '/' ? 'white' : 'gray.700'}
                        mb={1}
                      >
                        Dashboard
                      </Text>
                      <Text fontSize="sm" color={location.pathname === '/' ? 'blue.100' : 'gray.600'}>
                        Visão geral
                      </Text>
                    </Box>
                  </Box>
                </RouterLink>
              </Box>

              <Box
                bg={location.pathname === '/produtores' ? 'green.500' : 'white'}
                p={4}
                borderRadius="lg"
                shadow="md"
                cursor="pointer"
                mt={4}
                transition="all 0.2s"
                _hover={{
                  bg: location.pathname === '/produtores' ? 'green.600' : 'green.50',
                  transform: 'translateY(-1px)',
                  shadow: 'lg'
                }}
              >
                <RouterLink to="/produtores">
                  <Box display="flex" alignItems="center" gap={4}>
                    <Box w={10} h={10} bg={location.pathname === '/produtores' ? 'green.200' : 'green.100'} borderRadius="md" display="flex" alignItems="center" justifyContent="center" fontSize="xl">👨🏽‍🌾</Box>
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color={location.pathname === '/produtores' ? 'white' : 'gray.700'}
                        mb={1}
                      >
                        Produtores
                      </Text>
                      <Text fontSize="sm" color={location.pathname === '/produtores' ? 'green.100' : 'gray.600'}>
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
