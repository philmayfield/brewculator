import React from "react";
import PropTypes from "prop-types";
import TextArea from "../common/TextArea";
import AppControl from "../layout/AppControl";
import moment from "moment";

const BrewForm = props => {
  const date = moment(props.brew.date).format("MMM D, YYYY");
  const title = props.new
    ? `Adding a new brew for today`
    : `Editing the brew from ${date}`;

  return (
    <div className="brewForm">
      <form id="addUpdateBrewForm" onSubmit={props.handleSubmit}>
        <h4>{title}</h4>
        <TextArea
          placeholder="Optionally add some notes"
          label={`Brew Notes`}
          name="notes"
          autoFocus={true}
          value={props.brew.notes}
          error={props.errors.notes}
          onChange={props.handleInput}
        />
      </form>
      <AppControl>
        <button className="btn btn-secondary mr-3" onClick={props.handleGoBack}>
          Back
        </button>
        <input
          className="btn btn-primary"
          type="submit"
          value={props.new ? "Make New Brew" : "Save Changes"}
          form="addUpdateBrewForm"
        />
      </AppControl>
    </div>
  );
};

BrewForm.propTypes = {
  new: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  brew: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default BrewForm;
