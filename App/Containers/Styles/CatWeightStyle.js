import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  weightText: {
    paddingTop: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  updateInput: {
    marginVertical: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    minWidth: 120,
    alignSelf: 'stretch'
  },
  updateContainer: {
    flexDirection: 'row',
    marginHorizontal: 25
  },
  inputView: {
    flex: 1
  },
  buttonView: {
    flex: 1
  },
  divider: {
    borderTopColor: Colors.frost,
    borderTopWidth: 0.5,
    borderBottomColor: Colors.frost,
    borderBottomWidth: 1
  }
})
