'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react'; // Corrected icon names
import {cn} from '@/lib/utils';

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
      name: 'Twitter',
      icon: Twitter,
      handler: () => {
        alert('Connect to Twitter');
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
      <p>Connect your social media accounts to automate content publishing.</p>

      {/* Integration Setup Section */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {socialButtons.map((social, index) => (
          <section key={index} className="mb-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              {social.name} Integration
            </h2>
            <p>Connect to {social.name} to publish posts directly.</p>
            <Button
              onClick={social.handler}
              className={cn(
                'flex items-center justify-center rounded-md border-2 p-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'bg-background text-foreground'
              )}
            >
              <social.icon className="mr-2 h-4 w-4" />
              Connect {social.name}
            </Button>
          </section>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
