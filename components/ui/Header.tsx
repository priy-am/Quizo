"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface HeaderProps {
    title?: string;
}

export default function Header({ title }: HeaderProps) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedLogin = sessionStorage.getItem("isLoggedIn");
        if (storedLogin === "true") {
            setIsLoggedIn(true);
            setUsername(sessionStorage.getItem("username") || "");
        } 
    }, []); 

    const handleLogout = () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("username");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <>
        
        <header className="border-b ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{title || "Quizo"}</h1> {/* Use passed title or default */}
                {isLoggedIn && ( // Conditionally render welcome message and logout button
                    <div className="flex items-center gap-4">
                        <span>Welcome, {username}</span>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </header>
        </>
    );
}