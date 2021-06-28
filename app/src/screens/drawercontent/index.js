import React from 'react';
import { View, StyleSheet, Image, FlatList, ImageBackground } from 'react-native';
import {
  Text,
  Left,
  Body,
  Container,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  ListItem
} from 'native-base';
import IconLogo from '../../assets/logo.png';
import IconUser from '../../assets/user.jpg';
import DrawerBackground from '../../assets/drawerBackground8.png';
import { TITLES, DRAWER_OPTIONS } from '../../config/constants';

const name = 'Steven';

export default function DrawerContent(props) {
  return (
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
  );
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
