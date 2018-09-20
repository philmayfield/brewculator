import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { actionConfirm } from '../../actions/appActions';
import { notEmpty } from '../../common/empty';
import { clearErrors } from '../../actions/appActions';
import { getBrew, setBrew, deleteBrew } from '../../actions/brewActions';
import { getAllGravities, unsetGravity } from '../../actions/gravityActions';
import ContextChangeBtn from '../common/ContextChangeBtn';
import RecipeDeets from '../layout/RecipeDeets';
import AppControl from '../layout/AppControl';
import ItemWrap from '../common/ItemWrap';
import GravityList from '../gravities/GravityList';
import AreYouSure from '../common/AreYouSure';
import Alert from '../common/Alert';
import calculateGravity from '../../common/calculateGravity';
import Button from '../common/Button';
import ReactSVG from 'react-svg';
import getImg from '../../common/getImg';

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

    this.props.unsetGravity();

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    const { _id, date, version } = this.props.recipe.version.brew;
    const friendlyDate = moment.utc(date).format('MMM D, YYYY');

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
      const gravColor = '151,187,205';
      const tempColor = '220,53,69';
      const labels = gravities.map(g =>
        moment.utc(g.date).format('MMM D, YYYY')
      );
      const gravs = {
        data: gravities.map(g => calculateGravity(g.brix)),
        label: 'Gravity',
        yAxisID: 'gravs',
        borderColor: `rgba(${gravColor}, 1)`,
        backgroundColor: `rgba(${gravColor}, .25)`,
        pointRadius: 8,
        pointHitRadius: 8,
        pointHoverRadius: 8
      };
      const temps = {
        data: gravities.map(g => g.temp),
        label: 'Temperature',
        yAxisID: 'temps',
        borderColor: `rgba(${tempColor}, 1)`,
        backgroundColor: `rgba(${tempColor}, .075)`,
        pointRadius: 8,
        pointHitRadius: 8,
        pointHoverRadius: 8,
        spanGaps: true
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
              id: 'gravs',
              type: 'linear',
              position: 'left',
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                min: 1
              }
            },
            {
              id: 'temps',
              type: 'linear',
              position: 'right',
              gridLines: {
                drawOnChartArea: false
              },
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
    const { brew } = version && version;
    const { isAuth } = auth;
    const { loadingArr, confirmObject, altControlContext } = appJunk;
    const loading = loadingArr.length > 0;
    const hasVersion = version && notEmpty(version._id);
    const hasBrew = brew && notEmpty(brew._id);
    const hasGravities = brew && notEmpty(brew.gravities);
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, gravitiesContent, controlContent, brewContent;

    if (hasGravities) {
      const chartData = this.makeChartData(brew.gravities);
      const { og, fg, data, options } = chartData;
      const numDataPoints = data.datasets[0].data.length;
      const currAbv =
        numDataPoints > 1
          ? `Current ABV: ${this.calculateAbv(og, fg)}%`
          : 'You need more gravity readings to calculate the ABV';
      const ogFgContent = numDataPoints > 1 && (
        <span className="text-nowrap text-muted">
          {og} og, {fg} fg
        </span>
      );

      gravitiesContent = (
        <div>
          <h6 className="d-flex flex-wrap align-items-center justify-content-center">
            <ReactSVG
              src={getImg('baselineLocalDrink24px')}
              svgClassName="primary mr-2"
            />
            <span className="mr-3">{currAbv}</span>
            {ogFgContent}
          </h6>
          {numDataPoints > 1 && (
            <div className="chart-wrap">
              <Line data={data} options={options} width={600} height={300} />
            </div>
          )}
        </div>
      );
    }

    if (hasBrew && !loading) {
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
    } else if (isAuth && !loading && altControlContext) {
      controlContent = (
        <AppControl>
          <ContextChangeBtn />
          <Button
            classes={['btn-danger', 'flex-fill', hasBrew ? '' : 'd-none']}
            clickOrTo={this.handleDelete}
            icon="baselineDeleteForever24px"
          >
            Delete Brew
          </Button>
          <Button
            type="link"
            classes={['btn-primary', 'flex-fill', hasBrew ? '' : 'd-none']}
            clickOrTo={`edit/${hasBrew && brew._id}`}
            icon="baselineEdit24px"
          >
            Edit Brew
          </Button>
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          <ContextChangeBtn />
          <Button
            type="link"
            classes={['btn-secondary', 'flex-fill']}
            clickOrTo={`/version/${version._id}`}
            icon="baselineArrowBack24px"
          >
            Back
          </Button>
          <Button
            type="link"
            classes={['btn-primary', 'flex-fill', hasVersion ? '' : 'd-none']}
            clickOrTo="/gravity/edit/new"
            icon="baselineAddCircle24px"
          >
            Add Reading
          </Button>
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
          loading={loading}
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
  unsetGravity: PropTypes.func.isRequired,
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
    unsetGravity,
    actionConfirm
  }
)(Brew);
