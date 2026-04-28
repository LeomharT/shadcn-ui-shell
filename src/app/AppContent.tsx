import MovementControls from '@/components/MovementControls';
import StanceControls from '@/components/StanceControls';
import TurningControls from '@/components/TurningControls';
import { Card, CardContent } from '@/components/ui/card';
import AppSidebar from './AppSidebar';

export default function AppContent() {
  return (
    <main className='h-[calc(100vh-3.5rem)] relative'>
      <AppSidebar />
      <div className='absolute p-2 h-full w-full left-0 md:left-56 md:w-[calc(100%-14rem)] transition-all'>
        <Card className='h-full overflow-y-auto'>
          <CardContent className='max-w-7xl mx-auto'>
            <div className='flex flex-row gap-1'>
              <StanceControls />
              <MovementControls />
              <TurningControls />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
