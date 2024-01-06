import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function ElevatedCards() {
  return (
    <View>
      <Text style={styles.headingText}>ElevatedCards</Text>
      <ScrollView horizontal={true} style={styles.container}>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    padding: 10,
  },
  card: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 3,
  },
  cardElevated: {
    backgroundColor: 'aqua',
    elevation:4,
    shadowOffset:{
        width:1,
        height:1
    },
    shadowColor:'#333',
    shadowOpacity:0.4,
    shadowRadius:4,
  },
});
