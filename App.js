import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts}
                       onFinish={() => setDataLoaded(true)} />;
  }

  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  }

  let content = <StartGame startGameHandler={startGameHandler}/>

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber}
                          gameOverHandler={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOver NOfRounds={guessRounds}
                        rightNumber={userNumber}
                        configureNewGame={configureNewGame} />
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Adivina el número" />
      {content}    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
