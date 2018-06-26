import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { actionConfirm } from "../../actions/appActions";
import { notEmpty } from "../../common/empty";
import { clearErrors } from "../../actions/appActions";
import { getBrew, setBrew, deleteBrew } from "../../actions/brewActions";
import { getAllGravities } from "../../actions/gravityActions";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import ItemWrap from "../common/ItemWrap";
import GravityList from "../gravities/GravityList";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";
import calculateGravity from "../../common/calculateGravity";

class Brew extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.props.clearErrors();

    const { id } = this.props.match.params; // brew id
    const { recipe } = this.props;
    const version = recipe && recipe.version;
    const brews = version && version.brews;
    const storeBrew =
      Array.isArray(brews) && brews.find(brew => brew._id === id);
    const hasStoreBrew = storeBrew && notEmpty(storeBrew);

    if (hasStoreBrew) {
      // fetch brew from the store
      this.props.setBrew(storeBrew);
      this.props.getAllGravities(id);
    } else {
      // fetch brew over the wire, will also fetch recipe, version & gravities
      this.props.getBrew(id);
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    const { _id, date, version } = this.props.recipe.version.brew;
    const friendlyDate = moment(date).format("MMM D, YYYY");

    this.props.actionConfirm({
      confirmAction: deleteBrew,
      confirmId: _id,
      confirmText: `Are you sure you want to delete the brew from ${friendlyDate}?`,
      redirect: `/version/${version}`
    });
  }

  calculateAbv(og, fg) {
    if (!og || !fg || og === fg) {
      return 0;
    }
    const num = ((76.08 * (og - fg)) / (1.775 - og)) * (fg / 0.794);
    return num.toFixed(2);
  }

  getData(gravities) {
    if (Array.isArray(gravities)) {
      const gravColor = "151,187,205";
      const tempColor = "220,53,69";
      const labels = gravities.map(g =>
        moment.utc(g.date).format("MMM D, YYYY")
      );
      const gravs = {
        data: gravities.map(g => calculateGravity(g.brix)),
        label: "Gravity",
        yAxisID: "gravs",
        borderColor: `rgba(${gravColor}, 1)`,
        backgroundColor: `rgba(${gravColor}, .25)`
      };
      const temps = {
        data: gravities.map(g => g.temp),
        label: "Temperature",
        yAxisID: "temps",
        borderColor: `rgba(${tempColor}, 1)`,
        backgroundColor: `rgba(${tempColor}, .075)`
      };
      const datasets = [gravs, temps];
      return { labels, datasets };
    }
  }

  makeChartData(gravities) {
    const startBrix = gravities[0].brix;
    const endBrix = gravities[gravities.length - 1].brix;
    const og = calculateGravity(startBrix);
    const fg = calculateGravity(endBrix);
    const data = this.getData(gravities);
    return {
      og,
      fg,
      data,
      options: {
        scales: {
          yAxes: [
            {
              id: "gravs",
              type: "linear",
              position: "left",
              ticks: {
                min: 1
              }
            },
            {
              id: "temps",
              type: "linear",
              position: "right",
              ticks: {
                min: 50,
                max: 90
              }
            }
          ]
        }
      }
    };
  }

  render() {
    const { recipe, errors, auth, appJunk } = this.props;
    const { version } = recipe && recipe;
    const brew = version && version.brew;
    const { isAuth } = auth;
    const { loading, confirmObject } = appJunk;
    const hasVersion = version && notEmpty(version._id);
    const hasBrew = brew && notEmpty(brew._id);
    const hasGravities = hasBrew && notEmpty(brew.gravities);
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, gravitiesContent, controlContent, brewContent;

    if (hasGravities) {
      const chartData = this.makeChartData(brew.gravities);
      const { og, fg, data, options } = chartData;
      const numDataPoints = data.datasets[0].data.length;
      gravitiesContent = (
        <div>
          <h6>
            Current ABV:{" "}
            {numDataPoints > 1
              ? `${this.calculateAbv(og, fg)}% (${og}og, ${fg}fg currently)`
              : "-- need more gravity readings"}
          </h6>
          {numDataPoints > 1 && (
            <Line data={data} options={options} width={600} height={300} />
          )}
        </div>
      );
    }

    if (hasBrew) {
      brewContent = (
        <ItemWrap label="Gravities" items={brew.gravities} errors={errors}>
          <GravityList gravities={brew.gravities} />
        </ItemWrap>
      );
    }

    if (errors && errors.noBrew) {
      errorContent = (
        <Alert bsStyle="alert-danger" heading="Brew not found">
          <p className="mb-0">{errors.noBrew}</p>
        </Alert>
      );
    }

    if (notEmpty(confirmObject) && !loading) {
      controlContent = (
        <AppControl>
          <AreYouSure
            confirmObject={confirmObject}
            history={this.props.history}
          />
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          <Link
            className="btn btn-secondary flex-fill"
            to={hasVersion ? `/version/${version._id}` : "/"}
          >
            Back
          </Link>
          <button
            className={`btn btn-danger flex-fill ${hasBrew ? "" : "d-none"}`}
            onClick={this.handleDelete}
          >
            Delete This Brew
          </button>
          <Link
            className={`btn btn-secondary flex-fill ${hasBrew ? "" : "d-none"}`}
            to={`edit/${hasBrew && brew._id}`}
          >
            Edit This Brew
          </Link>
          <Link
            className={`btn btn-primary flex-fill ${hasBrew ? "" : "d-none"}`}
            to={`/gravity/edit/new`}
          >
            Add a Gravity Reading
          </Link>
        </AppControl>
      );
    }

    const recipeContent = (
      <div>
        <RecipeDeets
          recipe={recipe}
          author={author}
          version={version}
          brew={brew}
          gravitiesContent={gravitiesContent}
        />
        {brewContent}
      </div>
    );

    return (
      <div>
        <div className="recipe">
          {errorContent ? errorContent : recipeContent}
        </div>
        {controlContent}
      </div>
    );
  }
}

Brew.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getBrew: PropTypes.func.isRequired,
  setBrew: PropTypes.func.isRequired,
  getAllGravities: PropTypes.func.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  appJunk: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  appJunk: state.appJunk,
  errors: state.errors,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getBrew,
    setBrew,
    getAllGravities,
    actionConfirm
  }
)(Brew);
