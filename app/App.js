import 'react-native-gesture-handler';
import * as React from 'react';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import {
  StyleProvider,
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
import MenuScreen from './src/screens/menu/index'
import ProfileScreen from './src/screens/profile/index'
import SigninScreen from './src/screens/signin/index'

import {SCREENS} from './src/config/constants'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <StyleProvider style={getTheme(commonColor)}>
      <NavigationContainer >
        <Drawer.Navigator initialRouteName={SCREENS.LOGIN} drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name={SCREENS.HOME} component={HomeScreen} />
          <Drawer.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          <Drawer.Screen name={SCREENS.ABOUT} component={AboutScreen} />
          <Drawer.Screen name={SCREENS.STORE} component={StoreScreen} />
          <Drawer.Screen name={SCREENS.CONFIGURATIONS} component={ConfigurationsScreen} />
          <Drawer.Screen name={SCREENS.CONTACT} component={ContactScreen} />
          <Drawer.Screen name={SCREENS.MENU} component={MenuScreen} />
          <Drawer.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
          <Drawer.Screen name={SCREENS.SIGNIN} component={SigninScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StyleProvider>

  );
}
