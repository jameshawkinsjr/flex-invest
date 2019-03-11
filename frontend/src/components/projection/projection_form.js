import React from 'react';
import { Form1 } from './_form1'
import { Form2 } from './_form2'

class ProjectionForm extends React.Component {
  constructor(props) {
    super(props);

    let { name, yearToRetire, income, savingRate, employerMatch, currentSavings, user } = this.props
    this.state = {
      user,
      name, 
      yearToRetire, 
      income, 
      savingRate, 
      employerMatch, 
      currentSavings,
      formState: 0,
      errors: {}
    }

    this.increaseFormState = this.increaseFormState.bind(this);
    this.decreaseFormState = this.decreaseFormState.bind(this);
    this.checkForm1Input = this.checkForm1Input.bind(this);
  }

  increaseFormState(e) {
    let formNum = this.state.formState;
    if (Object.values(this.state.errors).length > 0) {
      console.log(this.state.errors);
      this.renderProjectionErrors()
    } else {
      this.setState( (oldState) => ({formState: (formNum + 1)}));
    }
  }

  decreaseFormState(e) {
    let formNum = this.state.formState;
    this.setState( (oldState) => ({formState: (formNum - 1)}));
  }

  checkForm1Input(e) {
     if (this.state.name === "") {
       alert("Name cannot be blank!")
       return true;
     } else if (this.state.yearToRetire === 0) {
       alert("Please enter a year!")
       return true;
     }
  }

  checkForm2Input(e) {
    if (this.state.income === 0) {
      alert("Income must be greater than 0!")
      return true;
    } else if (this.state.savingRate === 0) {
      alert("Saving rate can't be blank!")
      return true;
    };
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      })
    }
  }

  updateNumber(field) {
    return (e) => {
      console.log(parseFloat(e.currentTarget.value));
      this.setState({
        [field]: parseFloat(e.currentTarget.value)
      })
    }
  }

  renderProjectionErrors() {
    return (
      <ul> 
        {Object.values(this.state.errors).map( (error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    let form;
    switch(this.state.formState) {
      case 0:
        form = ( 
          <div>
            <Form1 
              state={this.state} 
              increaseFormState={this.increaseFormState} 
              decreaseFormState={this.decreaseFormState}
              update={this.update.bind(this)}
              updateNumber={this.updateNumber.bind(this)}
              checkFormInput={this.checkForm1Input} 
            />
            {this.renderProjectionErrors()}
          </div>
           )
        break;
      case 1:
        form = ( 
          <Form2 
            state={this.state} 
            increaseFormState={this.increaseFormState} 
            decreaseFormState={this.decreaseFormState}
            update={this.update.bind(this)} 
            updateNumber={this.updateNumber.bind(this)} 
            checkFormInput={this.checkForm2Input} 
            createProjection={this.props.createProjection}
          /> )
        break;
      default:
        form = ( <h1> Something went wrong, please reload your page <span role="img" aria-label="sadFace">☹️</span> </h1> )
        break;
    }

    return(
      <>
        {form}
      </>
    )
  }
}

export default ProjectionForm;