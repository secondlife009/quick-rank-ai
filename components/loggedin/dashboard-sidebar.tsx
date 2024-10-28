"use client"

import * as React from "react"
import { ChevronsUpDown, GalleryVerticalEnd, Search } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Session } from "next-auth"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"

export default function DashboardSidebar({
  session,
  manage_link,
  checkout_link,
  isEligible,
  message,
  subscribed,
  children,
}: Readonly<{
  session: Session | null;
  manage_link: string | null;
  checkout_link: string | null;
  isEligible: boolean | null;
  message: string | null;
  subscribed: any;
  children: React.ReactNode;
}>) {

  const pathname = usePathname()

  const data = {
  
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        isActive: pathname == "/dashboard" ? true : false
      },
      {
        title: "Generate Chapters",
        url: "/generate-chapters",
        isActive: pathname == "/generate-chapters" ? true : false
      }
    ],
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-zinc-900 text-slate-300">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-zinc-700 hover:text-zinc-300"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">{`👋 ${session?.user?.name || "User"}`}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <form>
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <SidebarInput
                  id="search"
                  placeholder="Search the docs..."
                  className="pl-8"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>
        <SidebarContent className="bg-zinc-900 text-slate-300">
          {/* We create a SidebarGroup for each parent. */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-zinc-500">List of Features</SidebarGroupLabel>
            <SidebarGroupContent>
              {data.navMain.map((item) => (
                <SidebarMenu key={item?.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={item?.isActive} className="hover:bg-zinc-700 hover:text-zinc-300">
                      <Link href={item.url} className="visited:bg-zinc-700 active:bg-zinc-700">{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-zinc-500">Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <form action={"/api/auth/signout"} method="POST">
                    <Button variant={"outline"} size={"sm"}>
                      Sign Out
                    </Button>
                  </form>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {subscribed?.isSubscribed && (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={"" + manage_link}>
                    Manage subscription
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              <BreadcrumbSeparator className="hidden md:block" />
              {!subscribed.isSubscribed && (
                <BreadcrumbItem>
                  <BreadcrumbLink href={"" + checkout_link}>
                    Upgrade to premium
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {isEligible && message}
                  {!isEligible && message}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
