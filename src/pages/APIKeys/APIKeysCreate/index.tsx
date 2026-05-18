import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import APIKeysForm from '../APIKeysForm';

type APIKeysCreateProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const FORM_ID = 'create_secret_key';

export default function APIKeysCreate(props: APIKeysCreateProps) {
  return (
    <Dialog {...props}>
      {/* Content */}
      <DialogContent showCloseButton={false} className='md:max-w-112.5'>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Create new secret key</DialogTitle>
          <div>Owned by</div>
          <Tabs defaultValue='you'>
            <TabsList>
              <TabsTrigger value='you'>You</TabsTrigger>
              <TabsTrigger value='service'>Service Account</TabsTrigger>
            </TabsList>
          </Tabs>
          <DialogDescription>
            This API key is tied to your user and can make requests against the selected project. If
            you are removed from the organization or project, this key will be disabled.
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <APIKeysForm id={FORM_ID} />
        {/* Footer */}
        <DialogFooter className='bg-transparent border-none'>
          <Button variant='secondary'>Cancel</Button>
          <Button type='submit' form={FORM_ID}>
            Create secret key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
