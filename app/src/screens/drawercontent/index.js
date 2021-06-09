import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
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
import { TITLES, DRAWER_OPTIONS } from '../../config/constants';

const name = 'Steven';

export default function DrawerContent(props) {
  return (
    <Container>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={IconLogo} />
      </View>
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
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: "contain",
    height: 130,
  },
});
