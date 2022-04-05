import React, { Component } from 'react';
import { LogBox, Alert } from 'react-native';
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
  Pressable

} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { USERS } from '../../utils/querys'
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import { colors } from '../../config/styles';
import { ICONS, TITLES } from '../../config/constants';

const builder = imageUrlBuilder(client);

const LISTITEM_HEIGHT = 65;

class PaymentsScreen extends Component {

  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      isReady: false,
      paymentModalVisible: false,
      userName: '',
      users: []
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getUsers();
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
        console.log(res)
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

  _onOptionPressed = (userName) => {
    this.setState({ userName: userName, paymentModalVisible: true })
  }

  _searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}
      ${item.flname.toUpperCase()} ${item.subscription.plan.name.toUpperCase()}
      ${item.phone_number.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ users: newData });
  };

  _renderItem = ({ item }) => (

    <Pressable _pressed={{ opacity: 0.4 }} pt={3}  onPress={() => { this._onOptionPressed(item.name) }}>
      <VStack space={2} px={4} >
        <HStack space={2}>
          <Heading size="sm" flex={1}>{item.name} {item.flname} {item.slname}</Heading>
          {
            item.subscription.active ?
              <Heading fontSize='sm' color='success.500' alignItems='flex-start'>Activo</Heading>
              :
              <Heading fontSize='sm' color='primary.500' >Inactivo</Heading>
          }
        </HStack>
        <HStack space={2}>
          <Heading fontSize='sm'>Plan:</Heading>
          <Text fontSize='sm' color='grey'>{item.subscription.plan.name}</Text>
        </HStack>
        <HStack space={2}>
          <Heading fontSize='sm'>Fecha de inicio:</Heading>
          <Text fontSize='sm' color='grey'>{item.subscription.starting_date}</Text>
        </HStack>
        <HStack space={2}>
          <Heading fontSize='sm'>Fecha de vencimiento:</Heading>
          <Text fontSize='sm' color='grey'>{item.subscription.ending_date}</Text>
        </HStack>
      </VStack>
      <Divider />
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
          placeholder="Buscar cliente"
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
        {this.state.users !== [] &&
          <Modal size='full' isOpen={this.state.paymentModalVisible} onClose={() => this.setState({ paymentModalVisible: false })}>
            <Modal.Content >
              <Modal.CloseButton />
              <Modal.Header><Heading size='md' >{this.state.userName}</Heading></Modal.Header>
              <Modal.Body >

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
