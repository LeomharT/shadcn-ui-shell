import { Card, CardContent } from '@/components/ui/card';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import { Outlet } from 'react-router';
import AppSidebar from './AppSidebar';

export default function AppContent() {
  return (
    <main className='h-[calc(100vh-3.5rem)] relative'>
      <AppSidebar />
      <div className='absolute p-2 h-full w-full left-0 md:left-56 md:w-[calc(100%-14rem)] transition-all'>
        <Card className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-accent'>
          <CardContent className='h-full'>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
