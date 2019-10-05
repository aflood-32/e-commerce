import React from 'react';


import Homepage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop.component'

import './App.scss'
import { Switch, Route } from 'react-router-dom'


const App = () => (
    <>
        <Switch>
            <Route path='/' exact component={Homepage}/>
            <Route path='/shop' exact component={ShopPage}/>
        </Switch>
    </>
)

export default App
