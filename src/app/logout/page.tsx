'use client';

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase';

export default function LogoutPage() {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Error signing out:', error);
        router.push('/login');
      }
    };

    logout();
  }, [auth, router]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}