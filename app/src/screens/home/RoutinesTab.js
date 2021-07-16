import React, { Component } from 'react';
import { LogBox, Image, Alert } from 'react-native';
import {
  Text,
  Heading,
  AspectRatio,
  FlatList,
  VStack,
  HStack,
  Box,
  Center,
  Modal,
  Pressable
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
    LogBox.ignoreLogs(['NativeBase:']);
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

  componentDidUpdate() {
    //this._getRoutines();
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
      <Box>
        {/*================= Routines List =================*/}
        <FlatList
          data={this.state.routines}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => { this._setRoutinesModalVisible(true); this._setRoutinesModalExercises(index, item.name) }} >
              <Box border={0.5} my={1} borderRadius='md' >
                <Box px={4} pt={4} bg='primary.700'>
                  <Center pb={1}>
                    <Heading size="sm" color='white'>{item.name}</Heading>
                    <Text color='grey'>{item.type}</Text>
                  </Center>
                </Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: builder.image(item.image).url(),
                    }}
                    alt="Alternate Text"
                  />
                </AspectRatio>
              </Box>
            </Pressable>

          )}
          keyExtractor={item => item._id}
        />

        {/*================= Routine Modal =================*/}
        <Modal size='full' isOpen={this.state.routinesModalVisible} onClose={() => this.setState({ routinesModalVisible: false })}>
          <Modal.Content >
            <Modal.CloseButton />
            <Modal.Header><Heading size='md' >{this.state.routineName}</Heading></Modal.Header>
            <Modal.Body>
              {this.state.exercises.map((item, index) => {
                return (
                  <Box key={index} border={0.5} my={1} borderRadius='md'>
                    <Pressable onPress={() => alert(item.exercise.name)} bg='white'>
                      <Box px={4} pt={4} bg='primary.700'>
                        <Center pb={3}>
                          <Heading size="sm" color='white'>{item.exercise.name} {item.superset && TITLES.SUPERSET}</Heading>
                        </Center>
                      </Box>
                      <Box px={4} pt={4}>
                        <AspectRatio w='100%' ratio={16 / 9}>
                          <Image
                            source={{
                              uri: builder.image(item.exercise.image).url(),
                            }}
                            alt={item.exercise.name}
                          />
                        </AspectRatio>
                      </Box>
                      <Box pt={2} pb={2} >
                        <Center>
                          <Text color='grey'>{TITLES.SETS}: {item.sets} | {TITLES.REPETITIONS}: {item.repetitions} | {TITLES.REST}: {item.rest.quantity}{item.rest.unit} | {TITLES.CADENCY}: {item.cadency}</Text>
                        </Center>
                      </Box>
                    </Pressable>
                  </Box>
                );
              })}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <RoutinesTab {...props} navigation={navigation} />;
}
