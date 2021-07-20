import React, { Component, useCallback } from 'react';
import { LogBox, Alert, StyleSheet, Pressable } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Divider,
  FlatList,
  Avatar,
  Center,
  Heading,
  Text,
  Button,
  Input,
  Icon,
  Spinner,
  Modal
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import {
  SCREENS,
  ALERTS,
  BUTTONS,
  TITLES,
  AD_TYPES
} from '../../config/constants';
import { WEIGHTS, EXERCISES } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import moment from "moment";
import 'moment/locale/es.js';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { colors } from '../../config/styles';
import { color } from 'styled-system';

const builder = imageUrlBuilder(client);
const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const LISTITEM_HEIGHT = 65;

class StatsTab extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      isReady: false,
      update: true,
      historyModalVisible: false,
      exerciseName: '',
      history: [13, 15, 16],
      exercises: [],
      weights: []
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getExercises();
    await this._getWeights();
  }

  /* shouldComponentUpdate(){
    if (this.props.index == 0) {
      return false
    }
    return true
  } */

  _getExercises = () => {
    client
      .fetch(
        EXERCISES
      )
      .then(res => {
        this.setState({ exercises: res });
        this.arrayholder = this.state.exercises;
        //console.log(this.arrayholder);
        this.setState({ isReady: true });
      })
      .catch(err => {
        this.setState({ isReady: false });
        Alert.alert(
          SCREENS.HOME,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  _getWeights = () => {
    client
      .fetch(
        WEIGHTS('maiderr97@gmail.com')
      )
      .then(res => {
        this.setState({ weights: res[0] });
        //console.log(this.state.weights.weights.weights);
      })
      .catch(err => {
        this.setState({ isReady: false });
        Alert.alert(
          SCREENS.HOME,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  _searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}
      ${item.muscle.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ exercises: newData });
  };

  _renderItem = ({ item }) => (

    <Pressable _pressed={{ opacity: 0.4 }} height={55} onPress={() => { this.setState({ exerciseName: item.name, historyModalVisible: true }) }}>
      <VStack space={2} px={4} divi>
        <Heading size="sm" >{item.name}</Heading>
        <Text fontSize='sm' color='grey'>{item.muscle.name}</Text>
      </VStack>
      <Divider/>
    </Pressable>
  )


  _keyExtractor = ((item) => item._id)

  _getItemLayout = (data, index) => ({
    length: LISTITEM_HEIGHT,
    offset: LISTITEM_HEIGHT * index,
    index
  })

  render() {
    const { navigation } = this.props;
    return (
      <Box flex={1}>
        <Input
          color='coolgray'
          onChangeText={text => { this._searchFilterFunction(text); this.setState({ update: true }) }}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-search" />}
              size="md"
              m={2}
              color='primary.500'
            />
          }
          placeholder="Buscar ejercicio" //
        />
        {!this.state.isReady
          ? <Box flex={1} justifyContent='center'>

            <Spinner color='primary.500' size='lg' />
          </Box>
          :
          <FlatList
            data={this.state.exercises}
            extraData={this.arrayholder}
            removeClippedSubviews={true}
            onEndReachedThreshold={0}
            onEndReached={() => alert('hloi')}
            initialNumToRender={11}
            renderItem={this._renderItem}
            getItemLayout={this._getItemLayout}
            keyExtractor={this._keyExtractor}
          />
        }


        {/*================= History Modal =================*/}
        <Modal size='full' isOpen={this.state.historyModalVisible} onClose={() => this.setState({ historyModalVisible: false })}>
          <Modal.Content >
            <Modal.CloseButton />
            <Modal.Header><Heading size='md' >{this.state.exerciseName}</Heading></Modal.Header>
            <Modal.Body>
              <AreaChart
                style={{ height: 200 }}
                data={this.state.history}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: colors.primary_transparent[600] }}
              >
                <Grid />
              </AreaChart>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();


  return <StatsTab {...props} navigation={navigation} />;
}
