import React from 'react'
import { AsyncStorage, Picker, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import { default as StorageKeys } from '../Config/StorageKeys'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './Styles/FoodConsumptionStyle'

/*
Name
Brand OPTIONAL
Description OPTIONAL
*/

export default class FoodConsumption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foodTypes: [],
      hideFoodForm: true,
      formNameText: '',
      formBrandText: '',
      formDescText: '',
      selectedFood: ''
    }

    this.imlazydothing()
  }

  imlazydothing = async () => {
    this.setState({foodTypes: await this.getFoodTypes()})
  }

  handleAddFoodTypePress = () => {
    this.setState({
      hideFoodForm: false
    })
  }

  resetAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem(StorageKeys.SAVED_FOOD_TYPES, '')
      this.setState({foodTypes: []})
    } catch (error) {
      console.log(error)
    }
  }

  getFoodTypes = async () => {
    var foodTypes = []
    try {
      var stringFoodTypes = await AsyncStorage.getItem(StorageKeys.SAVED_FOOD_TYPES)
      if (stringFoodTypes != null) {
        foodTypes = JSON.parse(stringFoodTypes)
      }
    } catch (error) {
      console.log('Failed trying to read food types from AsyncStorage')
      console.log(error)
      foodTypes = []
    }

    console.log(foodTypes)
    return foodTypes
  }

  saveFoodTypes = async () => {
    var newFoodType = {
      name: this.state.formNameText,
      brand: this.state.formBrandText,
      description: this.state.formDescText
    }

    var foodTypes = this.state.foodTypes
    foodTypes.push(newFoodType)
    try {
      await AsyncStorage.setItem(StorageKeys.SAVED_FOOD_TYPES, JSON.stringify(foodTypes))
    } catch (error) {
      console.log('Failed trying to save food types to AsyncStorage')
      console.log(error)
    }

    console.log('SAVING FOOD TYPES')
    console.log(foodTypes)
    this.setState({foodTypes: foodTypes})
  }

  buildFoodTypeDisplay = () => {
    var foodTypes = this.state.foodTypes
    var displayedFoodTypes = []
    if (foodTypes === null || foodTypes === undefined) {
      foodTypes = []
    }
    console.log(foodTypes)
    foodTypes.forEach((foodType, i) => {
      displayedFoodTypes.push(<Picker.Item key={i} style={styles.sectionText} label={foodType.name} value={foodType.name} />)
    })
    return displayedFoodTypes
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.addFoodTypeContainer} onPress={this.handleAddFoodTypePress}>
            <Text style={styles.sectionText}>Add a new food type</Text>
            <Icon style={styles.addFoodTypeIcon} name='plus' size={20} />
          </TouchableOpacity>
          {this.state.hideFoodForm ? null
            : <View style={styles.container}>
              <TextInput
                style={{height: 40}}
                placeholder='Name (Required)'
                onChangeText={(text) => this.setState({
                  formNameText: text
                })}
              />
              <TextInput
                style={{height: 40}}
                placeholder='Brand'
                onChangeText={(text) => this.setState({
                  formBrandText: text
                })}
              />
              <TextInput
                style={{height: 40}}
                placeholder='Description'
                onChangeText={(text) => this.setState({
                  formDescText: text
                })}
              />
              <TouchableOpacity onPress={this.saveFoodTypes}>
                <Text style={styles.sectionText}>Click</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.resetAsyncStorage}>
                <Text style={styles.sectionText}>Clear</Text>
              </TouchableOpacity>
            </View>
          }
          {
            this.state.foodTypes && this.buildFoodTypeDisplay()
          }
        </ScrollView>
      </View>
    )
  }
}
