import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseKey } from './firebaseKey';

const app = firebase.initializeApp(firebaseKey);

const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base;
