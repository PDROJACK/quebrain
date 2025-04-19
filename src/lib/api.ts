import { format } from 'date-fns';

export const addTopic = async (topic: string, selectedDate: Date, jwtToken: string) => {
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  console.log(jwtToken)
  if (!jwtToken) {
    console.error('No JWT token provided.');
    return Promise.reject('No JWT token provided.');
  }

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
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

export const fetchTopics = async (date: Date, jwtToken: string) => {
  const formattedDate = format(date, 'yyyy-MM-dd');

  if (!jwtToken) {
    console.error('No JWT token provided.');
    return Promise.reject('No JWT token provided.');
  }

    try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/topics?date=${formattedDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
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