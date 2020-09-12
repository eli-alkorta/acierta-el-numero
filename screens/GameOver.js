import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText style={styles.title}>¡Has acertado!</TitleText>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/success.png')}
            style={styles.image}
            resizeMode='cover' />
        </View>
        <BodyText style={styles.text}>Tu teléfono ha necesitado <Text style={styles.highlight}>{props.NOfRounds}</Text> rondas para adivinar el número <Text style={styles.highlight}>{props.rightNumber}</Text></BodyText>
        <MainButton onPress={props.configureNewGame}>NUEVA PARTIDA</MainButton>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    marginTop: 20
  },
  imageContainer: {
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  text: {
    fontSize: Dimensions.get('window').width < 350 ? 16 : 20,
    marginBottom: Dimensions.get('window').height / 30,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default GameOver;