import React, { Component } from 'react';
import { LogBox, Alert, Platform } from 'react-native';
import {
  Box,
  StatusBar,
  HStack,
  VStack,
  Icon,
  Heading,
  Divider,
  Center,
  Spinner,
  Image,
  Input,
  Modal,
  FlatList,
  Text,
  Pressable,
  Select,
  CheckIcon,
  Button

} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { USERS, PLANS } from '../../utils/querys'
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import moment from "moment";
import 'moment/locale/es.js';
import { colors } from '../../config/styles';
import { ICONS, TITLES, SCREENS, ALERTS, BUTTONS } from '../../config/constants';

const builder = imageUrlBuilder(client);

const LISTITEM_HEIGHT = 65;

class PaymentsScreen extends Component {

  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      isReady: false,
      paymentModalVisible: false,
      startingDatepickerVisible: false,
      endingDatepickerVisible: false,
      user: {},
      plan: '',
      startingDate: new Date(),
      endingDate: new Date(),
      users: [],
      plans: [],
      date: ''
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getCurrentDate();
    await this._getUsers();
    await this._getPlans();
  }



  _getUsers = () => {
    client
      .fetch(
        USERS
      )
      .then(res => {
        this.setState({ users: res });
        this.arrayholder = this.state.users;
        this.setState({ isReady: true });
        //console.log(res)
      })
      .catch(err => {
        this.setState({ isReady: false });
        Alert.alert(
          SCREENS.PAYMENTS,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  _getPlans = () => {
    client
      .fetch(
        PLANS
      )
      .then(res => {
        this.setState({ plans: res });
        this.setState({ isReady: true });
        //console.log(res)
      })
      .catch(err => {
        this.setState({ isReady: false });
        Alert.alert(
          SCREENS.PAYMENTS,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  _getCurrentDate = async () => {
    try {
      const response = await fetch(`http://worldtimeapi.org/api/timezone/America/Costa_Rica`);
      const json = await response.json();
      this.setState({ date: json.datetime });
      this.setState({ isReady: true });
    } catch (err) {
      this.setState({ isReady: false });
      Alert.alert(
        SCREENS.PAYMENTS,
        ALERTS.FAILURE,
        [{ text: BUTTONS.OK }],
        { cancelable: false }
      );
    }
  }

  _compareWithCurrentDate = (date) => {
    const d1 = Date.parse(date);
    const d2 = Date.parse(this.state.date);
    return d1 > d2;
  }

  _addDaysToCurrentDate = (days) => {
    let date = new Date(this.state.date);
    date.setDate(date.getDate() + days)
    console.log(date.getDate());
    return date.getDate();
  }

  _onOptionPressed = (user) => {
    this.setState({ user: user, paymentModalVisible: true })
  }


  _searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}
      ${item.flname.toUpperCase()} ${item.slname.toUpperCase()}
      ${item.phone_number.toUpperCase()} ${item.subscription.plan.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ users: newData });
  };

  _renderItem = ({ item }) => (

    <Pressable _pressed={{ opacity: 0.4 }} pt={3} onPress={() => { this._onOptionPressed(item) }}>
      <VStack space={2} px={4} >
        <HStack space={2}>
          <Heading size="md" flex={1}>{item.name} {item.flname} {item.slname}</Heading>
          {
            this._compareWithCurrentDate(item.subscription.ending_date)
              ?
              <Heading fontSize='sm' mt={1.5} color='success.500' alignItems='flex-start'>Al día</Heading>
              :
              <Heading fontSize='sm' mt={1.5} color='primary.500' >Pendiente</Heading>
          }
        </HStack>
        <HStack space={2}>
          <Heading fontSize='sm'>Plan:</Heading>
          <Heading fontSize='sm' color='grey'>{item.subscription.plan.name}</Heading>
        </HStack>
        <HStack space={2}>
          <Heading fontSize='sm'>Fecha de inicio:</Heading>
          <Heading fontSize='sm' color='grey'>{moment(item.subscriptionD).locale('es').format('D MMM YYYY')}</Heading>
        </HStack>
        <HStack space={2}>
          <Heading fontSize='sm'>Fecha de vencimiento:</Heading>
          <Heading fontSize='sm' color='grey'>{moment(item.subscription.ending_date).locale('es').format('D MMM YYYY')}</Heading>
        </HStack>
      </VStack>
      <Divider mt={3} />
    </Pressable>
  )


  _keyExtractor = ((item) => item._id)

  render() {
    const { navigation } = this.props;
    return (
      <Box flex={1}>
        <StatusBar backgroundColor={colors.primary[600]} barStyle="light-content" />
        <HStack alignItems="center" py={4} bg='primary.500'>
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigation.goBack()} position="absolute" ml={2} zIndex={1}>
            <Icon size='md' ml={2} color='white' as={<Ionicons name={ICONS.MD_ARROW_BACK} />} />
          </Pressable>
          <Center flex={1} >
            <Heading size="md" color='white'>{TITLES.PAYMENTS}</Heading>
          </Center>
        </HStack>
        <Divider />
        <Input
          color='coolgray'
          borderRadius="md"
          fontSize='sm'
          shadow={1}
          onChangeText={text => { this._searchFilterFunction(text); this.setState({ update: true }) }}
          InputLeftElement={
            <Icon
              as={<Ionicons name="md-search" />}
              size="md"
              m={2}
              color='primary.500'
            />
          }
          placeholder="Buscar usuario"
        />
        {!this.state.isReady
          ? <Box flex={1} justifyContent='center'>
            <Spinner color='primary.500' size='lg' />
          </Box>
          :
          <FlatList
            data={this.state.users}
            extraData={this.arrayholder}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        }


        {/*================= Payment Modal =================*/}
        {this.state.user !== {} &&
          <Modal size='full' isOpen={this.state.paymentModalVisible} onClose={() => this.setState({ paymentModalVisible: false })}>
            <Modal.Content >
              <Modal.CloseButton />
              <Modal.Header>
                <Heading size='md' >{this.state.user.name + ' ' + this.state.user.flname + ' ' + this.state.user.slname}</Heading>
              </Modal.Header>
              <Modal.Body >
                <Box>
                  <Select selectedValue={this.state.plan} minWidth="200" accessibilityLabel="Plan" placeholder="Plan" _selectedItem={{
                    bg: "primary.100",
                    endIcon: <CheckIcon size="5" />
                  }} mt={1} onValueChange={itemValue => { this.setState({ plan: itemValue }), this._addDaysToCurrentDate(this.state.plan.days) }}>
                    {this.state.plans.map((item, index) => {
                      return (
                        <Select.Item key={index} label={item.name + ' | ' + 'Precio: ₡' + item.price} value={item._id} />
                      );
                    })}
                  </Select>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Fecha inicial:</Heading>


                  </HStack>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Fecha de vencimiento:</Heading>
                  </HStack>
                </Box>
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

  return <PaymentsScreen {...props} navigation={navigation} />;
}
