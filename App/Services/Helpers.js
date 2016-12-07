import { Linking } from 'react-native'
import SafariView from 'react-native-safari-view'
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs'
import { Colors } from '../Themes/'

module.exports = {

  /**
   * Strips out the scheme from the url returned with from a deep link
   * and returns the identifier before the first hash.
   *
   * Example: "fitcat://oauth-callback#access-token..." => "oauth-callback"
   */
  parseDeepLinkRoute (url) {
    return url.replace(/.*?:\/\//g, '').split('#')[0]
  },

  /**
   * Open a link using Chrome Custom Tabs.
   */
  openLinkChromeTabs: (url) => {
    CustomTabs.openURL(
      url,
      {
        toolbarColor: Colors.navigation,
        showPageTitle: true,
        animations: ANIMATIONS_SLIDE
      }
    ).catch(error => {
      console.error(error)
      module.exports.openLinkExternally(url)
    })
  },

  /**
   * Open a link using SFSafariViewController.
   */
  openLinkSafariView: (url) => {
    SafariView.show({
      url: url
    }).catch(error => {
      console.error(error)
      module.exports.openLinkExternally(url)
    })
  },

  /**
   * Open a link in an external browser.
   */
  openLinkExternally: (url) => {
    Linking.openURL(url).catch(err => console.err('An error occurred', err))
  }

}
