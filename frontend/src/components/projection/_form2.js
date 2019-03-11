import React from 'react';

export class Form2 extends React.Component {
  constructor(props) {
    super (props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.increaseFormState();
  }

  render() {
    return (
      <>
        Let's get personal
        <form onSubmit={this.handleSubmit}>
          <label>
            My yearly income is 
            <br/>
            <input 
              type="number" 
              onChange = {this.props.update("income")}
              placeholder="Income"
              value={this.props.state.income}           
            />
          </label>
          <br/>
          <label>
            My saving rate is 
            <br/>
            <input 
              type="number"
              step="0.01" 
              onChange = {this.props.update("savingRate")}
              placeholder="Saving Rate"
              value={this.props.state.savingRate}           

            />
          </label>
          <br/>
          <label>
            My employer matches: 
            <br/>
            <input 
              type="text" 
              onChange = {this.props.update("employerMatch")}
              placeholder="Employer Match"
              value={this.props.state.employerMatch}
            />
          </label>
          <br/>
          <input type="submit" value="submit"/>
        </form>
        <input type="submit" value="back" onClick={this.props.decreaseFormState}/>

      </>
    )
  }
}