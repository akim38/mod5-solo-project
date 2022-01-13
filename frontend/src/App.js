import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import { restoreUser } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetails";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/events'>
            <EventsList />
          </Route>
          <Route path='/events/:eventId'>
            <EventDetail />
          </Route>
          <Route>
            <h3>404: Page Not Found</h3>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
