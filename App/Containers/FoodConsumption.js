import React from 'react'
import { AsyncStorage, Picker, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as StorageKeys } from '../Config/StorageKeys'
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundedButton from '../Components/RoundedButton'
import { default as WellCatManager } from '../Services/WellCatManager'
import I18n from 'react-native-i18n'

import styles from './Styles/ConsumptionStyles'

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
      hideFoodForm: !this.state.hideFoodForm
    })
  }

  saveFoodTypes = () => {
    if (this.state.formNameText === '') {
      // TODO:: some kind of error validation
      return
    }
    var foodTypes = this.state.foodTypes || []
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
    if (foodTypes === null || foodTypes.length === 0) {
      return (
        <Picker.Item label='No saved food types' value={{}} />
      )
    } else {
      var pickerItems = []
      for (var i = 0; i < foodTypes.length; i++) {
        var foodString = foodTypes[i].brand && foodTypes[i].brand.length > 0 ? foodTypes[i].brand + ' - ' + foodTypes[i].name : foodTypes[i].name
        pickerItems.push(<Picker.Item key={i} label={foodString} value={i} />)
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
    if (this.state.foodTypes.length === 0) {
      return
    }
    var currentSelectedFood = !this.state.selectedFood.brand ? this.state.foodTypes[0] : this.state.selectedFood
    var currentSelectedFoodDescription = currentSelectedFood.description.length === 0 ? ' ' : currentSelectedFood.description
    var currentPetId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    WellCatManager.submitFoodRecord(currentPetId, currentSelectedFood.brand, currentSelectedFood.name, currentSelectedFoodDescription, parseFloat(this.state.formCupsText))
  }

  componentWillMount () {
    try {
      AsyncStorage.getItem(StorageKeys.SAVED_FOOD_TYPES).then(response => {
        var parsed = JSON.parse(response)
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
            {this.state.hideFoodForm ? <Icon style={styles.addFoodTypeIcon} name='plus' size={20} /> : <Icon style={styles.addFoodTypeIcon} name='minus' size={20} />}
          </TouchableOpacity>
          {this.state.hideFoodForm ? null
            : <View style={styles.paddedContainer}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginBottom: 15}}
                placeholder={I18n.t('name_required')}
                onChangeText={(text) => this.setState({
                  formNameText: text
                })}
                value={this.state.formNameText}
              />
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginBottom: 15}}
                placeholder={I18n.t('brand')}
                onChangeText={(text) => this.setState({
                  formBrandText: text
                })}
                value={this.state.formBrandText}
              />
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginBottom: 15}}
                placeholder={I18n.t('description')}
                onChangeText={(text) => this.setState({
                  formDescText: text
                })}
                value={this.state.formDescText}
              />
              <RoundedButton onPress={this.saveFoodTypes}>
                {I18n.t('save_food_type')}
              </RoundedButton>
            </View>
          }

          <View style={styles.paddedContainer}>
            <Picker style={styles.pickerStyle} selectedValue={this.state.selectedFoodIndex} onValueChange={this.selectedFoodChanged}>
              {this.buildPicker()}
            </Picker>
          </View>

          <View style={styles.paddedContainer}>
            <Text style={styles.sectionText}>
              {I18n.t('cups_food_prompt')}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              keyboardType={'numeric'}
              placeholder='Cups'
              onChangeText={(cups) => this.setState({
                formCupsText: cups
              })} />
          </View>
          <RoundedButton onPress={() => this.submitFoodRecord()}>
            {I18n.t('submit_food_record')}
          </RoundedButton>

          <RoundedButton onPress={() => NavigationActions.viewFoodConsumption()}>
            {I18n.t('view_food_consumption')}
          </RoundedButton>
        </ScrollView>
      </View>
    )
  }
}
