import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Book from './pages/Book';
import NewBook from './pages/NewBook';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/book/:id" component={Book} />
                <Route path="/newbook" component={NewBook} />
            </Switch>
        </BrowserRouter>
    );
}