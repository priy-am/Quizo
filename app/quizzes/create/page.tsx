"use client";
import { useState } from "react";
// import type { Metadata } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft} from "lucide-react";
import Header from "@/components/ui/Header";

const quizSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export default function CreateQuiz() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null); // State for API error

    const form = useForm<z.infer<typeof quizSchema>>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof quizSchema>) => {
        setIsLoading(true);
        setApiError(null); 
        try {
            const res = await fetch("/api/quizzes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                // alert("Quiz created successfully");
                router.push("/");
            } else {
                const errorData = await res.json();
                console.error("Error creating quiz:", errorData);
                setApiError(errorData.error || "Failed to create quiz"); 
            }
        } catch (error) {
            console.error("Error creating quiz:", error);
            setApiError("An unexpected error occurred."); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header title="Create Quiz" />
            <div className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    className="mb-8"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quizzes
                </Button>

                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle>{"Create Quiz"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Quiz
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}


