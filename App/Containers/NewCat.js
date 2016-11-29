import React from 'react'
import { Alert, AsyncStorage, DatePickerIOS, Platform, ScrollView, Switch, Text, TextInput, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import Dropdown from '../Components/Dropdown'
import { default as WellCatManager } from '../Services/WellCatManager'
import { default as StorageKeys } from '../Config/StorageKeys'

// Styles
import styles from './Styles/NewCatStyle'

export default class WelcomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      type: 1,
      breed: -1,
      gender: -1,
      dob: new Date(),
      weight: '',
      height: '',
      length: '',
      declawed: false,
      outdoor: false,
      fixed: false,
      breeds: {},
      genders: {},
      timeZoneOffsetInMinutes: (-1) * (new Date().getTimezoneOffset())
    }
  }

  componentWillMount () {
    var that = this

    WellCatManager.getCatBreeds()
      .then((result) => {
        if (result.code === 1) {
          that.setState({
            breeds: {'items': result.content}
          })
        } else {
          Alert.alert(`${I18n.t('tryLater')}`)
        }
      }).catch((error) => {
        Alert.alert(error)
      })

    WellCatManager.getAnimalGenders()
      .then((result) => {
        if (result.code === 1) {
          that.setState({
            genders: {'items': result.content}
          })
        } else {
          Alert.alert(`${I18n.t('tryLater')}`)
        }
      }).catch((error) => {
        Alert.alert(error)
      })
  }

  createCat (name, type, breed, gender, dob, weight, height, length, declawed, outdoor, fixed) {
    var dobFormatted = 'Y-m-d'
      .replace('Y', dob.getFullYear())
      .replace('m', dob.getMonth()+1)
      .replace('d', dob.getDate())
    
    WellCatManager.newAnimal(name, type, breed, gender, dobFormatted, weight, height, length, declawed, outdoor, fixed)
      .then((result) => {
        if (result.code === 1) {
          NavigationActions.addCat()
        } else if (result.code === 0) {
          Alert.alert(`${I18n.t('unableNewCat')} ${result.content}.`)
        } else if (result.code === -1) {
          Alert.alert(`${I18n.t('tryLater')}`)
          Alert.alert(JSON.stringify(result.content))
        } else {
          Alert.alert(`${I18n.t('horrible')}`)
        }
      })
  }

  render () {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <Text style={styles.sectionText} >
              {I18n.t('welcomeNewCat')}
            </Text>

            <View style={styles.section} >
              <Text style={styles.sectionText} >
                {I18n.t('name')}
              </Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                placeholder={I18n.t('name')}
                placeholderTextColor={Colors.placeholderText}
                onChangeText={(name) => this.setState({name})}
                autoCapitalize={'none'}
              />
              <Text style={styles.sectionText} >
                {I18n.t('breed')}
              </Text>
              <Dropdown
                options={this.state.breeds}
                selectedValue={this.state.breed}
                onValueChange={(breed) => this.setState({breed})}
              />
              <Text style={styles.sectionText} >
                {I18n.t('gender')}
              </Text>
              <Dropdown
                options={this.state.genders}
                selectedValue={this.state.gender}
                onValueChange={(gender) => this.setState({gender})}
              />
              <Text style={styles.sectionText} >
                {I18n.t('dob')}
              </Text>
              <DatePickerIOS
                date={this.state.dob}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInMinutes}
                onDateChange={(dob) => this.setState({dob})}
              />
              <Text style={styles.sectionText} >
                {I18n.t('weight')}
              </Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                placeholder={I18n.t('weight')}
                placeholderTextColor={Colors.placeholderText}
                onChangeText={(weight) => this.setState({weight})}
                autoCapitalize={'none'}
              />
              <Text style={styles.sectionText} >
                {I18n.t('height')}
              </Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                placeholder={I18n.t('height')}
                placeholderTextColor={Colors.placeholderText}
                onChangeText={(height) => this.setState({height})}
                autoCapitalize={'none'}
              />
              <Text style={styles.sectionText} >
                {I18n.t('length')}
              </Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                placeholder={I18n.t('length')}
                placeholderTextColor={Colors.placeholderText}
                onChangeText={(length) => this.setState({length})}
                autoCapitalize={'none'}
              />
              <Text style={styles.sectionText} >
                {I18n.t('declawed')}
              </Text>
              <Switch
                value={this.state.declawed}
                onValueChange={(declawed) => this.setState({declawed})}
              />
              <Text style={styles.sectionText} >
                {I18n.t('outdoor')}
              </Text>
              <Switch
                value={this.state.outdoor}
                onValueChange={(outdoor) => this.setState({outdoor})}
              />
              <Text style={styles.sectionText} >
                {I18n.t('fixed')}
              </Text>
              <Switch
                value={this.state.fixed}
                onValueChange={(fixed) => this.setState({fixed})}
              />
            </View>

            <View style={styles.paddedContainer}>
              <RoundedButton onPress={() => this.createCat(this.state.name, this.state.type, this.state.breed, this.state.gender, this.state.dob, this.state.weight, this.state.height, this.state.length, this.state.declawed, this.state.outdoor, this.state.fixed)}>
                {I18n.t('addNewCat')}
              </RoundedButton>
            </View>
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText} >
            {I18n.t('welcomeNewCat')}
          </Text>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              {I18n.t('name')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('name')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(name) => this.setState({name})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('breed')}
            </Text>
            <Dropdown
              options={this.state.breeds}
              selectedValue={this.state.breed}
              onValueChange={(breed) => this.setState({breed})}
            />
            <Text style={styles.sectionText} >
              {I18n.t('gender')}
            </Text>
            <Dropdown
              options={this.state.genders}
              selectedValue={this.state.gender}
              onValueChange={(gender) => this.setState({gender})}
            />
            <Text style={styles.sectionText} >
              {I18n.t('dob')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('dob')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(dob) => this.setState({dob})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('weight')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('weight')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(weight) => this.setState({weight})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('height')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('height')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(height) => this.setState({height})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('length')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              placeholder={I18n.t('length')}
              placeholderTextColor={Colors.placeholderText}
              onChangeText={(length) => this.setState({length})}
              autoCapitalize={'none'}
            />
            <Text style={styles.sectionText} >
              {I18n.t('declawed')}
            </Text>
            <Switch
              value={this.state.declawed}
              onValueChange={(declawed) => this.setState({declawed})}
            />
            <Text style={styles.sectionText} >
              {I18n.t('outdoor')}
            </Text>
            <Switch
              value={this.state.outdoor}
              onValueChange={(outdoor) => this.setState({outdoor})}
            />
            <Text style={styles.sectionText} >
              {I18n.t('fixed')}
            </Text>
            <Switch
              value={this.state.fixed}
              onValueChange={(fixed) => this.setState({fixed})}
            />
          </View>

          <View style={styles.paddedContainer}>
            <RoundedButton onPress={() => this.createCat(this.state.name, this.state.type, this.state.breed, this.state.gender, this.state.dob, this.state.weight, this.state.height, this.state.length, this.state.declawed, this.state.outdoor, this.state.fixed)}>
              {I18n.t('addNewCat')}
            </RoundedButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}
