'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

const ContentsPage = () => {
  const router = useRouter();

  const handleCreateContent = () => {
    // Programmatically navigate to the create content route
    router.push('/contents/create');
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contents</h1>
        <Button onClick={handleCreateContent}>Create New Content</Button>
      </div>
      {/* Display content instances here */}
      <div>
        <p>List of Content Instances will be displayed here.</p>
        {/*  Replace this with a list of content instances */}
      </div>
    </div>
  );
};

export default ContentsPage;
