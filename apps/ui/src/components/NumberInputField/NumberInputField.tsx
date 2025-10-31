import React from 'react';
import { NumberInput, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import type { Control, FieldError } from 'react-hook-form';

interface NumberInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  error?: FieldError;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInputField: React.FC<NumberInputFieldProps> = ({
  name,
  label,
  placeholder,
  control,
  error,
  min = 0,
  max = 1000000,
  step = 0.01,
}) => {
  return (
    <div>
      <Text fontSize="sm" fontWeight="medium" mb={2}>
        {label} *
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumberInput.Root
            min={min}
            max={max}
            step={step}
            formatOptions={{
              style: 'decimal',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }}
            onValueChange={(details) => {
              const numericValue = details.valueAsNumber || 0;
              field.onChange(numericValue);
            }}
          >
            <NumberInput.Input
              placeholder={placeholder}
              borderColor={error ? 'red.500' : undefined}
            />
            <NumberInput.Control>
              <NumberInput.IncrementTrigger />
              <NumberInput.DecrementTrigger />
            </NumberInput.Control>
          </NumberInput.Root>
        )}
      />
      {error && (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error.message}
        </Text>
      )}
    </div>
  );
};
