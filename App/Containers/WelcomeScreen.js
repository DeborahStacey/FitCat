import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import { default as OAuthManager } from '../Services/OAuthManager'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/WelcomeScreenStyle'

export default class WelcomeScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Welcome to FitCat!
            </Text>
            <RoundedButton onPress={NavigationActions.dashboard}>
              To Dashboard
            </RoundedButton>
          </View>

          <RoundedButton onPress={OAuthManager.authorizeFitbitAccount}>
            Connect FitBit Account
          </RoundedButton>
        </ScrollView>
      </View>
    )
  }
}
