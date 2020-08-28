import React from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface ThirdComponentProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

type Item = {
  key: number;
  id: string;
  title: string;
};

const DATA: Item[] = [];

const getItem = (data: Item[], index: number) => {
  return {
    key: index.toString(),
    id: Math.random().toPrecision(2).toString(),
    title: `Item ${index + 1}`,
  };
};

const getItemCount = () => {
  return 200;
};

const ThirdComponent = (props: ThirdComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Button
                title={`Details of ${item.title}`}
                onPress={() =>
                  props.navigation.navigate('ThirdComponentDetails', item)
                }
              />
            </View>
          );
        }}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    display: 'flex',
    backgroundColor: '#f9c2ff',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default ThirdComponent;
