import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';


export const CourseForm = ({ handleSubmit, pristine, reset, submitting, heading, authors, handleSave, handleCancel,initialValues }) => {
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="title"
                label="Title"
                placeholder="Title of the course"
                component={FieldInput}
                // value={this.props.title}
                
            />

            <Field
                name="authorId"
                label="Author"
                type = "text"
                // options={authors}
                // component={SelectInput}
                placeholder ="Author of the course"
                component ={FieldInput}
                // value={initialValues.authorId}
            />

            <Field
                type="text"
                name="category"
                label="Category"
                placeholder="Category of the course"
                component={FieldInput}
                // value={initialValues.category ? initialValues : ''}
            />

            <Field
                type= "text"
                name="Duration"
                label="Duration"
                placeholder="Duration of course in minutes"
                component={FieldInput}
                // value={initialValues.Duration}
            />

            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};





const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.category) {
        errors.category = 'Required';
    }

    if (!values.length) {
        errors.length = 'Required';
    }

    if (!values.authorId) {
        errors.authorId = 'Required';
    }

    return errors;
};



CourseForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};



export default reduxForm({
    form: 'CourseForm',
    validate
})(CourseForm);
