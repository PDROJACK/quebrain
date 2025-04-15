'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

const ContentsPage = () => {
  const router = useRouter();

  const handleCreateContent = () => {
    // Programmatically navigate to the create content route
    router.push('/contents/create');
  };

  // Dummy content data for demonstration
  const contentInstances = [
    {
      id: 1,
      title: 'Trading Strategies',
      date: '2024-07-15',
      summary: 'A summary of trading strategies...',
    },
    {
      id: 2,
      title: 'AI in Healthcare',
      date: '2024-07-14',
      summary: 'An overview of AI applications in healthcare...',
    },
    {
      id: 3,
      title: 'Renewable Energy Trends',
      date: '2024-07-13',
      summary: 'Exploring the latest trends in renewable energy...',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contents</h1>
        <Button onClick={handleCreateContent}>Create New Content</Button>
      </div>

      {/* Display content instances in a grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contentInstances.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
              <CardDescription>
                <Badge className="mr-2" variant="secondary">
                  {content.date}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{content.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentsPage;
