'use client';

import ResearchResultsDisplay from '@/components/ResearchResultsDisplay';
// import { use } from 'react';

interface ResearchPageProps {
  params: { topic: string };
}

export default function ResearchPage({ params }: ResearchPageProps) {
  // const { topic } = use(params);

  return (
    <div className="flex min-h-screen">
      <div className="container mx-auto p-4 flex-grow">
        <ResearchResultsDisplay topic={"test"} />
      </div>
    </div>
  );
}
