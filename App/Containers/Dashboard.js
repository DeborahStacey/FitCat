import React from 'react'
import { Text, View, ScrollView } from 'react-native'

import styles from './Styles/DashboardStyle'

export default class Dashboard extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
            This is a page
            </Text>
          </View>
        </ScrollView>
      </View>
      )
  }
}
