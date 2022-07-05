import React, { Component } from 'react';
import { LogBox } from 'react-native';
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
  Button,
  Alert,
  Collapse,
  IconButton,
  CloseIcon

} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { USERS, PLANS } from '../../utils/querys'
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import 'moment/locale/es.js';
import { colors } from '../../config/styles';
import { ICONS, TITLES, SCREENS, ALERTS, BUTTONS, ALERT_TITLES, TYPE_ALERT } from '../../config/constants';

const builder = imageUrlBuilder(client);

class PaymentsScreen extends Component {

  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      isLoading: false,
      isReady: false,
      paymentModalVisible: false,
      startingDatepickerVisible: false,
      endingDatepickerVisible: false,
      user: {},
      plan: null,
      startingDate: new Date(),
      endingDate: '',
      users: [],
      plans: [],
      date: '',
      alert: {
        show: false,
        title: '',
        message: '',
        type: ''
      },
    };
    this.arrayholder = [];
    this.planIndex = 0;
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
        this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.ERROR_GETTING_PLANS, type: TYPE_ALERT.ERROR } });
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
      this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.ERROR_GETTING_DATE, type: TYPE_ALERT.ERROR } });
    }
  }

  _compareWithCurrentDate = (date) => {
    const d1 = Date.parse(date);
    const d2 = Date.parse(this.state.date);
    return d1 > d2;
  }

  _addDaysToDate = (date, days) => {
    let firstDate = new Date(date);
    firstDate.setDate(firstDate.getDate() + days);
    return firstDate;
  }

  _onOptionPressed = (user) => {
    this.setState({ user: user, paymentModalVisible: true })
  }


  _searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}
      ${item.flname.toUpperCase()} ${item.slname.toUpperCase()}
      ${item.phone_number.toUpperCase()} ${item.email.current.toUpperCase()}
      ${item.subscription.plan.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ users: newData });
  };

  _updateSubscription = (userId, planId, startingDate, endingDate) => {
    client.patch(userId)
      .set({
        subscription: {
          ending_date: endingDate,
          starting_date: startingDate,
          plan: {
            _type: 'reference',
            _ref: planId
          }
        }
      })
      .commit()
      .then((updatedUser) => {
        //console.log('User updated successfully:')
        //console.log(updatedUser)
        this.setState({ alert: { show: true, title: ALERT_TITLES.SUCCESS, message: ALERTS.PLAN_UPDATED_SUCCESSFULLY, type: TYPE_ALERT.SUCCESS } });
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message)
        this.setState({ alert: { show: true, title: ALERT_TITLES.ERROR, message: ALERTS.ERROR_UPDATING_PLAN, type: TYPE_ALERT.ERROR } });
      })
    this._resetPaymentModal();
  }

  _resetPaymentModal = () => {
    this.setState({
      isLoading: false,
      paymentModalVisible: false,
      startingDatepickerVisible: false,
      user: {},
      plan: null,
      startingDate: new Date(),
      endingDate: '',
    });
  }

  render() {
    const { navigation } = this.props;

    const spinner = this.state.isLoading ? (
      <Spinner size='large' color='primary.500' />
    ) : null;

    const alert = this.state.alert.show ? (
      <Center>
        <Alert w="100%" maxW="400" status={this.state.alert.type} colorScheme={this.state.alert.type}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  {this.state.alert.title}
                </Text>
              </HStack>
              <IconButton variant="unstyled" onPress={() => this.setState({ alert: { show: false, title: ALERT_TITLES.ERROR, message: '', type: '' } })} icon={<CloseIcon size="3" color="coolGray.600" />} />
            </HStack>
            <Box pl="6" _text={{
              color: "coolGray.600"
            }}>
              {this.state.alert.message}
            </Box>
          </VStack>
        </Alert>
      </Center>
    ) : null;

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
        <Collapse isOpen={this.state.alert.show} mt={2}>
          {alert}
        </Collapse>
        {!this.state.isReady
          ? <Box flex={1} justifyContent='center'>
            <Spinner color='primary.500' size='lg' />
          </Box>
          :
          <FlatList
            data={this.state.users}
            extraData={this.arrayholder}
            refreshing={false}
            onRefresh={() => {
              this._getCurrentDate();
              this._getUsers();
              this._getPlans();
            }}
            renderItem={({ item, index }) => (
              <Pressable key={item._id} _pressed={{ opacity: 0.4 }} pt={3} onPress={() => { this._onOptionPressed(item) }}>
                <VStack space={2} px={4} >
                  <HStack space={2}>
                    <Heading size="md" flex={1}>{item.name} {item.flname} {item.slname}</Heading>
                    {
                      this._compareWithCurrentDate(item.subscription.ending_date)
                        ?
                        <Heading fontSize='sm' mt={1.5} color='success.500' alignItems='flex-start'>Activo</Heading>
                        :
                        <Heading fontSize='sm' mt={1.5} color='danger.500' >Inactivo</Heading>
                    }
                  </HStack>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Plan:</Heading>
                    <Heading fontSize='sm' color='grey'>{item.subscription.plan.name}</Heading>
                  </HStack>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Fecha de inicio:</Heading>
                    <Heading fontSize='sm' color='grey'>{moment(item.subscription.starting_date).locale('es').format('D MMM YYYY')}</Heading>
                  </HStack>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Fecha de vencimiento:</Heading>
                    <Heading fontSize='sm' color='grey'>{moment(item.subscription.ending_date).locale('es').format('D MMM YYYY')}</Heading>
                  </HStack>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Teléfono:</Heading>
                    <Heading fontSize='sm' color='grey'>{item.phone_number}</Heading>
                  </HStack>
                  <HStack space={2}>
                    <Heading fontSize='sm'>Email:</Heading>
                    <Heading fontSize='sm' color='grey'>{item.email.current}</Heading>
                  </HStack>
                </VStack>
                <Divider mt={3} />
              </Pressable>
            )}
            keyExtractor={item => item._id}
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
                  <VStack space={4}>
                    <Select
                      selectedValue={this.state.plan}
                      minWidth="200"
                      size='md'
                      accessibilityLabel="Plan"
                      placeholder="Plan"
                      _selectedItem={{
                        bg: "primary.100",
                        rightIcon: <CheckIcon size="5" />
                      }}
                      dropdownIcon={
                        <Icon as={Ionicons} mr={1} size='5' color='primary.500' name='chevron-down'/>
                      }
                      mt={1}
                      onValueChange={itemValue => {
                        this.setState({ plan: itemValue, endingDate: '' })
                      }}>
                      {this.state.plans.map((item, index) => {
                        return (
                          <Select.Item label={item.name + ' | ' + 'Precio: ₡' + item.price} value={index} key={item._id} />
                        );
                      })}
                    </Select>
                    <HStack space={2} alignItems='center'>
                      <Heading fontSize='sm' >Fecha de inicio:</Heading>
                      <Heading fontSize='sm' flex={1} color='grey'>{moment(this.state.startingDate).locale('es').format('D MMM YYYY')}</Heading>
                      <Button size='sm' disabled={this.state.plan == null} opacity={this.state.plan == null ? 0.7 : 1} onPress={() => { this.setState({ startingDatepickerVisible: true }) }}>Seleccionar</Button>
                      {this.state.startingDatepickerVisible &&
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={new Date()}
                          mode={'date'}
                          onChange={(date) => { this.setState({ startingDate: date.nativeEvent.timestamp, endingDate: this._addDaysToDate(date.nativeEvent.timestamp, Number(this.state.plans[this.state.plan].days)), startingDatepickerVisible: false }) }}
                        />
                      }
                    </HStack>
                    <HStack space={2}>
                      <Heading fontSize='sm' >Fecha de vencimiento:</Heading>
                      <Heading fontSize='sm' flex={1} color='grey'>{moment(this.state.endingDate).locale('es').format('D MMM YYYY')}</Heading>
                    </HStack>
                    {spinner}
                    <Button disabled={this.state.plan == null || this.state.endingDate == ''} opacity={this.state.plan == null || this.state.endingDate == '' ? 0.7 : 1} size='md' flex={1} onPress={() => { this.setState({ isLoading: true }); this._updateSubscription(this.state.user._id, this.state.plans[this.state.plan]._id, this.state.startingDate, this.state.endingDate) }}>Guardar</Button>
                  </VStack>
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
