import React, { Component } from 'react';
import {
  Box,
  StatusBar,
  Image

} from 'native-base';
import { colors } from '../../config/styles';
import Splash from '../../assets/splash.png';

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  _rememberEmail = async () => {
    try {
      await AsyncStorage.setItem('EMAIL', this.state.emailString);
    } catch (error) {
      // Error saving data
    }
  };

  _rememberIsLoading = async () => {
    try {
      await AsyncStorage.setItem('ISLOADING', false);
    } catch (error) {
      // Error saving data
    }
  };

  _getRememberedEmail = async () => {
    try {
      state.email = await AsyncStorage.getItem('EMAIL');
      return console.log('GOT IT!!!', state.email);

    } catch (error) {
      // Error retrieving data
    }
  };

  _getRememberedIsLoading = async () => {
    try {
      state.email = await AsyncStorage.getItem('ISLOADING');
      return console.log('GOT IT!!!', state.email);

    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
      <Box flex={1} bg='primary.500'>
        <StatusBar backgroundColor={colors.primary[600]} barStyle="light-content" />
        <Image
          size='100%'
          resizeMode="contain"
          source={Splash}
          alt={"Alternate Text "}
        />

      </Box>
    );
  }
}

export default function (props) {

  return <SplashScreen {...props}/>;
}
