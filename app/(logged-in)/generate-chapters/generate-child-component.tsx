"use client"

import { useRouter } from "next/navigation";
import { generateChapters } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubmissionButton from "@/components/loggedin/SubmissionButton";

const GenerateChildComponent = () => {
    const router = useRouter(); 

    const handleSubmit = async (formData: FormData) => {
        const result = await generateChapters(formData);
        if (result.success) {
            router.push("/dashboard");
        } else {
            router.push(`/error?error=${result.error}`);
        }
    };

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle className="text-left text-2xl font-bold">
                    Generate timestamps for your YouTube videos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <label className="sr-only">Enter video URL</label>
                        <Input placeholder="enter video URL" name="link" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1 mt-10">
                        <SubmissionButton text="Generate" />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default GenerateChildComponent