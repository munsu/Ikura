# Ikura

Ikura is a financing app meant as an exercise for Meteor + React.
Built on top of [kickstart-flowrouter by thereactivestack](https://github.com/thereactivestack/kickstart-flowrouter).

## The stack & features
- Include the simple todo app example
- ES6 modules
- Meteor
- React.js
- FlowRouter / ReactLayout
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode
- Give access to NPM by using packages.json

# Production
You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`meteor run --production`

## Build for production
`meteor build .`

## Deploy with Meteor-up
`mup deploy`

## Cordova
You need to do those 3 steps to make it works with iOS or Android:

1. Add the platform to your Meteor project

    ```javascript
    meteor add-platform ios
    meteor add-platform android
    ```
1. Allow access to your dev server in your `/mobile-config.js` file:

    ```javascript
    App.accessRule('http://192.168.1.100:3500/*');
    ```

1. Replace localhost by your local ip address in `/entry/webpack.conf.js`.
