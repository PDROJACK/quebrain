'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {LinkedIn, Twitter, Instagram} from 'lucide-react';

const IntegrationsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Social Media Integrations</h1>
      <p>Connect your social media accounts to automate content publishing.</p>

      {/* Example Integration Setup Section (Replace with actual integration logic) */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <LinkedIn className="mr-2" />
          LinkedIn Integration
        </h2>
        <p>Connect to LinkedIn to publish posts directly.</p>
        <Button>Connect LinkedIn</Button>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Twitter className="mr-2" />
          Twitter Integration
        </h2>
        <p>Connect to Twitter to publish tweets directly.</p>
        <Button>Connect Twitter</Button>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Instagram className="mr-2" />
          Instagram Integration
        </h2>
        <p>Connect to Instagram to publish posts directly.</p>
        <Button>Connect Instagram</Button>
      </section>
    </div>
  );
};

export default IntegrationsPage;
