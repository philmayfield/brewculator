import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Root from "./Root";

// Components
import IsAuth from "./components/common/IsAuth";
import Header from "./components/layout/Header";
import Loading from "./components/common/Loading";
import Landing from "./components/layout/Landing";
import Signup from "./components/register/Signup";
import Login from "./components/login/Login";
import Recipes from "./components/recipes/Recipes";
import Recipe from "./components/recipe/Recipe";
import AddEditRecipe from "./components/recipe/AddEditRecipe";
import Version from "./components/version/Version";
import AddEditVersion from "./components/version/AddEditVersion";
import Brew from "./components/brew/Brew";
import AddEditBrew from "./components/brew/AddEditBrew";
import AddEditGravity from "./components/gravity/AddEditGravity";

class App extends Component {
  render() {
    return (
      <Root>
        <BrowserRouter>
          <div className="App">
            <IsAuth />
            <Header />
            <Loading />
            <main className="container">
              <Route path="/" component={Landing} exact />
              <Route path="/signup" component={Signup} exact />
              <Route path="/login/:user?" component={Login} exact />
              <Route path="/recipes" component={Recipes} exact />
              <Route path="/recipe/:id" component={Recipe} exact />
              <Route path="/recipe/edit/:id" component={AddEditRecipe} exact />
              <Route path="/version/:id" component={Version} exact />
              <Route
                path="/version/edit/:id"
                component={AddEditVersion}
                exact
              />
              <Route path="/brew/:id" component={Brew} exact />
              <Route path="/brew/edit/:id" component={AddEditBrew} exact />
              <Route
                path="/gravity/edit/:id"
                component={AddEditGravity}
                exact
              />
            </main>
          </div>
        </BrowserRouter>
      </Root>
    );
  }
}

export default App;
