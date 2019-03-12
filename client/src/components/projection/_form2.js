import React from 'react';

export class Form2 extends React.Component {
  constructor(props) {
    super (props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.checkFormInput()) {
      this.props.createProjection(this.props.state).then( (res) => this.props.history.push("/chart"));
    };
  }

  render() {
    return (
      <>
      <div className="form2-parent">
        <div className="form2-container">
          <div className="form2-title">
            Let's get personal
          </div>
          <div className="form2-form">
          <form onSubmit={this.handleSubmit}>
          <label>
              My current savings is 
              <br/>
              <input 
                type="number"
                min="0"
                onChange = {this.props.updateNumber("currentSavings")}
                placeholder="Current Savings"
                value={this.props.state.currentSavings}           
              />
            </label>
              <br/>
            <label>
              My yearly income is 
              <br/>
              <input 
                type="number"
                min="0"
                onChange = {this.props.updateNumber("income")}
                placeholder="Income"
                value={this.props.state.income}           
              />
            </label>
            <br/>
            <label>
              My contribution rate is (in %)
              <br/>
              <input 
                type="number"
                step="0.001" 
                min="0"
                max="100"
                onChange = {this.props.updateNumber("savingRate")}
                placeholder="Saving Rate"
                value={this.props.state.savingRate}           
              />
            </label>
            <br/>
            <label>
              My employer matches (in %) 
              <br/>
              <input 
                type="number"
                min="0"
                max="100"
                step="0.001"
                onChange = {this.props.updateNumber("employerMatch")}
                placeholder="Employer Match"
                value={this.props.state.employerMatch}
              />
            </label>
            <br/>
            <input type="submit" value="submit"/>
          </form>
          </div>
          <input className="form2-back" type="submit" value="back" onClick={this.props.decreaseFormState}/>
        </div>
        <div className="form2-contribution">
          <label>
            Total contribution
            <br/>
            <input 
              type="number"
              min="0"
              max="19000"
              onChange = {this.props.updateNumber("totalContribution")}
              placeholder="Total Contribution"
              value={
                ((this.props.state.savingRate / 100) * this.props.state.income) > 19000 ? 
                19000 : (this.props.state.savingRate / 100) * this.props.state.income
              }
            />
          </label>
        </div>
      </div>
      </>
    )
  }
}