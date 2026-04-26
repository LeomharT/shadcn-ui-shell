import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useAppStore } from '@/hooks/useAppStore';
import { useTheme } from '@/hooks/useTheme';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome } from '@tabler/icons-react';
import clsx from 'clsx';
import { useRef, type CSSProperties } from 'react';
import classes from './style.module.css';

export default function AppSidebar() {
  const ref = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const matches = useMediaQuery('(max-width: 48rem)');

  const expanded = useAppStore((state) => state.expanded);

  const className = clsx([classes.sidebar], {
    [classes.transition]: matches,
  });

  return (
    <aside ref={ref} data-expanded={expanded} aria-expanded={expanded} className={className}>
      <div className={classes.menus}>
        <SidebarProvider
          style={
            {
              '--sidebar-accent': theme === 'light' ? '#DFDFDF' : undefined,
            } as CSSProperties
          }
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className='p-0 px-3 [&_svg]:w-5 [&_svg]:h-5 cursor-pointer'>
                      <IconHome />
                      Home
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </SidebarProvider>
      </div>
    </aside>
  );
}
