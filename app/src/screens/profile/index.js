import React, { Component } from 'react';
import * as SecureStore from 'expo-secure-store';
import { LogBox } from 'react-native';
import {
  Box,
  StatusBar,
  HStack,
  VStack,
  ZStack,
  Pressable,
  Center,
  Heading,
  Divider,
  Text,
  Icon,
  Avatar,
  IconButton,
  Input,
  ScrollView,
} from 'native-base';
import {
  Ionicons
} from '@expo/vector-icons';
import client from '../../utils/client';
import { USER } from '../../utils/querys'
import { colors } from '../../config/styles';
import { useNavigation } from '@react-navigation/native';
import { ICONS, PLACEHOLDERS, TITLES } from '../../config/constants';
import IconUser from '../../assets/user.jpg';

class ProfileScreen extends Component {

  constructor(props) {
    LogBox.ignoreLogs(['NativeBase:', 'Setting a timer']);
    super(props);
    this.state = {
      isReady: false,
      storedEmail: '',
      fname: '',
      flname: '',
      slname: '',
      email: '',
      password: '',
      phoneNumber: '',
      bodyMeasures: {
        height: 0,
        weight: 0,
        bmi: 0,
        musclePercentage: 0,
        bodyFatPercentage: 0,
        bonePercentage: 0
      },
      subscription: {
        plan: '',
        active: false,
        startDate: '',
        endDate: ''
      }


    };
  }

  async componentDidMount() {
    await this._getRememberedEmail();
    this.setState({ isReady: true });

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._getRememberedEmail();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  _getRememberedEmail = async () => {
    try {
      const email = await SecureStore.getItemAsync('EMAIL');
      //console.log(email)
      if (email !== null) {
        this.state.storedEmail = email;
        await this._getUserInformation();
      }
    } catch (error) {
    }
  };


  _getUserInformation = () => {
    console.log(this.state.storedEmail)
    client
      .fetch(
        USER(this.state.storedEmail)
      )
      .then(res => {
        this.setState({
          //user: res[0],
          fname: res[0].name,
          flname: res[0].flname,
          slname: res[0].slname,
          email: res[0].email.current,
          password: res[0].password,
          phoneNumber: res[0].phone_number,
          bodyMeasures: {
            height: res[0].measures.height,
            weight: res[0].measures.weight,
            bmi: res[0].measures.bmi,
            musclePercentage: res[0].measures.muscle_percentage,
            bodyFatPercentage: res[0].measures.body_fat_percentage,
            bonePercentage: res[0].measures.bone_percentage
          },
          subscription: {
            plan: res[0].subscription.plan.name,
            active: res[0].subscription.active,
            startDate: res[0].subscription.starting_date,
            endDate: res[0].subscription.ending_date
          }
        });
        //console.log(this.state.user);
      })
      .catch(err => {
        this.setState({ isReady: false, });
        /* Alert.alert(
          SCREENS.CONTACT,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        ); */
      })
  };

  _onProfileTextChangedFname = event => {
    this.setState({
      fname: event.nativeEvent.text
    });
  };

  _onProfileTextChangedFLname = event => {
    this.setState({
      flname: event.nativeEvent.text
    });
  };

  _onProfileTextChangedSLname = event => {
    this.setState({
      slname: event.nativeEvent.text
    });
  };

  _onProfileTextChangedEmail = event => {
    this.setState({
      email: event.nativeEvent.text
    });
  };

  _onProfileTextChangedPhoneNumber = event => {
    this.setState({
      phoneNumber: event.nativeEvent.text
    });
  };

  _onProfileTextChangedHeight = event => {
    this.setState({
      bodyMeasures: {
        ...this.state.bodyMeasures,
        height: event.nativeEvent.text
      }
    });
  };

  _onProfileTextChangedWeight = event => {
    this.setState({
      bodyMeasures: {
        ...this.state.bodyMeasures,
        weight: event.nativeEvent.text
      }
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Box flex={1}>
        <StatusBar backgroundColor={colors.primary[600]} barStyle="light-content" />
        <HStack alignItems="center" py={4} bg='primary.500' >
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigation.goBack()} position="relative" ml={2} zIndex={1}>
            <Icon size='md' ml={2} color='white' as={<Ionicons name={ICONS.MD_ARROW_BACK} />} />
          </Pressable>
          <Center flex={1} position="relative">
            <Heading size="md" color='white'>{TITLES.PROFILE}</Heading>
          </Center>
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => alert('Cambios guardados')} position="relative" mr={2}>
            <Icon size='md' ml={2} color='white' as={<Ionicons name={ICONS.MD_CHECKMARK} />} />
          </Pressable>
        </HStack>

        <Divider />

        <ScrollView flex={1} >
          <VStack space={5} divider={<Divider />}>
            <Box h="40" alignItems="center" justifyContent="center">
              <ZStack h='60%' w='23.4%'>
                <Box>
                  <Avatar
                    size='xl'
                    source={IconUser}
                  />
                </Box>
                <Box mt={65} ml={55} bg='white' border={1} borderColor='grey' borderRadius={100}>
                  <IconButton
                    variant="ghost"
                    borderRadius={100}
                    icon={<Icon size="sm" as={<Ionicons name="md-create" />} color="primary.500" />}
                  />
                </Box>
              </ZStack>
            </Box>

            {/*==================Profile==================-- */}

            <Box>
              <VStack ml={5} mr={5} space={2} >
                <Heading size='md'>{TITLES.PROFILE}</Heading>
                <VStack space={0} divider={<Divider />}>
                  {/*-----------------Name------------------- */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.FNAME}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        variant="unstyled"
                        value={this.state.fname}
                        color='primary.500'
                        onChange={this._onProfileTextChangedFname}

                      />
                    </Box>
                  </HStack>
                  {/*----------------FLname------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.FLNAME}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        variant="unstyled"
                        value={this.state.flname}
                        color='primary.500'
                        onChange={this._onProfileTextChangedFLname}
                      />
                    </Box>
                  </HStack>
                  {/*----------------SLname------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.SLNAME}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        variant="unstyled"
                        value={this.state.slname}
                        color='primary.500'
                        onChange={this._onProfileTextChangedSLname}
                      />
                    </Box>
                  </HStack>
                  {/*----------------Email------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.EMAIL}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={30}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        variant="unstyled"
                        value={this.state.email}
                        color='primary.500'
                        onChange={this._onProfileTextChangedEmail}
                      />
                    </Box>
                  </HStack>
                  {/*----------------PhoneNumber------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.PHONE_NUMBER}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={8}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        keyboardType='phone-pad'
                        variant="unstyled"
                        value={this.state.phoneNumber}
                        color='primary.500'
                        onChange={this._onProfileTextChangedPhoneNumber}
                      />
                    </Box>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/*==================Body Measures==================-- */}

            <Box >
              <VStack ml={5} mr={5} space={4}>
                <Heading size='md'>{TITLES.BODY_MEASURES}</Heading>
                <VStack space={0} divider={<Divider />}>
                  {/*----------------Height------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.HEIGHT}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        keyboardType='numeric'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        variant="unstyled"
                        value={String(this.state.bodyMeasures.height)}
                        color='primary.500'
                        onChange={this._onProfileTextChangedHeight}
                      />
                    </Box>
                  </HStack>
                  {/*----------------Weight------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.WEIGHT}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        keyboardType='numeric'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        variant="unstyled"
                        value={String(this.state.bodyMeasures.weight)}
                        color='primary.500'
                        onChange={this._onProfileTextChangedWeight}
                      />
                    </Box>
                  </HStack>
                  {/*----------------BMI------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.BMI}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        keyboardType='numeric'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        isReadOnly
                        variant="unstyled"
                        value={String(this.state.bodyMeasures.bmi)}
                        color='primary.500'
                      />
                    </Box>
                  </HStack>
                  {/*----------------Muscle Percentage------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.MUSCLE_PERCENTAGE}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        keyboardType='numeric'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        isReadOnly
                        variant="unstyled"
                        value={String(this.state.bodyMeasures.musclePercentage) + '%'}
                        color='primary.500'
                      />
                    </Box>
                  </HStack>
                  {/*----------------Body Fat Percentage------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.BODY_FAT_PERCENTAGE}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        keyboardType='numeric'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        isReadOnly
                        variant="unstyled"
                        value={String(this.state.bodyMeasures.bodyFatPercentage) + '%'}
                        color='primary.500'
                      />
                    </Box>
                  </HStack>
                  {/*----------------Bone Percentage------------------ */}
                  <HStack>
                    <Box w='40%' alignSelf='center'>
                      <Text fontSize='sm' color='grey'>{PLACEHOLDERS.BONE_PERCENTAGE}</Text>
                    </Box>
                    <Box w='60%'>
                      <Input
                        multiline={true}
                        numberOfLines={1}
                        maxLength={20}
                        blurOnSubmit={true}
                        returnKeyType={"done"}
                        size='sm'
                        keyboardType='numeric'
                        fontWeight='bold'
                        textAlign='right'
                        isFullWidth
                        isReadOnly
                        variant="unstyled"
                        value={String(this.state.bodyMeasures.bonePercentage) + '%'}
                        color='primary.500'
                      />
                    </Box>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/*==================Account==================-- */}

            <Box pb={5}>
              <VStack ml={5} mr={5} space={4}>
                <Heading size='md'>{TITLES.ACCOUNT}</Heading>
                <VStack space={4} divider={<Divider />}>
                  {/*----------------Subscription------------------ */}
                  <Pressable _pressed={{ opacity: 0.4 }} onPress={() => { alert('Suscripción') }}>
                    <HStack>
                      <Box w='40%' alignSelf='center'>
                        <Text fontSize='sm' color='black'>{PLACEHOLDERS.SUBSCRIPTION}</Text>
                      </Box>
                      <Box w='60%' alignItems='flex-end'>
                        <HStack space={1}>
                          <Center>
                            <Text fontSize='sm' color='primary.500' bold>{this.state.subscription.plan}</Text>
                          </Center>
                          <Center>
                            <Icon size="sm" as={<Ionicons name="md-arrow-forward" />} color="grey" />
                          </Center>
                        </HStack>
                      </Box>
                    </HStack>
                  </Pressable>
                  {/*----------------Change Password------------------ */}
                  <Pressable _pressed={{ opacity: 0.4 }} onPress={() => { alert('Cambiar contraseña') }}>
                    <HStack>
                      <Box w='40%' alignSelf='center'>
                        <Text fontSize='sm' color='black'>{PLACEHOLDERS.CHANGE_PASSWORD}</Text>
                      </Box>
                      <Box w='60%' alignItems='flex-end'>
                        <Icon size="sm" as={<Ionicons name="md-arrow-forward" />} color="grey" />
                      </Box>
                    </HStack>
                  </Pressable>
                  {/*----------------Delete Account------------------ */}
                  <Pressable _pressed={{ opacity: 0.4 }} onPress={() => { alert('Borrar cuenta') }}>
                    <HStack>
                      <Box w='40%' alignSelf='center'>
                        <Text fontSize='sm' color='danger.500'>{PLACEHOLDERS.DELETE_ACCOUNT}</Text>
                      </Box>
                      <Box w='60%' alignItems='flex-end'>
                        <Icon size="sm" as={<Ionicons name="md-arrow-forward" />} color="grey" />
                      </Box>
                    </HStack>
                  </Pressable>
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <ProfileScreen {...props} navigation={navigation} />;
}
