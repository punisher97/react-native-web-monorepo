import React from 'react';
import { Text } from 'react-native';
import { RouteComponentProps } from 'react-router';

export default function Child({ match }: RouteComponentProps<any>) {
  return <Text>ID:{match.params.id}</Text>;
}
