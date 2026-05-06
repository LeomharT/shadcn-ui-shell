# shadcn-ui-shell

This repository is a practice project for learning how to build a UI shell with shadcn/ui.

The current implementation focuses on the application frame rather than business logic. It includes a top header, a responsive sidebar, theme switching, and a content container that is ready for future pages.

## What It Shows

- A fixed app layout with a header and main workspace
- A responsive sidebar that can be toggled on mobile
- A simple navigation menu with mock sections
- Theme support for light, dark, and system modes
- Shared UI primitives built with shadcn/ui

## Main Behavior

- `src/app/App.tsx` wraps the app with a theme provider and tooltip provider.
- `src/app/AppHeader.tsx` renders the top bar, account popover, and theme controls.
- `src/app/AppContent.tsx` defines the main workspace area and mounts the sidebar.
- `src/app/AppSidebar/index.tsx` renders the sidebar groups and menu items.
- `src/hooks/useAppStore.ts` keeps the sidebar expanded or collapsed state.
- `src/hooks/useTheme.ts` and `src/components/ui/theme-provider.tsx` manage theme state and persistence.

## Source Structure

- `src/app` - application layout components
- `src/components/ui` - reusable shadcn/ui-based components
- `src/hooks` - app state and theme hooks
- `src/lib` - shared utility helpers
- `src/index.css` - global styles and theme tokens

## Notes

- The sidebar menu is currently a mock navigation set.
- The content area is intentionally empty and can be used as a starting point for pages or widgets.
- The project is meant for learning and experimentation, not as a finished product.

## Learning Goal

The goal of this project is to understand how to assemble a clean UI shell with shadcn/ui components, responsive behavior, theme management, and a small amount of local state.
