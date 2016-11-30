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

  render () {
    return (
      <ScrollView style={styles.container}>
        <DrawerButton text={I18n.t('change_cat')} onPress={this.handlePressChangeCat} />
        <DrawerButton text={I18n.t('logOut')} onPress={this.handlePressLogOut} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
