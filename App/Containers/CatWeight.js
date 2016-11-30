import React from 'react'
import { Text, View, TextInput } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import { default as WellCatManager } from '../Services/WellCatManager'
import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/CatWeightStyle'

export default class CatWeight extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      weight: 0,
      inputWeight: 0
    }
    this.getWeight()
  }

  async getWeight () {
    WellCatManager.getActiveCat().then((result) => {
      console.log(result)
      this.setState({
        weight: result.pet.weight
      })
    })
  }

  updateWeightPress = () => {
    WellCatManager.updateWeight(this.state.inputWeight)
    this.getWeight()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.weightText}>Current Weight: {this.state.weight}</Text>
        <View>
          <TextInput
            style={styles.updateInput}
            placeholder={I18n.t('update_weight_placeholder')}
            placeholderTextColor={Colors.placeholderText}
            autoCapitalize={'none'}
            onChangeText={(inputWeight) => this.setState({inputWeight})}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.updateButtonView}>
          <RoundedButton onPress={() => this.updateWeightPress()}>
            {I18n.t('update_weight')}
          </RoundedButton>
        </View>
      </View>
    )
  }
}
