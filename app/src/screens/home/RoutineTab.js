import React, { Component } from 'react';
import AppLoading from 'expo-app-loading';
import { FlatList, LogBox, Image, View } from 'react-native';
import getTheme from '../../../native-base-theme/components';
import {
  StyleProvider,
  Accordion,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Container,
  Button,
  Item,
  Input,
  Fab,
  Card,
  CardItem,
  CardBody,
  Thumbnail,
  ListItem,
  Picker,
  Footer,
  FooterTab
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import commonColor from '../../../native-base-theme/variables/commonColor';
import { colors } from '../../config/styles';
import {
  SCREENS,
  ALERTS,
  PLACEHOLDERS,
  BUTTONS,
  TITLES,
  VALUES,
  ICONS,
} from '../../config/constants';
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

class RoutineTab extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      active: false,
      loading: false,
      menu: false,
      visibleScanner: false,
      visibleOrder: false,
      routines: [],
      error: null
    };
    this.sale = [];
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getRoutines();
  }

  _getRoutines = () => {
    client
      .fetch(
        `*[_type == 'routine']{
          _id, name, type, image, exercises[]{sets, repetitions, rest, exercise->{name, image, muscle->{name}}}
        }`
      )
      .then(res => {
        this.setState({ routines: res });
        this.arrayholder = this.state.routines;
        console.log(this.arrayholder);
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
          data={this.state.routines}
          renderItem={({ item }) => (
            <Card>
              <CardItem cardBody button onPress={() => alert(item.exercises[0].exercise.name)}>
                <Image source={{ uri: builder.image(item.image).url(), }} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.type}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          )}
          keyExtractor={item => item._id}
        />
      </Container>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <RoutineTab {...props} navigation={navigation} />;
}
