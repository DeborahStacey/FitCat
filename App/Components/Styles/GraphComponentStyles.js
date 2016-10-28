import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 15,
    marginRight: 5
  },
  distance: {
    backgroundColor: '#FFF'
  },
  dateText: {
    color: '#FFF'
  },
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  }
})
