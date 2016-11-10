import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  fullBattery: {
    color: Colors.batteryFull,
    fontSize: 50,
    textAlign: 'center'
  },
  mediumBattery: {
    color: Colors.batteryMedium,
    fontSize: 50,
    textAlign: 'center'
  },
  lowBattery: {
    color: Colors.batteryLow,
    fontSize: 50,
    textAlign: 'center'
  },
  emptyBattery: {
    color: Colors.charcoal,
    fontSize: 50,
    textAlign: 'center'
  }
})
