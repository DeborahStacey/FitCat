import { AsyncStorage } from 'react-native'
import I18n from 'react-native-i18n'
import { default as AppConfig } from '../Config/AppConfig'
import { default as StorageKeys } from '../Config/StorageKeys'
import Moment from 'moment'

module.exports = {

  login: (email, password) => {
    let wellcatLoginUrl = `${AppConfig.WELLCAT_BASE}/user/login`

    return fetch(wellcatLoginUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`
      })
    }).then((response) => {
      if (response.ok) {
        return { code: 1, content: '' }
      }
      var body = response._bodyText
      var bodyObj = JSON.parse(body)
      var message = bodyObj.error
      return { code: 0, content: message }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  signUp: (fName, lName, email, password, street, unit, city, pCode, locationId) => {
    let wellcatSignupUrl = `${AppConfig.WELLCAT_BASE}/user/register`

    return fetch(wellcatSignupUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        firstName: `${fName}`,
        lastName: `${lName}`,
        address: {
          street: `${street}`,
          unit: `${unit}`,
          city: `${city}`,
          postalCode: `${pCode}`,
          locationID: locationId
        }
      })
    }).then((response) => {
      if (response.ok) {
        return { code: 1, content: '' }
      }
      var body = response._bodyText
      var bodyObj = JSON.parse(body)
      var message = bodyObj.error
      return { code: 0, content: message }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  getCountries: () => {
    let wellcatCountriesUrl = `${AppConfig.WELLCAT_BASE}/address/countries`

    return fetch(wellcatCountriesUrl, {
      method: 'GET'
    }).then((response) => {
      var body = response._bodyText
      var bodyObj = JSON.parse(body)
      if (response.ok) {
        return { code: 1, content: bodyObj.countries }
      }
      return { code: 0, content: bodyObj.error }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  fetchCatsList: () => {
    let wellcatUrl = `${AppConfig.WELLCAT_BASE}/pet/pets`
    return fetch(wellcatUrl, {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.length !== 0) {
        let catsList = []
        catsList[I18n.t('personal_cats')] = responseJson.personal

        return catsList
      }
      return {}
    })
  },

  async getActiveCat () {
    let catId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    let wellcatGetPetsUrl = `${AppConfig.WELLCAT_BASE}/fitcat/view/${catId}`

    return fetch(wellcatGetPetsUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return JSON.parse(response._bodyText)
      }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  async updateWeight (weight) {
    let catId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    let wellcatUpdateWeightUrl = `${AppConfig.WELLCAT_BASE}/fitcat/weight`

    return fetch(wellcatUpdateWeightUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'petID': catId,
        'weight': weight,
        'date': Moment().format('YYYY[-]MM[-]DD')
      })
    }).then((response) => {
      if (response.ok) {
        return
      }
    }).catch((error) => {
      console.log(error)
      return { code: -1, content: error }
    })
  },

  addCat: async (cat) => {
    let wellcatUrl = `${AppConfig.WELLCAT_BASE}/fitcat/register`

    return fetch(wellcatUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        petID: cat.petid
      })
    }).then((response) => {
      if (response.ok) {
        try {
          AsyncStorage.setItem(StorageKeys.CAT_ID, cat.petid.toString())
          AsyncStorage.setItem(StorageKeys.CAT_NAME, cat.name.toString())
        } catch (error) {
          console.error('Error saving to AsyncStorage', error)
        }
      } else {
        console.error(response)
      }
    }).catch((error) => {
      console.error(error)
    })
  },

  submitFoodRecord: async (petId, foodBrand, foodName, foodDescription, foodAmount) => {
    let wellcatUrl = `${AppConfig.WELLCAT_BASE}/fitcat/food`

    return fetch(wellcatUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        petID: petId,
        brand: foodBrand,
        name: foodName,
        description: foodDescription,
        amount: foodAmount,
        date: Moment().format('YYYY-MM-DD')
      })
    }).then((response) => {
      if (!response.ok) {
        console.error(response)
      }
      return
    }).catch((error) => {
      console.error(error)
    })
  },

  getFoodConsumptionHistory: async () => {
    let catId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    let wellcatGetPetsUrl = `${AppConfig.WELLCAT_BASE}/fitcat/view/${catId}`

    return fetch(wellcatGetPetsUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        var json = JSON.parse(response._bodyText)
        var fitCatArray = json.fitcat
        var foodConsumption = []
        for (var i = 0; i < fitCatArray.length; i++) {
          foodConsumption.push(
            {
              date: fitCatArray[i].date,
              foodBrand: fitCatArray[i].foodbrand,
              foodDescription: fitCatArray[i].description,
              foodName: fitCatArray[i].name,
              foodConsumption: fitCatArray[i].foodconsumption
            }
          )
        }
        return foodConsumption
      }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  submitWaterRecord: async (petId, waterAmount) => {
    let wellcatUrl = `${AppConfig.WELLCAT_BASE}/fitcat/water`

    return fetch(wellcatUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        petID: petId,
        amount: waterAmount,
        date: Moment().format('YYYY-MM-DD')
      })
    }).then((response) => {
      if (!response.ok) {
        console.error(response)
      }
      return
    }).catch((error) => {
      console.error(error)
    })
  },

  getWaterConsumptionHistory: async () => {
    let catId = await AsyncStorage.getItem(StorageKeys.CAT_ID)
    let wellcatGetPetsUrl = `${AppConfig.WELLCAT_BASE}/fitcat/view/${catId}`

    return fetch(wellcatGetPetsUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        var json = JSON.parse(response._bodyText)
        var fitCatArray = json.fitcat
        var waterConsumption = []
        for (var i = 0; i < fitCatArray.length; i++) {
          waterConsumption.push(
            {
              date: fitCatArray[i].date,
              waterConsumption: fitCatArray[i].waterconsumption
            }
          )
        }
        return waterConsumption
      }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  }
}
