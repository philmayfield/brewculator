import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getImg from '../../common/getImg';
import ReactSVG from 'react-svg';
import AppControl from '../layout/AppControl';
import Button from '../common/Button';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/recipes');
    }
  }

  render() {
    return (
      <div>
        <ReactSVG
          src={getImg('phil')}
          className="mx-auto d-flex justify-content-center"
          svgClassName="phil round-img"
        />
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto">
            <h1>Hello Friends!</h1>
            <div className="info-container p-3 z-depth-3">
              <p>If you&rsquo;ve found this, then welcome!</p>
              <p>
                My name is Phil Mayfield, and I made this! Brewculator is a brew
                day logging and tracking app, designed to be easily usable from
                a mobile device.
              </p>
              <p>This web app was developed to serve two main purposes.</p>
              <ol>
                <li>
                  To apply my knowledge of React, and Redux with some spicy
                  middleware thrown in. Along with a custom back end built on
                  MongoDB all running on an Express Node server.
                </li>
                <li>
                  As an avid home brewer, I&rsquo;ve found the need for such an
                  app for tracking brew days. Existing apps have left a little
                  something to be desired, and keeping track with a pad of
                  paper&hellip; I mean come on now.
                </li>
              </ol>
              <p>
                Go ahead and play with it! You can create a login (no email or
                anything is required) or just use a tester account with these
                credentials&hellip;
              </p>
              <p className="text-center">
                <strong>Login:</strong> tester
                <strong className="ml-3">Password:</strong> tester
              </p>
              <p>
                Please understand that this is not a commercial product by any
                means, and is not intended to be used as such. Just a personal
                project for me to nerd out on.
              </p>
              <p>
                If you feel like spooling up your own version, feel free to{' '}
                <a
                  href="https://github.com/philmayfield/brewculator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  check out the repo on GitHub
                </a>
                .
              </p>

              <p className="text-center mt-5 text-muted small">Built With</p>
              <div className="tech-logos d-flex flex-wrap justify-content-around">
                <a
                  href="https://getbootstrap.com/"
                  title="Bootstrap 4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('bootstrap')} />
                </a>
                <a
                  href="https://expressjs.com/"
                  title="Express"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('express')} />
                </a>
                <a
                  href="https://git-scm.com/"
                  title="Git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('git')} />
                </a>
                <a
                  href="https://www.heroku.com/"
                  title="Heroku"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('heroku')} />
                </a>
                <a
                  href="https://www.ecma-international.org/"
                  title="JavaScript"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('js')} />
                </a>
                <a
                  href="https://www.mongodb.com/"
                  title="mongoDB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('mongo')} />
                </a>
                <a
                  href="https://nodejs.org/"
                  title="Node.js"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('node')} />
                </a>
                <a
                  href="https://reactjs.org/"
                  title="React"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('react')} />
                </a>
                <a
                  href="https://redux.js.org/"
                  title="Redux"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('redux')} />
                </a>
                <a
                  href="https://sass-lang.com/"
                  title="Sass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactSVG className="tech-icon" src={getImg('sass')} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <AppControl>
          <Button
            type="link"
            classes={['btn-secondary', 'flex-fill']}
            clickOrTo={`/login`}
            icon="baselineAccountCircle24px"
          >
            Log In
          </Button>
          <Button
            type="link"
            classes={['btn-primary', 'flex-fill']}
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
