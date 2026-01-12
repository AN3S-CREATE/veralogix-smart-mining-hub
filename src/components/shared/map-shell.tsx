import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MapShell({ className }: { className?: string }) {
  return (
    <CardContent className={cn("p-2", className)}>
        <div className="aspect-[16/9] w-full rounded-md bg-secondary flex items-center justify-center p-4 overflow-hidden relative">
            <Image
                src="https://images.unsplash.com/photo-1589792241678-795d3a56f65a?q=80&w=2670&auto=format&fit=crop"
                alt="Satellite map of a mining operation"
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="satellite map"
                quality={100}
            />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 rounded-lg bg-background/80 p-4 text-center backdrop-blur-sm">
            <h3 className="font-semibold text-primary">Live Map Active</h3>
            <p className="text-sm text-muted-foreground">Rendering real-time data</p>
          </div>
        </div>
    </CardContent>
  );
}
