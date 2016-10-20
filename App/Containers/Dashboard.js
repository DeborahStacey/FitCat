import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { Images } from '../Themes'

import styles from './Styles/DashboardStyle'

export default class Dashboard extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
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
