
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { FirebaseClientProvider } from '@/firebase';

function LoginPageContent() {
    const router = useRouter();
    const auth = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!auth) {
            toast({
                title: "Authentication Error",
                description: "Firebase Auth service is not available. Please try again later.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, 'dev@veralogix.com', password);
            router.push('/hub');
        } catch (error) {
            console.error("Sign-in failed:", error);
            toast({
                title: "Login Failed",
                description: "Invalid credentials. Please use the provided prototype password.",
                variant: "destructive",
            });
            setLoading(false);
        }
    };
    
    const loginLogo = PlaceHolderImages.find(img => img.id === 'login-logo');
    const loginBg = PlaceHolderImages.find(img => img.id === 'login-background');

    return (
        <>
            <div className="fixed inset-0 w-full h-full -z-10">
                {loginBg && (
                    <Image
                        src={loginBg.imageUrl}
                        alt={loginBg.description}
                        data-ai-hint={loginBg.imageHint}
                        fill
                        style={{ objectFit: 'cover' }}
                        quality={100}
                        priority
                    />
                )}
            </div>
            <main className="relative min-h-screen w-full flex justify-center items-center p-4 sm:p-8">
                 <div className="w-full max-w-sm">
                    <Card className="w-full bg-[#1E1C1C]/80 backdrop-blur-sm border-[#4A4747] text-white overflow-hidden">
                        <CardHeader className="items-center text-center">
                             <div className="flex justify-center mb-4">
                                {loginLogo && (
                                     <Image 
                                        src={loginLogo.imageUrl} 
                                        alt={loginLogo.description} 
                                        data-ai-hint={loginLogo.imageHint}
                                        width={loginLogo.width} 
                                        height={loginLogo.height}
                                        className="h-12 w-auto object-contain"
                                    />
                                )}
                            </div>
                            <CardTitle className="text-2xl">Welcome Back</CardTitle>
                            <CardDescription className="text-neutral-400">Sign in to access the Smart Mining Hub.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8 pt-0">
                             <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        value="dev@veralogix.com" 
                                        disabled 
                                        className="bg-[#252222] border-[#4A4747] disabled:opacity-75"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="Enter 'veralogix'"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                        className="bg-[#252222] border-[#4A4747] placeholder:text-neutral-500"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Sign In
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                        <p className="text-sm text-neutral-400">Powered by Smart Mining Hub</p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default function LoginPage() {
    return (
        <FirebaseClientProvider>
            <LoginPageContent />
        </FirebaseClientProvider>
    )
}
