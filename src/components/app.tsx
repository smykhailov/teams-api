import React from 'react';
import { Flex, Segment, FlexItem, Text } from '@fluentui/react-northstar';

import TeamsList from './teams/teams-list';
import { Me } from './auth/me';

const App = () => {
  return (
    <Flex column styles={{ height: '100vh' }}>
      <Segment color="brand" inverted>
        <Flex vAlign="center" space="between">
          <Text as="h2">MS Teams Graph API Example</Text>
          <Me />
        </Flex>
      </Segment>
      <FlexItem grow={1}>
        <Flex gap="gap.small" vAlign="stretch">
          <FlexItem size="300px">
            <Segment>
              <TeamsList />
            </Segment>
          </FlexItem>
          <FlexItem grow={1}>
            <Segment>Main</Segment>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
};

export default App;
