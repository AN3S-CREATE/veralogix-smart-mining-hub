
'use server';

/**
 * @fileOverview This file defines a Genkit flow for handling natural language queries and returning the relevant data or navigation path.
 *
 * - naturalLanguageQuery - A function that processes the natural language query and returns the relevant data or navigation path.
 * - NaturalLanguageQueryInput - The input type for the naturalLanguageQuery function.
 * - NaturalLanguageQueryOutput - The return type for the naturalLanguageQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageQueryInputSchema = z.object({
  query: z.string().describe('The natural language query from the user.'),
});
export type NaturalLanguageQueryInput = z.infer<typeof NaturalLanguageQueryInputSchema>;

const NaturalLanguageQueryOutputSchema = z.object({
  route: z.string().describe('The route to navigate to based on the query.'),
  confidence: z.number().describe('The confidence level of the route suggestion (0-1).'),
});
export type NaturalLanguageQueryOutput = z.infer<typeof NaturalLanguageQueryOutputSchema>;

export async function naturalLanguageQuery(input: NaturalLanguageQueryInput): Promise<NaturalLanguageQueryOutput> {
  return naturalLanguageQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageQueryPrompt',
  input: {schema: NaturalLanguageQueryInputSchema},
  output: {schema: NaturalLanguageQueryOutputSchema},
  prompt: `You are an AI assistant that helps users navigate a mine operations dashboard called the "Smart Mining HUB".
  Given a user's natural language query, determine the most relevant route in the dashboard to navigate to.
  Your response must be one of the available routes. Also provide a confidence level (0-1) for how certain you are of the suggested route.

  Available routes and their descriptions:
  - /hub: The main dashboard and central hub.
  - /plant: "Smart Operations" - Plant performance, drill & blast, and stockpile management.
  - /fleet: "Smart Transport" - Vehicle loading, tracking, and fleet performance.
  - /load-passports: "Load Passports" - Lifecycle tracking for every haulage load.
  - /safety: "Smart Risk" - Proximity detection, operator fatigue, and incident data.
  - /compliance: "Smart People" - Regulatory and internal compliance, training, and personnel access.
  - /executive: "Executive Overview" - High-level summary of site performance for management.
  - /earthworks: "Smart Geotech" - Haul road and bench quality management.
  - /drones: "Smart Survey" - Drone flights, stockpile surveys, and perimeter security.
  - /supervisor: "Control Room" - A supervisor-centric view for real-time fleet and process optimization.
  - /network: "Smart Network" - Health and status of on-site network infrastructure.
  - /twin: "Digital Twin & Scenarios" - A digital twin interface to simulate operational changes.
  - /sensors: "Sensor Stack" - A matrix view of all installed sensors.
  - /energy: "Smart Energy" - Energy consumption monitoring and optimization.
  - /environmental: "Smart Environmental" - Emissions, water quality, and dust compliance tracking.
  - /predictive: "Smart Predictive Analytics" - Outputs from AI-driven forecasting and predictive maintenance models.
  - /supply-chain: "Smart Supply Chain" - Inventory, logistics, and critical spares management.
  - /operator: "Operator Cockpit" - A personalized dashboard for machine operators.
  - /reports: "Report Packs" - A module for generating and viewing operational reports.
  - /alerts: "Alerts" - Centralized view for all system-generated alerts.
  - /tasks: "Tasks" - Centralized view for all actionable tasks.

  User Query: {{{query}}}

  Output the route and confidence level in JSON format.
  `,
});

const naturalLanguageQueryFlow = ai.defineFlow(
  {
    name: 'naturalLanguageQueryFlow',
    inputSchema: NaturalLanguageQueryInputSchema,
    outputSchema: NaturalLanguageQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
