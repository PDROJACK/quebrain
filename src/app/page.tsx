
import {TopicInputForm} from '@/components/TopicInputForm';
import {ResearchResultsDisplay} from '@/components/ResearchResultsDisplay';
import {HistoryDisplay} from '@/components/HistoryDisplay';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quebrain - AI Research Tool</h1>
      <TopicInputForm />
      <ResearchResultsDisplay />
      <HistoryDisplay />
    </div>
  );
}

