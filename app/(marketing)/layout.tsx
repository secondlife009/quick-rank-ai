import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";

export default async function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session: Session | null = await getServerSession(authOptions);

    return (
        <>
            <div id="home" className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-full" />
            <Navbar session={session} />
            <main className="mt-20 mx-auto w-full z-0 relative">
                {children}
            </main>
            <Footer />
        </>
    );
};