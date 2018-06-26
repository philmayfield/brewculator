import React from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import AppControl from "../layout/AppControl";

const VersionForm = props => {
  const title = props.new
    ? "Adding a new version"
    : `Editing version: ${props.version.version}`;

  return (
    <div className="versionForm">
      <form
        id="addUpdateVersionForm"
        className="form-wrapper z-depth-3"
        onSubmit={props.handleSubmit}
      >
        <h4>{title}</h4>
        <Input
          placeholder="Enter a version"
          label={`New Version for ${props.recipe.name}`}
          type="text"
          name="version"
          info="Example: 1, A, First, etc"
          autoFocus={true}
          value={props.version.version}
          error={props.errors.version}
          onChange={props.handleInput}
          required={true}
        />
        <TextArea
          placeholder="Optionally add some notes"
          label={`Version ${props.version.version} Notes`}
          name="notes"
          autoFocus={false}
          value={props.version.notes}
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
          value={props.new ? "Make New Version" : "Save Changes"}
          form="addUpdateVersionForm"
        />
      </AppControl>
    </div>
  );
};

VersionForm.propTypes = {
  new: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  version: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default VersionForm;
