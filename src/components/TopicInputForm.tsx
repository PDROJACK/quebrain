'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {PlusCircle} from 'lucide-react';

interface TopicInputFormProps {
  selectedDate: Date | undefined;
  setTopics: React.Dispatch<React.SetStateAction<string[]>>;
  topics: string[];
}

export function TopicInputForm({selectedDate, setTopics, topics}: TopicInputFormProps) {
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

    // update topic list
    setTopics([...topics, topic])

    console.log('Topic:', topic, 'Date:', selectedDate);

    toast({
      title: 'Success',
      description: `Topic "${topic}" submitted for research.`,
    });
    setTopic('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Topic:
        </label>
        <Input
          type="text"
          id="topic"
          placeholder="Enter topic"
          className="mt-1 block w-full sm:text-sm rounded-md border shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-200"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Add Topic <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
