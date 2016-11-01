module.exports = {
  // FitBit
  FITBIT_APP_ID: '2282DH',
  FITBIT_CALLBACK_URI: 'fitcat%3A%2F%2Foauth-callback',
  FITBIT_SCOPE: 'activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight',
  FITBIT_EXPIRATION: 60 * 60 * 24 * 365, // 1 year - default value, user-changeable during auth
  FITBIT_STATE: Math.ceil(Math.random() * 10000), // TODO: look into this field more (security-related)

  WELLCAT_BASE: 'https://cat.ddns.net/Backend/api.php'
}
