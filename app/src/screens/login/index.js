import React, { Component } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  LogBox
} from 'react-native';
import {
  Spinner,
  StatusBar,
  KeyboardAvoidingView,
  Collapse,
  IconButton,
  CloseIcon,
  Alert,
  Box,
  VStack,
  HStack,
  Center
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import IconLogo from '../../assets/logo.png';
import { colors } from '../../config/styles';
import {
  SCREENS,
  ALERTS,
  ALERT_TITLES,
  TYPE_ALERT,
  PLACEHOLDERS,
  BUTTONS,
  VALUES
} from '../../config/constants';
import { LOGIN } from '../../utils/querys'
import client from '../../utils/client';

import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../utils/globals';

class LoginScreen extends Component {

  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer', 'NativeBase:']);
    super(props);
    this.state = {
      emailString: '',
      passwordString: '',
      name: '',
      isLoading: false,
      alert: {
        show: false,
        title: '',
        message: '',
        type: ''
      }
    };
  }

  async componentDidMount() {
    const email = await this._getRememberedEmail();
    const password = await this._getRememberedPassword();
    if (email !== null && password !== null) {
      this.setState({ emailString: email, passwordString: password })
      //this.props.navigation.navigate(SCREENS.HOME, { email });
    }
  }

  _checkTextInputs = () => {
    if (!this.state.emailString.trim() || !this.state.emailString.includes('@')) {
      this.setState({ isLoading: false, alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.INVALID_EMAIL, type: TYPE_ALERT.ERROR } });
      return;
    }
    if (!this.state.passwordString.trim()) {
      this.setState({ isLoading: false, alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.INVALID_PASSWORD, type: TYPE_ALERT.ERROR } });
      return;
    }
    //Checked Successfully
    //Do whatever you want
    return true
  }

  _onLoginPressed = () => {
    this.setState({ isLoading: true });
    if (this._checkTextInputs()) {
      client
        .fetch(
          LOGIN(this.state.emailString)
        )
        .then(res => {
          //console.log(res)
          if (
            this.state.passwordString === res[0].password
          ) {
            this._rememberEmail();
            this._rememberPassword();
            this._rememberName(res[0].name);
            this._rememberImage(res[0].image);
            this._rememberIsAdmin(res[0].admin.toString())
            global.loadUserInfo = true;
            this.props.navigation.navigate(SCREENS.HOME, { email: this.state.emailString });
            this.setState({ isLoading: false, emailString: '', passwordString: '', alert: { show: false, title: '', message: '', type: '' } });

          } else {
            this.setState({ isLoading: false, alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.LOGIN_NOT_MATCH, type: TYPE_ALERT.ERROR } });
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({ isLoading: false, alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.ERROR_ON_LOGIN, type: TYPE_ALERT.ERROR } });
        })
    }
  };

  _onLoginTextChangedEmail = event => {
    this.setState({
      emailString: event.nativeEvent.text
    });
  };

  _onLoginTextChangedPassword = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  _onSignInPressed = () => {
    this.props.navigation.navigate(SCREENS.SIGNIN);
  };

  _rememberEmail = async () => {
    try {
      await SecureStore.setItemAsync('EMAIL', this.state.emailString);
    } catch (error) {
      // Error saving data
    }
  };

  _getRememberedEmail = async () => {
    try {
      const email = await SecureStore.getItemAsync('EMAIL');
      return email;

    } catch (error) {
      // Error retrieving data
    }
  };

  _rememberPassword = async () => {
    try {
      await SecureStore.setItemAsync('PASSWORD', this.state.passwordString);
    } catch (error) {
      // Error saving data
    }
  };

  _getRememberedPassword = async () => {
    try {
      const pasword = await SecureStore.getItemAsync('PASSWORD');
      return pasword;

    } catch (error) {
      // Error retrieving data
    }
  };

  _rememberName = async (name) => {
    try {
      await SecureStore.setItemAsync('NAME', name);
    } catch (error) {
      // Error saving data
    }
  };

  _getRememberedName = async () => {
    try {
      const name = await SecureStore.getItemAsync('NAME');
      return name;

    } catch (error) {
      // Error retrieving data
    }
  };

  _rememberImage = async (image) => {
    try {
      await SecureStore.setItemAsync('IMAGE', JSON.stringify(image));
    } catch (error) {
      // Error saving data
    }
  };

  _getRememberedImage = async () => {
    try {
      const image = await SecureStore.getItemAsync('IMAGE');
      return image;

    } catch (error) {
      // Error retrieving data
    }
  };

  _rememberIsAdmin = async (isAdmin) => {
    try {
      await SecureStore.setItemAsync('ISADMIN', isAdmin);
    } catch (error) {
      // Error saving data
    }
  };

  _getRememberedIsAdmin = async () => {
    try {
      const isAdmin = await SecureStore.getItemAsync('ISADMIN');
      return isAdmin;

    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    const { navigation } = this.props;

    const spinner = this.state.isLoading ? (
      <Spinner size='large' color='white' />
    ) : null;

    const alert = this.state.alert.show ? (
      <Center>
        <Alert w="90%" maxW="400" status={this.state.alert.type} colorScheme={this.state.alert.type}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  {this.state.alert.title}
                </Text>
              </HStack>
              <IconButton variant="unstyled" onPress={() => this.setState({ alert: { show: false, title: ALERT_TITLES.ERROR, message: '', type: '' } })} icon={<CloseIcon size="3" color="coolGray.600" />} />
            </HStack>
            <Box pl="6" _text={{
              color: "coolGray.600"
            }}>
              {this.state.alert.message}
            </Box>
          </VStack>
        </Alert>
      </Center>
    ) : null;

    return (
      <LinearGradient
        colors={[colors.primary[500], colors.black]}
        style={styles.gradientContainer}
        start={{ x: VALUES.CERO, y: VALUES.CERO }}
        end={{ x: VALUES.CERO, y: VALUES.UNO }}
      >
        <StatusBar backgroundColor={colors.primary[600]} barStyle="light-content" />
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.loginContainer}>
            <Image style={styles.logo} source={IconLogo} />
          </View>
          {spinner}
          <Collapse isOpen={this.state.alert.show}>
            {alert}
          </Collapse>
          <View style={styles.containerForm}>
            <TextInput
              style={styles.input}
              autoCapitalize={VALUES.NONE}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType={VALUES.EMAIL_ADDRESS}
              value={this.state.emailString}
              onChange={this._onLoginTextChangedEmail}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              placeholder={PLACEHOLDERS.EMAIL}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              returnKeyType={VALUES.GO}
              ref={input => (this.passwordInput = input)}
              placeholder={PLACEHOLDERS.PASSWORD}
              value={this.state.passwordString}
              onChange={this._onLoginTextChangedPassword}
              underlineColorAndroid={colors.transparent}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onLoginPressed/* navigation.navigate('Home') */}
            >
              <Text style={styles.buttonText}>{BUTTONS.LOGIN}</Text>
            </TouchableOpacity>
            <View style={styles.containerLink}>
              <TouchableOpacity onPress={this._onSignInPressed}>
                <Text style={styles.textLink}>{BUTTONS.SIGNIN}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textLink}>{BUTTONS.FORGOT}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <LoginScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary[500],
    borderRadius: 15,
    paddingVertical: 15,
    margin: 5
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  containerLink: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  container: {
    backgroundColor: colors.transparent,
    flex: 1,
  },
  containerForm: {
    padding: 20
  },
  gradientContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.inputColor,
    borderRadius: 15,
    color: colors.white,
    height: 40,
    marginBottom: 10,
    padding: 10
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    flex: 0.5,
    height: '60%',
    resizeMode: 'contain',
    width: '60%',
  },
  textLink: {
    color: colors.white,
    fontWeight: '700',
    margin: 6,
    textAlign: 'center'
  }
});
