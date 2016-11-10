import React from 'react'
import { AsyncStorage, Text, View, ScrollView } from 'react-native'
import { default as StorageKeys } from '../Config/StorageKeys'
import Icon from 'react-native-vector-icons/FontAwesome'
import Moment from 'moment'

import styles from './Styles/DeviceStyle'

export default class Device extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      device: [],
      devicePresent: false
    }
    this.fetchDeviceData()
  }

  async fetchDeviceData () {
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)

    fetch(`https://api.fitbit.com/1/user/-/devices.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.length !== 0) {
        this.setState({
          device: responseJson[0], // If we have more than one fitbit this will need to change..
          devicePresent: true
        })
      }
    })
  }

  matchesBatteryLevel = (toMatch) => {
    return this.state.device.battery === toMatch
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          { this.matchesBatteryLevel('High') ? <Icon name='battery-full' style={styles.fullBattery} /> : null }
          { this.matchesBatteryLevel('Medium') ? <Icon name='battery-three-quarters' style={styles.mediumBattery} /> : null }
          { this.matchesBatteryLevel('Low') ? <Icon name='battery-quarter' style={styles.lowBattery} /> : null }
          { this.matchesBatteryLevel('Empty') ? <Icon name='battery-empty' style={styles.emptyBattery} /> : null }
          <Text style={styles.sectionText}>
            Device type: { this.state.device.deviceVersion }
          </Text>
          <Text style={styles.sectionText}>
            Battery level: { this.state.device.battery }
          </Text>
          <Text style={styles.sectionText}>
            Last synced: { Moment(this.state.device.lastSyncTime).format('MMMM Do YYYY, h:mm:ss a') }
          </Text>
        </ScrollView>
      </View>
      )
  }
}
