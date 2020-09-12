import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Alert, ScrollView, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min) + min);
  if (random === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return random;
  }
}

const renderListItem = (value, numberOfRound) => 
  (<View key={value} style={styles.listItem}>
    <BodyText>#{numberOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>)


const GameScreen = props => {

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, gameOverHandler } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height)
    }

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(pastGuesses.length);
    }
  },[currentGuess, userChoice, gameOverHandler]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
      Alert.alert("Mentira!", "Sabes que eso no es verdad...", [{ text: 'Oops... perdona', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Número estimado por el contrincante</BodyText>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>  
        </View>  
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView>
        </View>
    </View>
    )
  } else {
    return (
      <View style={styles.screen}>
        <BodyText>Número estimado por el contrincante</BodyText>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>     
        </Card>
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%'
  },
  listContainer: {
    width: Dimensions.get('window').width > 350 ? '70%' : '80%',
    flex: 1
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  }
});

export default GameScreen;