
'use client';

import { MatrixCell, type MatrixStatus } from "./matrix-cell";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";

const sensorGroups = {
  "Proximity Detection": ["Live tracking", "Camera", "Automatic braking"],
  "Vehicle Monitoring": ["Speed", "Load weight", "Live location", "Traction", "Brake wear", "Engine management", "Hydraulic pressure", "Transmission hours", "Neutral brake interlocking", "Tyre pressure", "Fuel usage"],
  "Road Conditions": ["Gyro/ramps/camber", "Dust monitoring", "Weather incl lightning", "Foreign objects", "Berm monitoring"],
};

const yellowEquipment = ["Trucks", "FELs", "Excavators", "Dozers", "Graders", "Water trucks"];
const roadVehicles = ["Trucks", "LDVs", "Taxis"];

const mockStatus = (): MatrixStatus => {
  const r = Math.random();
  if (r < 0.7) return 'installed';
  if (r < 0.9) return 'missing';
  return 'not_required';
};

type MatrixData = Record<string, Record<string, MatrixStatus>>;

const generateMatrixData = (): MatrixData => {
    const data: MatrixData = {};
    Object.values(sensorGroups).flat().forEach(sensor => {
        data[sensor] = {};
        [...yellowEquipment, ...roadVehicles].forEach(vehicle => {
            data[sensor][vehicle] = mockStatus();
        });
    });
    return data;
}

export function MobileRoadMatrix() {
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
              <th colSpan={yellowEquipment.length} className="p-2 text-center font-semibold border-l">Yellow Equipment</th>
              <th colSpan={roadVehicles.length} className="p-2 text-center font-semibold border-l">Road Vehicles</th>
            </tr>
            <tr>
              <th className="sticky left-0 bg-secondary/50 p-2 text-left font-semibold w-48 z-10"></th>
              {yellowEquipment.map(e => <th key={e} className="p-2 text-center font-medium border-l text-muted-foreground w-24">{e}</th>)}
              {roadVehicles.map(v => <th key={v} className="p-2 text-center font-medium border-l text-muted-foreground w-24">{v}</th>)}
            </tr>
          </thead>
          <tbody>
            {Object.entries(sensorGroups).map(([groupName, sensors]) => (
              <React.Fragment key={groupName}>
                <tr className="bg-secondary/20">
                    <td className="sticky left-0 bg-secondary/20 p-2 font-semibold z-10" colSpan={1 + yellowEquipment.length + roadVehicles.length}>
                        {groupName}
                    </td>
                </tr>
                {sensors.map(sensor => (
                  <tr key={sensor} className="hover:bg-muted/50">
                    <td className="sticky left-0 bg-background hover:bg-muted/50 p-2 text-muted-foreground w-48 z-10">{sensor}</td>
                    {yellowEquipment.map(e => <td key={`${sensor}-${e}`} className="p-1 border-l"><MatrixCell status={matrixData ? matrixData[sensor]?.[e] : 'not_required'} /></td>)}
                    {roadVehicles.map(v => <td key={`${sensor}-${v}`} className="p-1 border-l"><MatrixCell status={matrixData ? matrixData[sensor]?.[v] : 'not_required'} /></td>)}
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
