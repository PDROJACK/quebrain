'use client';

interface ResearchPageProps {
  params: {topic: string};
}

export default function ResearchPage({params}: ResearchPageProps) {
  const {topic} = params;

  // Replace with actual research results retrieval logic
  const researchResults = {
    summary: `Summary of research for ${topic}`,
    keyFindings: ['Finding 1', 'Finding 2'],
    relevantLinks: ['link1', 'link2'],
  };

  return (
    <div className="container mx-auto p-4">
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
  );
}
