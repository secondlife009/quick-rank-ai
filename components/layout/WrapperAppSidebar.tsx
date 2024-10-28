import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import AppSidebar from "./app-sidebar";

export default async function WrapperAppSidebar({
    children
  }: {
    children: React.ReactNode;
  }) {
        
    const session: Session | null = await getServerSession(authOptions);

    return (
        <AppSidebar session={session}>
            {children}
        </AppSidebar>
    )
  }