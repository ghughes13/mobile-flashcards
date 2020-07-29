import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from '../components/Themed';
import TouchableOpacityBtn from "../components/TouchableOpacityBtn"
import { createDeck } from "../actions/deckActions"

export default function TabTwoScreen({ navigation }) {

  const [text, setText] = useState('')
  const [showErr, setShowErr] = useState(false)
  const dispatch = useDispatch();
  let arrData = useSelector((state) => state.decks)

  let addDeck = () => {
    if(text.length > 1) {
    dispatch(createDeck(arrData, text))
    setShowErr(false)
    navigation.navigate('DeckScreen', { deckTitle : text })
    } else {
      setShowErr(true)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Deck Title:</Text>
      <TextInput style={styles.input} placeholder="New deck title..." onChangeText={(text) => setText(text)} />
      {showErr ? <Text style={styles.error}>Deck name cannot be blank.</Text> : <Text></Text>}
      <TouchableOpacityBtn btnText="Add Deck" onPress={addDeck} />
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    width: 200,
    padding: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  error: {
    color: 'red'
  }
});
