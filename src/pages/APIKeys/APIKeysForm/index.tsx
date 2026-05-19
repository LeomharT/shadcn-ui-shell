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
      project: 'default',
      permission: 'all',
    },
    validate: {
      name: (value: string) => (value.trim() ? null : 'Please enter secret key name'),
      project: (value: string) => (value ? null : 'Please enter project name'),
      permission: (value: string) => (value ? null : 'Please select permission'),
    },
  });

  function handleOnSubmit(value: typeof form.values) {
    console.log(value);
  }

  const fields = {
    name: form.getInputProps('name'),
    project: form.getInputProps('project'),
    permission: form.getInputProps('permission'),
  };

  return (
    <form id={props.id} onSubmit={form.onSubmit(handleOnSubmit)}>
      <FieldSet>
        <FieldGroup>
          <FormField optional id='name' label='Name' error={fields.name.error}>
            <Input id='name' type='text' placeholder='My Test Key' {...fields.name} />
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
          <FormField id='permission' label='Permissions' error={fields.permission.error}>
            <Tabs
              defaultValue={fields.permission.defaultValue}
              onValueChange={fields.permission.onChange}
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
