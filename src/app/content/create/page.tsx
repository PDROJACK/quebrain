'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';

const CreateContentPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Content</h1>
      {/* Form to create content instance */}
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input type="text" id="title" placeholder="Enter content title" />
        </div>
        <div>
          <label htmlFor="researchSummary" className="block text-sm font-medium text-gray-700">
            Research Summary
          </label>
          <Textarea id="researchSummary" placeholder="Enter research summary" rows={4} />
        </div>
        <Button type="submit">Generate Content</Button>
      </form>
    </div>
  );
};

export default CreateContentPage;
