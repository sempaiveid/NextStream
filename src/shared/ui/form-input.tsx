import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "./field";
import { Input } from "./input";

interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
