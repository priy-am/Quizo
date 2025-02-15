"use client";
import { useState } from "react";
// import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    username: z.string().min(1, "Username is required"), 
    password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginData {
    username: string;
    password: string;
}

export default function Login() {

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
        <div className="flex items-center justify-center p-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Welcome to Quizo</CardTitle>
                </CardHeader>
                <CardContent>
                    <AuthForm /> {/* Authform function is below  */}
                </CardContent>
            </Card>
        </div>
        <div className="hidden lg:flex flex-col justify-center p-8 bg-primary text-primary-foreground">
            <div className="max-w-md mx-auto">
                <h1 className="text-4xl font-bold mb-4">Create and Manage Quizzes with Ease</h1>
                <p className="text-lg opacity-90">
                    Quizo helps teachers create, organize, and manage quizzes efficiently.
                    Join our platform to streamline your quiz management process.
                </p>
            </div>
        </div>
    </div>
    );
}


function AuthForm() {
    const router = useRouter(); 
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleSubmit = async (data: LoginData) => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const res = await fetch("/api/login", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: data.username, password: data.password }),
            });

            if (res.ok) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("username", data.username);
                router.push("/");
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4"> 
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                </Button>
            </form>
        </Form>
    );
}


// export const metadata: Metadata = {
//     title: "Login - Quizo",
//     description: "Login to Quizo to create, manage, and view quizzes.",
//   };