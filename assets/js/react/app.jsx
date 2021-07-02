import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import React from 'react';

import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import Home from './pages/home';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <Router>
              <Switch>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
