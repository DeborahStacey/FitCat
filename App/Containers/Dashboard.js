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
      sleep: '',
      deviceBattery: '',
      email: '',
      password: '',
      isLoading: true,
      weight: 0,
      foodSync: 0,
      waterSync: 0
    }

    this.fetchDayOfSummaryData()
    this.fetchDeviceData()
    this.getCatName()
    this.getWellCatData()
  }

  async getCatName () {
    let catName = await AsyncStorage.getItem(StorageKeys.CAT_NAME)

    this.setState({
      catName: catName
    })
  }

  async getWellCatData () {
    let wellcatInfo = await WellCatManager.getActiveCat()
    var foodSync = 0.0
    var waterSync = 0.0
    if (wellcatInfo === undefined || wellcatInfo.fitcat === undefined) {
      return
    }
    try {
      var latestDate = Moment(wellcatInfo.fitcat[0].date)
      var today = Moment()
      if (today.isSame(latestDate, 'day')) {
        foodSync = wellcatInfo.fitcat[0].foodconsumption ? wellcatInfo.fitcat[0].foodconsumption : 0.0
        waterSync = wellcatInfo.fitcat[0].waterconsumption ? wellcatInfo.fitcat[0].waterconsumption : 0.0
      }
    } catch (error) {
      console.log(error)
    }
    this.setState({
      weight: wellcatInfo.pet.weight,
      foodSync: foodSync,
      waterSync: waterSync
    })
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

      // We're doing this on the dashboard because the WellCat API does not appear
      // to support sending data in bulk, so it would have to be individual requests
      // for each day to send historical data. We also cannot assume the user will
      // go to the steps page, so it doesn't make total sense to do it there.
      WellCatManager.updateSteps(responseJson.summary.steps)
    })

    fetch(`https://api.fitbit.com/1/user/-/sleep/date/${date}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        sleep: responseJson.summary.totalMinutesAsleep
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
          NavigationActions.loggedInDash({loggedIn: true})
        } else if (result.code === 0) {
          Alert.alert(`${I18n.t('unable')} ${result.content}.`)
        } else if (result.code === -1) {
          Alert.alert(`${I18n.t('tryLater')}`)
        } else {
          Alert.alert(`${I18n.t('horrible')}`)
        }
      })
  }

  checkLoggedInState () {
    AsyncStorage.getItem(StorageKeys.WELLCAT_EMAIL).then((email) => {
      this.setState({
        isLoading: false
      })
      if (email) {
        AsyncStorage.multiGet([StorageKeys.FITBIT_ACCESS_TOKEN, StorageKeys.CAT_ID], (err, stores) => {
          if (err) {
            console.error(err)
          }

          stores.map((result, i, store) => {
            let key = store[i][0]
            let value = store[i][1]
            let obj = {}

            obj[key] = value
            this.setState(obj)
          })

          NavigationActions.loggedInDash()
        })
      } else {
        NavigationActions.notLoggedInDash()
      }
    })
  }

  async updateFitbitAccesToken () {
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)
    this.setState({
      'fitbit_access_token': accessToken
    })
  }

  async updateActiveCat () {
    let catId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    let catName = await AsyncStorage.getItem(StorageKeys.CAT_NAME)
    this.setState({
      'cat_id': catId,
      catName: catName
    })
  }

  catIdExists () {
    return this.state[StorageKeys.CAT_ID] !== undefined && this.state[StorageKeys.CAT_ID] !== null && this.state[StorageKeys.CAT_ID] !== ''
  }

  fitbitAccessTokenExists () {
    return this.state[StorageKeys.FITBIT_ACCESS_TOKEN] !== undefined && this.state[StorageKeys.FITBIT_ACCESS_TOKEN] !== null && this.state[StorageKeys.FITBIT_ACCESS_TOKEN] !== ''
  }

  componentWillMount () {
    this.checkLoggedInState()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dothething) {
      this.getWellCatData()
      nextProps.dothething = false
    }

    if (nextProps.fitbitupdate) {
      this.updateFitbitAccesToken()
      this.fetchDeviceData()
      this.fetchDayOfSummaryData()
      nextProps.fitbitupdate = false
    }

    if (nextProps.loggedIn) {
      this.checkLoggedInState()
      nextProps.loggedIn = false
    }

    if (nextProps.catupdate) {
      this.updateActiveCat()
      this.getWellCatData()
      nextProps.catupdate = false
    }
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
                  keyboardType={'email-address'}
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
              <RoundedButton onPress={NavigationActions.signUp}>
                {I18n.t('signUp')}
              </RoundedButton>
            </Animatable.View>
          </ScrollView>
        </View>
      )
    }

    if (this.fitbitAccessTokenExists() && this.catIdExists()) {
      return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.sectionText}>
                {I18n.t('current_cat')}
                {this.state.catName}
              </Text>
              <DashboardStat icon='paw' stat={this.state.steps.toString()} unit='steps' onPress={NavigationActions.catSteps} />
              <View style={styles.dashboardStatDivider} />
              <DashboardStat icon='map-marker' stat={this.state.distance.toString()} unit='km' onPress={NavigationActions.catDistance} />
              <View style={styles.dashboardStatDivider} />
              <DashboardStat icon='moon-o' stat={this.state.sleep.toString()} unit='cat nap minutes' onPress={NavigationActions.catSleep} />
              <View style={styles.dashboardStatDivider} />
              <DashboardStat icon='balance-scale' stat={this.state.weight.toString()} unit='lbs' onPress={NavigationActions.catWeight} />
              <View style={styles.dashboardStatDivider} />
              <DashboardStat icon='spoon' stat={this.state.foodSync.toString()} unit='cups today' onPress={NavigationActions.foodConsumption} />
              <View style={styles.dashboardStatDivider} />
              <DashboardStat icon='tint' stat={this.state.waterSync.toString()} unit='cups today' onPress={NavigationActions.waterConsumption} />
              <View style={styles.dashboardStatDivider} />
              <DashboardStat icon={batteryIcon} stat={this.state.deviceBattery} unit='battery' onPress={NavigationActions.device} />
              <View style={styles.dashboardStatDivider} />
            </View>
          </ScrollView>
        </View>
      )
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText} >
            {I18n.t('get_started')}
          </Text>

          { this.displayFitbitStep() }
          { this.displayAddCatStep() }
        </ScrollView>
      </View>
    )
  }

  displayFitbitStep () {
    if (!this.fitbitAccessTokenExists()) {
      return (
        <RoundedButton onPress={OAuthManager.authorizeFitbitAccount}>
          {I18n.t('connect_fitbit_account')}
        </RoundedButton>
      )
    }
  }

  displayAddCatStep () {
    if (!this.catIdExists()) {
      return (
        <RoundedButton onPress={NavigationActions.addCat}>
          {I18n.t('register_your_cat')}
        </RoundedButton>
      )
    }
  }
}
