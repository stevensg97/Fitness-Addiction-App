import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View } from 'react-native';
import getTheme from './native-base-theme/components';
import { Container, StyleProvider, Left, Button, Text, Header, Subtitle, Tab, Tabs, Title, DefaultTabBar, TabHeading, Icon, Body } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import commonColor from './native-base-theme/variables/commonColor';

const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <View style={styles.container}>
          <Container>
            <Header hasTabs>
              <Left>
                <Button transparent onPress={() => {alert('MENU!!')}}>
                  <Icon name='md-menu' />
                </Button>
              </Left>
              <Body>
                <Title>Fitness Addiction</Title>
                <Subtitle>#PPT :c</Subtitle>
              </Body>

            </Header>
            <Tabs renderTabBar={renderTabBar} tabBgColor={'#914043'}>
              <Tab heading={<TabHeading><Icon name="md-clipboard" /><Text>Rutina</Text></TabHeading>} tabStyle={{ /* ... */ }}>
                <Container></Container>
              </Tab>
              <Tab heading={<TabHeading><Icon name="md-trending-up" /><Text>Mediciones</Text></TabHeading>} tabStyle={{ /* ... */ }}>
                <Container></Container>
              </Tab>
            </Tabs>
          </Container>
        </View>
      </StyleProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
