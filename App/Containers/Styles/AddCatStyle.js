import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainText,
    flexDirection: 'column'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  catRow: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5
  },
  catRowText: {
    color: '#575757',
    fontSize: 18
  }
})
