import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useAppStore } from '@/hooks/useAppStore';
import { useTheme } from '@/hooks/useTheme';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandYoutube, IconHome, IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';
import { useRef, useState, type CSSProperties, type Key, type ReactNode } from 'react';
import classes from './style.module.css';

type SidebarGroups = {
  key: Key;
  label?: string;
  items?: SidebarMenus[];
};

type SidebarMenus = {
  key: Key;
  title: string;
  icon?: ReactNode;
};

const menus: SidebarGroups[] = [
  {
    key: 'group_1',
    items: [
      {
        key: 'home',
        title: 'Home',
        icon: <IconHome />,
      },
    ],
  },
  {
    key: 'gruop_2',
    label: 'Actions',
    items: [
      {
        key: 'chat',
        title: 'Chat',
        icon: <IconMessageCircle />,
      },
      {
        key: 'images',
        title: 'Images',
        icon: <IconPhoto />,
      },
      {
        key: 'video',
        title: 'Video',
        icon: <IconBrandYoutube />,
      },
    ],
  },
];

export default function AppSidebar() {
  const [active, setActive] = useState('home');

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
            {menus.map((menu) => (
              <SidebarGroup key={menu.key}>
                <SidebarGroupLabel hidden={!menu.label}>{menu.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menu.items?.map((item) => (
                      <SidebarMenuItem key={item.key} className='mb-1'>
                        <SidebarMenuButton
                          isActive={item.key === active}
                          className='p-0 px-3 [&_svg]:w-5 [&_svg]:h-5 cursor-pointer'
                          onClick={() => setActive(item.key as string)}
                        >
                          {item.icon}
                          {item.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </SidebarProvider>
      </div>
    </aside>
  );
}
