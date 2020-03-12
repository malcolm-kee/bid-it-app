import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { AuthProvider } from './data/auth.data';
import { NotFoundPage } from './pages/404';
import { Deal } from './pages/deal';
import { Home } from './pages/home';
import * as routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="pt-12">
        <Switch>
          <Route path={routes.dealUrlPattern} component={Deal} />
          <Route path={routes.homeUrl} exact component={Home} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </AuthProvider>
  );
}

export default App;
