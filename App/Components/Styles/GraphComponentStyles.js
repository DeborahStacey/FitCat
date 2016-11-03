import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 15,
    marginRight: 5
  },
  value: {
    backgroundColor: Colors.button
  },
  labelText: {
    color: Colors.mainText,
    fontWeight: '700'
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
