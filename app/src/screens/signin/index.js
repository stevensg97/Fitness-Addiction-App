import React, { Component } from 'react';
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
import client from '../../utils/client';
import moment from 'moment';
import 'moment/locale/es.js';
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
      alert: {
        show: false,
        title: '',
        message: '',
        type: ''
      },
      isLoading: false
    };
  }

  _checkTextInputs = () => {
    //Check for the Firstname TextInput
    if (!this.state.fnameString.trim()) {
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMPTY_NAME, type: TYPE_ALERT.ERROR } });
      return;
    }
    //Check for the First Lastname TextInput
    if (!this.state.flnameString.trim()) {
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMPTY_FLNAME, type: TYPE_ALERT.ERROR } });
      return;
    }
    if (!this.state.slnameString.trim()) {
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMPTY_SLNAME, type: TYPE_ALERT.ERROR } });
      return;
    }
    if (!this.state.emailString.trim() || !this.state.emailString.includes('@')) { // Revisar bien esta validación
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMPTY_EMAIL, type: TYPE_ALERT.ERROR } });
      return;
    }
    if (!this.state.passwordString.trim()) {
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMPTY_PASSWORD, type: TYPE_ALERT.ERROR } });
      return;
    }
    if (!this.state.checkPasswordString.trim()) {
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMPTY_CHECK_PASSWORD, type: TYPE_ALERT.ERROR } });
      return;
    }
    if (this.state.passwordString != this.state.checkPasswordString) {
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.PASSWORD_DOES_NOT_MATCH, type: TYPE_ALERT.ERROR } });
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
        admin: false,
        subscription: {
          active: false,
          plan: {
            _ref: '1c452ebc-d7e6-4348-b713-a97a4856f667',
            _type: 'reference'
          },
          starting_date: moment(new Date()).format('YYYY-MM-DD').toString(),
          ending_date: moment(new Date()).format('YYYY-MM-DD').toString()
        },
        measures: {
          bmi: 0,
          body_fat_percentage: 0,
          bone_percentage: 0,
          height: 0,
          muscle_percentage: 0,
          weight: 0,
        }

      }
      client
        .createIfNotExists(doc)
        .then((res) => {
          console.log('User was created document ID is ' + res._id)
          this.setState({ isLoading: false, alert: { show: true, title: ALERT_TITLES.SUCCESS, message: ALERTS.USER_CREATED_SUCCESSFULLY, type: TYPE_ALERT.SUCCESS } });
        })
        .then(() => client.createIfNotExists({ _id: doc._id + '-history', _type: 'history' }))
        .then(() => { this._resetState(); this.props.navigation.navigate(SCREENS.LOGIN); })
        .catch((err) => {
          console.error('Hubo un error al crear el usuario: ', err.message);
          this.setState({ isLoading: false, alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.EMAIL_ALREADY_EXIST, type: TYPE_ALERT.ERROR } });
        })
    }
    this.setState({ isLoading: false });
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
      <Spinner size='large' color='white' />
    ) : null;

    const alert = this.state.alert.show ? (
      <Alert
        status={this.state.alert.type}
        action={
          <IconButton
            icon={<CloseIcon size="xs" />}
            onPress={() => this.setState({ alert: { show: false, title: '', message: '', type: '' } })}
          />
        }
        actionProps={{
          alignSelf: "center",
        }}
      >
        <Alert.Icon />
        <Alert.Title>{this.state.alert.title}</Alert.Title>
        <Alert.Description>{this.state.alert.message}</Alert.Description>
      </Alert>
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
