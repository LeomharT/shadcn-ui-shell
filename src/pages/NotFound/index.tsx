import { Button } from '@/components/ui/button';
import { IconError404 } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <div className='w-full h-full md:h-200 flex justify-center items-center'>
      <div className='inline-flex flex-col items-center gap-3'>
        <Button className='w-10 h-10 [&_svg]:w-6! [&_svg]:h-6!' variant='secondary'>
          <IconError404 />
        </Button>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Page not found</h3>
        <p>We couldn't find the page you were looking for.</p>
      </div>
    </div>
  );
}
