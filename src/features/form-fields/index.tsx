import { FormCheckbox, FormTextarea, FormTextInput } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { usePaymentForm } from './hooks/usePaymentForm';
import type { Payment } from './type';

export default function FormFields() {
  const form = usePaymentForm();

  function handleOnSubmit(value: Payment) {
    console.log(value);
  }

  return (
    <div className='flex justify-center w-full'>
      <form
        className='w-full max-w-md'
        onReset={form.onReset}
        onSubmit={form.onSubmit(handleOnSubmit)}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
            <FormTextInput
              key={form.key('cardName')}
              id='card-name'
              label='Card Name'
              placeholder='Evil Rabbit'
              {...form.getInputProps('cardName')}
            />
            <FormTextInput
              key={form.key('cardNumber')}
              id='card-number'
              label='Card Number'
              placeholder='1234 5678 9012 3456'
              description='Enter your 16-digit card number'
              {...form.getInputProps('cardNumber')}
            />
          </FieldSet>
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FormCheckbox
              key={form.key('billingAddress')}
              id='checkout-7j9-same-as-shipping-wgm'
              label='Same as shipping address'
              {...form.getInputProps('billingAddress', { type: 'checkbox' })}
              onCheckedChange={form.getInputProps('billingAddress').onChange}
            />
            <FormTextarea
              key={form.key('comments')}
              label='Comments'
              placeholder='Add any additional comments'
              {...form.getInputProps('comments')}
            />
          </FieldSet>
          <Field orientation='horizontal'>
            <Button type='submit'>Submit</Button>
            <Button variant='outline' type='reset'>
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
