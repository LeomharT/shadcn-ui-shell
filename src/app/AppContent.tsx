import MovementControls from '@/components/MovementControls';
import { Card, CardContent } from '@/components/ui/card';
import AppSidebar from './AppSidebar';

export default function AppContent() {
  return (
    <main className='h-[calc(100vh-56px)] relative'>
      <AppSidebar />
      <div className='absolute p-2 h-full w-full left-0 md:left-56 md:w-[calc(100%-224px)] transition-all'>
        <Card className='h-full overflow-y-auto'>
          <CardContent className='max-w-7xl mx-auto'>
            <MovementControls />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
