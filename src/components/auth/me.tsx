import React, { useEffect, useState } from 'react';
import { Text } from '@fluentui/react-northstar';
import { useAppContext } from 'app-context';

import * as MSG from '@microsoft/microsoft-graph-types';

export const Me = () => {
  const { client } = useAppContext();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails: MSG.Person = await client.api('/me').get();
        setUserName(userDetails.displayName || 'Unknown');
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
