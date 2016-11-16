import React from 'react'
import { AsyncStorage, ScrollView, Text, View } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as StorageKeys } from '../Config/StorageKeys'

// Styles
import styles from './Styles/EntryScreenStyle'

export default class EntryScreen extends React.Component {
  begin () {
    AsyncStorage.getItem(StorageKeys.WELLCAT_EMAIL)
      .then((wellcatEmail) => {
        if (wellcatEmail) {
          NavigationActions.dashboard()
        } else {
          NavigationActions.presentationScreen()
        }
      })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Welcome to FitCat!
            </Text>
            <RoundedButton onPress={this.begin}>
              Begin
            </RoundedButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}
