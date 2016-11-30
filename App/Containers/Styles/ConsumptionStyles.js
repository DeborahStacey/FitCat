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
  paddedContainer: {
    padding: 25
  },
  pickerStyle: {
    borderWidth: 1
  },
  labelText: {
    color: Colors.mainText,
    fontWeight: '700'
  },
  valueText: {
    paddingLeft: 25
  }
})
