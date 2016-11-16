import React from 'react'
import Moment from 'moment'
import { View, ScrollView, AsyncStorage } from 'react-native'
import DashboardStat from '../Components/DashboardStat'
import { default as StorageKeys } from '../Config/StorageKeys'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as DeviceInfo } from '../Services/DeviceInfo'
import { default as OAuthManager } from '../Services/OAuthManager'
import RoundedButton from '../Components/RoundedButton'

import styles from './Styles/DashboardStyle'

export default class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      steps: '',
      distance: '',
      deviceBattery: ''
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

  render () {
    var batteryIcon = this.getBatteryIcon()
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <DashboardStat icon='paw' stat={this.state.steps.toString()} unit='steps' onPress={NavigationActions.catSteps} />
            <View style={styles.dashboardStatDivider} />
            <DashboardStat icon='map-marker' stat={this.state.distance.toString()} unit='km' onPress={NavigationActions.catDistance} />
            <View style={styles.dashboardStatDivider} />
            <DashboardStat icon={batteryIcon} stat={this.state.deviceBattery} unit='battery' onPress={NavigationActions.device} />
            <RoundedButton onPress={OAuthManager.authorizeFitbitAccount}>
              Connect FitBit Account
            </RoundedButton>
          </View>
        </ScrollView>
      </View>
      )
  }
}
