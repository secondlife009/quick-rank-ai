"use client";

import { Button } from "@/components/ui/button";
import React from 'react';
import { FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SignInForm = () => {

    return (
        <div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
            <h2 className="text-2xl font-semibold">
                Sign in to Linkify
            </h2>

            <Button
            className="p-4 w-full text-base font-semibold flex items-center justify-center"
            style={{
              backgroundColor: "#5165F6",
              color: "white",
            }}
            onClick={() => signIn("discord", { callbackUrl: "/dashboard"})}
            >
                <FaDiscord className="mr-2 text-2xl" />
                <span>Log in with Discord</span>
            </Button>
        </div>
    )
};

export default SignInForm
