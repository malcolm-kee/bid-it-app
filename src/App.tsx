import React from 'react';
import './App.css';
import { Header } from './components/header';
import { ActiveDeals } from './containers/active-deals';

function App() {
  return (
    <>
      <Header />
      <main className="pt-12">
        <ActiveDeals />
      </main>
    </>
  );
}

export default App;
