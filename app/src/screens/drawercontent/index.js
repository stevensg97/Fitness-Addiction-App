import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  Text,
  Avatar,
  Box,
  HStack,
  VStack,
  ZStack,
  Divider,
  Pressable,
  Heading,
  AspectRatio,
  Icon,
  Image
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import IconLogo from '../../assets/logo.png';
import IconUser from '../../assets/user.jpg';
import DrawerBackground from '../../assets/drawerBackground.png';
import { TITLES, DRAWER_OPTIONS } from '../../config/constants';
import client from '../../utils/client';
import imageUrlBuilder from '@sanity/image-url';
import RoutinesTab from '../home/RoutinesTab';
import { setUser } from '../../utils/globals';

const builder = imageUrlBuilder(client);



export default function DrawerContent(props) {
  const [userName, setName] = useState('');
  const [userImage, setImage] = useState(null);
  const [userAdmin, setAdmin] = useState(null);

  const _getRememberedName = async () => {
    try {
      const name = await SecureStore.getItemAsync('NAME');
      //console.log(name)
      if (name !== null) {
        setName(name.split(' ')[0]);
      }
    } catch (error) {
    }
  };

  const _getRememberedImage = async () => {
    try {
      const image = await SecureStore.getItemAsync('IMAGE');
      //console.log(image)
      if (image !== null) {
        setImage(JSON.parse(image));
      }
    } catch (error) {
    }
  };

  async function _getRememberedIsAdmin() {
    try {
      const isAdmin = await SecureStore.getItemAsync('ISADMIN');
      //console.log(isAdmin, typeof(isAdmin))
      if (isAdmin !== null) {
        setAdmin(isAdmin);
      }
      return isAdmin;

    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    if (global.loadUserInfo) {
      _getRememberedName();
      _getRememberedImage();
      _getRememberedIsAdmin();
    }

  }, [global.loadUserInfo])

  _resetSecureStore = async () => {
    try {
      global.loadUserInfo = false;
      await SecureStore.deleteItemAsync('EMAIL');
      await SecureStore.deleteItemAsync('PASSWORD');
      await SecureStore.deleteItemAsync('NAME');
      await SecureStore.deleteItemAsync('IMAGE');
      await SecureStore.deleteItemAsync('ISADMIN');
    } catch (error) {
      // Error removing
    }
  };

  return (

    <DrawerContentScrollView {...props} safeArea>
      <VStack>
        <AspectRatio ratio={17 / 9} >
          <ZStack alignItems="center" justifyContent="center">
            <Box>
              <Image
                source={DrawerBackground}
                alt='DrawerBackground'
                resizeMode='contain'
              />

            </Box>
            <Box>
              <Image
                source={IconLogo}
                alt='Logo'
                height={120}
                width={120}
              />
            </Box>
          </ZStack>
        </AspectRatio>
        <HStack space={4} alignItems="center" p={2}>
          <Image
            size='sm'
            alt='User'
            rounded={'full'}
            source={userImage != null ? { uri: builder.image(userImage).url() } : IconUser}
          />
          <Heading size="sm" ml={-1}>
            ¡{TITLES.WELCOME} {userName}!
          </Heading>
        </HStack>
        <Divider />
        <VStack divider={<Divider />}>
          {DRAWER_OPTIONS.map((option) => (
            <Pressable key={option[0]} onPress={() => props.navigation.navigate(option[0])} py={2}>
              <HStack space={4} px={4} py={3} alignItems='center'>
                <Icon as={<Ionicons name={option[2]} />}></Icon>
                <Text>{option[1]}</Text>
              </HStack>
            </Pressable>
          ))}

          {userAdmin === 'true' &&
            <Pressable onPress={() => { props.navigation.navigate('Payments') }} py={2}>
              <HStack space={4} px={4} py={3} alignItems='center'>
                <Icon as={<Ionicons name={'md-cash-outline'} />}></Icon>
                <Text>Pagos</Text>
              </HStack>
            </Pressable>
          }

          <Pressable onPress={() => { _resetSecureStore(), props.navigation.navigate('Login') }} py={2}>
            <HStack space={4} px={4} py={3} alignItems='center'>
              <Icon as={<Ionicons name={'md-log-out-outline'} />}></Icon>
              <Text>Cerrar Sesión</Text>
            </HStack>
          </Pressable>
        </VStack>
        <Divider />
      </VStack>
    </DrawerContentScrollView>
  );
}
