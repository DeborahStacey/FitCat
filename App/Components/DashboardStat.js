import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './Styles/DashboardStatStyles'

class DashboardStat extends Component {
  render () {
    return (
      <View style={styles.statContainer}>
        <View style={styles.statIconView}>
          <Icon name={this.props.icon} style={styles.statIcon} />
        </View>
        <View style={styles.statTextView}>
          <Text style={styles.text}>{this.props.stat} {this.props.unit}</Text>
        </View>
        <View style={styles.statButtonView} >
          <Icon name='caret-right' style={styles.statButton} onPress={this.props.onPress} />
        </View>
      </View>
    )
  }
}

DashboardStat.propTypes = {
  unit: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default DashboardStat
