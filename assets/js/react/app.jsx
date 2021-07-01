import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';

import Home from './pages/home';
import Footer from '@components/layout/footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
            </div>
          </div>
        </div>
      </Disclosure>

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
