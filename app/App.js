import 'react-native-gesture-handler';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './src/screens/drawercontent/index'
import HomeScreen from './src/screens/home/index'
import LoginScreen from './src/screens/login/index'
import AboutScreen from './src/screens/about/index'
import StoreScreen from './src/screens/store/index'
import ConfigurationsScreen from './src/screens/configurations/index'
import ContactScreen from './src/screens/contact/index'
import ScheduleScreen from './src/screens/schedule/index'
import ProfileScreen from './src/screens/profile/index'
import SigninScreen from './src/screens/signin/index'
import SplashScreen from './src/screens/splash/index'

import { SCREENS } from './src/config/constants'
import { colors } from './src/config/styles'

const Drawer = createDrawerNavigator();

const theme = extendTheme({ colors: colors });

const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const _rememberEmail = async () => {
  try {
    await AsyncStorage.setItem('EMAIL', 'maiderr97@gmail.com');
  } catch (error) {
    // Error saving data
  }
};

const _getRememberedEmail = async () => {
  try {
    email = await AsyncStorage.getItem('EMAIL');
    return email;
  } catch (error) {
    // Error retrieving data
  }
};


export default function App() {
  return (
    <NativeBaseProvider config={config} theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={SCREENS.LOGIN} drawerContentOptions={SCREENS} drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name={SCREENS.HOME} component={HomeScreen} />
          <Drawer.Screen name={SCREENS.ABOUT} component={AboutScreen} />
          <Drawer.Screen name={SCREENS.STORE} component={StoreScreen} />
          <Drawer.Screen name={SCREENS.CONFIGURATIONS} component={ConfigurationsScreen} />
          <Drawer.Screen name={SCREENS.CONTACT} component={ContactScreen} />
          <Drawer.Screen name={SCREENS.SCHEDULE} component={ScheduleScreen} />
          <Drawer.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
          <Drawer.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          <Drawer.Screen name={SCREENS.SIGNIN} component={SigninScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}
