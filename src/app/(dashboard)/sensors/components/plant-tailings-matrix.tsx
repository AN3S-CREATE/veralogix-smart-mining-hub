
'use client';

import { MatrixCell, type MatrixStatus } from "./matrix-cell";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";

const sensorGroups = {
  "Feedrate": ["Weight", "Flow", "Density"],
  "Quality": ["Weight", "Density", "Sampling", "Sizing"],
  "Conditions": ["Bearing temps", "Vibration", "On/off", "Levels", "pH monitoring", "Slippage", "Tear detection", "Metal detection", "Cavitation", "Scrapers", "Blockages", "Spillage", "Power draw"],
};

const plantColumns = [
    "Crusher", "Conveyor", "Pan feeder", "Screen", "Thickener", "Pump", "Sump", 
    "Pipeline", "PCD", "Catchment sumps", "Pumps (return / reclaim)", "Tailings dam"
];

const mockStatus = (): MatrixStatus => {
  const r = Math.random();
  if (r < 0.6) return 'installed';
  if (r < 0.85) return 'missing';
  return 'not_required';
};

type MatrixData = Record<string, Record<string, MatrixStatus>>;

const generateMatrixData = (): MatrixData => {
    const data: MatrixData = {};
    Object.values(sensorGroups).flat().forEach(sensor => {
        data[sensor] = {};
        plantColumns.forEach(column => {
            data[sensor][column] = mockStatus();
        });
    });
    return data;
}

export function PlantTailingsMatrix() {
    const [matrixData, setMatrixData] = useState<MatrixData | null>(null);

    useEffect(() => {
        // Generate data on the client side to avoid hydration errors
        setMatrixData(generateMatrixData());
    }, []);

  return (
    <div className="mt-4 border rounded-lg">
      <ScrollArea>
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr>
              <th className="sticky left-0 bg-secondary/50 p-2 text-left font-semibold w-48 z-10">Sensor Type</th>
              {plantColumns.map(c => <th key={c} className="p-2 text-center font-medium border-l text-muted-foreground w-28">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {Object.entries(sensorGroups).map(([groupName, sensors]) => (
              <React.Fragment key={groupName}>
                <tr className="bg-secondary/20">
                    <td className="sticky left-0 bg-secondary/20 p-2 font-semibold z-10" colSpan={1 + plantColumns.length}>
                        {groupName}
                    </td>
                </tr>
                {sensors.map(sensor => (
                  <tr key={sensor} className="hover:bg-muted/50">
                    <td className="sticky left-0 bg-background hover:bg-muted/50 p-2 text-muted-foreground w-48 z-10">{sensor}</td>
                    {plantColumns.map(c => <td key={`${sensor}-${c}`} className="p-1 border-l"><MatrixCell status={matrixData ? matrixData[sensor]?.[c] : 'not_required'} /></td>)}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
