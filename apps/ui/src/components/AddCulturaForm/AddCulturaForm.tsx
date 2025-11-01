import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, Grid } from '@chakra-ui/react';
import { schema } from './rules';
import { NumberInputField } from '../NumberInputField';
import { useAddCulturaToPropriedadeMutation } from '../../store/api/propriedadeApi';

interface FormData {
  cultura: string;
  safra: number;
  planted_area_hectares: number;
}

interface AddCulturaFormProps {
  propriedadeId: string;
  onSubmit?: (data: FormData) => void;
  onSuccess?: () => void;
}

export const AddCulturaForm: React.FC<AddCulturaFormProps> = ({
  propriedadeId,
  onSubmit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      safra: new Date().getFullYear(),
      planted_area_hectares: 0,
    },
  });

  const [addCulturaToPropriedade, { isLoading }] = useAddCulturaToPropriedadeMutation();

  const handleFormSubmit = async (data: FormData) => {
    try {
      const formDataWithPropriedade = {
        ...data,
        propriedade_id: propriedadeId,
      };

      if (onSubmit) {
        onSubmit(formDataWithPropriedade);
      } else {
        await addCulturaToPropriedade(formDataWithPropriedade).unwrap();
      }

      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao adicionar cultura:', error);
    }
  };

  return (
    <Box maxW="lg" mx="auto" p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Cultura *
            </Text>
            <Input
              {...register('cultura')}
              placeholder="Ex: Soja, Milho, Algodão"
              disabled={isLoading}
              borderColor={errors.cultura ? 'red.500' : undefined}
            />
            {errors.cultura && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.cultura?.message}
              </Text>
            )}
          </div>

          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            <div>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Safra (Ano) *
              </Text>
              <Input
                {...register('safra', { valueAsNumber: true })}
                type="number"
                min={1900}
                max={2030}
                placeholder="Ex: 2024"
                disabled={isLoading}
                borderColor={errors.safra ? 'red.500' : undefined}
              />
              {errors.safra && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.safra?.message}
                </Text>
              )}
            </div>

            <NumberInputField
              name="planted_area_hectares"
              label="Área Plantada (ha)"
              control={control}
              placeholder="Ex: 150.75"
              error={errors.planted_area_hectares}
              min={0.1}
              max={1000000}
              step={0.01}
            />
          </Grid>

          <Button
            type="submit"
            background='teal.600'
            size="lg"
            width="full"
            loading={isLoading}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Adicionando...' : 'Adicionar Cultura'}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddCulturaForm;
