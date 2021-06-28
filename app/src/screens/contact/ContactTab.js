import React, { Component } from 'react';
import { FlatList, LogBox, Image, Alert, StyleSheet, Linking } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  Text,
  Left,
  Right,
  Body,
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Icon,
  H3,
  Header,
  Title
} from 'native-base';
import {
  SCREENS,
  ALERTS,
  BUTTONS,
  ICONS,
  TITLES
} from '../../config/constants';
import {
  colors
} from '../../config/styles';
import { INFORMATION } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import { color } from 'react-native-reanimated';

const builder = imageUrlBuilder(client);

class ContactTab extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      isReady: false,
      information: {
        phone_number: '',
        email: '',
        location: '',
        social_networks: {
          facebook: '',
          instagram: ''
        }
      },
    };
  }

  async componentDidMount() {
    await this._getInformation();
    this.setState({ isReady: true });
  }

  _getInformation = () => {
    client
      .fetch(
        INFORMATION
      )
      .then(res => {
        this.setState({ information: res[0] });
        //console.log(this.state.information);
      })
      .catch(err => {
        this.setState({ isReady: false, });
        Alert.alert(
          SCREENS.CONTACT,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  render() {
    const { navigation } = this.props;
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <H3>{TITLES.PHONE_NUMBER}</H3>
            </CardItem>
            <CardItem button onPress={() => { Linking.openURL('tel:' + this.state.information.phone_number) }}>
              <Icon large name={ICONS.MD_CALL} style={styles.icon} />
              <Text>{this.state.information.phone_number}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <H3>{TITLES.EMAIL}</H3>
            </CardItem>
            <CardItem button onPress={() => { Linking.openURL('mailto:' + this.state.information.email) }}>
              <Icon large name={ICONS.MD_MAIL} style={styles.icon} />
              <Text>{this.state.information.email}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <H3>{TITLES.LOCATION}</H3>
            </CardItem>
            <CardItem button onPress={() => { Linking.openURL(this.state.information.location) }}>
              <Icon large name={ICONS.MD_PIN} style={styles.icon} />
              <Text>{this.state.information.location}</Text>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem style={styles.cardItem}>
              <H3>{TITLES.SOCIAL_NETWORKS}</H3>
            </CardItem>
            <CardItem style={styles.cardItem}>
                <Button transparent onPress={() => { Linking.openURL(this.state.information.social_networks.facebook) }}>
                  <Icon large name={ICONS.LOGO_FACEBOOK} style={styles.iconSocialNetwork}/>
                </Button>
                <Button transparent onPress={() => { Linking.openURL(this.state.information.social_networks.instagram) }}>
                  <Icon large name={ICONS.LOGO_INSTAGRAM} style={styles.iconSocialNetwork}/>
                </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    color: colors.color_primary_500,
  },
  iconSocialNetwork: {
    color: colors.color_primary_500,
    fontSize: 50
  }
});

export default function (props) {
  const navigation = useNavigation();

  return <ContactTab {...props} navigation={navigation} />;
}
