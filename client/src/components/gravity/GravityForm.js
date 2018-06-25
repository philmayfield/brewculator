import React from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import AppControl from "../layout/AppControl";
import moment from "moment";

const GravityForm = props => {
  const title = props.new
    ? "Adding a new gravity"
    : `Editing gravity from ${moment
        .utc(props.gravity.date)
        .format("MMM D, YYYY")}`;
  const date = props.gravity.date
    ? props.gravity.date.substr(0, 10)
    : new Date().toISOString().substr(0, 10);
  const dateInfo = props.new
    ? "Todays date is auto populated"
    : "Date can be modified to add older readings";

  return (
    <div className="gravityForm">
      <form id="addUpdateGravityForm" onSubmit={props.handleSubmit}>
        <h4>{title}</h4>
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
        <TextArea
          placeholder="Optionally add some notes"
          label={`Gravity Notes`}
          name="notes"
          autoFocus={false}
          value={props.gravity.notes}
          error={props.errors.notes}
          onChange={props.handleInput}
        />
      </form>
      <AppControl>
        <button
          className="btn btn-secondary flex-fill"
          onClick={props.handleGoBack}
        >
          Back
        </button>
        <input
          className="btn btn-primary flex-fill"
          type="submit"
          value={props.new ? "Save New Reading" : "Save Changes"}
          form="addUpdateGravityForm"
        />
      </AppControl>
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
