import React from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import AppControl from "../layout/AppControl";
import moment from "moment";
import Button from "../common/Button";

const BrewForm = props => {
  const title = props.new
    ? `Adding a new brew date`
    : `Editing the brew from ${moment
        .utc(props.brew.date)
        .format("MMMM D, YYYY")}`;
  const date = props.brew.date
    ? props.brew.date.substr(0, 10)
    : new Date().toISOString().substr(0, 10);
  const dateInfo = props.new
    ? "Todays date is auto populated"
    : "Date can be modified to add older brew dates";

  return (
    <div className="brewForm">
      <form className="form-wrapper z-depth-3" onSubmit={props.handleSubmit}>
        <h4>{title}</h4>
        <Input
          label={`Brew Date`}
          type="date"
          name="date"
          info={dateInfo}
          value={date}
          error={props.errors.date}
          onChange={props.handleInput}
          required={true}
        />
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
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default BrewForm;
