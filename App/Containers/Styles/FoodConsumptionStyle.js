import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  addFoodTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addFoodTypeIcon: {
    marginLeft: 10,
    color: Colors.mainText
  },
  pickerContainerStyle: {
    padding: 15
  },
  pickerStyle: {
    borderWidth: 2,
    padding: 15
  }
})
