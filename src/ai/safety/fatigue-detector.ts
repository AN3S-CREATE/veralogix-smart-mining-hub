
import { addMinutes } from "date-fns";

export interface FatigueAssessment {
  workerId: string;
  riskScore: number; // 0-100
  status: 'Ok' | 'Warning' | 'Critical';
  consecutiveShiftHours: number;
  lastBreakTime: Date;
  biometricAlerts: number;
}

export function assessWorkerFatigue(workerId: string, shiftData: any): FatigueAssessment {
  // Mock logic for prototype
  // Real logic would query shift logs and biometric streams
  
  const hours = shiftData.hoursWorked || 0;
  let score = 0;

  if (hours > 12) score += 60;
  else if (hours > 10) score += 30;

  if (shiftData.lastBreakMinutes > 240) score += 20; // No break in 4 hours

  return {
    workerId,
    riskScore: score,
    status: score > 50 ? 'Critical' : score > 20 ? 'Warning' : 'Ok',
    consecutiveShiftHours: hours,
    lastBreakTime: addMinutes(new Date(), -shiftData.lastBreakMinutes),
    biometricAlerts: 0
  };
}

export interface BlastZone {
  id: string;
  center: { lat: number, lng: number };
  radiusMeters: number;
  scheduledTime: Date;
  status: 'Scheduled' | 'Active' | 'AllClear';
}

export function calculateDynamicBlastRadius(massKg: number, windSpeedKmh: number): number {
    // Base radius 500m
    let radius = 500;
    // Simple heuristic: 10% increase per 100kg over 1000kg
    if (massKg > 1000) {
        radius += ((massKg - 1000) / 1000) * 0.1 * radius;
    }
    // Wind factor: 5% increase per 10km/h wind
    radius += (windSpeedKmh / 10) * 0.05 * radius;

    return Math.round(radius);
}
