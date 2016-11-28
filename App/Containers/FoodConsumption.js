import React from 'react'
import { AsyncStorage, Picker, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import { default as StorageKeys } from '../Config/StorageKeys'
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundedButton from '../Components/RoundedButton'
import { default as WellCatManager } from '../Services/WellCatManager'
import I18n from 'react-native-i18n'

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
      selectedFood: {},
      selectedFoodIndex: -1
    }
  }

  handleAddFoodTypePress = () => {
    this.setState({
      hideFoodForm: false
    })
  }

  saveFoodTypes = () => {
    if (this.state.formNameText === '') {
      // TODO:: some kind of error validation
      return
    }
    var foodTypes = this.state.foodTypes
    var newFoodType = {'name': this.state.formNameText, 'brand': this.state.formBrandText, 'description': this.state.formDescText}
    foodTypes.push(newFoodType)
    this.setState({foodTypes: foodTypes})
    AsyncStorage.setItem(StorageKeys.SAVED_FOOD_TYPES, JSON.stringify(foodTypes))
    this.setState({
      hideFoodForm: true,
      formNameText: '',
      formBrandText: '',
      formDescText: ''
    })
  }

  buildPicker = () => {
    var foodTypes = this.state.foodTypes
    console.log('BUILDING A PICKER YO!')
    console.log(foodTypes)
    if (foodTypes.length === 0) {
      return (
        <Picker.Item label='No saved food types' value={{}} />
      )
    } else {
      var pickerItems = []
      for (var i = 0; i < foodTypes.length; i++) {
        pickerItems.push(<Picker.Item key={i} label={foodTypes[i].brand + ' - ' + foodTypes[i].name} value={i} />)
      }
      return (
        pickerItems
      )
    }
  }

  selectedFoodChanged = (foodIndex) => {
    this.setState({
      selectedFoodIndex: foodIndex,
      selectedFood: this.state.foodTypes[foodIndex]
    })
  }

  submitFoodRecord = async () => {
    console.log('SUBMIT METHOD')
    var currentSelectedFood = this.state.selectedFood
    console.log(currentSelectedFood)
    var foodString = currentSelectedFood.brand.length > 0 ? currentSelectedFood.brand + ' - ' + currentSelectedFood.name : currentSelectedFood.name
    var currentPetId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    WellCatManager.submitFoodRecord(currentPetId, foodString, currentSelectedFood.description, parseFloat(this.state.formCupsText))
  }

  resetAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem(StorageKeys.SAVED_FOOD_TYPES, '')
      this.setState({foodTypes: []})
    } catch (error) {
      console.log(error)
    }
  }

  componentWillMount () {
    try {
      AsyncStorage.getItem(StorageKeys.SAVED_FOOD_TYPES).then(response => {
        var parsed = JSON.parse(response)
        console.log('FOOD TYPES')
        console.log(parsed)
        this.setState({foodTypes: parsed})
      })
    } catch (error) {
      console.log('Error getting food types!')
      console.log(error)
    }
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

          <View style={styles.pickerContainerStyle}>
            <Picker style={styles.pickerStyle} selectedValue={this.state.selectedFoodIndex} onValueChange={this.selectedFoodChanged}>
              {this.buildPicker()}
            </Picker>
          </View>

          <Text style={styles.sectionText}>
            How many cups did your cat eat?
          </Text>
          <TextInput
            style={{height: 40}}
            keyboardType={'numeric'}
            placeholder='Cups'
            onChangeText={(cups) => this.setState({
              formCupsText: cups
            })} />
          <RoundedButton onPress={() => this.submitFoodRecord()}>
            {I18n.t('submitFoodRecord')}
          </RoundedButton>
        </ScrollView>
      </View>
    )
  }
}
