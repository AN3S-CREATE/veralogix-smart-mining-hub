'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RehabProgressCard() {
    const progress = 72;
    return (
        <Card className="card-hover glass-panel border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-primary font-bold">Rehabilitation Progress</CardTitle>
                <CardDescription className="text-muted-foreground/80">Area restored vs annual plan.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        <p className="text-sm font-medium text-muted-foreground">Progress</p>
                        <p className="text-2xl font-bold font-headline text-primary">{progress}%</p>
                    </div>
                    <Progress value={progress} className="h-3 bg-secondary/20 [&>div]:bg-primary" />
                     <p className="text-xs text-muted-foreground text-right pt-1">
                        <span className="font-bold text-foreground">14.4ha</span> / 20ha
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
