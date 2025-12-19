'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EvidenceUploader } from "@/components/shared/evidence-uploader";
import { EvidenceViewer } from "@/components/shared/evidence-viewer";
import { Lightbulb, Paperclip } from "lucide-react";
import { useState } from "react";

const recommendedActions = [
  { id: 'capa-001', text: "Lower speed limit on Ramp 3 by 10 km/h for the next shift." },
  { id: 'capa-002', text: "Schedule toolbox talk at East Dump intersection about right-of-way." },
  { id: 'capa-003', text: "Review Cabin-Eye fatigue events on Night Shift in Pit 2." },
];

export function RecommendedActionsCard() {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(recommendedActions[0].id);

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>AI suggests...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {recommendedActions.map((item, index) => (
            <li key={item.id} className="flex items-start gap-3 text-sm">
              <Lightbulb className="size-4 mt-1 text-accent shrink-0" />
              <div className="flex-1">
                <p className="text-muted-foreground">{item.text}</p>
                <div className="flex items-center gap-4 mt-2">
                    <button onClick={() => setSelectedActionId(item.id)} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                        <Paperclip className="size-3" />
                        View/Attach Evidence
                    </button>
                    <EvidenceUploader linkedType="capa" linkedId={item.id} variant="link" />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {selectedActionId && <EvidenceViewer linkedType="capa" linkedId={selectedActionId} />}
        
        <p className="text-xs text-muted-foreground/50 pt-2">AI-generated – subject to supervisor review.</p>
      </CardContent>
    </Card>
  );
}
