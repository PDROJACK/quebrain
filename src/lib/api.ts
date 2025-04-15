import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

export const addTopic = async (topic: string, selectedDate: Date) => {
  const { user } = useAuth();
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  if (!user?.getIdToken()) {
    console.error('JWT token is missing');
    return Promise.reject('JWT token is missing');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.getIdToken()}`,
      },
      body: JSON.stringify({ topic, date: formattedDate }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add topic:', errorData);
        return Promise.reject(errorData);
    }

    return response.json();
  } catch (error) {
    console.error('Network error while adding topic:', error);
    return Promise.reject('Network error while adding topic');
  }
};

export const fetchTopics = async (date: Date) => {
  const { user } = useAuth();
  const formattedDate = format(date, 'yyyy-MM-dd');

  if (!user?.jwtToken) {
    console.error('JWT token is missing');
    return Promise.reject('JWT token is missing');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/topics?date=${formattedDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      }
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch topics:', errorData);
        return Promise.reject(errorData);
    }

    return response.json();
  } catch (error) {
    console.error('Network error while fetching topics:', error);
    return Promise.reject('Network error while fetching topics');
  }
};