import React from 'react'
import { AsyncStorage, Text, TextInput, ScrollView, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as StorageKeys } from '../Config/StorageKeys'
import RoundedButton from '../Components/RoundedButton'
import { default as WellCatManager } from '../Services/WellCatManager'
import I18n from 'react-native-i18n'

import styles from './Styles/ConsumptionStyles'

/*
Name
Brand OPTIONAL
Description OPTIONAL
*/

export default class WaterConsumption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formCupsText: ''
    }
  }

  submitWaterRecord = async () => {
    var inputWater = parseFloat(this.state.formCupsText)
    if (!inputWater > 0) {
      return
    }
    var currentPetId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    WellCatManager.submitWaterRecord(currentPetId, inputWater)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.paddedContainer}>
            <Text style={styles.sectionText}>
              {I18n.t('cups_water_propt')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginBottom: 15}}
              keyboardType={'numeric'}
              placeholder='Cups'
              onChangeText={(cups) => this.setState({
                formCupsText: cups
              })} />
            <RoundedButton onPress={() => this.submitWaterRecord()}>
              {I18n.t('submit_water_record')}
            </RoundedButton>

            <RoundedButton onPress={() => NavigationActions.viewWaterConsumption()}>
              {I18n.t('view_water_consumption')}
            </RoundedButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}
