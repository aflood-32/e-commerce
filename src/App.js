import React from 'react';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth } from './firebase/firebase.utils'

import './App.scss'
import { Switch, Route } from 'react-router-dom'


class App extends React.Component{
    state = {
        currentUser: null
    }


    unsubscribeFromAuth = null;


    componentDidMount() {
       this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user })
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }


    render(){
        return(
            <>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route path='/' exact component={Homepage}/>
                    <Route path='/shop' exact component={ShopPage}/>
                    <Route path='/signin' exact component={SignInAndSignUp}/>
                </Switch>
            </>
        )
    }
}

export default App
