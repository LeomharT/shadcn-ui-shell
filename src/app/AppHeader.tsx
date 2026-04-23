import { useTheme } from '@/components/hooks/useTheme';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AppHeader() {
  const { setTheme } = useTheme();

  return (
    <header className='h-14'>
      <Tabs defaultValue='light' onValueChange={setTheme}>
        <TabsList>
          <TabsTrigger value='light'>Light</TabsTrigger>
          <TabsTrigger value='dark'>Dark</TabsTrigger>
          <TabsTrigger value='system'>System</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}
