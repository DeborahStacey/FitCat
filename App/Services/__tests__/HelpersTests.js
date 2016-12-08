it('tests that parseDeepLinkRoute extracts route from response', () => {
  const Helpers = require('../Helpers')
  expect(Helpers.parseDeepLinkRoute('fitcat://oauth-callback#access-token...')).toBe('oauth-callback')
})
