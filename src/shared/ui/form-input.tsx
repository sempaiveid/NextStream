import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "./field";
import { Input } from "./input";

interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  maxLength,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={isPassword ? (showPassword ? "text" : "password") : type}
              placeholder={placeholder}
              maxLength={maxLength}
              aria-invalid={fieldState.invalid}
              className={isPassword ? "pr-9" : undefined}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-all duration-200"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={field.value === ""}
              >
                <span className="relative block w-4 h-4">
                  <Eye
                    size={16}
                    className={`absolute inset-0 transition-all duration-200 ${showPassword ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-12"}`}
                  />
                  <EyeOff
                    size={16}
                    className={`absolute inset-0 transition-all duration-200 ${showPassword ? "opacity-0 scale-50 -rotate-12" : "opacity-100 scale-100 rotate-0"}`}
                  />
                </span>
              </button>
            )}
          </div>
          {fieldState.invalid && field.value !== "" && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
