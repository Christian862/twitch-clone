/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  onSubmit(formValues) {
    console.log(formValues);
  }

  renderError({ error, touched }) {
    console.log(touched);
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // redux-form Field component passes a bunch of props to the prop 'component'
  // by default. As well, it passes any other props
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button type="submit" className="ui button primary">
          Submit
        </button>
      </form>
    );
  }
}
// validate is a special function redux-form expects. If there
// is an error with the input (i.e. invalid input) validate() returns
// an object whos property names/keys are mapped to the respective field names.
// So when an error is thrown, the respective Field component recieves the error message.
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({ form: 'streamCreate', validate })(StreamCreate);
