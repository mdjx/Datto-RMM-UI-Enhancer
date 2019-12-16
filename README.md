# Datto RMM UI Enhancer

This Chrome extension provides small enhancements to the Datto RMM UI. 

## Disclaimer

This extension is not affiliated or associated with Datto, Inc. in any way. It is an unofficial, third party browser extension made by a dRMM user. Use at your own risk.

## Features

- The Sites down menu does not truncate names and is longer, it also links to the Devices tab to each site instead of the Summary tab. 

The Devices tab includes the bulk of the improvements
- Device Hostname column: Windows Servers have a light blue background
- Last Seen column: Replaces timestamp with age (example: 18 hours 27 minutes)
- Last Audit column: Background color based on audit age (Green to Red gradient) and replaces the timestamp with age (for example: 5 hours 22 minutes)
- Operating System Column: Replaces Windows 10 Build number (10.0.18362) with the friendlier and shorter version (1903)
- Last Reboot column: Replaces timestamp with age (for example: 15 days 17 hours 8 minutes)
- Reboot Required column: Red background if a reboot is pending

![Extenstion Screenshot](/docs/screenshot.png)

## Installation

### Via the Chrome Store

The extension can be installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/datto-rmm-ui-enhancer/hipgdbnphembdgicadgomdoibpnppakd)

### Manually

Clone the repository and drag the `src` folder into the Chrome Extensions page. Developer mode will need to be enabled. 
