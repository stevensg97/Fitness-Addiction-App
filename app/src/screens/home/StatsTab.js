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
import { EXERCISES, HISTORY } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import moment from "moment";
import 'moment/locale/es.js';
import { AreaChart, BarChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { colors } from '../../config/styles';
import { color } from 'styled-system';

const builder = imageUrlBuilder(client);

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
      exercises: [],
      history: [],
    };
    this.arrayholder = [];
    this.weights = []
    this.dates = []
    this.keys = ['weight', 'date']
  }

  async componentDidMount() {
    await this._getExercises();
    await this._getHistory();
  }

  shouldComponentUpdate() {
    if (this.props.index == 0) {
      return false
    }
    return true
  }

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

  _getHistory = () => {
    client
      .fetch(
        HISTORY('maiderr97-gmail.com-history')
      )
      .then(res => {
        this.setState({ history: res[0] });
        //this.state.history.weights.map((item) => console.log(item.exercise))
        //console.log(this.state.history)

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

  _onOptionPressed = (exerciseName) => {
    this.weights = []
    this.dates = []
    this.state.history.weights.map((item) => {
      if (item.exercise === exerciseName) {
        item.history.map((n) => {
          this.weights.push(n.weight)
          this.dates.push(n.date)
        });

      }
    })
    this.setState({ exerciseName: exerciseName, historyModalVisible: true })
  }

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

    <Pressable _pressed={{ opacity: 0.4 }} height={55} onPress={() => { this._onOptionPressed(item.name) }}>
      <VStack space={2} px={4} divi>
        <Heading size="sm" >{item.name}</Heading>
        <Text fontSize='sm' color='grey'>{item.muscle.name}</Text>
      </VStack>
      <Divider />
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
            initialNumToRender={11}
            renderItem={this._renderItem}
            getItemLayout={this._getItemLayout}
            keyExtractor={this._keyExtractor}
          />
        }


        {/*================= History Modal =================*/}
        {this.state.history !== [] &&
          <Modal size='full' isOpen={this.state.historyModalVisible} onClose={() => this.setState({ historyModalVisible: false })}>
            <Modal.Content >
              <Modal.CloseButton />
              <Modal.Header><Heading size='md' >{this.state.exerciseName}</Heading></Modal.Header>
              <Modal.Body >
                <YAxis
                  data={this.weights}
                  style={{ height: 200, position: 'absolute' }}
                  contentInset={{ top: 30, bottom: 30 }}
                  svg={{
                    fill: 'grey',
                    fontSize: 10,
                  }}
                  formatLabel={(value) => `${value}lbs`}
                />
                <BarChart
                  style={{ height: 200, marginLeft: 30 }}
                  data={this.weights}
                  key='weight'
                  contentInset={{ top: 30, bottom: 30 }}
                  curve={shape.curveNatural}
                  svg={{ fill: colors.primary_transparent[600] }}
                >
                  <Grid />
                </BarChart>

                <XAxis
                  style={{ marginHorizontal: -10, marginLeft: 30, flex: 0.1 }}
                  data={this.dates}
                  formatLabel={(index) => this.dates[index]}
                  contentInset={{ left: 30, right: 30 }}
                  svg={{ fontSize: 10, fill: 'black' }}
                />
              </Modal.Body>
            </Modal.Content>
          </Modal>
        }

      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();


  return <StatsTab {...props} navigation={navigation} />;
}
