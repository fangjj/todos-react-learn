import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';

//FlowRouter.route('/', {
//    name: 'index',
//    action() {
//        mount(App);
//    },
//});

FlowRouter.notFound = {
    action: function() {
        mount(AppContainer, {
            content: () => <NotFoundPage />,
        });
    }
};

FlowRouter.route('/signin', {
    name: 'signin',
    action() {
        mount(AppContainer, {
            content: () => <AuthPageSignIn />,
        });
    },
});

FlowRouter.route('/join', {
    name: 'join',
    action() {
        mount(AppContainer, {
            content: () => <AuthPageJoin />,
        });
    },
});