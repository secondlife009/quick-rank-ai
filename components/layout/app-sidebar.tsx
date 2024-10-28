"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from '../ui/sidebar';
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, GalleryVerticalEnd, LogOut } from 'lucide-react';
import { Icons } from '../icons';
import { NAV_ITEMS } from '@/utils/constants/nav-links';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { Session } from 'next-auth';
import { UserNav } from './user-nav';

export const company = {
    name: 'Quick Rank AI',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise'
  };

export default function AppSidebar({
    session,
    children
  }: {
    session: Session | null;
    children: React.ReactNode;
  }) {

    const [mounted, setMounted] = React.useState(false);
    const pathname = usePathname();

    // Only render after first client-side mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // or a loading skeleton
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <company.logo className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{company.name}</span>
                            <span className="truncate text-xs">{company.plan}</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent className="overflow-x-hidden">
                    <SidebarGroup>
                        <SidebarGroupLabel>Overview</SidebarGroupLabel>
                        <SidebarMenu>
                            {NAV_ITEMS.map((item) => {
                                const Icon : any = item.icon ? Icons[item.icon] : Icons.logo;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url}
                                        >
                                        <Link href={item.url}>
                                            <Icon />
                                            <span>{item.title}</span>
                                        </Link>
                                        </SidebarMenuButton>
                                </SidebarMenuItem>
                                )})}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={session?.user?.image || ''}
                                            alt={session?.user?.name || ''}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
                                            'CN'}
                                        </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {session?.user?.name || ''}
                                        </span>
                                        <span className="truncate text-xs">
                                            {session?.user?.email || ''}
                                        </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                            src={session?.user?.image || ''}
                                            alt={session?.user?.name || ''}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                            {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
                                                'CN'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                            {session?.user?.name || ''}
                                            </span>
                                            <span className="truncate text-xs">
                                            {' '}
                                            {session?.user?.email || ''}
                                            </span>
                                        </div>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <BadgeCheck />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCard />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Bell />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

                <SidebarRail />

            </Sidebar>

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumbs />
                </div>
                <div className=" hidden w-1/3 items-center gap-2 px-4 md:flex ">
                    <SearchInput />
                </div>
                <div className="flex items-center gap-2 px-4">
                    <UserNav session={session} />
                    <ThemeToggle />
                </div>
                </header>
                {/* page main content */}
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}