import React, { Component } from 'react'
import { Text, View } from 'react-native'
import I18n from 'react-native-i18n'

import styles from './Styles/LoadingStyles'

class Loading extends Component {
  render () {
    return (
      <View>
        <Text style={styles.sectionText}>
          {I18n.t('loading')}
        </Text>
      </View>
    )
  }
}

export default Loading
