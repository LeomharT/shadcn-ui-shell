import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type APIKeysCreateProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function APIKeysCreate(props: APIKeysCreateProps) {
  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={false} className='md:max-w-112.5'>
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
      </DialogContent>
    </Dialog>
  );
}
