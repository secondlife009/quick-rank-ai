import SignInForm from "@/components/auth/signin-form";
import { Icons } from "@/components/global/icons";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
            <div className="flex items-center w-full py-8 border-b border-border/80">
                <Link href="/" className="flex items-center gap-x-2">
                    <Icons.logo className="w-6 h-6" />
                    <h1 className="text-lg font-medium">
                        Quick Rank AI
                    </h1>
                </Link>
            </div>

            <SignInForm />

            <div className="flex flex-col items-start w-full">
                <p className="text-sm text-muted-foreground">
                    By signing in, you agree to our{" "}
                    <Link href="#" className="text-primary">
                        Terms of Service{" "}
                    </Link>
                    and{" "}
                    <Link href="#" className="text-primary">
                        Privacy Policy
                    </Link>
                </p>
            </div>
            <div className="flex items-start mt-auto border-t border-border/80 py-6 w-full">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/signin" className="text-primary">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default SignInPage
