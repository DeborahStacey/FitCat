import React, { Component } from 'react'
import { AsyncStorage, ScrollView, Image } from 'react-native'
import I18n from 'react-native-i18n'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
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

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  handlePressCatDistance = () => {
    this.toggleDrawer()
    NavigationActions.catDistance()
  }

  handlePressCatSteps = () => {
    this.toggleDrawer()
    NavigationActions.catSteps()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.device()
  }

  handlePressCatWeight = () => {
    this.toggleDrawer()
    NavigationActions.catWeight()
  }

  handlePressLogOut = () => {
    this.toggleDrawer()
    AsyncStorage.setItem(StorageKeys.WELLCAT_EMAIL, '')
    NavigationActions.notLoggedInDash()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.keyboardCat} style={styles.logo} />
        <DrawerButton text={I18n.t('cat_distance')} onPress={this.handlePressCatDistance} />
        <DrawerButton text={I18n.t('cat_steps')} onPress={this.handlePressCatSteps} />
        <DrawerButton text={I18n.t('device')} onPress={this.handlePressDevice} />
        <DrawerButton text={I18n.t('cat_weight')} onPress={this.handlePressCatWeight} />
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
