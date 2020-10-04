import React from "react";
import { Route, Switch } from "react-router-dom";

import Intro from "../Page/Intro";
import Game from "../Page/Game";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Intro}></Route>
        <Route exact path="/game" component={Game}></Route>
      </Switch>
    </div>
  );
};

export default Routes;
