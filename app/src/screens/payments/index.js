import React, { Component } from 'react';
import {
  Box,
  StatusBar,
  HStack,
  Pressable,
  Icon,
  Heading,
  Divider,
  Center,
  Spinner,
  Image,

} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SCHEDULE } from '../../utils/querys'
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import { colors } from '../../config/styles';
import { ICONS, TITLES } from '../../config/constants';

const builder = imageUrlBuilder(client);

class PaymentsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await this._getSchedule();
  }



  _getSchedule = () => {
    client
      .fetch(
        SCHEDULE
      )
      .then(res => {
        this.setState({ schedule: res[0] });
        this.setState({ isReady: true });
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
      <Box flex={1} >
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
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <PaymentsScreen {...props} navigation={navigation} />;
}
