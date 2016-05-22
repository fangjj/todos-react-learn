import React,{Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
//import { ReactiveVar } from 'meteor/reactive-var';
//import { Lists } from '../../api/lists/lists.js';
//import UserMenu from '../components/UserMenu.jsx';
//import ListList from '../components/ListList.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends Component {
    constructor(props) {
        console.log('constructor',props);
        super(props);
        this.state = {
            menuOpen: false,
            showConnectionIssue: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showConnectionIssue: true });
        }, CONNECTION_ISSUE_TIMEOUT);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    toggleMenu(menuOpen = !Session.get('menuOpen')) {
        Session.set({ menuOpen });
    }

    logout() {
        Meteor.logout();
    }

    render() {
        const { showConnectionIssue } = this.state;
        const {
            user,
            connected,
            loading,
            menuOpen,
            content
            } = this.props;

        const closeMenu = this.toggleMenu.bind(this, false);

        return (
            <div id="container" className={menuOpen ? 'menu-open' : ''}>
                <section id="menu">
                </section>
                {showConnectionIssue && !connected
                    ? <ConnectionNotification/>
                    : null}
                <div className="content-overlay" onClick={closeMenu}></div>
                <div id="content-container">
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                    >
                        {loading
                            ? <Loading key="loading"/>
                            : content()}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: React.PropTypes.object,      // current meteor user
    connected: React.PropTypes.bool,   // server connection status
    loading: React.PropTypes.bool,     // subscription status
    menuOpen: React.PropTypes.bool,    // is side menu open?
    content:React.PropTypes.func,
};