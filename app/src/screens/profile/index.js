import React, { Component } from 'react';
import {
  Box,
  StatusBar,
  HStack,
  VStack,
  Pressable,
  Center,
  Heading,
  Divider,
  Text,
  Icon,
  Body
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { colors } from '../../config/styles';
import { useNavigation } from '@react-navigation/native';
import { ICONS, TITLES } from '../../config/constants';

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    //await this._getUserInformation();
    this.setState({ isReady: true });
  }

  _getUserInformation = () => {
    client
      .fetch(
        USER
      )
      .then(res => {
        this.setState({ user: res[0] });
        //console.log(this.state.user);
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
          <Pressable onPress={() => navigation.goBack()} position="absolute" ml={2} zIndex={1}>
            <Icon size='md' ml={2} color='white' as={<Ionicons name={ICONS.MD_ARROW_BACK} />} />
          </Pressable>
          <Center flex={1} >
            <HStack space={1}>
              <Center>
                <Icon size='sm' color='white' as={<Ionicons name={ICONS.MD_PERSON} />} />
              </Center>
              <Center>
                <Heading size="md" color='white'>{TITLES.PROFILE}</Heading>
              </Center>
            </HStack>
          </Center>
        </HStack>
        <Divider />
        <Box flex={1}>
          <VStack space={5} divider={<Divider />}>
            <Box my={1} pt={5} >
              <VStack ml={5} space={4} >
                <Heading size='md'>{TITLES.PHONE_NUMBER}</Heading>
                <Pressable onPress={() => { }}>
                  <HStack space={1}>
                    <Icon size='sm' color='primary.700' as={<Ionicons name={ICONS.MD_CALL} />} />
                    <Text>{}</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
            <Box >
              <VStack ml={5} space={4}>
                <Heading size='md'>{TITLES.EMAIL}</Heading>
                <Pressable onPress={() => {}}>
                  <HStack space={1}>
                    <Icon size='sm' color='primary.700' as={<Ionicons name={ICONS.MD_MAIL} />} />
                    <Text>{}</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
            <Box>
              <VStack ml={5} space={4}>
                <Heading size='md'>{TITLES.LOCATION}</Heading>
                <Pressable onPress={() => { }}>
                  <HStack space={1}>
                    <Icon size='sm' color='primary.700' as={<Ionicons name={ICONS.MD_PIN} />} />
                    <Text>{
                       }</Text>
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
                      <Pressable onPress={() => { }}>
                        <Icon size='2xl' color='primary.700' as={<Ionicons name={ICONS.LOGO_FACEBOOK} />} />
                      </Pressable>
                      <Pressable onPress={() => {}}>
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

  return <ProfileScreen {...props} navigation={navigation} />;
}
