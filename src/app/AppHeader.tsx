import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/hooks/useAppStore';
import { useTheme, type Theme } from '@/hooks/useTheme';
import { useMediaQuery } from '@mantine/hooks';
import { IconDeviceDesktop, IconMenu, IconMoon, IconSun, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export default function AppHeader() {
  const { theme, setTheme } = useTheme();

  const { expanded, toggleSiderbar } = useAppStore(
    useShallow((state) => ({
      expanded: state.expanded,
      toggleSiderbar: state.toggleSiderbar,
    })),
  );

  const matches = useMediaQuery('(min-width: 48rem)');

  useEffect(() => {
    if (matches && expanded) toggleSiderbar(false);
  }, [matches, expanded, toggleSiderbar]);

  return (
    <header className='h-14 flex items-center justify-between px-6'>
      <Button className='hover:bg-[#DFDFDF] gap-3' variant='ghost' size='lg'>
        <Avatar size='sm'>
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        Personal
      </Button>
      <div className='flex flex-row items-center'>
        <Button hidden={matches} size='icon' variant='outline' onClick={() => toggleSiderbar()}>
          {expanded ? <IconX /> : <IconMenu />}
        </Button>
        <Popover>
          <PopoverTrigger>
            <Avatar hidden={!matches}>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className='w-52' side='bottom' align='end'>
            <PopoverTitle>User Name</PopoverTitle>
            <PopoverDescription>example@gmail.com</PopoverDescription>
            <Tabs defaultValue={theme} onValueChange={(v) => setTheme(v as Theme)}>
              <TabsList>
                <TabsTrigger value='light'>
                  <IconSun />
                </TabsTrigger>
                <TabsTrigger value='dark'>
                  <IconMoon />
                </TabsTrigger>
                <TabsTrigger value='system'>
                  <IconDeviceDesktop />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator />
            <ButtonGroup className='w-full' orientation='vertical'>
              <Button className='justify-start' variant='ghost' size='default'>
                Log Out
              </Button>
            </ButtonGroup>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
