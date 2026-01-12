'use server';
/**
 * @fileOverview Generates a fuel overspend forecast.
 *
 * - generateFuelOverspendForecast - A function that generates the forecast.
 * - FuelOverspendForecastInput - The input type for the function.
 * - FuelOverspendForecastOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const FuelOverspendForecastInputSchema = z.object({
  operationalData: z.string().describe('A summary of current operational data including fleet activity, idle times, and haul distances.'),
});
export type FuelOverspendForecastInput = z.infer<typeof FuelOverspendForecastInputSchema>;

export const FuelOverspendForecastOutputSchema = z.object({
    predictedOverspend: z.number().describe('The predicted fuel overspend in ZAR for the current week.'),
    keyDrivers: z.array(z.string()).describe('A list of the top 2-3 reasons for the predicted overspend.'),
    forecastData: z.array(z.number()).describe('A series of 7 numbers representing the daily projected spend for the week.'),
});
export type FuelOverspendForecastOutput = z.infer<typeof FuelOverspendForecastOutputSchema>;


export async function generateFuelOverspendForecast(input: FuelOverspendForecastInput): Promise<FuelOverspendForecastOutput> {
  return fuelOverspendForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fuelOverspendForecastPrompt',
  input: {schema: FuelOverspendForecastInputSchema},
  output: {schema: FuelOverspendForecastOutputSchema},
  prompt: `You are a mining operations analyst AI. Based on the following summary of real-time operational data, generate a fuel overspend forecast for the week.

  Operational Data:
  {{{operationalData}}}

  Your output must be a JSON object containing:
  1.  'predictedOverspend': The predicted total fuel overspend in ZAR for the week.
  2.  'keyDrivers': A list of 2-3 concise, actionable reasons for this prediction.
  3.  'forecastData': An array of 7 numbers representing the daily spend trend.
  `,
});

const fuelOverspendForecastFlow = ai.defineFlow(
  {
    name: 'fuelOverspendForecastFlow',
    inputSchema: FuelOverspendForecastInputSchema,
    outputSchema: FuelOverspendForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
