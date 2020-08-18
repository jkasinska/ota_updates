import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CursorSvg from './assets/cursor.svg';
import GithubSvg from './assets/github.svg';
import UnicornSvg from './assets/unicorn.svg';
import FirstComponent from './src/components/FirstComponent';
import SecondComponent from './src/components/SecondComponent';
import ThirdComponent from './src/components/ThirdComponent';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="FirstComponent"
        tabBarOptions={{
          activeTintColor: '#E91E63',
        }}
      >
        <Tab.Screen
          name="FirstComponent"
          component={FirstComponent}
          options={{
            tabBarLabel: 'FirstComponent',
            tabBarIcon: () => (
              <CursorSvg height={20} width={20} fill="gray"/>
            ),
          }}
        />
        <Tab.Screen
          name="SecondComponent"
          component={SecondComponent}
          options={{
            tabBarLabel: 'SecondComponent',
            tabBarIcon: () => (
              <GithubSvg height={20} width={20} fill="gray"/>
            ),
          }}
        />
        <Tab.Screen
          name="ThirdComponent"
          component={ThirdComponent}
          options={{
            tabBarLabel: 'ThirdComponent',
            tabBarIcon: () => (
              <UnicornSvg height={20} width={20} fill="gray"/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
