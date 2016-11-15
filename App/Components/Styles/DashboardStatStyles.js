import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  statContainer: {
    margin: 10,
    flexDirection: 'row'
  },
  statIcon: {
    fontSize: 40
  },
  statIconView: {
    flex: 2,
    alignItems: 'center',
    paddingRight: 20
  },
  statTextView: {
    paddingTop: 10,
    flex: 4
  },
  statButtonView: {
    flex: 1
  },
  statButton: {
    fontSize: 40,
    color: Colors.frost
  }
})
