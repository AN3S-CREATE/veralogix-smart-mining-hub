
'use client';

import { useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HardHat, Users, Briefcase, Home, Loader2, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { signInAnonymously } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';

interface Role {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
}

const roles: Role[] = [
    { title: "Operator Portal", description: "Machine status and KPIs", href: "/operator", icon: HardHat },
    { title: "Supervisor Portal", description: "Control room overview", href: "/supervisor", icon: Users },
    { title: "Executive Portal", description: "Strategic site summary", href: "/executive", icon: Briefcase },
    { title: "Smart Hub / Admin", description: "Full operational access", href: "/hub", icon: Home },
    { title: "Smart People", description: "HR, Payroll, and Admin", href: "/people/overview", icon: UserCog },
];

export default function LoginPage() {
    const router = useRouter();
    const auth = useAuth();
    const { toast } = useToast();
    const [loadingRole, setLoadingRole] = useState<string | null>(null);

    const handleRoleSelect = async (role: Role) => {
        if (!auth) {
            toast({
                title: "Authentication Error",
                description: "Firebase Auth service is not available. Please try again later.",
                variant: "destructive",
            });
            return;
        }

        setLoadingRole(role.title);
        try {
            await signInAnonymously(auth);
            router.push(role.href);
        } catch (error) {
            console.error("Anonymous sign-in failed:", error);
            toast({
                title: "Login Failed",
                description: "Could not sign in. Please check your connection and try again.",
                variant: "destructive",
            });
            setLoadingRole(null);
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
                 <div className="w-full max-w-lg">
                    <Card className="w-full bg-[#1E1C1C]/80 backdrop-blur-sm border-[#4A4747] text-white overflow-hidden">
                        <CardContent className="p-6 lg:p-8 flex flex-col items-center">
                             <div className="flex justify-center mb-4">
                                {loginLogo && (
                                     <Image 
                                        src={loginLogo.imageUrl} 
                                        alt={loginLogo.description} 
                                        data-ai-hint={loginLogo.imageHint}
                                        width={loginLogo.width} 
                                        height={loginLogo.height}
                                        className="h-16 sm:h-20 w-auto object-contain"
                                    />
                                )}
                            </div>
                            
                            <div className="w-full max-w-lg mx-auto">
                                <div>
                                    <p className="text-center text-sm text-neutral-400 mb-4">Select your role to begin:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {roles.map(role => (
                                            <button
                                                key={role.title}
                                                onClick={() => handleRoleSelect(role)}
                                                disabled={!!loadingRole}
                                                className="w-full text-left p-3 rounded-lg bg-[#252222] border border-[#4A4747] hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all group h-full min-h-[72px] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#1E1C1C] rounded-md border border-[#4A4747] group-hover:border-primary transition-colors">
                                                        {loadingRole === role.title ? <Loader2 className="size-5 animate-spin text-primary" /> : <role.icon className="size-5 text-primary" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white text-sm">{role.title}</p>
                                                        <p className="text-xs text-neutral-400">{role.description}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
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
