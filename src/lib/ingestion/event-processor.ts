
import { Timestamp, collection, addDoc, getFirestore } from 'firebase/firestore';
import { z } from 'zod';

// --- Types ---
export type EventSourceType = 'device' | 'integration' | 'manual' | 'api';
export type EventType = 
  | 'locationPing' | 'alarm' | 'kpiTick' | 'formSubmit' 
  | 'incident' | 'shift' | 'trip' | 'plantSensor' 
  | 'dustReading' | 'airQuality' | 'weatherUpdate'
  | 'maintenanceAlert' | 'fuelLevel' | 'collision' 
  | 'fatigueAlert' | 'blastNotification';
export type SubjectType = 'person' | 'asset' | 'device' | 'site' | 'zone';
export type Severity = 'info' | 'low' | 'med' | 'high' | 'critical';

export interface NormalizedEvent {
  id?: string;
  tenantId: string;
  siteId: string;
  sourceType: EventSourceType;
  sourceId: string;
  eventType: EventType;
  ts: Timestamp;
  receivedAt: Timestamp;
  subjectType: SubjectType;
  subjectId: string;
  severity: Severity;
  data: Record<string, any>;
  raw: Record<string, any>;
  metadata: {
    processedBy: string;
    validationStatus: 'valid' | 'warning' | 'invalid';
    apiSource?: string;
  };
}

// --- Validation Schema ---
export const eventSchema = z.object({
  tenantId: z.string(),
  siteId: z.string(),
  sourceType: z.enum(['device', 'integration', 'manual', 'api']),
  sourceId: z.string(),
  eventType: z.enum([
    'locationPing', 'alarm', 'kpiTick', 'formSubmit', 
    'incident', 'shift', 'trip', 'plantSensor', 
    'dustReading', 'airQuality', 'weatherUpdate',
    'maintenanceAlert', 'fuelLevel', 'collision', 
    'fatigueAlert', 'blastNotification'
  ]),
  ts: z.any(), // Timestamp validation is tricky with Zod/Firebase, assuming passed correctly or handled
  subjectType: z.enum(['person', 'asset', 'device', 'site', 'zone']),
  subjectId: z.string(),
  severity: z.enum(['info', 'low', 'med', 'high', 'critical']),
  data: z.record(z.any()),
  raw: z.record(z.any()).optional(),
  metadata: z.object({
    processedBy: z.string().optional(),
    validationStatus: z.enum(['valid', 'warning', 'invalid']).optional(),
    apiSource: z.string().optional(),
  }).optional(),
});


// --- Ingestion Logic ---
export async function ingestEvent(payload: any, db = getFirestore()) {
  try {
    const receivedAt = Timestamp.now();
    
    // 1. Basic Validation
    const validationResult = eventSchema.safeParse(payload);
    
    const normalizedEvent: NormalizedEvent = {
      ...payload,
      ts: payload.ts ? (payload.ts instanceof Timestamp ? payload.ts : Timestamp.fromDate(new Date(payload.ts))) : receivedAt,
      receivedAt: receivedAt,
      raw: payload,
      metadata: {
        processedBy: 'system-ingest',
        validationStatus: validationResult.success ? 'valid' : 'warning',
        ...payload.metadata
      }
    };

    if (!validationResult.success) {
      console.warn('Ingestion validation warning:', validationResult.error);
    }

    // 2. Persist to Firestore
    // We store in a unified 'events' collection for the log
    // In a real app, this might be a time-series DB or partitioned collection
    const docRef = await addDoc(collection(db, 'events'), normalizedEvent);
    
    // 3. Trigger Real-time Processing (Mocking Cloud Functions)
    await processRealtimeRules(normalizedEvent, db);

    return { success: true, id: docRef.id, status: normalizedEvent.metadata.validationStatus };
  } catch (error) {
    console.error('Ingestion failed:', error);
    throw error;
  }
}

// --- Mock Rule Processor ---
async function processRealtimeRules(event: NormalizedEvent, db: any) {
  // A simple rule engine that creates alerts based on severity
  if (['high', 'critical'].includes(event.severity)) {
    await addDoc(collection(db, 'alerts'), {
      tenantId: event.tenantId,
      siteId: event.siteId,
      moduleKey: event.eventType, // simplified mapping
      severity: event.severity,
      description: `Auto-alert from ${event.eventType}: ${JSON.stringify(event.data)}`,
      status: 'New',
      createdAt: Timestamp.now(),
      sourceEventId: event.id
    });
  }
}
