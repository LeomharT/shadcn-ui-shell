import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { APIKeysFormValue } from '@/types/api-key.type';
import { useForm } from '@mantine/form';
import type React from 'react';

type APIKeysFormProps = {
  id: string;
  onSubmit: (value: APIKeysFormValue) => void;
};

export default function APIKeysForm(props: APIKeysFormProps) {
  const form = useForm<APIKeysFormValue>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      project: 'default',
      permissions: 'all',
    },
    validate: {
      name: (value: string) => (value.trim() ? null : 'Please enter secret key name'),
      project: (value: string) => (value ? null : 'Please enter project name'),
      permissions: (value: string) => (value ? null : 'Please select permissions'),
    },
  });

  const fields = {
    name: form.getInputProps('name'),
    project: form.getInputProps('project'),
    permissions: form.getInputProps('permissions'),
  };

  return (
    <form id={props.id} onSubmit={form.onSubmit(props.onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <FormField optional id='name' label='Name' error={fields.name.error}>
            <Input
              id='name'
              type='text'
              placeholder='My Test Key'
              aria-invalid={!!fields.name.error}
              {...fields.name}
            />
          </FormField>
          <FormField id='project' label='Project' error={fields.project.error}>
            <Select
              defaultValue={fields.project.defaultValue}
              onValueChange={fields.project.onChange}
            >
              <SelectTrigger className='w-full'>
                <SelectValue id='project' placeholder='Select a project' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  <SelectItem value='default'>Default Project</SelectItem>
                  <SelectItem value='startnet'>Startnet</SelectItem>
                  <SelectItem value='newland'>Newland</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>
          <FormField id='permissions' label='Permissions' error={fields.permissions.error}>
            <Tabs
              defaultValue={fields.permissions.defaultValue}
              onValueChange={fields.permissions.onChange}
            >
              <TabsList>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='restricted'>Restricted</TabsTrigger>
                <TabsTrigger value='readonly'>Readonly</TabsTrigger>
              </TabsList>
            </Tabs>
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
