import React from 'react'
import { Text, View, TextInput } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import { default as WellCatManager } from '../Services/WellCatManager'
import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/CatWeightStyle'
import GraphComponent from '../Components/GraphComponent'

export default class CatWeight extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      weight: 0,
      inputWeight: 0,
      petObject: {}
    }
    this.getWeight()
  }

  async getWeight () {
    WellCatManager.getActiveCat().then((result) => {
      console.log(result)
      this.setState({
        weight: result.pet.weight,
        petObject: result.fitcat
      })
    })
  }

  updateWeightPress = () => {
    WellCatManager.updateWeight(this.state.inputWeight)
    this.getWeight()
  }

  render () {
    var weightHistory = []
    for (var i = 0; i < this.state.petObject.length; i++) {
      weightHistory.push({ 'label': this.state.petObject[i].date, 'value': this.state.petObject[i].weight })
    }

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.weightText}>Current Weight: {this.state.weight}</Text>
        <View>
          <View style={styles.updateContainer}>
            <TextInput
              style={styles.updateInput}
              placeholder={I18n.t('update_weight_placeholder')}
              placeholderTextColor={Colors.placeholderText}
              autoCapitalize={'none'}
              onChangeText={(inputWeight) => this.setState({inputWeight})}
              keyboardType='numeric'
              maxLength={6}
            />
            <RoundedButton onPress={() => this.updateWeightPress()}>
              {I18n.t('update_weight')}
            </RoundedButton>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.weightText}>Weight History</Text>
        <GraphComponent data={weightHistory} barMultiplier={14} />
      </View>
    )
  }
}
