import * as React from 'react';
import { Route, Switch } from 'react-router';
import PageArc from '../connected/PageArc';
import PageCubicBezier from '../connected/PageCubicBezier';
import PageQuadraticBezier from '../connected/PageQuadraticBezier';
import PageAbout from '../components/PageAbout';
import PageNotFound from '../components/PageNotFound';

const routes = (
  <Switch>
    <Route exact={true} path="/" component={PageArc} />
    <Route exact={true} path="/arc" component={PageArc} />
    <Route exact={true} path="/cubic" component={PageCubicBezier} />
    <Route exact={true} path="/quadratic" component={PageQuadraticBezier} />
    <Route exact={true} path="/about" component={PageAbout} />
    <Route component={PageNotFound} />
  </Switch>
);

export default routes;
