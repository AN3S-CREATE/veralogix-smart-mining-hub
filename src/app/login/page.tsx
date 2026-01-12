
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, Shield, Briefcase, UserCog } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { signInAnonymously, type FirebaseError } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/service-catalog';

const roles: { id: UserRole; label: string; icon: React.ElementType }[] = [
  { id: 'Operator', label: 'Operator', icon: User },
  { id: 'Supervisor', label: 'Supervisor', icon: Shield },
  { id: 'Executive', label: 'Executive', icon: Briefcase },
  { id: 'Admin', label: 'Admin', icon: UserCog },
];

function LoginPageContent() {
    const router = useRouter();
    const auth = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState<UserRole | null>(null);

    const handleLogin = async (role: UserRole) => {
        if (!auth) {
            toast({
                title: "Authentication Error",
                description: "Firebase Auth service is not available. Please try again later.",
                variant: "destructive",
            });
            return;
        }

        setLoading(role);
        try {
            // In a real app, you might set a custom claim for the role after this.
            await signInAnonymously(auth);
            // For prototype, we store the role in localStorage to be picked up by the dashboard.
            localStorage.setItem('userRole', role);
            router.push('/hub');
        } catch (error) {
            const firebaseError = error as FirebaseError;
            console.error("Anonymous sign-in failed:", firebaseError.code, firebaseError.message);
            toast({
                title: "Login Failed",
                description: "Could not sign in. Please check the console for details.",
                variant: "destructive",
            });
        } finally {
            setLoading(null);
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
                 <div className="w-full max-w-md">
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
                            <CardTitle className="text-2xl">Select Your Role</CardTitle>
                            <CardDescription className="text-neutral-400">Choose a role to enter the Smart Mining Hub.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8 pt-0">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {roles.map((role) => (
                                    <Button
                                        key={role.id}
                                        variant="outline"
                                        className="h-20 flex-col gap-2 text-base bg-white/5 border-white/20 hover:bg-white/10"
                                        onClick={() => handleLogin(role.id)}
                                        disabled={!!loading}
                                    >
                                        {loading === role.id ? (
                                            <Loader2 className="size-6 animate-spin" />
                                        ) : (
                                            <>
                                                <role.icon className="size-6 text-primary" />
                                                {role.label}
                                            </>
                                        )}
                                    </Button>
                                ))}
                             </div>
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
