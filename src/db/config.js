import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseKey } from './firebaseKey';

var app = firebase.initializeApp(firebaseKey);

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;