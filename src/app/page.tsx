'use client';

import {TopicInputForm} from '@/components/TopicInputForm';
import {useState} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {useRouter} from 'next/navigation';

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();

  const handleTopicClick = (topic: string) => {
    router.push(`/research/${topic}`);
  };

  const topics = ['Topic 1', 'Topic 2', 'Topic 3']; // Example topics

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quebrain - AI Research Tool</h1>

      {/* Date Picker */}
      <div className="mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Topic Input Form */}
      <TopicInputForm selectedDate={date} />

      {/* Topic List Display */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Topics for {date ? format(date, 'PPP') : 'Selected Date'}
        </h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic} className="mb-2">
              <div className="flex items-center justify-between">
                <span>{topic}</span>
                <Button onClick={() => handleTopicClick(topic)}>
                  View Research
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
