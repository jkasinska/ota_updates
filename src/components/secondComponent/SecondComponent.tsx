import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Item = (item: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

export default () => {
  const [value, changeValue] = useState('');
  const [isVisible, changeVisibility] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.componentTitle}>SecondComponent</Text>
      <View>
        <TextInput
          testID="input"
          value={value}
          onChangeText={changeValue}
          style={styles.textInput}
        />
        <Button
          color="#841584"
          title="Change label visibility"
          onPress={() => changeVisibility(!isVisible)}
        />
        {isVisible && <Text testID="value">{value}</Text>}
      </View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  componentTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
