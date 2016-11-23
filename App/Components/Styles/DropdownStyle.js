'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  dropStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 99,
    borderWidth: 2,
    borderColor: 'grey'
  },
  contents: {
    color: 'black',
    flex: 95
  },
  contentsIOS: {
    flex: 95
  },
  item: {
    color: 'black'
  },
  hackPadding: {
    flex: 5,
    paddingTop: 13
  }
})
