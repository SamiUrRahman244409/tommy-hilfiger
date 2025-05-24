"use client"

// Main sidebar export file that re-exports all components
export { SidebarProvider, useSidebar } from "./sidebar/sidebar-context"
export { Sidebar, SidebarInset } from "./sidebar/sidebar-core"
export { SidebarTrigger, SidebarRail } from "./sidebar/sidebar-controls"
export {
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "./sidebar/sidebar-layout"
export { SidebarGroupLabel, SidebarGroupAction } from "./sidebar/sidebar-group"
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./sidebar/sidebar-menu"
