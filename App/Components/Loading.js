import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from './Styles/LoadingStyles'

class Loading extends Component {
  render () {
    return (
      <View>
        <Text style={styles.sectionText}>
            Loading...
        </Text>
      </View>
    )
  }
}

export default Loading
