import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {  useSelector } from 'react-redux'
import { Text, View } from '../components/Themed';
import DeckItem from "../components/DeckItem"

export default function TabOneScreen({ navigation }) {
  
  let arrData = useSelector((state) => state.decks)

  console.log('reup')
  
  return (
    <View style={styles.container}>
      {arrData.map((deck, index) => {
         return (
            <DeckItem key={index + deck.title} index={index} navigation={navigation}/>
          )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 15
  },
  qLength : {
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 15,
  },
  separator: {
    height: 1,
    width: 250,
    backgroundColor: 'black'
  },
});
