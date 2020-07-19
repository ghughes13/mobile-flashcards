import React, { Children } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from './Themed';

export default function TouchableOpacityBtn({ btnText, onPress}: { btnText: 'string', onPress : 'any' }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}> 
        <Text>{btnText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    btn: {
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "#AFAFAF",
      padding: 10,
      borderRadius: 5,
    },
  });
