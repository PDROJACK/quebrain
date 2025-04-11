'use client';

import {useState, useEffect} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {format, isPast, isToday} from 'date-fns';
import {useRouter} from 'next/navigation';
import {SunIcon, MoonIcon} from 'lucide-react';
import {useTheme} from 'next-themes';
import dynamic from 'next/dynamic';
import {ThemeProvider} from '@/components/ThemeProvider';
import {useAuth} from '@/hooks/useAuth';
import {Loader2, PanelLeft, LogOut} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import {SidebarProvider} from '@/components/ui/sidebar';
import React from 'react';
import {signOut} from 'firebase/auth';
import {firebaseAuth} from '@/lib/firebase';

const DynamicTopicInputForm = dynamic(() => import('@/components/TopicInputForm'), {
  ssr: false,
});

const AuthCheck = ({children}: {children: React.ReactNode}) => {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  const {theme, setTheme} = useTheme();
  const [topics, setTopics] = useState<string[]>([]); // topics state

  const handleTopicClick = (topic: string) => {
    router.push(`/research/${topic}`);
  };

  const isFutureDate = date ? !isPast(date) && !isToday(date) : false;
  const isPastDate = date ? isPast(date) : false;

  const isCurrentDate = date ? isToday(date) : false; // Check if the selected date is today

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <AuthCheck>
      <ThemeProvider>
        <SidebarProvider>
          <div className="flex min-h-svh">
            <Sidebar />
            <div className="flex-1 p-4 mr-1">
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-row gap-4 items-center">
                  <PanelLeft className='hidden md:block h-6 w-6'/>
                  <h1 className="text-2xl font-bold">Quebrain</h1>
                </div>
                <div className='flex'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Menu</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      >
                        {theme === 'dark' ? (
                          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
                        ) : (
                          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleSignOut}
                        className="mt-2 w-full justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

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

              {(isCurrentDate || (date && !isFutureDate)) && (
                <div className="mb-4 border rounded-md p-4">
                  <React.Suspense fallback={<div>Loading...</div>}>
                  {/* Render DynamicTopicInputForm only when it's loaded */}
                    <DynamicTopicInputForm selectedDate={date} setTopics={setTopics} topics={topics}/>
                  </React.Suspense>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Topics for {date ? format(date, 'PPP') : 'Selected Date'}
                </h2>
                <ul>
                  {topics.map((topic) => (
                    <li key={topic} className="mb-2 border-b pb-2">
                      <div className="flex items-center justify-between">
                        <span>{topic}</span>
                        <Button onClick={() => handleTopicClick(topic)}>
                          View Research
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                {isPastDate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Adding topics for past dates is not allowed.
                  </p>
                )}
                {isFutureDate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Please select current or past date
                  </p>
                )}
              </div>

            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthCheck>
  );
}
