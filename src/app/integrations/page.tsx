'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {
  Linkedin,
  Instagram,
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {X} from 'lucide-react';

const IntegrationsPage = () => {
  const socialButtons = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      handler: () => {
        alert('Connect to LinkedIn');
      },
    },
    {
      name: 'X',
      icon: X,
      handler: () => {
        alert('Connect to X');
      },
    },
    {
      name: 'Instagram',
      icon: Instagram,
      handler: () => {
        alert('Connect to Instagram');
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Social Media Integrations</h1>

      {/* Integration Setup Section */}
      <div className="grid grid-cols-2 gap-4">
        {socialButtons.map((social, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{social.name}</h2>
            <Button
              onClick={social.handler}
              className={cn(
                'flex items-center justify-center rounded-md border-2 p-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'bg-background text-foreground'
              )}
            >
              <social.icon className="mr-2 h-4 w-4" />
              Connect
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
