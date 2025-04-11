'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface ResearchPageProps {
  params: {topic: string};
}


export default function ResearchPage({params}: ResearchPageProps) {
  const {topic} = params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  // Replace with actual research results retrieval logic
  const researchResults = {
    summary: `Summary of research for ${topic}`,
    keyFindings: [
      'Finding 1: This is a key finding.',
      'Finding 2: Another important finding.',
      'Finding 3: Yet another critical piece of information.',
      'Finding 4: An additional noteworthy discovery.',
      'Finding 5: The last key finding for now.'
    ],
    relevantLinks: [
      'https://www.example.com/link1',
      'https://www.example.com/link2',
      'https://www.example.com/link3',
      'https://www.example.com/link4',
      'https://www.example.com/link5'
    ],
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar topic={topic} />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Research Results for {topic}</h1>
      <p className="mb-4">{researchResults.summary}</p>
      <h2 className="text-xl font-semibold mb-2">Key Findings:</h2>
      <ul>
        {researchResults.keyFindings.map((finding, index) => (
          <li key={index}>{finding}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Relevant Links:</h2>
      <ul>
        {researchResults.relevantLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
