import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { formatDocument, schema } from './rules';
import { useCreateProdutorMutation } from '../../store/api/produtorApi';

interface FormData {
  name: string;
  document: string;
}

interface CreateProdutorFormProps {
  onSubmit?: (data: FormData) => void;
  onSuccess?: () => void;
}

export const CreateProdutorForm: React.FC<CreateProdutorFormProps> = ({
  onSubmit,
  onSuccess,
}) => {
  const [createProdutor, { isLoading }] = useCreateProdutorMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });


  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDocument(e.target.value);
    setValue('document', formatted, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      if (onSubmit) {
        onSubmit(data);
      } else {
        await createProdutor({
          name: data.name,
          document: data.document,
        }).unwrap();
        
        reset();
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Erro ao cadastrar produtor:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Nome *
            </Text>
            <Input
              {...register('name')}
              placeholder="Digite o nome completo"
              disabled={isLoading}
              borderColor={errors.name ? 'red.500' : undefined}
            />
            {errors.name && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.name?.message}
              </Text>
            )}
          </div>

          <div>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              CPF/CNPJ *
            </Text>
            <Input
              {...register('document')}
              placeholder="Digite o CPF ou CNPJ"
              onChange={handleDocumentChange}
              disabled={isLoading}
              maxLength={18}
              borderColor={errors.document ? 'red.500' : undefined}
            />
            {errors.document && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.document?.message}
              </Text>
            )}
          </div>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            loading={isLoading}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreateProdutorForm;
