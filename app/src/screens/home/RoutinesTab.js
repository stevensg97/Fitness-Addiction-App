import React, { Component } from 'react';
import { FlatList, LogBox, Image, Alert, StyleSheet, Modal, Pressable } from 'react-native';
import {
  Text,
  Left,
  Body,
  Container,
  Card,
  CardItem,
  Header,
  Title
} from 'native-base';
import {
  SCREENS,
  ALERTS,
  BUTTONS,
  TITLES
} from '../../config/constants';
import {
  colors
} from '../../config/styles';
import { ROUTINES } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

class RoutinesTab extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      loading: false,
      routines: [],
      exercises: [],
      routineName: '',
      routinesModalVisible: false
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
        ROUTINES
      )
      .then(res => {
        this.setState({ routines: res });
        this.arrayholder = this.state.routines;
        //console.log(this.arrayholder);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        Alert.alert(
          SCREENS.ROUTINES,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  _setRoutinesModalVisible(visible) {
    this.setState({ routinesModalVisible: visible })
  }

  _setRoutinesModalExercises(numberRoutine, routineName) {
    this.setState({ exercises: this.state.routines[numberRoutine].exercises, routineName: routineName })
  }

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        {/*================= Routines List =================*/}
        <FlatList
          data={this.state.routines}
          renderItem={({ item, index }) => (
            <Card>
              <CardItem cardBody button onPress={() => { this._setRoutinesModalVisible(true); this._setRoutinesModalExercises(index, item.name) }}>
                <Image source={{ uri: builder.image(item.image).url(), }} style={styles.image} />
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

        {/*================= Routine Modal =================*/}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.routinesModalVisible}
          onRequestClose={() => {
            Alert.alert(ALERTS.ROUTINE_MODAL_CLOSED);
            this._setRoutinesModalVisible(!this.state.routinesModalVisible);
          }}
        >
          <Container>
            <Header>
              <Title>{this.state.routineName}</Title>
            </Header>
            <FlatList
              data={this.state.exercises}
              renderItem={({ item }) => (
                <Card>
                  <CardItem cardBody button onPress={() => alert(item.exercise.name)}>
                    <Image source={{ uri: builder.image(item.exercise.image).url(), }} style={styles.imageModal} />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{item.exercise.name}</Text>
                        <Text>{TITLES.SETS}: {item.sets} | {TITLES.REPETITIONS}: {item.repetitions} | {TITLES.REST}: {item.rest.quantity}{item.rest.unit} | {TITLES.CADENCY}: {item.cadency}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item.exercise._id}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={(props) => this._setRoutinesModalVisible(!this.state.routinesModalVisible)}
            >
              <Text style={styles.textStyle}>{BUTTONS.CLOSE}</Text>
            </Pressable>
          </Container>
        </Modal>
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
  imageModal: {
    height: 250,
    width: null,
    flex: 1
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 15,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: colors.color_primary_500,
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <RoutinesTab {...props} navigation={navigation} />;
}
