import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  weightText: {
    paddingTop: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  updateInput: {
    marginHorizontal: 25,
    marginVertical: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10
  }
})
