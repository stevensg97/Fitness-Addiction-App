import React, { Component } from 'react';
import { FlatList, LogBox, Image, Alert, StyleSheet } from 'react-native';
import {
  Text,
  Left,
  Body,
  Container,
  Card,
  CardItem,
  Right,
  Button
} from 'native-base';
import {
  SCREENS,
  ALERTS,
  BUTTONS,
  TITLES,
  AD_TYPES
} from '../../config/constants';
import { ADS } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import moment from "moment";
import 'moment/locale/es.js';

const builder = imageUrlBuilder(client);

class HomeTab extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      loading: false,
      ads: [],
    };
    this.sale = [];
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getAds();
  }

  componentDidUpdate(){
    //this._getAds(); Genera demasiados request
  }

  _getAds = () => {
    client
      .fetch(
        ADS
      )
      .then(res => {
        this.setState({ ads: res });
        this.arrayholder = this.state.ads;
        //console.log(this.arrayholder);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        Alert.alert(
          SCREENS.HOME,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <FlatList
          data={this.state.ads}
          renderItem={({ item }) => (
            <Card>
              <CardItem cardBody>
                <Image source={{ uri: builder.image(item.image).url() }} style={styles.image} />
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.description}</Text>
                  </Body>
                </Left>
                {item.type == AD_TYPES.EVENT &&
                  <Right>
                    <Body >
                      <Left>
                        <Text>{TITLES.DATE}: {moment(item.datetime).locale('es').format('D MMM YYYY')}</Text>
                        <Text>{TITLES.TIME}: {moment(item.datetime).locale('es').format('h:mm a')}</Text>
                        <Text>{TITLES.SPACE_AVAILABLE}: {item.people_limit - item.people.length}</Text>
                      </Left>
                    </Body>
                    <Button rounded onPress={() => alert(item.people.length)} ><Text>{TITLES.REGISTER}</Text></Button>
                  </Right>
                }
              </CardItem>
            </Card>
          )}
          keyExtractor={item => item._id}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    width: null
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <HomeTab {...props} navigation={navigation} />;
}
