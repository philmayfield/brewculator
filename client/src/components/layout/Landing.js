import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getImg from "../../common/getImg";
import ReactSVG from "react-svg";
import AppControl from "../layout/AppControl";
import Button from "../common/Button";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/recipes");
    }
  }

  render() {
    return (
      <div>
        <ReactSVG
          path={getImg("phil")}
          className="mx-auto d-flex justify-content-center"
          svgClassName="phil round-img"
        />
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto">
            <h1>Hello Friends!</h1>
            <div className="info-container p-3 z-depth-3">
              <p>If you&rsquo;ve found this, then welcome!</p>
              <p>This web app was developed to serve two main purposes.</p>
              <ol>
                <li>
                  To apply my knowledge of React, and Redux with some spicy
                  middleware thrown in. Along with a custom back end built on
                  MongoDB all running on an Express Node server.
                </li>
                <li>
                  As an avid home brewer, some of the I&rsquo;ve found the need
                  for such an app for tracking brewdays. Existing apps have left
                  something to be desired, and paper&hellip; come on now.
                </li>
              </ol>
              <p>
                Please understand that this is not a commercial product by any
                means, and is not intended to be used as such. Just a personal
                project for me to nerd out on.
              </p>
              <p>
                If you feel like spooling up your own version, feel free to{" "}
                <a
                  href="https://bitbucket.org/philmayfield/brewculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  check out the repo on BitBucket
                </a>.
              </p>

              <p className="text-center mt-5 text-muted small">Built With</p>
              <div className="tech-logos d-flex flex-wrap justify-content-around">
                <a
                  href="https://getbootstrap.com/"
                  title="Bootstrap 4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("bootstrap")} />
                </a>
                <a
                  href="https://expressjs.com/"
                  title="Express"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("express")} />
                </a>
                <a
                  href="https://git-scm.com/"
                  title="Git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("git")} />
                </a>
                <a
                  href="https://www.heroku.com/"
                  title="Heroku"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("heroku")} />
                </a>
                <a
                  href="https://www.javascript.com/"
                  title="JavaScript"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("js")} />
                </a>
                <a
                  href="https://www.ecma-international.org/"
                  title="Javascript"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("mongo")} />
                </a>
                <a
                  href="https://nodejs.org/"
                  title="Node.js"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("node")} />
                </a>
                <a
                  href="https://reactjs.org/"
                  title="React"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("react")} />
                </a>
                <a
                  href="https://redux.js.org/"
                  title="Redux"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("redux")} />
                </a>
                <a
                  href="https://sass-lang.com/"
                  title="Sass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" path={getImg("sass")} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <AppControl>
          <Button
            type="link"
            classes={["btn-secondary", "flex-fill"]}
            clickOrTo={`/login`}
            icon="baselineAccountCircle24px"
          >
            Log In
          </Button>
          <Button
            type="link"
            classes={["btn-primary", "flex-fill"]}
            clickOrTo={`/signup`}
            icon="baselineEdit24px"
          >
            Sign Up
          </Button>
        </AppControl>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
