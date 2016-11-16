import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  dashboardStatDivider: {
    borderTopColor: Colors.frost,
    borderTopWidth: 0.5,
    borderBottomColor: Colors.frost,
    borderBottomWidth: 1
  }
})
