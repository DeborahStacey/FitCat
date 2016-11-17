import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { Colors } from '../Themes/'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.mainText} />
        <NavigationRouter />
      </View>
    )
  }
}

export default RootContainer
