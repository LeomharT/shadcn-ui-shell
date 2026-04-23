import { Card, CardContent } from '@/components/ui/card';
import AppSider from './AppSider';

export default function AppContent() {
  return (
    <main className='h-[calc(100vh-56px)] relative'>
      <AppSider />
      <div className='absolute p-2 h-full w-full left-0 md:left-56 md:w-[calc(100%-224px)] transition-all'>
        <Card className='h-full'>
          <CardContent>Content is here</CardContent>
        </Card>
      </div>
    </main>
  );
}
