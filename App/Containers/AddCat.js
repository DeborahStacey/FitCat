import React from 'react'
import { View, ScrollView } from 'react-native'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'

import { default as WellCatManager } from '../Services/WellCatManager'

import styles from './Styles/DeviceStyle'

export default class AddCat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  addCat () {
    WellCatManager.addCat(1)  // TODO
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <RoundedButton onPress={this.addCat}>
            {I18n.t('registerYourCat')}
          </RoundedButton>
        </ScrollView>
      </View>
      )
  }
}
