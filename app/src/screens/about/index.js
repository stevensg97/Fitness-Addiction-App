import React, { Component } from 'react';
import { Linking } from 'react-native';
import {
  Box,
  StatusBar,
  HStack,
  Pressable,
  Icon,
  Center,
  Heading,
  Divider,
  Image,
  Text,
  Button,
  VStack
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { colors } from '../../config/styles';
import { useNavigation } from '@react-navigation/native';
import { ICONS, TITLES } from '../../config/constants';
import IconLogo from '../../assets/logo.png';
import IconPrelabs from '../../assets/PreLabs.png';

class AboutScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    this.setState({ isReady: true });
  }

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
            <Heading size="md" color='white'>{TITLES.ABOUT}</Heading>
          </Center>
        </HStack>
        <Divider />
        <VStack flex={1} >
          <Divider size={3} />
          <Center>
            <Text bold fontSize='2xl'>Fitness Addiction App</Text>
            <Image
              source={IconLogo}
              alt='Logo'
              height={150}
              width={150}
            />
            <Text bold fontSize='xl'>Versión</Text>
            <Text bold fontSize='lg'>1.0.1</Text>
          </Center>
          <Divider size={3} />
          <Center>
            <Text bold fontSize='2xl' >Desarrollado por</Text>
            <Image
              source={IconPrelabs}
              alt='Logo'
              height={150}
              width={150}
            />
            <Divider size={3} />
            <Button colorScheme="info" w='100%' onPress={() => { Linking.openURL('tel:' + '84352627') }}>Contáctanos</Button>
            <Divider size={3} />
          </Center>

        </VStack>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <AboutScreen {...props} navigation={navigation} />;
}
