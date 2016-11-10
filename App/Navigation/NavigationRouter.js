import React, { Component } from 'react'
import { ActionConst, Scene, Router } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import SignUpScreen from '../Containers/SignUpScreen'
import Dashboard from '../Containers/Dashboard'
import AddCat from '../Containers/AddCat'
import CatDistance from '../Containers/CatDistance'
import CatSteps from '../Containers/CatSteps'
import Device from '../Containers/Device'
import FoodConsumption from '../Containers/FoodConsumption'
import NavItems from './NavItems'
import CatWeight from '../Containers/CatWeight'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='signUp' component={SignUpScreen} title={I18n.t('fitcat')} />
            <Scene initial key='dashboard' component={Dashboard} title={I18n.t('dashboard')} type={ActionConst.RESET} renderLeftButton={NavItems.hamburgerButton} >
              <Scene key='loggedInDash' />
              <Scene key='notLoggedInDash' mustLogin onLeft={() => { return }} renderLeftButton={() => { return }} />
            </Scene>
            <Scene key='signUp' component={SignUpScreen} title={I18n.t('fitcat')} />
            <Scene key='catDistance' component={CatDistance} title={I18n.t('cat_distance')} />
            <Scene key='catSteps' component={CatSteps} title={I18n.t('cat_steps')} />
            <Scene key='device' component={Device} title={I18n.t('device')} />
            <Scene key='catWeight' component={CatWeight} title={I18n.t('cat_weight')} />
            <Scene key='addCat' component={AddCat} title={I18n.t('register_your_cat')} />
            <Scene key='foodConsumption' component={FoodConsumption} title={I18n.t('food_consumption')} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
