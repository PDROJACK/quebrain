// Summarize the research results for a given topic.
'use server';
/**
 * @fileOverview Summarizes research results for a given topic.
 *
 * - summarizeResearchResults - A function that summarizes research results.
 * - SummarizeResearchResultsInput - The input type for the summarizeResearchResults function.
 * - SummarizeResearchResultsOutput - The return type for the summarizeResearchResults function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeResearchResultsInputSchema = z.object({
  topic: z.string().describe('The topic to summarize research results for.'),
  researchResults: z
    .string()
    .describe('The research results to summarize.'),
});
export type SummarizeResearchResultsInput = z.infer<
  typeof SummarizeResearchResultsInputSchema
>;

const SummarizeResearchResultsOutputSchema = z.object({
  summary: z.string().describe('The summary of the research results.'),
});
export type SummarizeResearchResultsOutput = z.infer<
  typeof SummarizeResearchResultsOutputSchema
>;

export async function summarizeResearchResults(
  input: SummarizeResearchResultsInput
): Promise<SummarizeResearchResultsOutput> {
  return summarizeResearchResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeResearchResultsPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic to summarize research results for.'),
      researchResults: z
        .string()
        .describe('The research results to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('The summary of the research results.'),
    }),
  },
  prompt: `You are an AI research assistant. Your task is to summarize the research results for a given topic.

Topic: {{{topic}}}

Research Results: {{{researchResults}}}

Summary:`,
});

const summarizeResearchResultsFlow = ai.defineFlow<
  typeof SummarizeResearchResultsInputSchema,
  typeof SummarizeResearchResultsOutputSchema
>({
  name: 'summarizeResearchResultsFlow',
  inputSchema: SummarizeResearchResultsInputSchema,
  outputSchema: SummarizeResearchResultsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
