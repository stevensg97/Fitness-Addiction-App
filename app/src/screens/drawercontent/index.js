import React from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import {
  Text,
  Left,
  Body,
  Center,
  Avatar,
  Box,
  HStack,
  VStack,
  ZStack,
  Divider,
  Pressable,
  HamburgerIcon,
  Heading,
  Stack,
  AspectRatio,
  Container,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  ListItem,
  Image
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import IconLogo from '../../assets/logo.png';
import IconUser from '../../assets/user.jpg';
import DrawerBackground from '../../assets/drawerBackground8.png';
import { TITLES, DRAWER_OPTIONS, ICONS, SCREENS } from '../../config/constants';
import { background } from 'styled-system';

const name = 'Steven'; 

export default function DrawerContent(props) {
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
          <Avatar source={IconUser}></Avatar>
          <Heading size="sm" ml={-1}>
            ¡{TITLES.WELCOME} {name}!
          </Heading>
        </HStack>
        <Divider />
        <VStack divider={<Divider />}>
          {DRAWER_OPTIONS.map((option) => (
            <Pressable key={option[0]} onPress={() => props.navigation.navigate(option[0])} py={2}>
              <HStack space={4} px={4} py={3} alignItems='center'>
                <Icon as={<Ionicons name={option[2]}/>}></Icon>
                <Text>{option[1]}</Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
        <Divider />
      </VStack>
    </DrawerContentScrollView>
  );
  /* 
  <FlatList
          data={DRAWER_OPTIONS}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => props.navigation.navigate(item.screen)}>
                <HStack space={4} p={2} alignItems='center'>
                  <HamburgerIcon />
                  <Text>{item.name}</Text>
                </HStack>
                <Divider />
              </Pressable>
            );
          }}
          keyExtractor={item => item.name}
        />



  <Container>
    <ImageBackground source={DrawerBackground} style={styles.imageBackground}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={IconLogo} />
      </View>
    </ImageBackground>
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={IconUser} />
          <Body>
            <Text>¡{TITLES.WELCOME} {name}!</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
    <FlatList
      data={DRAWER_OPTIONS}
      renderItem={({ item }) => {
        return (
          <ListItem
            button
            onPress={() => props.navigation.navigate(item.screen)}>
            <Icon name={item.icon} />
            <Text>   {item.name}</Text>
          </ListItem>
        );
      }}
      keyExtractor={item => item.name}
    />
  </Container> 
);*/
}

const styles = StyleSheet.create({
  drawerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerSection: {
    marginTop: 15,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 130,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center"
  }
});