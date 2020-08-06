import React from 'react';
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

const Item = (item: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.componentTitle}>SecondComponent</Text>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          console.log(item)
          return (
            <Item title={item} />
          );
        }}
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
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24
  },
  componentTitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10
  }
});
