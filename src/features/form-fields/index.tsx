import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';

export default function FormFields() {
  return (
    <div className='flex justify-center'>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
