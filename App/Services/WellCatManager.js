import { default as AppConfig } from '../Config/AppConfig'

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
  }

}
