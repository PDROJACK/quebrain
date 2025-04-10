'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';

interface TopicInputFormProps {
  selectedDate: Date | undefined;
}

export function TopicInputForm({selectedDate}: TopicInputFormProps) {
  const [topic, setTopic] = useState('');
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      toast({
        title: 'Error',
        description: 'Please enter a topic.',
        variant: 'destructive',
      });
      return;
    }

    console.log('Topic:', topic, 'Date:', selectedDate);

    toast({
      title: 'Success',
      description: `Topic "${topic}" submitted for research.`,
    });
    setTopic('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic:
          </label>
          <Input
            type="text"
            id="topic"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-200"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Add Topic
      </Button>
    </form>
  );
}
