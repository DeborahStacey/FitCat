import React from 'react'
import { Alert, AsyncStorage, ScrollView, Text, View, TextInput } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { default as WellCatManager } from '../Services/WellCatManager'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as StorageKeys } from '../Config/StorageKeys'

// Styles
import styles from './Styles/PresentationScreenStyle'

export default class PresentationScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  login (email, password) {
    WellCatManager.login(email, password)
      .then((result) => {
        if (result.code === 1) {
          AsyncStorage.setItem(StorageKeys.WELLCAT_EMAIL, email)
          NavigationActions.welcome()
        } else if (result.code === 0) {
          Alert.alert(`${I18n.t('unable')} ${result.content}.`)
        } else if (result.code === -1) {
          Alert.alert(`${I18n.t('tryLater')}`)
        } else {
          Alert.alert(`${I18n.t('horrible')}`)
        }
      })
  }

  signUp () {
    Alert.alert('Please visit the WellCat website to sign up.')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText} >
              {I18n.t('welcomeLogIn')}
            </Text>
            <Text style={styles.sectionText} >
              {I18n.t('email')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={I18n.t('email')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(email) => this.setState({email})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('password')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={I18n.t('password')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry
              autoCapitalize={'none'}
            />
            <RoundedButton onPress={() => this.login(this.state.email, this.state.password)}>
              {I18n.t('logIn')}
            </RoundedButton>
          </View>

          <RoundedButton onPress={this.signUp}>
            {I18n.t('signUp')}
          </RoundedButton>
        </ScrollView>
      </View>
    )
  }
}
