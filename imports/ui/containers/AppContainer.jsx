import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer((props) => {
  //const publicHandle = Meteor.subscribe('lists.public');
  //const privateHandle = Meteor.subscribe('lists.private');
  return {
    user: Meteor.user(),
    loading: false,
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    content:props.content,
  };
}, App);
