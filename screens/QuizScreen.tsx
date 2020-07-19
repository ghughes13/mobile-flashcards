import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useSelector } from "react-redux";
import { Text, View } from '../components/Themed';
import TouchableOpacityBtn from "../components/TouchableOpacityBtn"

export default function QuizScreen({ route, navigation }) {

    let { currentDeck } = route.params

    const [questionNumber, setQuestionNumber] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(currentDeck.hasOwnProperty('questions') ? currentDeck.questions[0].question : '')
    const [currentAnswer, setCurrentAnswer] = useState(currentDeck.hasOwnProperty('questions') ? currentDeck.questions[0].answer : '')
    const [currentlyShowing, setCurrentlyShowing] = useState("question")
    const [numCorrect, setNumCorrect] = useState(0)
    const [numIncorrect, setNumIncorrect] = useState(0);
    const [showScore, setShowScore] = useState(false)

    const nextQuestion = () => {
        console.log(questionNumber)
        if((currentDeck.questions.length - 1) == questionNumber) {
            setShowScore(true)
        } else {
            setQuestionNumber(questionNumber + 1)
            console.log(questionNumber)
            setCurrentlyShowing("question")
            setCurrentQuestion(currentDeck.questions[questionNumber+1].question)
            setCurrentAnswer(currentDeck.questions[questionNumber+1].answer)
        }
    }

    const handleCorrect = () => {
        setNumCorrect(numCorrect + 1)
        nextQuestion()
    }

    const handleIncorrect = () => {
        setNumIncorrect(numIncorrect + 1)
        nextQuestion()
    }

    const swapTo = () => {
        setCurrentlyShowing('answer')
    }

    const resetQuiz = () => {
        setQuestionNumber(0)
        setCurrentlyShowing('question');
        setShowScore(false)
        setNumCorrect(0)
        setNumIncorrect(0)
        setCurrentQuestion(currentDeck.hasOwnProperty('questions') ? currentDeck.questions[0].question : '')
        setCurrentAnswer(currentDeck.hasOwnProperty('questions') ? currentDeck.questions[0].answer : '')
    }

    return (showScore ? (
        <View style={styles.container}>
            <Text>You have completed the quiz!</Text>
            <Text style={styles.title}>Your score was: {100 * (numCorrect / currentDeck.questions.length)}%</Text>
            <TouchableOpacityBtn btnText="Retry" onPress={resetQuiz} />
            <TouchableOpacityBtn btnText="Back" onPress={() => navigation.navigate(('DeckScreen'))} />  
        </View>) : 
    (currentDeck.hasOwnProperty('questions') ? (
        <View style={styles.container}>
        <Text>{questionNumber + 1} / {currentDeck.questions.length}</Text>
        <Text style={styles.title}>{currentlyShowing === 'question' ? currentQuestion : currentAnswer}</Text>
        {(currentlyShowing === 'question' ? <TouchableOpacityBtn btnText="Answer" onPress={swapTo}/> : <Text></Text>)}
        <TouchableOpacityBtn btnText="Correct" onPress={handleCorrect} />
        <TouchableOpacityBtn btnText="Incorrect" onPress={handleIncorrect} />
        </View>
    ) : (
        <View style={styles.container}>
            <Text>You must add questions to the deck before taking a quiz.</Text>
        </View>
    )));
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
    width: 200,
    padding: 10,
    marginTop: 15,
  },
});
