import { useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useGetProdutoresQuery } from './store/api/produtorApi'
import './index.css';

function App() {
  const { data: produtores } = useGetProdutoresQuery();

  useEffect(() => {
    console.log('Produtores:', produtores);
  }, [produtores]);

  return (
    <Box>
      <Text>Brain Agriculture</Text>
    </Box>
  )
}

export default App
