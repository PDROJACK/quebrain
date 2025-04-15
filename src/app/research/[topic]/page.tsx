'use client';

import ResearchResultsDisplay from '@/components/ResearchResultsDisplay';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';

interface ResearchPageProps {
  params: { topic: string };
}

export default function ResearchPage({params}: ResearchPageProps) {
  const router = useRouter();
  const {topic} = params;

  const handleCreateContent = () => {
    // Programmatically navigate to the create content route
    router.push(`/contents/create?topic=${topic}`);
  };

  return (
    <div className="flex min-h-screen">
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Research: {topic}</h1>
          <Button onClick={handleCreateContent}>Create Content</Button>
        </div>
        <ResearchResultsDisplay topic={"test"} />
      </div>
    </div>
  );
}
