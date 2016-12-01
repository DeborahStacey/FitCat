import React from 'react'
import { Alert, AsyncStorage, ScrollView, Text, TextInput, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import Dropdown from '../Components/Dropdown'
import { default as WellCatManager } from '../Services/WellCatManager'
import { default as StorageKeys } from '../Config/StorageKeys'

// Styles
import styles from './Styles/SignUpScreenStyle'

export default class WelcomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      fName: '',
      lName: '',
      street: '',
      unit: '',
      city: '',
      pCode: '',
      locationId: -1,
      countries: {}
    }
  }

  componentWillMount () {
    var that = this
    WellCatManager.getCountries()
      .then((result) => {
        if (result.code === 1) {
          that.setState({
            countries: {'items': result.content}
          })
        } else {
          Alert.alert(`${I18n.t('tryLater')}`)
        }
      }).catch((error) => {
        Alert.alert(error)
      })
  }

  signUp (fName, lName, email, password, street, unit, city, pCode, locationId) {
    if (!unit) {
      unit = '-'
    }

    WellCatManager.signUp(fName, lName, email, password, street, unit, city, pCode, locationId)
      .then((result) => {
        if (result.code === 1) {
          AsyncStorage.setItem(StorageKeys.WELLCAT_EMAIL, email)
          NavigationActions.dashboard()
        } else if (result.code === 0) {
          Alert.alert(`${I18n.t('unableWellCat')} ${result.content}.`)
        } else if (result.code === -1) {
          Alert.alert(`${I18n.t('tryLater')}`)
        } else {
          Alert.alert(`${I18n.t('horrible')}`)
        }
      })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText} >
            {I18n.t('welcomeSignUp')}
          </Text>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              {I18n.t('fName')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('fName')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(fName) => this.setState({fName})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('lName')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('lName')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(lName) => this.setState({lName})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('email')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('email')}
              placeholderTextColor={Colors.placeholderText}
              keyboardType={'email-address'}
              onChangeText={(email) => this.setState({email})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('password')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('password')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(password) => this.setState({password})}
              autoCapitalize={'none'}
              secureTextEntry
            />
            <Text style={styles.sectionText} >
              {I18n.t('street')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('street')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(street) => this.setState({street})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('unit')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('unit')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(unit) => this.setState({unit})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('city')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('city')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(city) => this.setState({city})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('pCode')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('pCode')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(pCode) => this.setState({pCode})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('locationId')}
            </Text>
            <Dropdown
              options={this.state.countries}
              selectedValue={this.state.locationId}
              onValueChange={(locationId) => this.setState({locationId})}
            />
          </View>

          <View style={styles.paddedContainer}>
            <RoundedButton onPress={() => this.signUp(this.state.fName, this.state.lName, this.state.email, this.state.password, this.state.street, this.state.unit, this.state.city, this.state.pCode, this.state.locationId)}>
              {I18n.t('signUp')}
            </RoundedButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}
