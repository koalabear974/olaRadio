# OlaRadio
## Install & run it locally
1. Clone the repo and `npm i` to install dependencies. 
2. `firebase init` to setup firebase in the project. Make sure you set the public folder as `build` if you are using `react-scripts build` to build the app.
3. `npm run start` to run it locally.

## How to use the template

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
- `SignupForm.js` where signup form UI and mailchimp API hook is
- `Fonts.js` fonts

## Deploy to Firebase
1. Make sure you have Firebase CLI installed globally. `npm i -g firebase-tools`
2. Build the react app. `npm run build`
3. If you haven't logged into Firebase, run `firebase login` and run `firebase init`
4. Lastly, run `firebase deploy`

## license
MIT license
