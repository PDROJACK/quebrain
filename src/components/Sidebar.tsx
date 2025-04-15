'use client';

import React from 'react';
import Link from 'next/link';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  Sidebar as Side,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem as SidebarItem,
} from '@/components/ui/sidebar';
import {Home, Settings, ChevronLeft, ChevronRight, User} from 'lucide-react';
import {useAuth} from '@/hooks/useAuth';
import {useSidebar} from '@/components/ui/sidebar';
import {cn} from '@/lib/utils';

interface SidebarProps {
  topic?: string;
}

const CustomSidebar: React.FC<SidebarProps> = ({topic}) => {
  const {user} = useAuth();
  const {state, toggleSidebar} = useSidebar();
  const researchRoute = topic ? `/research/${topic}` : '/research';
  const isCollapsed = state === 'collapsed';

  return (
    <Side
      collapsible="icon"
      className="w-64 group/sidebar-wrapper"
      style={{width: isCollapsed ? 'calc(var(--sidebar-width-icon))' : 'var(--sidebar-width)'}}
    >
      <SidebarContent className="p-0">
        <SidebarHeader className="flex flex-row items-center justify-between p-3">
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
          {isCollapsed ? null : <h2 className="text-lg font-semibold">Quebrain</h2> }
          
        </SidebarHeader>
        <SidebarItem>
          <Link href={researchRoute} className="flex items-center justify-center space-x-2">
            <Home className="lucide-react" />
            {!isCollapsed && <span>Research</span>}
          </Link>
        </SidebarItem>
        <SidebarItem className="p-2">
          <Link href="/settings" className="flex items-center justify-center space-x-2">
            <Settings className="lucide-react" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <Link href="/logout" className="w-full">
          <div className="flex items-center justify-center">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
              <AvatarFallback>{user?.displayName?.slice(0, 2) || 'UN'}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-2">
                <p className="text-sm">{user?.displayName || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'No Email'}</p>
              </div>
            )}
          </div>
        </Link>
      </SidebarFooter>
    </Side>
  );
};

export default CustomSidebar;
