'use server';
/**
 * @fileOverview Generates high-level insights for the Smart Hub dashboard.
 *
 * - generateSmartHubInsights - A function that generates the main dashboard insights.
 * - SmartHubInsightsInput - The input type for the function.
 * - SmartHubInsightsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SmartHubInsightsInputSchema = z.object({
  operationalData: z.string().describe('A summary of current operational data including safety alerts, compliance status, and fleet performance.'),
});
export type SmartHubInsightsInput = z.infer<typeof SmartHubInsightsInputSchema>;

export const SmartHubInsightsOutputSchema = z.object({
    section54Risk: z.object({
        score: z.number().describe('A risk score from 0 to 100 for a potential Section 54-style mine stoppage.'),
        reasoning: z.string().describe('A brief explanation for the assigned risk score.'),
    }),
    dieselSpendForecast: z.object({
        predictedCost: z.number().describe('The predicted diesel spend in ZAR for the next 24 hours.'),
        reasoning: z.string().describe('A brief explanation for the forecast based on operational tempo.'),
    }),
    topRecommendations: z.array(z.string()).describe('A list of the top 2-3 most impactful and actionable recommendations for supervisors.'),
});
export type SmartHubInsightsOutput = z.infer<typeof SmartHubInsightsOutputSchema>;


export async function generateSmartHubInsights(input: SmartHubInsightsInput): Promise<SmartHubInsightsOutput> {
  return smarthubInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smarthubInsightsPrompt',
  input: {schema: SmartHubInsightsInputSchema},
  output: {schema: SmartHubInsightsOutputSchema},
  prompt: `You are a mining operations analyst AI. Based on the following summary of real-time data, generate a set of high-level insights for the main dashboard.

  Operational Data:
  {{{operationalData}}}

  Your output must be a JSON object containing:
  1.  'section54Risk': A risk score (0-100) for a major stoppage, with brief reasoning.
  2.  'dieselSpendForecast': A predicted diesel cost for the next 24h in ZAR, with brief reasoning.
  3.  'topRecommendations': A list of 2-3 concise, actionable recommendations for the shift supervisor.
  `,
});

const smarthubInsightsFlow = ai.defineFlow(
  {
    name: 'smarthubInsightsFlow',
    inputSchema: SmartHubInsightsInputSchema,
    outputSchema: SmartHubInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
