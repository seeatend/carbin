import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';
import FormInput from '../components/FormInput';

class SignupStep3 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    signupId: PropTypes.number,
    signupFields: PropTypes.object
  };

  constructor(props) {
    super();
    this.state = {
      company_industry: props.signupFields.company_industry,
      company_old: props.signupFields.company_old,
      company_employees: props.signupFields.company_employees,
      canSubmit: false
    };

    this.formRef = React.createRef();
  }

  formInvalid = () => {
    this.setState({ formIsValid: false });
  }

  formValid = () => {
    this.setState({ formIsValid: true });
  }

  handleSubmit = (e) => {
    if ( this.state.formIsValid ){
      this.nextStep();
    }
  }

  submitForm = () => {
    // click handler for the button
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  nextStep = () => {
    const { company_industry, company_old, company_employees } = this.state;
    // patch lead
    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          company_industry: company_industry,
          company_old: company_old,
          company_employees: company_employees,
        }
      })
      .then((res) => {
        this.props.setSignupStep(4);

        this.props.setSignupFields({
          ...this.props.signupFields,
          company_industry: company_industry,
          company_old: company_old,
          company_employees: company_employees,
        })

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  prevStep = () => {
    this.props.setSignupStep(2);
  }

  render(){
    const { company_industry, company_old, company_employees } = this.state;

    return(
      <div className="container">
        <div className="signup__box">
          <div className="signup__progress">
            <div className="signup__progress-line">
              <div className="signup__progress-fill" style={{"width" : "50%"}}>
                <div className="signup__progress-name">Step 3</div>
              </div>
            </div>
          </div>

          <div className="signup__wrapper">
            <div className="signup__left">
              <div className="signup__avatar signup__avatar--small">
                <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
              </div>
              <h2>Help us understand a little bit more about your company</h2>
            </div>
            <div className="signup__right">
              <Formsy
                className="signup__form"
                onValidSubmit={this.handleSubmit}
                onValid={this.formValid}
                onInvalid={this.formInvalid}
                ref={this.formRef}
              >
                <FormInput
                  name="company_industry"
                  placeholder="Which industry are you in?"
                  value={company_industry}
                  validationErrors={{
                    isDefaultRequiredValue: 'This field is required',
                  }}
                  onChangeHandler={this.handleChange}
                  required
                />
                <FormInput
                  name="company_old"
                  placeholder="How old is your company?"
                  value={company_old}
                  validationErrors={{
                    isDefaultRequiredValue: 'This field is required',
                  }}
                  onChangeHandler={this.handleChange}
                  required
                />
                <FormInput
                  name="company_employees"
                  placeholder="How many staff are there in your company?"
                  value={company_employees}
                  validationErrors={{
                    isDefaultRequiredValue: 'This field is required',
                  }}
                  onChangeHandler={this.handleChange}
                  required
                />
              </Formsy>
            </div>
          </div>

        </div>

        <div className="signup__nav">
          <a className="signup__nav-back" onClick={this.prevStep}>
            <SvgIcon name="back-arrow" />
            <span>Go Back</span>
          </a>

          <a className="btn btn--small" onClick={this.submitForm}>
            <span>Next</span>
          </a>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupId: state.signup.signupId,
  signupFields: state.signup.fields
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep3);
