import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
const App = () => <h1>我们</h1>
FlowRouter.route('/', {
    name: 'index',
    action() {
        mount(App);
    },
});