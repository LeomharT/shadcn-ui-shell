import { Button } from '@/components/ui/button';
import {
  SidebarContent,
  SidebarFooter,
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
import {
  IconBrandYoutube,
  IconHome,
  IconKey,
  IconLayoutSidebar,
  IconLogs,
  IconMessageCircle,
  IconPhoto,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useRef, useState, type CSSProperties, type Key, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { useShallow } from 'zustand/shallow';
import classes from './style.module.css';

type SidebarGroups = {
  key: Key;
  label?: string;
  items?: SidebarMenus[];
};

type SidebarMenus = {
  key: Key;
  title: string;
  path: string;
  icon?: ReactNode;
};

const menus: SidebarGroups[] = [
  {
    key: 'group_home',
    items: [{ key: 'home', title: 'Home', path: '/', icon: <IconHome /> }],
  },
  {
    key: 'gruop_action',
    label: 'Actions',
    items: [
      { key: 'chat', title: 'Chat', path: '/chat', icon: <IconMessageCircle /> },
      { key: 'images', title: 'Images', path: '/images', icon: <IconPhoto /> },
      { key: 'video', title: 'Video', path: '/video', icon: <IconBrandYoutube /> },
    ],
  },
  {
    key: 'group_manage',
    label: 'Manage',
    items: [
      { key: 'api-keys', title: 'API Keys', path: '/api-keys', icon: <IconKey /> },
      { key: 'logs', title: 'Logs', path: '/logs', icon: <IconLogs /> },
    ],
  },
];

export default function AppSidebar() {
  const ref = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const { theme } = useTheme();

  const matches = useMediaQuery('(max-width: 48rem)');

  const { expanded, minimal, toggleMinimal, toggleSiderbar } = useAppStore(
    useShallow((state) => ({ ...state })),
  );

  const [active, setActive] = useState(location.pathname);

  const className = clsx([classes.sidebar, minimal ? 'w-15' : 'w-56'], {
    [classes.transition]: matches,
  });

  const isMinimal = minimal && !expanded;

  return (
    <aside ref={ref} data-expanded={expanded} aria-expanded={expanded} className={className}>
      <div className={classes.menus}>
        <SidebarProvider
          className='min-h-full'
          style={
            {
              '--sidebar-accent': theme !== 'dark' ? '#DFDFDF' : undefined,
            } as CSSProperties
          }
        >
          <SidebarContent>
            {menus.map((menu) => (
              <SidebarGroup key={menu.key}>
                {!isMinimal && (
                  <SidebarGroupLabel hidden={!menu.label}>{menu.label}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menu.items?.map((item) => (
                      <SidebarMenuItem key={item.key} className='mb-1'>
                        <Link to={item.path} viewTransition>
                          <SidebarMenuButton
                            isActive={item.path === active}
                            className='p-0 px-3 [&_svg]:w-5 [&_svg]:h-5 cursor-pointer text-nowrap'
                            onClick={() => {
                              setActive(item.path);
                              if (expanded) toggleSiderbar();
                            }}
                          >
                            {item.icon}
                            {!isMinimal && item.title}
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
            <SidebarFooter className='mt-auto'>
              <Button
                hidden={expanded}
                variant='secondary'
                size='icon-lg'
                className='ml-auto [&_svg]:w-4.5! [&_svg]:h-4.5! not-dark:hover:bg-[#DFDFDF]'
                onClick={() => toggleMinimal()}
              >
                <IconLayoutSidebar />
              </Button>
            </SidebarFooter>
          </SidebarContent>
        </SidebarProvider>
      </div>
    </aside>
  );
}
