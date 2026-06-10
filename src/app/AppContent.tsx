import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/hooks/useAppStore';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import clsx from 'clsx';
import { Outlet } from 'react-router';
import AppSidebar from './AppSidebar';

export default function AppContent() {
  const minimal = useAppStore((state) => state.minimal);

  const className = clsx(
    'absolute p-2 h-full w-full left-0 transition-all',
    minimal ? 'md:left-15' : 'md:left-56',
    minimal ? 'md:w-[calc(100%-3.75rem)]' : 'md:w-[calc(100%-14rem)]',
    {
      'md:pl-px': minimal,
    },
  );

  return (
    <main className='h-[calc(100vh-3.5rem)] relative'>
      <AppSidebar />
      <div className={className}>
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
