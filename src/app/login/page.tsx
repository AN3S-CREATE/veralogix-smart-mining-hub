
'use client';

import { useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HardHat, Users, Briefcase, Home, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


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
];

const RoleButton = memo(({ role, onSelect }: { role: Role, onSelect: (role: Role) => void }) => {
    return (
        <button
            onClick={() => onSelect(role)}
            className="w-full text-left p-3 rounded-lg bg-[#252222] border border-[#4A4747] hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all group h-full"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1E1C1C] rounded-md border border-[#4A4747] group-hover:border-primary transition-colors">
                    <role.icon className="size-5 text-primary" />
                </div>
                <div>
                    <p className="font-semibold text-white text-sm">{role.title}</p>
                    <p className="text-xs text-neutral-400">{role.description}</p>
                </div>
            </div>
        </button>
    );
});
RoleButton.displayName = 'RoleButton';


export default function LoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRole) {
            router.push(selectedRole.href);
        }
    }
    
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
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                )}
            </div>
            <main className="relative min-h-screen w-full flex justify-center items-center p-4 sm:p-8">
                 <div className="w-full max-w-xl">
                    <Card className="w-full bg-[#1E1C1C]/80 backdrop-blur-sm border-[#4A4747] text-white overflow-hidden">
                        <CardContent className="p-6 lg:p-8 flex flex-col items-center">
                             <div className="flex justify-center mb-4">
                                {loginLogo && (
                                     <Image 
                                        src={loginLogo.imageUrl} 
                                        alt={loginLogo.description} 
                                        data-ai-hint={loginLogo.imageHint}
                                        width="240" 
                                        height="60" 
                                    />
                                )}
                            </div>
                            
                            <div className="w-full max-w-md mx-auto">
                                {!selectedRole ? (
                                    <div>
                                        <p className="text-center text-sm text-neutral-400 mb-4">Select your role to begin:</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {roles.map(role => (
                                                <RoleButton key={role.title} role={role} onSelect={setSelectedRole} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-white/10" onClick={() => setSelectedRole(null)}>
                                                <ArrowLeft className="size-5" />
                                            </Button>
                                            <div>
                                                <p className="font-semibold text-white">{selectedRole.title}</p>
                                                <p className="text-xs text-neutral-400">Sign in to continue</p>
                                            </div>
                                        </div>
                                        <Separator className="bg-[#4A4747] mb-4" />
                                        <form onSubmit={handleSignIn} className="space-y-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" placeholder="operator@company.com" defaultValue="operator@company.com" className="bg-[#252222] border-[#4A4747] text-white" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="password">Password</Label>
                                                <Input id="password" type="password" placeholder="••••••••" defaultValue="password" className="bg-[#252222] border-[#4A4747] text-white" />
                                            </div>
                                            <Button type="submit" className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-10 text-base !mt-4">
                                                Sign In as {selectedRole.title.split(' ')[0]}
                                            </Button>
                                        </form>
                                    </div>
                                )}
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
