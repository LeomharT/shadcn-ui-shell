import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from '@mantine/form';
import type React from 'react';

type APIKeysFormProps = {
  id: string;
};

export default function APIKeysForm(props: APIKeysFormProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      project: '',
    },
    validate: {
      name: (value: string) => (value.trim() ? null : 'Please enter secret key name'),
      project: (value: string) => (value ? null : 'Please enter project name'),
    },
  });

  function handleOnSubmit(value: typeof form.values) {
    console.log(value);
  }

  const fields = {
    name: form.getInputProps('name'),
    project: form.getInputProps('project'),
  };

  return (
    <form id={props.id} onSubmit={form.onSubmit(handleOnSubmit)}>
      <FieldSet>
        <FieldGroup>
          <FormField optional id='name' label='Name' error={fields.name.error}>
            <Input id='name' type='text' placeholder='My Test Key' {...fields.name} />
          </FormField>
          <FormField id='project' label='Project' error={fields.project.error}>
            <Select>
              <SelectTrigger className='w-full max-w-48'>
                <SelectValue id='project' placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value='apple'>Apple</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                  <SelectItem value='blueberry'>Blueberry</SelectItem>
                  <SelectItem value='grapes'>Grapes</SelectItem>
                  <SelectItem value='pineapple'>Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

type FormFieldProps = {
  id: string;
  error?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  optional?: boolean;
};

function FormField(props: FormFieldProps) {
  return (
    <Field data-invalid={!!props.error}>
      <FieldLabel htmlFor={props.id}>
        {props.label}
        {props.optional && (
          <span className={props.error ? 'text-destructive' : 'text-muted-foreground'}>
            Optional
          </span>
        )}
      </FieldLabel>
      {props.children}
      {props.error && <FieldError>{props.error}</FieldError>}
    </Field>
  );
}
