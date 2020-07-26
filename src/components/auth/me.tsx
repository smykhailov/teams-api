import React, { useEffect, useState } from 'react';
import { Text } from '@fluentui/react-northstar';
import { useAppContext } from 'app-context';

export const Me = () => {
  const { client } = useAppContext();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await client.api('/me').get();
        setUserName(userDetails.displayName);
      } catch (e) {
        setError(e.message);
      }
    };

    getUserDetails();
  });

  if (error) {
    return <Text color="red">{error}</Text>;
  }
  return <Text>{userName}</Text>;
};
