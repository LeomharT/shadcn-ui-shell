import { Skeleton } from '@/components/ui/skeleton';

export default function LogsPlaceholder() {
  return (
    <div className='w-full flex flex-col gap-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-3/4' />
    </div>
  );
}
