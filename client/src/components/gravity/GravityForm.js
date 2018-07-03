import React from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import AppControl from "../layout/AppControl";
import moment from "moment";
import Button from "../common/Button";

const GravityForm = props => {
  const title = props.new
    ? "Adding a new gravity"
    : `Editing gravity from ${moment
        .utc(props.gravity.date)
        .format("MMMM D, YYYY")}`;
  const date = props.gravity.date
    ? props.gravity.date.substr(0, 10)
    : new Date().toISOString().substr(0, 10);
  const dateInfo = props.new
    ? "Todays date is auto populated"
    : "Date can be modified to add older readings";

  return (
    <div className="gravityForm">
      <form className="form-wrapper z-depth-3" onSubmit={props.handleSubmit}>
        <h4>{title}</h4>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <Input
              placeholder="Enter the date for reading"
              label={`Reading Date`}
              type="date"
              name="date"
              info={dateInfo}
              value={date}
              error={props.errors.date}
              onChange={props.handleInput}
              required={true}
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <Input
              placeholder="Enter your refractometer reading"
              label={`Refractometer reading`}
              type="text"
              name="brix"
              info="Reading should be in Brix, eg: 21.6, 10 etc."
              autoFocus={true}
              value={props.gravity.brix}
              error={props.errors.brix}
              onChange={props.handleInput}
              required={true}
            />
          </div>
          <div className="col-md-12 col-lg-4 mb-3">
            <Input
              placeholder="Enter temperature reading"
              label={`Temperature`}
              type="text"
              name="temp"
              info="Temperature should be in Farenheit"
              autoFocus={false}
              value={props.gravity.temp}
              error={props.errors.temp}
              onChange={props.handleInput}
            />
          </div>
        </div>
        <TextArea
          placeholder="Optionally add some notes"
          label={`Gravity Notes`}
          name="notes"
          autoFocus={false}
          value={props.gravity.notes}
          error={props.errors.notes}
          onChange={props.handleInput}
        />
        <AppControl>
          <Button
            classes={["btn-secondary", "flex-fill"]}
            clickOrTo={props.handleGoBack}
            icon="baselineArrowBack24px"
          >
            Back
          </Button>
          <Button
            type="submit"
            classes={["btn-primary", "flex-fill"]}
            icon="baselineSave24px"
          >
            {props.new ? "Save New Reading" : "Save Changes"}
          </Button>
        </AppControl>
      </form>
    </div>
  );
};

GravityForm.propTypes = {
  new: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  gravity: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default GravityForm;
