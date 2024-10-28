import React from 'react';
import DashboardSidebar from '@/components/loggedin/dashboard-sidebar';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { checkChapterCreationEligibility, createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '@/utils/stripe';
import prisma from '@/lib/prisma';

interface Props {
    children: React.ReactNode
}

const LoggedInLayout = async ({ children }: Props) => {

    const session: Session | null = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return redirect("/signin");
    }
    
    await createCustomerIfNull();

    const subscribed = await hasSubscription();

    const user = await prisma.user.findFirst({
    where: {
        email: session?.user?.email,
    },
    select: {
        savedChapters: true,
        stripe_customer_id: true,
    },
    });

    if (!user) {
    return redirect("/signin");
    }

    const manage_link = await generateCustomerPortalLink(
        "" + user?.stripe_customer_id
    );
    const checkout_link = await createCheckoutLink("" + user?.stripe_customer_id);

    const { isEligible, message } =
    await checkChapterCreationEligibility();
    
    return (
        <DashboardSidebar session={session} manage_link={manage_link} checkout_link={checkout_link} isEligible={isEligible} message={message} subscribed={subscribed}>
            {children}
        </DashboardSidebar>
    );
};

export default LoggedInLayout
