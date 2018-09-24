# React + Firebase boilerplate for landing pages
![Demo Homepage](https://firebasestorage.googleapis.com/v0/b/manager-93c67.appspot.com/o/demo1.gif?alt=media&token=b23ca076-8737-41e9-a082-97554997a566)
![Parallax page](https://firebasestorage.googleapis.com/v0/b/manager-93c67.appspot.com/o/demo2.gif?alt=media&token=15ac3d72-73be-4f8b-8699-320d23112972)


[LIVE DEMO](https://manager-93c67.firebaseapp.com/Home).

### Features
1. Easy control for main logo animation, parallax page components using [react-spring](https://github.com/drcmda/react-spring). Just plug your contents and you are good to go.
2. Firebase DB wired with [re-base](https://github.com/tylermcginnis/re-base) - do whatever you want with the real-time database. Simply fetch the data from any components however you'd like.
3. [react-router](https://github.com/ReactTraining/react-router) configured with 404 page component.
4. Mailchimp email form setup done for you via [react-mailchimp-subscribe](https://github.com/revolunet/react-mailchimp-subscribe). Simply create a list on mailchimp, add a form and get its "action" attribute from the mailchimp UI.

## Dependencies
```
    "prop-types": "^15.6.2",
    "re-base": "^3.2.3",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-mailchimp-subscribe": "^2.0.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.4",
    "react-spring": "^5.3.18",
    "styled-components": "^3.3.3",
    "typeface-open-sans": "0.0.54",
    "uuid": "^3.3.2"
```
*NOTE* this boilerplate uses open-sans typeface

## Install & run it locally
1. Clone the repo and `npm i` to install dependencies. 
2. `firebase init` to setup firebase in the project. Make sure you set the public folder as `build` if you are using `react-scripts build` to build the app.
3. `npm run start` to run it locally.

## Connect firebase
You can store the API key in `db/firebaseKey.js`like this. This file is gitignored so it's safe to push. You can also store it as an environment key if you'd like
```
export const firebaseKey = {
    apiKey: "YOURKEYGOESHERE",
    authDomain: "xxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxx.firebaseio.com",
    projectId: "xxxxxx",
    storageBucket: "xxxxxx.appspot.com",
    messagingSenderId: "12345678"
}

```
For more information, visit [firebase](https://firebase.google.com)

## How to use the template
If you want to change text or images, these are where you should look
- `AnimationContainer.js` for animating logo. Pass svg path as a prop
```
<AnimationContainer before={BEFORE} after={AFTER}/>
```
- `ParallaxPage.js` for parallax page. The component expects json object. The schema is like below. Modify this component and the parent container states if you want different data structure.
```
... Home page 

"home" : {
    "subhead" : "Lorem ipsum",
    "title" : "Foo bar"
  },

... Other pages

"about" : {
    "first_title" : "title goes here",
    "first_body" : [ "paragraph1", "paragraph2", "paragraph3", "paragraph4" ... ],
    "first_img_url" : "https://image.url.here",
    "second_title" : "lorem ipsum",
    "second_body" : [ "foo", "bar"]
    ...
  },

```
- `Navigation.js` modify this file if you want to customize navigation UI. The route paths are passed down from `App.js`
- `FlexWrapper.js` is a flex wrapper. It accepts `direction`, `justify`, `align`, `marginTop` as a prop.
- `SignupForm.js` where signup form UI and mailchimp API hook is
- `Fonts.js` fonts

## Deploy to Firebase
1. Make sure you have Firebase CLI installed globally. `npm i -g firebase-tools`
2. Build the react app. `npm run build`
3. If you haven't logged into Firebase, run `firebase login` and run `firebase init`
4. Lastly, run `firebase deploy`

## license
MIT license
