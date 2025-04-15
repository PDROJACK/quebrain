import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const maxInputLength = 200;
interface ResearchResultsDisplayProps {
  topic: string;
}

const ResearchResultsDisplay: React.FC<ResearchResultsDisplayProps> = ({ topic }) => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const loadMarkdown = async () => {
      setMarkdownContent(null);
      setError(null);
       try {
        const response = await fetch(`/${topic}.md`);
        if (response.ok) {
          const content = await response.text();
          setMarkdownContent(content);
        } else {
          setError(`Research data not found for topic: ${topic}. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error loading markdown:", error);
        setError(`Failed to load research data for topic: ${topic}. ${error.message}`);

      }
    };
    loadMarkdown();
  }, [topic]); 
  const markdownComponents = {
    p: ({ node, ...props }) => <p className="text-base leading-relaxed my-2" {...props} />,
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-3" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-1" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
    li: ({ node, ...props }) => <li className="my-1" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
    code: ({ node, inline, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline ? (
        <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto my-2">
          <code className={className} {...props} />
        </pre>
      ) : (
        <code className="bg-gray-100 px-1 rounded-md" {...props} />
      );
    },
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto">
        <table className="w-full my-4 border-collapse border border-gray-300" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
    th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left font-bold" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="" {...props} />,
    tr: ({ node, ...props }) => <tr className="" {...props} />,
    td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
  };

  return (
    <div className="mx-auto p-4 flex flex-col items-center w-full max-w-3xl">
      {/* <div className="w-full mb-4">
        <div
          className={`flex items-center rounded-md border border-gray-300 ${
            isInputFocused ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <Input
            type="text"
            placeholder="Suggest edits to the AI..."
            value={suggestion}
            maxLength={maxInputLength}
            onChange={(e) => setSuggestion(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            ref={inputRef}
            className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            disabled={suggestion.trim() === ""}
            className="ml-2 rounded-md"
          >
            Send
          </Button>
        </div>
        {suggestion.length >= maxInputLength && (
          <p className="text-red-500 text-xs mt-1">
            Maximum {maxInputLength} characters allowed.
          </p>
        )}
      </div> */}

      <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <CardContent className="p-4 w-full">
          {error && <div className="text-red-500 w-full">{error}</div>}
          {markdownContent ? (
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full w-full">
              <ReactMarkdown components={markdownComponents}>{markdownContent}</ReactMarkdown>
            </div>
          ) : !error && (
            <div className="animate-pulse">Loading..</div>
          )}

        </CardContent>
      </Card>
    </div >
  );
};

export default ResearchResultsDisplay;