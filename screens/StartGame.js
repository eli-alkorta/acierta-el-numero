import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGame = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetNumber = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }
  
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  const confirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Número inválido',
        'debes introducir una cifra entre 1 y 99',
        [{ text: 'OK', style: 'destructive', onPress: resetNumber }])
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput;

    if (confirmed) {
      confirmedOutput = <Card style={styles.selectedNumber}>
        <Text>Número seleccionado: </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.startGameHandler(selectedNumber)} >
          COMENZAR
        </MainButton>
      </Card>
    }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Nueva Partida</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Escoge un Número</BodyText>
              <Input style={styles.input}
                blurOnSubmit={true}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}/>
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button title="Reset"
                    color={Colors.secondary}
                    onPress={resetNumber}/>
                </View>
                <View style={{width: buttonWidth}}>
                  <Button title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInput}/>
                </View>
              </View>
            </Card>
              {confirmedOutput}
          </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  title: {
    marginVertical: 10
  },
  selectedNumber: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGame;