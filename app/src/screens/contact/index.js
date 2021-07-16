import React, { Component } from 'react';
import { LogBox, Linking } from 'react-native';
import {
  Box,
  StatusBar,
  Heading,
  HStack,
  VStack,
  Pressable,
  Center,
  Divider,
  Icon,
  Text,
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { colors } from '../../config/styles';
import { useNavigation } from '@react-navigation/native';
import { ICONS, SCREENS, TITLES } from '../../config/constants';
import client from '../../utils/client';
import { INFORMATION } from '../../utils/querys'

class ContactScreen extends Component {
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

    return (
      <Box flex={1}>
        <StatusBar backgroundColor={colors.color_primary_600} barStyle="light-content" />
        <HStack alignItems="center" py={4} bg='primary.500'>
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigation.goBack()} position="absolute" ml={2} zIndex={1}>
            <Icon size='md' ml={2} color='white' as={<Ionicons name={ICONS.MD_ARROW_BACK} />} />
          </Pressable>
          <Center flex={1} >
            <Heading size="md" color='white'>{TITLES.CONTACT}</Heading>
          </Center>
        </HStack>
        <Divider />
        <Box flex={1}>
          <VStack space={5} divider={<Divider />}>
            <Box my={1} pt={5} >
              <VStack ml={5} space={4} >
                <Heading size='md'>{TITLES.PHONE_NUMBER}</Heading>
                <Pressable _pressed={{ opacity: 0.5 }} onPress={() => { Linking.openURL('tel:' + this.state.information.phone_number) }}>
                  <HStack space={1}>
                    <Icon size='sm' color='primary.700' as={<Ionicons name={ICONS.MD_CALL} />} />
                    <Text>{this.state.information.phone_number}</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
            <Box >
              <VStack ml={5} space={4}>
                <Heading size='md'>{TITLES.EMAIL}</Heading>
                <Pressable _pressed={{ opacity: 0.5 }} onPress={() => { Linking.openURL('mailto:' + this.state.information.email) }}>
                  <HStack space={1}>
                    <Icon size='sm' color='primary.700' as={<Ionicons name={ICONS.MD_MAIL} />} />
                    <Text>{this.state.information.email}</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
            <Box>
              <VStack ml={5} space={4}>
                <Heading size='md'>{TITLES.LOCATION}</Heading>
                <Pressable _pressed={{ opacity: 0.5 }} onPress={() => { Linking.openURL(this.state.information.location) }}>
                  <HStack space={1}>
                    <Icon size='sm' color='primary.700' as={<Ionicons name={ICONS.MD_PIN} />} />
                    <Text>{this.state.information.location}</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
            <Box>
              <VStack ml={5} space={4}>
                <Heading size='md'>{TITLES.SOCIAL_NETWORKS}</Heading>
                <Center>
                  <Pressable>
                    <HStack space={4}>
                      <Pressable _pressed={{ opacity: 0.5 }} onPress={() => { Linking.openURL(this.state.information.social_networks.facebook) }}>
                        <Icon size='2xl' color='primary.700' as={<Ionicons name={ICONS.LOGO_FACEBOOK} />} />
                      </Pressable>
                      <Divider orientation='vertical'/>
                      <Pressable _pressed={{ opacity: 0.5 }} onPress={() => { Linking.openURL(this.state.information.social_networks.instagram) }}>
                        <Icon size='2xl' color='primary.700' as={<Ionicons name={ICONS.LOGO_INSTAGRAM} />} />
                      </Pressable>
                    </HStack>
                  </Pressable>
                </Center>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <ContactScreen {...props} navigation={navigation} />;
}
