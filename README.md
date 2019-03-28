
# Food Allergy Mobile Application &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AlexMachin1997/Food-Allergy-Mobile-Application/README.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

The repository consists of a React-Native mobile application, it's designed to help allergens avoid foods they can't come into contact with.

As part of the README file it will describe and explain the following sections:
* Purpose 
* Core features
* Technologies used
* Getting started
* Deployment notes
* Contributing
* Project information

## Purpose
The overall purpose of this mobile application is to allow food allergens to identify food they are allergic to in real-time. To provide this functionlaity users will be required to sign up to access certain features like food allery ratings, for users who don't want to sign up they can opt into the guest mode. 

For a full breakdown of the applications feature visit the core features section.


## Core features
As of the current version of the mobile application, it is currently capable of performing some of the  following tasks (They will all be added soon):
* Registering a new user
* Authenticating users
* Search for products via barcode search and live search
* Save items to a shopping list
* Customise the application settings like accessability, make your experince unique and comfortable for you (Not going to be added anytime soon)
* Update your profile details
* Logout of your account
* Delete your account
* Delete items from the mobile devices internal storage

## Technologies used:
* [React-Native](https://facebook.github.io/react-native/)
* [React](https://reactjs.org/)
* [Jest](https://jestjs.io/)
* [Metro bundler](https://github.com/facebook/metro)
* [Expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli/)
* [Babel](https://babeljs.io/)
* [Yarn](https://yarnpkg.com/en/)
* [Axios](https://github.com/axios/axios)
* [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage)
* [React Navigation](https://reactnavigation.org/)
* [Expo-barcode-scanner](https://github.com/expo/expo/tree/master/packages/expo-barcode-scanner)
* [Expo-permissions](https://docs.expo.io/versions/latest/sdk/permissions/)
* [React-Native-material-dialog](https://github.com/hectahertz/react-native-material-dialog)
* [React-Native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [React-navigation](https://reactnavigation.org/)
* [React-navigation-material-bottom-tabs](https://github.com/react-navigation/react-navigation-material-bottom-tabs)

**NOTE**: Dependencies may be swapped out occasionally as there maybe better alternatives. For example Axio might be swapped out for the native fetch api, but in the current build it will be used to perform HTTP requests to API like [this example](https://github.com/AlexMachin1997/RESTful-API-Interface)

## Getting started 

* Clone the project to your development environment by using ` git clone https://github.com/AlexMachin1997/RESTful-API-Interface.git`

* Install and configure android studio
    * Install the IDE
    
    * Click SDK manager within Android Studio settings.
    * Go to the SDK platforms tools and perform the following
        * Click show all package details and go to the latest version of Android
        * Click "Android SDK Platform 28"
        * Click "Sources for Android 28"
        * Click "Intel x86 Atom Ststem Image"
        * Click "Intel x86 Atom_64 System Image"
        * Click "Google APIs Intel x86 Atom System Image"
        * Click "Google APIs Intel x86 Atom_64 System Image"
        * Click "Google Play Intel x86 Atom System Image"
        * Click "Google Play Intel x86 Atom_64 System Image"

    * Go to SDK tools tab and perform the following:
        * Click show all package details.
        *  Click "Android SDK Build-Tools"
        *  Click "Android Emulator"
        *  Click "Android-SDK Platform Tools"
        *  Click "Android SDK tools"
        *  Click "Google play services"
        *  Click "Google USB Driver"
        *  Click "Intel x86 Emulator Accelerator (HAXM Installer)"
        *  Click "Support Respository"

    * Add a virtual device via the AVD manager
    * Check the Android SDK location is correct

* Configure the enviroment variables for Android Studio:
    * Add ANDROID_HOME = `C:\Users\ [USERNAME] \AppData\Local\Android\Sdk`
    * Add `C:\Users\ [USERNAME] \AppData\Local\Android\Sdk\platform-tools` to the PATH variable within the system and account sections

* Install Node.JS and node package manager(NPM):
    * https://nodejs.org/en/ (Node.JS and NPM)

* Install expo cli and react-native:
    * `npm install -g expo-cli` 

* Physical device configuration:
    * Enable developer mode
    * Enable USB debugging
    * Check the USB configuration is set to MTP
    * Uncheck and recheck the USB debugging (Weird issue during the setup)
    * Run `adb devices`, this should show the devices as the platform tools variable was set earlier
        * If it fails go to `C:\Users\ [USERNAME] \AppData\Local\Android\Sdk\platform-tools` in the command line and type in `adb devices` again
    * The util should show your device connected, note the name showed in the adb devices output
    * configure adbs reverse `adb -s <Device name from adb devices output> reverse tcp:8081 tcp:8081`
    * Run adb devices again to check everything is ok, your device should show up


* Dependency installation
    * Issue `npm install` to install all dependencies with NPM
    * Issue 'yarn install' to install all dependencies with yarn (Requires yarn to be configured)

* Development enviroment variables setup:
    * Create keys_dev.js within the keys directory
    * After creating the file files add the following code sample: `` module.exports = {} ``
    * More steps coming soon

* Running the development enviroment:
    * Go to the cloned repositories location in the terminal
    * Run `react-native run-android` (This will take a long time on the inital build, but the second time around it will take seconds)
    * If you have the emulator running it will run on that device
    * If you have a physical device attached it will run on that device
    * **Note**: Only one device can run at once

## Deployment notes
To use the API, you can deploy it to various playstores a platforms like:
* [Expo](https://expo.io/)
* [Google Play](https://play.google.com/store?hl=en_GB)
* [Apple store](https://www.apple.com/uk/ios/app-store/)

**NOTE**: The deployment of the application will be different depending on the setup used. For my personal use it will be deployed to Expo and Google Play, though if you want to create an iOS version then you will need to deploy it to Apple store as opposed to Google Play.

## Contributing
### Reporting issues
If you find any problems while using the API, report them [here](https://github.com/AlexMachin1997/Food-Allergy-Mobile-Application/issues), and I will address them as quick as I can.

### Feature requests
If you would like to request features for future versions of the application again, please post them [here](https://github.com/AlexMachin1997/Food-Allergy-Mobile-Application/issues). When posting ideas ensure the functionality is explained to provide any developers contributing to the project know what to implement.

# Project Information
### Author information
Alex Machin

If you want to connect with me on my professional social network platforms feel free to use the links located below, but please don't abuse them.
* [LinkedIn](https://www.linkedin.com/in/alex-machin/)
* [Twitter](https://twitter.com/AlexMachin97)

###  Mobile app version
The application is currently at version 1.0, with each feature added it will increment based on these [guidelines](https://docs.npmjs.com/about-semantic-versioning)

### Project Licence information
This project is licensed under the MIT License, for more details about the API refer to the LICENCE.md file located within the project.