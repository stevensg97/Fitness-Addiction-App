import React, { Component } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Left,
  Button,
  Text,
  Header,
  Tab,
  Tabs,
  Title,
  DefaultTabBar,
  TabHeading,
  Icon,
  Body
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../config/styles';
import { useNavigation } from '@react-navigation/native';
import { ICONS, TITLES } from '../../config/constants';

const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

class AboutScreen extends Component {

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
    const { navigation } = this.props;
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Container>
          <Header hasTabs>
            <Left>
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name={ICONS.MD_MENU} />
              </Button>
            </Left>
            <Body>
              <Title>{TITLES.FITNESS_ADDICTION}</Title>
            </Body>
          </Header>
          <Tabs renderTabBar={renderTabBar} tabBgColor={colors.color_primary_500}>
            <Tab heading={<TabHeading><Icon name={ICONS.MD_HOME} /><Text>Acerca de</Text></TabHeading>} tabStyle={{ /* ... */ }}>
            </Tab>
          </Tabs>
        </Container>
      </View>
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

export default function (props) {
  const navigation = useNavigation();

  return <AboutScreen {...props} navigation={navigation} />;
}
