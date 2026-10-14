import type { GetInputPropsReturnType } from '@mantine/form';
import type React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';

type FormFieldProps = {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  error?: React.ReactNode;
  orientation?: React.ComponentProps<typeof Field>['orientation'];
};

export function FormField(props: FormFieldProps) {
  if (props.orientation === 'horizontal') {
    return (
      <div className='flex flex-col gap-1'>
        <Field data-invalid={!!props.error} orientation={props.orientation}>
          {props.label && (
            <FieldLabel htmlFor={props.id} className='text-nowrap'>
              {props.label}
            </FieldLabel>
          )}
          {props.children}
        </Field>
        {props.description && <FieldDescription>{props.description}</FieldDescription>}
        {props.error && <FieldError>{props.error}</FieldError>}
      </div>
    );
  }

  return (
    <Field data-invalid={!!props.error} orientation={props.orientation}>
      {props.label && <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>}
      {props.description && <FieldDescription>{props.description}</FieldDescription>}
      {props.children}
      {props.error && <FieldError>{props.error}</FieldError>}
    </Field>
  );
}

type FormTextInputProps = Omit<FormFieldProps, 'children'> &
  GetInputPropsReturnType &
  React.ComponentProps<'input'>;

export function FormTextInput({
  id,
  description,
  label,
  error,
  orientation,
  ...props
}: FormTextInputProps) {
  return (
    <FormField
      id={id}
      description={description}
      label={label}
      error={error}
      orientation={orientation}
    >
      <Input {...props} id={id} aria-invalid={!!error} />
    </FormField>
  );
}

type FormCheckboxProps = Omit<FormFieldProps, 'children'> &
  GetInputPropsReturnType &
  Omit<React.ComponentProps<typeof Checkbox>, 'onChange'>;

export function FormCheckbox({
  id,
  label,
  description,
  error,
  onChange,
  ...props
}: FormCheckboxProps) {
  return (
    <Field orientation='horizontal' data-invalid={!!error}>
      <Checkbox
        {...props}
        id={id}
        aria-invalid={!!error}
        onCheckedChange={(checked) => onChange?.(checked === true)}
      />
      <FieldContent>
        {label && (
          <FieldLabel htmlFor={id} className='font-normal'>
            {label}
          </FieldLabel>
        )}
        {description && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{error}</FieldError>}
      </FieldContent>
    </Field>
  );
}

type FormTextareaProps = Omit<FormFieldProps, 'children'> &
  GetInputPropsReturnType &
  React.ComponentProps<'textarea'>;

export function FormTextarea({
  id,
  description,
  label,
  error,
  orientation,
  ...props
}: FormTextareaProps) {
  return (
    <FormField
      id={id}
      description={description}
      label={label}
      error={error}
      orientation={orientation}
    >
      <Textarea {...props} id={id} aria-invalid={!!error} />
    </FormField>
  );
}

type FormRadioProps = Omit<FormFieldProps, 'children'> &
  GetInputPropsReturnType &
  React.ComponentProps<'input'> & {
    options: {
      value: string | number;
      label: React.ReactNode;
    }[];
  };

export function FormRadio({
  id,
  description,
  label,
  error,
  orientation,
  ...props
}: FormRadioProps) {
  return (
    <FormField
      id={id}
      description={description}
      label={label}
      error={error}
      orientation={orientation}
    >
      <RadioGroup
        defaultValue={props.defaultValue}
        value={props.value}
        onValueChange={console.warn}
      ></RadioGroup>
    </FormField>
  );
}
