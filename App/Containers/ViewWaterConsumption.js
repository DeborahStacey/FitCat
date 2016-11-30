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

export default class ViewWaterConsumption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      waterConsumption: []
    }
  }

  buildViewWaterConsumption = () => {
    var waterRecords = this.state.waterConsumption
    return waterRecords.map((record, index) => {
      var date = record.date
      var consumption = record.waterConsumption + I18n.t('cups_of_water')
      if (record.waterConsumption) {
        return (
          <View key={index}>
            <Text style={styles.labelText}>
              {date}
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
            No water consumption recorded.
          </Text>
        </View>
      )
    })
  }

  componentWillMount () {
    WellCatManager.getWaterConsumptionHistory().then(response => {
      this.setState({waterConsumption: response})
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.paddedContainer}>
            {this.state.waterConsumption && this.buildViewWaterConsumption()}
          </View>
        </ScrollView>
      </View>
    )
  }
}
