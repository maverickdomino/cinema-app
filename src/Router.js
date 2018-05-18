import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import UpcomingMovies from './UpcomingMovies';
import LiveMovies from './LiveMovies';
import AuthForm from './AuthForm';
import CinemaRoom from './CinemaRoom';
import UserView from './UserView';

const Router = ({ location }) => {
console.log('router', location)
return (
  <div className="wrapper">
    <Switch location={location}>
      <Route exact path="/" component={LiveMovies} />
      <Route path="/user" component={AuthForm} />
      <Route path="/rezerwacja" component={CinemaRoom} />
      <Route path="/userview" component={UserView} />
    </Switch>
  </div>
)}

export default withRouter(Router)
