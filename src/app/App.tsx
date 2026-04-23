import { ThemeProvider } from '@/components/ui/theme-provider';
import AppContent from './AppContent';
import AppHeader from './AppHeader';

export default function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <div className='h-dvh overflow-hidden'>
        <AppHeader />
        <AppContent />
      </div>
    </ThemeProvider>
  );
}
