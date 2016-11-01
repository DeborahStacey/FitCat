import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import EntryScreen from '../Containers/EntryScreen'
import PresentationScreen from '../Containers/PresentationScreen'
import FitbitStatsScreen from '../Containers/FitbitStatsScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'
import Dashboard from '../Containers/Dashboard'
import CatDistance from '../Containers/CatDistance'
import CatSteps from '../Containers/CatSteps'
import Device from '../Containers/Device'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='entry' component={EntryScreen} title={I18n.t('fitcat')} />
            <Scene key='presentationScreen' component={PresentationScreen} title={I18n.t('fitcat')} renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='welcome' component={WelcomeScreen} title={I18n.t('fitcat')} />
            <Scene key='dashboard' component={Dashboard} title={I18n.t('dashboard')} />
            <Scene key='fitbitStats' component={FitbitStatsScreen} title={I18n.t('activity_summary')} />
            <Scene key='catDistance' component={CatDistance} title={I18n.t('cat_distance')} />
            <Scene key='catSteps' component={CatSteps} title={I18n.t('cat_steps')} />
            <Scene key='device' component={Device} title={I18n.t('device')} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
