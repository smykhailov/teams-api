import React, { useState, useEffect } from 'react';
import { List, Flex, Text, Avatar } from '@fluentui/react-northstar';
import { useAppContext } from 'app-context';

import * as MSG from '@microsoft/microsoft-graph-types';

const TeamsList = () => {
  const { client } = useAppContext();
  const [selectedItemIdx, setSelectedItemIdx] = useState(-1);
  const [error, setError] = useState(null);
  const [teamsList, setTeamsList] = useState<MSG.Team[]>([]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const teams: [MSG.Team] = await client.api('/me/joinedTeams').get();
        setTeamsList(teams);
        console.warn(teams);
      } catch (e) {
        setError(e.message);
      }
    };

    getUserDetails();
  });

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Flex column>
      <Text as="h4">Teams</Text>
      <List
        selectable
        selectedIndex={selectedItemIdx}
        onSelectedIndexChange={(_, newProps) => {
          alert(
            `List is requested to change its selectedIndex state to "${newProps?.selectedIndex}"`
          );
          setSelectedItemIdx(newProps?.selectedIndex || -1);
        }}
        items={items}
      />
    </Flex>
  );
};

const items = [
  {
    key: 'irving',
    media: <Avatar name="Irving Kuhic" />,
    header: 'Irving Kuhic',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor',
  },
  {
    key: 'skyler',
    media: <Avatar name="Skyler Parks" />,
    header: 'Skyler Parks',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application',
  },
  {
    key: 'dante',
    media: <Avatar name="Dante Schneider" />,
    header: 'Dante Schneider',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down',
  },
];

export default TeamsList;
