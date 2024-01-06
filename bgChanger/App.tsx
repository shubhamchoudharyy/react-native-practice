import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [randomBg, setRandomBg] = useState("#ffffff");

  const generateColor = () => {
    const hexRange = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)];
    }
    setRandomBg(color);
  };

  return (
    <View style={[styles.container, { backgroundColor: randomBg }]}>
      <StatusBar backgroundColor={randomBg} />
      <TouchableOpacity onPress={generateColor}>
        <View style={styles.actionbtn}>
          <Text style={styles.actionText}>Press me</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionbtn: {
    borderRadius: 12,
    backgroundColor: '#6a1b4d',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  actionText: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
