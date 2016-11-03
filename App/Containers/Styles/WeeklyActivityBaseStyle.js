import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  distance: {
    backgroundColor: '#F55443'
  },
  buttonTouchable: {
    overflow: 'hidden'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 5,
    padding: 8
  },
  buttonBlockStyle: {
    backgroundColor: Colors.button,
    borderRadius: 5
  },
  buttonText: {
    color: Colors.snow,
    fontWeight: '600',
    backgroundColor: 'transparent'
  },
  iconLeft: {
    color: Colors.snow,
    marginRight: 10
  },
  iconRight: {
    color: Colors.snow,
    marginLeft: 10
  }
})
