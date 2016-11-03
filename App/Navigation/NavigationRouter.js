import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import FitbitStatsScreen from '../Containers/FitbitStatsScreen'
import Dashboard from '../Containers/Dashboard'
import CatDistance from '../Containers/CatDistance'
import CatSteps from '../Containers/CatSteps'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title={I18n.t('fitcat')} renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='dashboard' component={Dashboard} title={I18n.t('dashboard')} />
            <Scene key='fitbitStats' component={FitbitStatsScreen} title={I18n.t('activity_summary')} />
            <Scene key='catDistance' component={CatDistance} title={I18n.t('cat_distance')} />
            <Scene key='catSteps' component={CatSteps} title={I18n.t('cat_steps')} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
