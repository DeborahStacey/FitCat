import React from 'react'
import { AsyncStorage, Alert, ScrollView, View, TextInput } from 'react-native'
import { default as StorageKeys } from '../Config/StorageKeys'

// Styles
import styles from './Styles/FitbitStatsScreenStyle'

export default class FitbitStatsScreen extends React.Component {

  constructor (props) {
    super(props)

    this.getDailyActivitySummary()
  }

  async getDailyActivitySummary () {
    let userId = await AsyncStorage.getItem(StorageKeys.FITBIT_USER_ID)
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)

    // TODO: Improve a lot
    fetch(`https://api.fitbit.com/1/user/${userId}/activities/date/${new Date().toISOString().slice(0, 10)}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.info(responseJson)
        Alert.alert(JSON.stringify(responseJson.summary))
      })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container} ref='container'>

          <View style={styles.section}>
            <TextInput style={styles.sectionText} editable={false} defaultValue='No data' ref='result' />
          </View>
        </ScrollView>
      </View>
    )
  }
}
