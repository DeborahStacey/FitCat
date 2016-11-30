import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import { default as WellCatManager } from '../Services/WellCatManager'
import I18n from 'react-native-i18n'

import styles from './Styles/ConsumptionStyles'

/*
Name
Brand OPTIONAL
Description OPTIONAL
*/

export default class ViewFoodConsumption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foodConsumption: []
    }
  }

  buildViewFoodConsumption = () => {
    var foodRecords = this.state.foodConsumption
    return foodRecords.map((record, index) => {
      var date = record.date
      var foodString = record.foodName && record.foodName.length > 0
        ? record.foodBrand + ' - ' + record.foodName
        : record.foodBrand
      var consumption = record.foodConsumption + I18n.t('cups')
      if (record.foodConsumption) {
        return (
          <View key={index}>
            <Text style={styles.labelText}>
              {date}
            </Text>
            <Text style={styles.valueText}>
              {foodString}
            </Text>
            <Text style={styles.valueText}>
              {consumption}
            </Text>
          </View>
        )
      }
      return (
        <View key={index}>
          <Text style={styles.labelText}>
            {date}
          </Text>
          <Text style={styles.valueText}>
            No food recorded.
          </Text>
        </View>
      )
    })
  }

  componentWillMount () {
    WellCatManager.getFoodConsumptionHistory().then(response => {
      this.setState({foodConsumption: response})
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.paddedContainer}>
            {this.state.foodConsumption && this.buildViewFoodConsumption()}
          </View>
        </ScrollView>
      </View>
    )
  }
}
