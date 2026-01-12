
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRole, type UserRole } from '@/contexts/role-provider';
import { User, Shield, Briefcase, UserCog, Eye } from 'lucide-react';

const roles: { id: UserRole; label: string, icon: React.ElementType }[] = [
  { id: 'Admin', label: 'Admin', icon: UserCog },
  { id: 'Supervisor', label: 'Supervisor', icon: Shield },
  { id: 'Operator', label: 'Operator', icon: User },
  { id: 'Executive', label: 'Executive', icon: Briefcase },
  { id: 'Viewer', label: 'Viewer', icon: Eye },
];

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRole();
  const loginLogo = PlaceHolderImages.find(img => img.id === 'login-logo');
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-background');

  const handleRoleLogin = (role: UserRole) => {
    setRole(role);
    router.push('/hub');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {bgImage && (
         <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            quality={100}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-sm" />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            {loginLogo && (
                 <Image 
                    src={loginLogo.imageUrl} 
                    alt={loginLogo.description}
                    data-ai-hint={loginLogo.imageHint}
                    width={loginLogo.width}
                    height={loginLogo.height}
                    className="mx-auto h-12 w-auto"
                />
            )}
          <CardTitle className="text-2xl font-bold tracking-tight">Select Your Role</CardTitle>
          <CardDescription>Choose a role to enter the Smart Mining Hub prototype.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant="outline"
              size="lg"
              className="justify-start text-base py-6"
              onClick={() => handleRoleLogin(role.id)}
            >
              <role.icon className="mr-4 size-5 text-primary" />
              {role.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
