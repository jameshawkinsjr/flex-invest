import React from 'react';
import { Form1 } from './_form1'
import { Form2 } from './_form2'

class ProjectionForm extends React.Component {
  constructor(props) {
    super(props);

    let { name, yearToRetire, income, savingRate, employerMatch, date } = this.props
    this.state = {
      name, 
      yearToRetire, 
      income, 
      savingRate, 
      employerMatch, 
      date,
      formState: 0
    }

    this.increaseFormState = this.increaseFormState.bind(this);
    this.decreaseFormState = this.decreaseFormState.bind(this);
    this.checkForm1Input = this.checkForm1Input.bind(this);
  }

  increaseFormState(e) {
    let formNum = this.state.formState;
    this.setState( (oldState) => ({formState: (formNum + 1)}));
  }

  decreaseFormState(e) {
    let formNum = this.state.formState;
    this.setState( (oldState) => ({formState: (formNum - 1)}));
  }

  checkForm1Input(e) {
     if (this.state.name === "" || this.state.yearToRetire === "") {
       console.log("ERROR")
     }
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      })
    }
  }

  render() {
    let form;
    console.log(this.state);
    switch(this.state.formState) {
      case 0:
        form = ( 
          <Form1 
            state={this.state} 
            increaseFormState={this.increaseFormState} 
            decreaseFormState={this.decreaseFormState}
            update={this.update.bind(this)}
            checkFormInput={this.checkForm1Input} 
          /> )
        break;
      case 1:
        form = ( 
          <Form2 
            state={this.state} 
            increaseFormState={this.increaseFormState} 
            decreaseFormState={this.decreaseFormState}
            update={this.update.bind(this)} 
            checkFormInput ={this.checkForm2Input} 
          /> )
        break;
      default:
        form = ( < h1 > Something went wrong, please reload your page <span role="img" aria-label="sadFace">☹️</span> </h1> )
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