import React from 'react'
import { Text, View } from 'react-native'
import { default as WellCatManager } from '../Services/WellCatManager'
import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/CatWeightStyle'

export default class CatWeight extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      weight: 0
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
    WellCatManager.updateWeight()
    this.getWeight()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Current Weight: {this.state.weight}</Text>
        <RoundedButton onPress={() => this.updateWeightPress()}>
          Update Weight
        </RoundedButton>
      </View>
      )
  }
}
