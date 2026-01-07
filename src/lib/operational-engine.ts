
'use client';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// In a real app, tenantId would come from the user's session or a global state.
const MOCK_TENANT_ID = "veralogix-pilbara";

export type AlertSeverity = "Low" | "Medium" | "High" | "Critical" | "Warning" | "Info";

interface AlertData {
    moduleKey: string;
    severity: AlertSeverity;
    description: string;
}

export async function createAlert(db: Firestore, alertData: AlertData) {
    if (!db) {
        throw new Error("Firestore is not initialized.");
    }
    
    try {
        await addDoc(collection(db, 'alerts'), {
            ...alertData,
            tenantId: MOCK_TENANT_ID,
            status: 'New',
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error creating alert: ", error);
        // In a real app, you'd want more robust error handling, perhaps with a global error service.
        throw error;
    }
}


type TaskType = "CAPA" | "Inspection" | "Pilot" | "Maintenance";
type TaskStatus = "Todo" | "In Progress" | "Done";

interface TaskData {
    moduleKey: string;
    taskType: TaskType;
    description: string;
    dueDate?: Date;
    assignee?: string;
}

export async function createTask(db: Firestore, taskData: TaskData) {
    if (!db) {
        throw new Error("Firestore is not initialized.");
    }

    try {
        await addDoc(collection(db, 'tasks'), {
            ...taskData,
            tenantId: MOCK_TENANT_ID,
            status: 'Todo',
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error creating task: ", error);
        throw error;
    }
}
