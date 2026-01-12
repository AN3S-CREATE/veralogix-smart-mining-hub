import { config } from 'dotenv';
config();

import '@/ai/flows/shift-handover-report.ts';
import '@/ai/flows/natural-language-query.ts';
import '@/ai/flows/rework-suggestions.ts';
import '@/ai/flows/smarthub-insights.ts';
import '@/ai/flows/fuel-overspend-forecast.ts';
import '@/ai/flows/anomaly-detection.ts';
