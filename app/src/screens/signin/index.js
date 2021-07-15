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
      fnameString: '',
      flnameString: '',
      slnameString: '',
      emailString: '',
      passwordString: '',
      checkPasswordString: '',
      phoneNumberString: '',
      heightString: '',
      weightString: '',
      isLoading: false
    };
  }

  _checkTextInputs = () => {
    //Check for the Firstname TextInput
    if (!this.state.fnameString.trim()) {
      alert('Debe ingresar el nombre');
      return;
    }
    //Check for the First Lastname TextInput
    if (!this.state.flnameString.trim()) {
      alert('Debe ingresar el primer apellido');
      return;
    }
    if (!this.state.slnameString.trim()) {
      alert('Debe ingresar el segundo apellido');
      return;
    }
    if (!this.state.emailString.trim()) {
      alert('Debe ingresar el correo electrónico');
      return;
    }
    if (!this.state.passwordString.trim()) {
      alert('Debe ingresar la contraseña');
      return;
    }
    if (!this.state.checkPasswordString.trim()) {
      alert('Debe verificar la contraseña');
      return;
    }
    if (this.state.passwordString != this.state.checkPasswordString) {
      alert('La contraseña no coincide');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    return true
  }

  _onSigninPressed = () => {
    this.setState({ isLoading: true });
    if (this._checkTextInputs()) {
      const doc = {
        _id: this.state.emailString.replace('@', '-'),
        _type: 'user',
        name: this.state.fnameString,
        flname: this.state.flnameString,
        slname: this.state.slnameString,
        email: { current: this.state.emailString },
        password: this.state.passwordString,
        phone_number: this.state.phoneNumberString,
        admin: false
      }

      client.create(doc).then((res) => {
        console.log('User was created document ID is ' + res._id)
        Alert.alert(
          SCREENS.SIGNIN,
          ALERTS.SIGNIN_SUCCESS,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
        .then(() => { this._resetState(); this.props.navigation.navigate(SCREENS.LOGIN); })
        .catch((err) => {
          console.error('Hubo un error al crear el usuario: ', err.message);
          this.setState({ isLoading: false });
          Alert.alert(
            SCREENS.SIGNIN,
            ALERTS.ERROR_SIGNIN,
            [{ text: BUTTONS.OK }],
            { cancelable: false }
          );
        })
    }


  };

  _onSigninTextChangedFName = event => {
    this.setState({
      fnameString: event.nativeEvent.text
    });
  };

  _onSigninTextChangedFLName = event => {
    this.setState({
      flnameString: event.nativeEvent.text
    });
  };

  _onSigninTextChangedSLName = event => {
    this.setState({
      slnameString: event.nativeEvent.text
    });
  };

  _onSigninTextChangedEmail = event => {
    this.setState({
      emailString: event.nativeEvent.text
    });
  };

  _onSigninTextChangedPassword = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  _onSigninTextChangedCheckPassword = event => {
    this.setState({
      checkPasswordString: event.nativeEvent.text
    });
  };

  _onSigninTextChangedPhoneNumber = event => {
    this.setState({
      phoneNumberString: event.nativeEvent.text
    });
  };

  _resetState = () => {
    this.setState({
      fnameString: '',
      flnameString: '',
      slnameString: '',
      emailString: '',
      passwordString: '',
      checkPasswordString: '',
      phoneNumberString: '',
      heightString: '',
      weightString: '',
      isLoading: false
    });
  }

  render() {
    const { navigation } = this.props;

    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;

    return (
      <LinearGradient
        colors={[colors.primary[500], colors.black]}
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
              autoCapitalize={'words'}
              onSubmitEditing={() => this.flnameInput.focus()}
              autoCorrect={false}
              keyboardType={'default'}
              value={this.state.fnameString}
              onChange={this._onSigninTextChangedFName}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              ref={input => (this.fnameInput = input)}
              placeholder={PLACEHOLDERS.FNAME}
              placeholderTextColor={colors.placeholderColor}

            />
            <TextInput
              style={styles.input}
              autoCapitalize={'words'}
              onSubmitEditing={() => this.slnameInput.focus()}
              autoCorrect={false}
              keyboardType={'default'}
              value={this.state.flnameString}
              onChange={this._onSigninTextChangedFLName}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              ref={input => (this.flnameInput = input)}
              placeholder={PLACEHOLDERS.FLNAME}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              autoCapitalize={'words'}
              onSubmitEditing={() => this.phoneNumberInput.focus()}
              autoCorrect={false}
              keyboardType={'default'}
              value={this.state.slnameString}
              onChange={this._onSigninTextChangedSLName}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              ref={input => (this.slnameInput = input)}
              placeholder={PLACEHOLDERS.SLNAME}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              autoCapitalize={'words'}
              onSubmitEditing={() => this.emailInput.focus()}
              autoCorrect={false}
              keyboardType={'phone-pad'}
              value={this.state.phoneNumberString}
              onChange={this._onSigninTextChangedPhoneNumber}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              ref={input => (this.phoneNumberInput = input)}
              placeholder={PLACEHOLDERS.PHONE_NUMBER}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              autoCapitalize={'none'}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType={'email-address'}
              value={this.state.emailString}
              onChange={this._onSigninTextChangedEmail}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              ref={input => (this.emailInput = input)}
              placeholder={PLACEHOLDERS.EMAIL}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              autoCapitalize={'none'}
              onSubmitEditing={() => this.checkPasswordInput.focus()}
              autoCorrect={false}
              keyboardType={'default'}
              value={this.state.passwordString}
              onChange={this._onSigninTextChangedPassword}
              underlineColorAndroid={colors.transparent}
              returnKeyType={VALUES.NEXT}
              ref={input => (this.passwordInput = input)}
              placeholder={PLACEHOLDERS.PASSWORD}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              returnKeyType={VALUES.GO}
              ref={input => (this.checkPasswordInput = input)}
              placeholder={PLACEHOLDERS.CHECK_PASSWORD}
              value={this.state.checkPasswordString}
              onChange={this._onSigninTextChangedCheckPassword}
              underlineColorAndroid={colors.transparent}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onSigninPressed}
            >
              <Text style={styles.buttonText}>{BUTTONS.SIGNIN}</Text>
            </TouchableOpacity>
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
