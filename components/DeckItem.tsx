import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux"
import { Text, View } from './Themed';

export default function DeckItem({index, navigation}) {

  let deck = useSelector((state) => state.decks)[index]

  return (
    <View key={deck.title + index}>
        <TouchableOpacity onPress={() => navigation.navigate('DeckScreen', { deckTitle : deck.title })}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.qLength}>{deck.hasOwnProperty('questions') ? deck.questionLen : 0} Cards</Text>
        </TouchableOpacity>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.5)" />
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
