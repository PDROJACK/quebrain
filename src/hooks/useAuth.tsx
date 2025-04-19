import { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { firebaseAuth as auth } from '@/lib/firebase'; // Assuming you've exported 'auth' from firebase.ts
import { useRouter } from 'next/navigation';

interface UseAuth {
  user: User | null;
  loading: boolean;
}
interface signOut {
  signOut: () => Promise<void>;
}

export const useAuth = (): UseAuth  => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};


export const useSignOut = (): signOut => {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      router.push('/signup');
    } catch (error) {
      console.error('Error signing out:', error);
      router.push('/'); // Redirect to home even on error
    }
  }, [router]);

  return {
    signOut: handleSignOut,
  };
};
