import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import { UserNav } from "./user-nav";

export default async function WrapperUserNav() {
        
    const session: Session | null = await getServerSession(authOptions);

    return (
        <>
            <UserNav session={session} />
        </>
    )
  }