import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuItem as SidebarItem } from '@/components/ui/sidebar';
import { Home, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  topic?: string;
}

const CustomSidebar: React.FC<SidebarProps> = ({ topic }) => {
  const { user } = useAuth();
  const researchRoute = topic ? `/research/${topic}` : "/research"
  return (
    <Sidebar className="w-64" >
      <SidebarContent>
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Menu</h2>
        </SidebarHeader>
        <SidebarItem>
            <Link href={researchRoute} className="flex items-center space-x-2">
             <Home />
             <span>Research</span>
            </Link>
        </SidebarItem>
        <SidebarItem>
          <Link href="/settings" className="flex items-center space-x-2">
            <Settings />
            <span>Settings</span>
          </Link>
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/logout" className="w-full">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
            <AvatarFallback>{user?.displayName?.slice(0,2) || "UN"}</AvatarFallback>
          </Avatar>
        </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomSidebar;