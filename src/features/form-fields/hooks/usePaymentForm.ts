import { isNotEmpty, useForm } from '@mantine/form';
import type { Payment } from '../type';

export function usePaymentForm() {
  const form = useForm<Payment>({
    mode: 'uncontrolled',
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardDate: new Date(),
      billingAddress: true,
      comments: '',
    },
    validate: {
      cardName: isNotEmpty('Please fill out card name'),
      cardNumber: isNotEmpty('Please enter card number'),
    },
    validateInputOnBlur: false,
  });

  return form;
}
