import React from 'react'
import Moment from 'moment'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import { Alert, View, ScrollView, AsyncStorage, Text, TextInput } from 'react-native'
import DashboardStat from '../Components/DashboardStat'
import Loading from '../Components/Loading'
import { default as StorageKeys } from '../Config/StorageKeys'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as DeviceInfo } from '../Services/DeviceInfo'
import { default as WellCatManager } from '../Services/WellCatManager'
import { default as OAuthManager } from '../Services/OAuthManager'
import RoundedButton from '../Components/RoundedButton'
import * as Animatable from 'react-native-animatable'

import styles from './Styles/DashboardStyle'

export default class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      steps: '',
      distance: '',
      deviceBattery: '',
      email: '',
      password: '',
      isLoading: true
    }

    this.fetchDayOfSummaryData()
    this.fetchDeviceData()
  }

  async fetchDeviceData () {
    let deviceInfo = await DeviceInfo.fetchDeviceData()

    if (deviceInfo !== {}) {
      this.setState({
        deviceBattery: deviceInfo[0].battery
      })
    }
  }

  async fetchDayOfSummaryData () {
    let date = Moment().format('YYYY[-]MM[-]DD')
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)

    fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        steps: responseJson.summary.steps,
        distance: responseJson.summary.distances[0].distance
      })
    })
  }

  getBatteryIcon () {
    if (this.state.deviceBattery === 'High') {
      return 'battery-full'
    } else if (this.state.deviceBattery === 'Medium') {
      return 'battery-three-quarters'
    } else if (this.state.deviceBattery === 'Low') {
      return 'battery-quarter'
    } else {
      return 'battery-empty'
    }
  }

  login (email, password) {
    WellCatManager.login(email, password)
      .then((result) => {
        if (result.code === 1) {
          AsyncStorage.setItem(StorageKeys.WELLCAT_EMAIL, email)
          NavigationActions.loggedInDash()
        } else if (result.code === 0) {
          Alert.alert(`${I18n.t('unable')} ${result.content}.`)
        } else if (result.code === -1) {
          Alert.alert(`${I18n.t('tryLater')}`)
        } else {
          Alert.alert(`${I18n.t('horrible')}`)
        }
      })
  }

  signUp () {
    Alert.alert('Please visit the WellCat website to sign up.')
  }

  checkLoggedInState () {
    AsyncStorage.getItem(StorageKeys.WELLCAT_EMAIL).then((email) => {
      this.setState({
        isLoading: false
      })
      console.log(NavigationActions)
      if (email) {
        NavigationActions.loggedInDash()
      } else {
        NavigationActions.notLoggedInDash()
      }
    })
  }

  componentWillMount () {
    this.checkLoggedInState()
  }

  render () {
    var batteryIcon = this.getBatteryIcon()
    if (this.state.isLoading) {
      return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <Loading />
          </ScrollView>
        </View>
      )
    }

    if (this.props.mustLogin) {
      return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style={styles.section} >
              <Animatable.View animation='fadeIn'>
                <Text style={styles.sectionText} >
                  {I18n.t('welcomeLogIn')}
                </Text>
                <Text style={styles.sectionText} >
                  {I18n.t('email')}
                </Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  placeholder={I18n.t('email')}
                  placeholderTextColor={Colors.placeholderText}
                  onChangeText={(email) => this.setState({email})}
                  autoCapitalize={'none'}
                />
                <Text style={styles.sectionText} >
                  {I18n.t('password')}
                </Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  placeholder={I18n.t('password')}
                  placeholderTextColor={Colors.placeholderText}
                  onChangeText={(password) => this.setState({password})}
                  secureTextEntry
                  autoCapitalize={'none'}
                />
              </Animatable.View>
              <Animatable.View animation='lightSpeedIn'>
                <RoundedButton onPress={() => this.login(this.state.email, this.state.password)}>
                  {I18n.t('logIn')}
                </RoundedButton>
              </Animatable.View>
            </View>

            <Animatable.View animation='lightSpeedIn'>
              <RoundedButton onPress={this.signUp}>
                {I18n.t('signUp')}
              </RoundedButton>
            </Animatable.View>
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <DashboardStat icon='paw' stat={this.state.steps.toString()} unit='steps' onPress={NavigationActions.catSteps} />
            <View style={styles.dashboardStatDivider} />
            <DashboardStat icon='map-marker' stat={this.state.distance.toString()} unit='km' onPress={NavigationActions.catDistance} />
            <View style={styles.dashboardStatDivider} />
            <DashboardStat icon={batteryIcon} stat={this.state.deviceBattery} unit='battery' onPress={NavigationActions.device} />
            <Animatable.View animation='lightSpeedIn'>
              <RoundedButton onPress={OAuthManager.authorizeFitbitAccount}>
                {I18n.t('connectFitbitAccount')}
              </RoundedButton>
            </Animatable.View>
          </View>
        </ScrollView>
      </View>
      )
  }
}
