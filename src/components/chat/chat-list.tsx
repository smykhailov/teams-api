import React, { useState } from 'react';
import { List, Flex, Text, Avatar } from '@fluentui/react-northstar';

const ChatList = () => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(-1);

  return (
    <Flex column>
      <Text as="h4">Chats</Text>
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

export default ChatList;
