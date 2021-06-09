import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  LogBox
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import IconLogo from '../../assets/logo.png';
import { colors } from '../../config/styles';
import {
  SCREENS,
  ALERTS,
  PLACEHOLDERS,
  BUTTONS,
  VALUES
} from '../../config/constants';
import client from '../../utils/client';

import { useNavigation } from '@react-navigation/native';

class SigninScreen extends Component {

  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      emailString: '',
      passwordString: '',
      isLoading: false
    };
  }

  _onLoginPressed = () => {
    this.setState({ isLoading: true });
    client
      .fetch(
        `*[_type == 'user' && email.current == \'${this.state.emailString}\' ]{password}`
      )
      .then(res => {
        if (
          this.state.passwordString == res[0].password
        ) {
          this.setState({ isLoading: false });
          this.props.navigation.navigate(SCREENS.HOME);
          this.setState({ emailString: '' });
          this.setState({ passwordString: '' });
        } else {
          this.setState({ isLoading: false });
          Alert.alert(
            SCREENS.LOGIN,
            ALERTS.ERROR_LOGIN,
            [{ text: BUTTONS.OK }],
            { cancelable: false }
          );
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        Alert.alert(
          SCREENS.LOGIN,
          ALERTS.ERROR,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
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
    alert(BUTTONS.SIGNIN);
  };

  render() {
    const { navigation } = this.props;

    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;

    return (
      <LinearGradient
        colors={[colors.color_primary_500, colors.black]}
        style={styles.gradientContainer}
        start={{ x: VALUES.CERO, y: VALUES.CERO }}
        end={{ x: VALUES.CERO, y: VALUES.UNO }}
      >
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <View style={styles.loginContainer}>
            <Image style={styles.logo} source={IconLogo} />
          </View>
          {spinner}
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
              onPress={() => navigation.goBack()/* this._onLoginPressed */}
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

  return <SigninScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.color_primary_500,
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
    flex: 1,
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
