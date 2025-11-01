import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, Grid } from '@chakra-ui/react';
import { formatState, schema } from './rules';
import { NumberInputField } from './NumberInputField';
import { useCreatePropriedadeMutation } from '../../store/api/propriedadeApi';

interface FormData {
  name: string;
  city: string;
  state: string;
  total_area_hectares: number;
  agricultural_area_hectares: number;
  vegetation_area_hectares: number;
}

interface CreatePropriedadeFormProps {
  produtorId: string;
  onSubmit?: (data: FormData & { produtor_id: string }) => void;
  onSuccess?: () => void;
}

export const CreatePropriedadeForm: React.FC<CreatePropriedadeFormProps> = ({
  produtorId,
  onSubmit,
  onSuccess
}) => {
  const [createPropriedade, { isLoading }] = useCreatePropriedadeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatState(e.target.value);
    setValue('state', formatted, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      const formDataWithProdutor = {
        ...data,
        produtor_id: produtorId,
      };

      if (onSubmit) {
        onSubmit(formDataWithProdutor);
      } else {
        await createPropriedade(formDataWithProdutor).unwrap();
      }

      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao cadastrar propriedade:', error);
    }
  };

  console.log('Form errors:', errors);

  return (
    <Box maxW="2xl" mx="auto" p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Nome da Propriedade *
            </Text>
            <Input
              {...register('name')}
              placeholder="Ex: Fazenda São José"
              borderColor={errors.name ? 'red.500' : undefined}
            />
            {errors.name && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.name?.message}
              </Text>
            )}
          </div>

          <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
            <div>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Cidade *
              </Text>
              <Input
                {...register('city')}
                placeholder="Ex: Ribeirão Preto"
                borderColor={errors.city ? 'red.500' : undefined}
              />
              {errors.city && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.city?.message}
                </Text>
              )}
            </div>

            <div>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Estado *
              </Text>
              <Input
                {...register('state')}
                placeholder="Ex: SP"
                onChange={handleStateChange}
                maxLength={2}
                borderColor={errors.state ? 'red.500' : undefined}
              />
              {errors.state && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.state?.message}
                </Text>
              )}
            </div>
          </Grid>

          <Box>
            <Text fontSize="md" fontWeight="semibold" mb={4} color="gray.700">
              Áreas (em hectares)
            </Text>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>

              <NumberInputField
                name="agricultural_area_hectares"
                label="Área Agricultável"
                placeholder="Ex: 80.00"
                control={control}
                error={errors.agricultural_area_hectares}
              />

              <NumberInputField
                name="vegetation_area_hectares"
                label="Área de Vegetação"
                placeholder="Ex: 20.50"
                control={control}
                error={errors.vegetation_area_hectares}
              />

              <NumberInputField
                name="total_area_hectares"
                label="Área Total"
                placeholder="Ex: 100.50"
                control={control}
                error={errors.total_area_hectares}
              />
            </Grid>
          </Box>

          {errors.root && (
            <Box p={3} bg="red.50" borderRadius="md" border="1px" borderColor="red.200">
              <Text color="red.700" fontSize="sm">
                {errors.root?.message}
              </Text>
            </Box>
          )}

          <Button
            type="submit"
            background='teal.600'
            size="lg"
            width="full"
            loading={isLoading}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Salvar Propriedade'}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreatePropriedadeForm;
