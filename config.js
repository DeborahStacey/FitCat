module.exports = {
  // FitBit
  fitbit_app_id: '2282DH',
  fitbit_callback_uri: 'fitcat%3A%2F%2Foauth-callback',
  fitbit_scope: 'activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight',
  fitbit_expiration: 60 * 60 * 24 * 365, // 1 year - default value, user-changeable during auth
  fitbit_state: Math.ceil(Math.random() * 10000) // TODO: look into this field more (security-related)
}
