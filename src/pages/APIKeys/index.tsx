import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconPlus } from '@tabler/icons-react';

export default function APIKeys() {
  return (
    <div className='animate-fade-in opacity-0'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row justify-between items-start'>
          <h1 className='scroll-m-20 text-[20px] font-semibold tracking-tight text-balance'>
            API Keys
          </h1>
          <Button className='h-8'>
            <IconPlus />
            Create new secret key
          </Button>
        </div>
        <Separator />
      </div>
    </div>
  );
}
