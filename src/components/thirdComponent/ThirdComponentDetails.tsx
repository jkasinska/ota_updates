import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { ThirdComponentStackParamList } from '../../../App';

interface ThirdComponentDetailsProps {
  navigation: NavigationProp<any>;
  route: RouteProp<ThirdComponentStackParamList, 'ThirdComponentDetails'>;
}

const ThirdComponentDetails = (props: ThirdComponentDetailsProps) => {
  return (
    <>
      <Text>ThirdComponentDetails</Text>
      <Text>{props.route.params.title}</Text>
    </>
  );
};

export default ThirdComponentDetails;
