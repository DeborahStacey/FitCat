import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Moment from 'moment'
import { default as DeviceInfo } from '../Services/DeviceInfo'

import styles from './Styles/DeviceStyle'

export default class Device extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      device: {},
      devicePresent: false
    }
    this.fetchDeviceData()
  }

  async fetchDeviceData () {
    let deviceInfo = await DeviceInfo.fetchDeviceData()
    if (deviceInfo !== {}) {
      this.setState({
        device: deviceInfo[0],
        devicePresent: true
      })
    } else {
      this.setState({
        device: {},
        devicePresent: false
      })
    }
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
