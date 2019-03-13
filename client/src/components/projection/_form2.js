import React from 'react';
import {Animated} from "react-animated-css";

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
          <span role="img" aria-label="money-face-emoji">️🤑</span> Let's get personal <span role="img" aria-label="money-face-emoji">️🤑</span>
          </div>
          <div className="form2-form">
          <form onSubmit={this.handleSubmit}>
          <label>
              I currently have this much saved
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
              I contribute this % of my paycheck to my 401k
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
              My employer matches my contribution by this % 
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
            <input type="submit" value=" submit ➡️"/>
          </form>
          </div>
          <input className="form2-back" type="submit" value="⏪ back" onClick={this.props.decreaseFormState}/>
        </div>
        
        <Animated animationIn="bounceInRight" animationOut="rubberBand" isVisible={true}>
        <div className="form2-contribution">
          <label>
            Total contribution per year: 
            <br/>
            $
            <input 
              type="text"
              min="0"
              max="19000"
              readOnly="readonly"
              onChange = {this.props.updateNumber("totalContribution")}
              placeholder="Total Contribution"
              value={
                ((this.props.state.savingRate / 100) * this.props.state.income) > 19000 ? 
                19000 : ((this.props.state.savingRate / 100) * this.props.state.income).toFixed(2)
              }
            />
          </label>
        </div>
        </Animated>
      </div>
      </>
    )
  }
}