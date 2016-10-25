import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import FitbitStatsScreen from '../Containers/FitbitStatsScreen'
import Dashboard from '../Containers/Dashboard'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title='FitCat' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='dashboard' component={Dashboard} title='Dashboard' />
            <Scene key='fitbitStats' component={FitbitStatsScreen} title='Activity Summary' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
