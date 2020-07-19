import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux"

import { Text, View } from '../components/Themed';
import TouchableOpacityBtn from "../components/TouchableOpacityBtn"
import { deleteDeck } from "../actions/deckActions"

export default function SingleDeckView({ route, navigation}) {

  let { deckTitle } = route.params
  let dispatch = useDispatch();
  let deckState = useSelector((state) => state.decks)
  const [currentCardNum, setCurrentCardNum] = useState('')
  const [currentDeck, setCurrentDeck] = useState('');

  useEffect(() => {
      for(let i = 0; i < deckState.length; i++) {
        if(deckState[i].title === deckTitle) {
          setCurrentDeck(deckState[i]);
          setCurrentCardNum(currentDeck.hasOwnProperty('questions') ? deckState[i].questions.length : 0)
        }
      }
  })

  const delDeck = () => {
    let newDeckData = deckState.filter(deck => {
      return deck.title === deckTitle ? '' : deck
    });
    dispatch(deleteDeck(newDeckData))
    navigation.navigate('AllDecksScreen')
  }

  return (
    <View style={styles.container}>
      <Text>{deckTitle}</Text>
      <Text style={styles.qLength}>{currentDeck.hasOwnProperty('questions') ? currentCardNum : 0} Cards</Text>
      <TouchableOpacityBtn btnText="Take Quiz" onPress={() => navigation.navigate('QuizScreen', { currentDeck : currentDeck})}/>
      <TouchableOpacityBtn btnText="Add Card" onPress={() => navigation.navigate('AddCardScreen', { currentDeckTitle : deckTitle })}/> 
      <TouchableOpacityBtn btnText="Delete Deck" onPress={delDeck}/>
      <TouchableOpacity onPress={() => navigation.navigate('AllDecksScreen')}><Text>Click Me</Text></TouchableOpacity>
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
    paddingVertical: 30
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
