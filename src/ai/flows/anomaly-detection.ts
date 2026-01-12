'use server';
/**
 * @fileOverview Detects operational anomalies from a given dataset.
 *
 * - detectAnomalies - A function that detects anomalies.
 * - AnomalyDetectionInput - The input type for the detectAnomalies function.
 * - AnomalyDetectionOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnomalySchema = z.object({
    text: z.string().describe('A concise description of the detected anomaly.'),
    detailsLink: z.string().describe('A placeholder link for drilling down into the anomaly details. Use "#".'),
});

export const AnomalyDetectionInputSchema = z.object({
  operationalData: z.string().describe('A summary of recent operational data, including fleet performance, sensor readings, and cycle times.'),
});
export type AnomalyDetectionInput = z.infer<typeof AnomalyDetectionInputSchema>;

export const AnomalyDetectionOutputSchema = z.object({
  anomalies: z.array(AnomalySchema).describe('A list of detected anomalies.'),
});
export type AnomalyDetectionOutput = z.infer<typeof AnomalyDetectionOutputSchema>;

export async function detectAnomalies(input: AnomalyDetectionInput): Promise<AnomalyDetectionOutput> {
  return anomalyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anomalyDetectionPrompt',
  input: {schema: AnomalyDetectionInputSchema},
  output: {schema: AnomalyDetectionOutputSchema},
  prompt: `You are a mining operations AI analyst. Based on the following operational data, identify the top 3 most significant anomalies that a shift supervisor should investigate.
  An anomaly is a deviation from the expected norm (e.g., high idle time, longer than usual cycle times, unusual sensor readings).

  Operational Data:
  {{{operationalData}}}

  Output a JSON object with an 'anomalies' array.
  `,
});

const anomalyDetectionFlow = ai.defineFlow(
  {
    name: 'anomalyDetectionFlow',
    inputSchema: AnomalyDetectionInputSchema,
    outputSchema: AnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
