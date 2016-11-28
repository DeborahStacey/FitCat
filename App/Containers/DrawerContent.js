import React, { Component } from 'react'
import { AsyncStorage, ScrollView } from 'react-native'
import I18n from 'react-native-i18n'
import styles from './Styles/DrawerContentStyle'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as StorageKeys } from '../Config/StorageKeys'

class DrawerContent extends Component {

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressChangeCat = () => {
    this.toggleDrawer()
    NavigationActions.addCat()
  }

  handlePressLogOut = () => {
    this.toggleDrawer()
    AsyncStorage.setItem(StorageKeys.WELLCAT_EMAIL, '')
    AsyncStorage.setItem(StorageKeys.FITBIT_ACCESS_TOKEN, '')
    NavigationActions.notLoggedInDash()
  }

  handlePressFoodConsumption = () => {
    this.toggleDrawer()
    NavigationActions.foodConsumption()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <DrawerButton text={I18n.t('change_cat')} onPress={this.handlePressChangeCat} />
        <DrawerButton text={I18n.t('food_consumption')} onPress={this.handlePressFoodConsumption} />
        <DrawerButton text={I18n.t('logOut')} onPress={this.handlePressLogOut} />
        {/* <DrawerButton text='Component Examples' onPress={this.handlePressComponents} />
        <DrawerButton text='Usage Examples' onPress={this.handlePressUsage} />
        <DrawerButton text='API Testing' onPress={this.handlePressAPI} />
        <DrawerButton text='Themes' onPress={this.handlePressTheme} />
        <DrawerButton text='Device Info' onPress={this.handlePressDevice} /> */}
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
