import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = props => {
  return (
    <View style={{
      ...styles.headerBase,
      ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid
      })
    }}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIOS: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
  },
  headerAndroid: {
    borderBottomWidth: 0,
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
  },
  title: {
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  }
});

export default Header;