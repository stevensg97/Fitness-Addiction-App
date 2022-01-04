
import React, { Component } from 'react';
import { Dimensions, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, HamburgerIcon, Center, Heading, Divider, StatusBar, Icon } from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import { colors } from '../../config/styles';
import { ICONS } from '../../config/constants'
import HomeTab from './HomeTab';
import RoutinesTab from './RoutinesTab';
import HistoryTab from './HistoryTab';

const initialLayout = { width: Dimensions.get('window').width };

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      index: 0,
      routes: [
        { key: 'home', title: 'Inicio', iconSelected: ICONS.MD_HOME, icon: ICONS.MD_HOME_OUTLINE },
        { key: 'routines', title: 'Rutinas', iconSelected: ICONS.MD_CLIPBOARD, icon: ICONS.MD_CLIPBOARD_OUTLINE },
        { key: 'history', title: 'Historial', iconSelected: ICONS.MD_TRENDING_UP, icon: ICONS.MD_TRENDING_UP_OUTLINE },
      ]
    };
  }

  componentDidMount() {
    this.setState({ isReady: true });
  }

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              flex={1}
              alignItems='center'
              p={4}
              key={route.key}
              bg='primary.500'
            >
              <Pressable
                onPress={() => this.setState({ index: i })}>
                <HStack space={1}>
                  {this.state.index == i ? <Icon size='sm' color='white' as={<Ionicons name={route.iconSelected} />} />
                    : <Icon size='sm' color='ligthwhite' as={<Ionicons name={route.icon} />} />}
                  <Animated.Text style={{ opacity, color: colors.white, fontSize: 16 }}>{route.title}</Animated.Text>
                </HStack>
              </Pressable>
            </Box>


          );
        })}
      </Box>
    );
  };

  _renderScene = SceneMap({
    home: HomeTab, //HomeTab
    routines: RoutinesTab, //RoutinesTab
    history: HistoryTab //HistoryTab
  });

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <HomeTab />;
      case 'routines':
        return <RoutinesTab />;
      case 'history':
        return <HistoryTab index={this.state.index} />;
      default:
        return null;
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <Box flex={1}>
        <StatusBar backgroundColor={colors.primary[600]} barStyle="light-content" />
        <HStack alignItems="center" py={4} bg='primary.500'>
          <Pressable onPress={() => navigation.toggleDrawer()} _pressed={{ opacity: 0.5 }} position="absolute" ml={2} zIndex={1}>
            <HamburgerIcon ml={2} size="md" color='white' />
          </Pressable>
          <Center flex={1} >
            <Heading size="md" color='white'>{'Fitness Addiction'}{this.props.route.params.name}</Heading>
          </Center>
        </HStack>
        <Divider />
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={this._handleIndexChange}
          renderTabBar={this._renderTabBar}
          initialLayout={initialLayout}
          index={this.state.index}
          style={{ marginTop: StatusBar.currentHeight }}
        />
      </Box>

    );
  }


}

export default function (props) {
  const navigation = useNavigation();

  return <HomeScreen {...props} navigation={navigation} />;
}
