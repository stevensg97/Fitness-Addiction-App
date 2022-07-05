import React, { Component } from 'react';
import { LogBox, Alert, StyleSheet, ScrollView } from 'react-native';
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
  StatusBar,
  Pressable,
  Icon
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import {
  SCREENS,
  ALERTS,
  BUTTONS,
  TITLES,
  ICONS
} from '../../config/constants';
import { PRODUCTS } from '../../utils/querys'
import { useNavigation } from '@react-navigation/native';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import moment from "moment";
import 'moment/locale/es.js';
import { colors } from '../../config/styles';

const builder = imageUrlBuilder(client);

class StoreScreen extends Component {
  constructor(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    super(props);
    this.state = {
      loading: false,
      products: [],
    };
    this.sale = [];
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this._getProducts();
  }

  componentDidUpdate() {
    //this._getProducts(); Genera demasiados request
  }

  _getProducts = () => {
    client
      .fetch(
        PRODUCTS
      )
      .then(res => {
        this.setState({ products: res });
        this.arrayholder = this.state.products;
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
      <Box flex={1}>
        <StatusBar backgroundColor={colors.color_primary_600} barStyle="light-content" />
        <HStack alignItems="center" py={4} bg='primary.500'>
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigation.goBack()} position="absolute" ml={2} zIndex={1}>
            <Icon size='md' ml={2} color='white' as={<Ionicons name={ICONS.MD_ARROW_BACK} />} />
          </Pressable>
          <Center flex={1} >
            <Heading size="md" color='white'>{TITLES.STORE}</Heading>
          </Center>
        </HStack>
        <Divider />
        <Box flex={1}>
          <FlatList
            data={this.state.products}
            renderItem={({ item }) => (
              <Box border={0.5} m={0.5}>
                <VStack divider={<Divider />} bg='white' borderRadius='20'>
                  <Box px={4} pt={4} bg='primary.700' borderTopRadius='20'>
                    <Heading size="sm" color='white' pb={3}>{item.name}</Heading>
                  </Box>
                  <AspectRatio w="100%" ratio={1}>
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
                  <Box px={4} pb={1}>
                    <HStack space={20}>
                      <Text color='grey'>{TITLES.PRICE}: {'₡'}{item.price}</Text>
                      <Text color='grey'>{TITLES.QUANTITY}: {item.quantity}</Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            )}
            keyExtractor={item => item._id}
          />
        </Box>
      </Box>

    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <StoreScreen {...props} navigation={navigation} />;
}
