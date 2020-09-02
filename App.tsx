import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CursorSvg from './assets/cursor.svg';
import GithubSvg from './assets/github.svg';
import UnicornSvg from './assets/unicorn.svg';
import FirstComponent from './src/components/firstComponent/FirstComponent';
import SecondComponent from './src/components/secondComponent/SecondComponent';
import ThirdComponent from './src/components/thirdComponent/ThirdComponent';
import ThirdComponentDetails from './src/components/thirdComponent/ThirdComponentDetails';

export type RootStackParamList = {
  FirstComponent: undefined;
  SecondComponent: undefined;
  ThirdComponent: undefined;
};

export type ThirdComponentStackParamList = {
  ThirdComponent: undefined;
  ThirdComponentDetails: { key: string; id: string; title: string };
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const ThirdComponentStack = createStackNavigator<
  ThirdComponentStackParamList
>();

const ThirdComponentStackScreen = () => {
  return (
    <ThirdComponentStack.Navigator>
      <ThirdComponentStack.Screen
        name="ThirdComponent"
        component={ThirdComponent}
      />
      <ThirdComponentStack.Screen
        name="ThirdComponentDetails"
        component={ThirdComponentDetails}
      />
    </ThirdComponentStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="FirstComponent"
        tabBarOptions={{
          activeTintColor: '#E91E63',
        }}>
        <Tab.Screen
          name="FirstComponent"
          component={FirstComponent}
          options={{
            tabBarLabel: 'FirstComponent',
            tabBarIcon: () => <CursorSvg height={20} width={20} fill="black" />,
          }}
        />
        <Tab.Screen
          name="SecondComponent"
          component={SecondComponent}
          options={{
            tabBarLabel: 'SecondComponent',
            tabBarIcon: () => <GithubSvg height={20} width={20} fill="black" />,
          }}
        />
        <Tab.Screen
          name="ThirdComponent"
          component={ThirdComponentStackScreen}
          options={{
            tabBarLabel: 'ThirdComponent',
            tabBarIcon: () => (
              <UnicornSvg height={20} width={20} fill="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
