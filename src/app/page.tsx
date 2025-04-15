'use client';

import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {useState} from 'react';
import {TopicInputForm} from '@/components/TopicInputForm';
import {useRouter} from 'next/navigation';
import {Settings, LogOut, User} from 'lucide-react';
import {useAuth} from '@/hooks/useAuth';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {useEffect} from 'react';
import AuthCheck from '@/components/AuthCheck';
import CustomSidebar from '@/components/Sidebar';

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [topics, setTopics] = useState<string[]>([]);
  const router = useRouter();
  const {user, loading, signOut} = useAuth();

  const isCurrentDate = date ? format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') : false;
  const isFutureDate = date ? date > new Date() : false;

  const handleTopicClick = (topic: string) => {
    router.push(`/research/${topic}`);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen">
        <CustomSidebar />
        <div className="container mx-auto p-4 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Quebrain</h1>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                      <AvatarFallback>{user?.displayName?.slice(0, 2) || 'UN'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>
                      {user?.displayName}
                      <br />
                      {user?.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/integrations')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Integrations
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              <TopicInputForm selectedDate={date} setTopics={setTopics} topics={topics} />
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
                    <Button onClick={() => handleTopicClick(topic)}>View Research</Button>
                  </div>
                </li>
              ))}
            </ul>
            {isFutureDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Adding topics for past dates is not allowed.
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
