import React from "react";
import PropTypes from "prop-types";
import TextArea from "../common/TextArea";
import AppControl from "../layout/AppControl";
import moment from "moment";
import Button from "../common/Button";

const BrewForm = props => {
  const date = moment(props.brew.date).format("MMM D, YYYY");
  const title = props.new
    ? `Adding a new brew for today`
    : `Editing the brew from ${date}`;

  return (
    <div className="brewForm">
      <form className="form-wrapper z-depth-3" onSubmit={props.handleSubmit}>
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
        <Button
          classes={["btn-secondary", "flex-fill"]}
          clickOrTo={props.handleGoBack}
          icon="baselineArrowBack24px"
        >
          Back
        </Button>
        <Button
          classes={["btn-primary", "flex-fill"]}
          clickOrTo={props.handleSubmit}
          icon="baselineSave24px"
        >
          {props.new ? "Save New Brew" : "Save Changes"}
        </Button>
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
