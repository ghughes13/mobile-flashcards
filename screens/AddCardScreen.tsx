import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from '../components/Themed';
import TouchableOpacityBtn from "../components/TouchableOpacityBtn"
import { addCardToDeck } from "../actions/deckActions"

export default function AddNewCard({ route, navigation }) {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [showErr, setShowErr] = useState(false)

  let { currentDeckTitle } = route.params

  const dispatch = useDispatch();
  let deckState = useSelector((state) => state.decks)

  let addCard = () => {
    if(question.length > 1 && answer.length > 1) {
      for(let i = 0; i < deckState.length; i++ ) {
          if(deckState[i].title === currentDeckTitle) {
              if(deckState[i].hasOwnProperty('questions')) {
                  deckState[i].questions.push({"question" : question, "answer" : answer})
                  deckState[i].questionLen += 1
              } else {
                  deckState[i].questions = [{"question" : question, "answer" : answer}]
                  deckState[i].questionLen = 1
              }
          }
      }
      
      dispatch(addCardToDeck(deckState))
      setShowErr(true)
      navigation.navigate('DeckScreen');
    } else {
      setShowErr(true)
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Question: </Text>
      <TextInput style={styles.input} placeholder="New deck title..." onChangeText={(text) => setQuestion(text)} />
      <Text style={styles.title}>New Answer:</Text>
      <TextInput style={styles.input} placeholder="New deck title..." onChangeText={(text) => setAnswer(text)} />
      {showErr ? <Text style={styles.error}>Question or answer cannot be blank.</Text> : <Text></Text>}
      <TouchableOpacityBtn btnText="Add New Question" onPress={addCard} />
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
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    padding: 10,
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
});
