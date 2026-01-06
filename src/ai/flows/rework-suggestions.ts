'use server';
/**
 * @fileOverview Generates a prioritized list of road segments requiring rework.
 *
 * - generateReworkSuggestions - A function that generates the rework suggestions.
 * - ReworkSuggestionsInput - The input type for the generateReworkSuggestions function.
 * - ReworkSuggestionsOutput - The return type for the generateReworkSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReworkSuggestionSchema = z.object({
  id: z.string().describe('The ID or name of the road segment.'),
  priority: z.enum(['High', 'Medium', 'Low']).describe('The priority of the rework suggestion.'),
  reason: z.string().describe('The reason for the rework suggestion.'),
});

export const ReworkSuggestionsInputSchema = z.object({
  operationalData: z.string().describe('A summary of recent operational data, including near-misses, road condition reports, and vehicle vibration data.'),
});
export type ReworkSuggestionsInput = z.infer<typeof ReworkSuggestionsInputSchema>;

export const ReworkSuggestionsOutputSchema = z.object({
  suggestions: z.array(ReworkSuggestionSchema).describe('A ranked list of road segments requiring attention.'),
});
export type ReworkSuggestionsOutput = z.infer<typeof ReworkSuggestionsOutputSchema>;

export async function generateReworkSuggestions(input: ReworkSuggestionsInput): Promise<ReworkSuggestionsOutput> {
  return reworkSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reworkSuggestionsPrompt',
  input: {schema: ReworkSuggestionsInputSchema},
  output: {schema: ReworkSuggestionsOutputSchema},
  prompt: `You are a mining geotech and safety analyst AI. Based on the following operational data, identify the top 3 road segments that require rework.
  Provide a ranked list with a priority (High, Medium, or Low) and a concise reason for each suggestion.

  Operational Data:
  {{{operationalData}}}

  Output a JSON object with a 'suggestions' array.
  `,
});

const reworkSuggestionsFlow = ai.defineFlow(
  {
    name: 'reworkSuggestionsFlow',
    inputSchema: ReworkSuggestionsInputSchema,
    outputSchema: ReworkSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
