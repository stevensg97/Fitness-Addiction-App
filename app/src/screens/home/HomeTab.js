import React, { Component } from 'react';
import { LogBox, Alert, StyleSheet } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Divider,
  FlatList,
  Image,
  Center,
  AspectRatio,
  Heading,
  Text,
  Button
} from 'native-base';
import {
  SCREENS,
  ALERTS,
  BUTTONS,
  TITLES,
  AD_TYPES
} from '../../config/constants';
import { ADS } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import moment from "moment";
import 'moment/locale/es.js';
import { colors } from '../../config/styles';

const builder = imageUrlBuilder(client);

class HomeTab extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      loading: false,
      ads: [],
    };
    this.sale = [];
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getAds();
  }

  componentDidUpdate() {
    //this._getAds(); Genera demasiados request
  }

  _getAds = () => {
    client
      .fetch(
        ADS
      )
      .then(res => {
        this.setState({ ads: res });
        this.arrayholder = this.state.ads;
        //console.log(this.arrayholder);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        Alert.alert(
          SCREENS.HOME,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      })
  };

  render() {
    const { navigation } = this.props;
    return (
      <Box>
        <FlatList
          data={this.state.ads}
          renderItem={({ item }) => (
            <Box border={0.5} my={1} borderRadius='md' >
              <VStack divider={<Divider />} bg='white'>
                <Box px={4} pt={4} bg='primary.700'>
                  <Heading size="sm" color='white' pb={3}>{item.name}</Heading>
                </Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: builder.image(item.image).url(),
                    }}
                    alt="Alternate Text"
                  />
                </AspectRatio>
                <Box px={4}>
                  <Text>{item.description}</Text>
                </Box>
                {item.type == AD_TYPES.EVENT &&
                  <Box px={4} pb={1}>
                    <HStack space={20}>
                      <VStack space={0}>
                        <Text color='grey'>{TITLES.DATE}: {moment(item.datetime).locale('es').format('D MMM YYYY')}</Text>
                        <Text color='grey'>{TITLES.TIME}: {moment(item.datetime).locale('es').format('h:mm a')}</Text>
                        <Text color='grey'>{TITLES.SPACE_AVAILABLE}: {item.people_limit - item.people.length}</Text>
                      </VStack>
                      <Center>
                        <Button size='sm' variant='solid' colorScheme='primary'>
                          <Text color='white'>{TITLES.REGISTER}</Text>
                        </Button>
                      </Center>
                    </HStack>
                  </Box>
                }
              </VStack>
            </Box>
          )}
          keyExtractor={item => item._id}
        />
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <HomeTab {...props} navigation={navigation} />;
}
