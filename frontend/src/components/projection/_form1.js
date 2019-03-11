import React from 'react';

export class Form1 extends React.Component {
  constructor(props) {
    super (props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.checkFormInput();
    this.props.increaseFormState();
  }

  render() {
    let currentYear = new Date().getFullYear()
    return (
      <>
        Tell us about yourself
        <form onSubmit={this.handleSubmit}>
          <label>
            My first name is 
            <br/>
            <input 
              type="text" 
              onChange = {this.props.update("name")}
              placeholder="First name"
              value={this.props.state.name}
            />
          </label>
          <br/>
          <br/>
          I want to retire in 
          <select onChange = {this.props.update("yearToRetire")}>
            <option value="0">Year</option>
            <option value={`${currentYear + 1}`}>{currentYear + 1}</option>
            <option value={`${currentYear + 2}`}>{currentYear + 2}</option>
            <option value={`${currentYear + 3}`}>{currentYear + 3}</option>
            <option value={`${currentYear + 4}`}>{currentYear + 4}</option>
            <option value={`${currentYear + 5}`}>{currentYear + 5}</option>
            <option value={`${currentYear + 6}`}>{currentYear + 6}</option>
            <option value={`${currentYear + 7}`}>{currentYear + 7}</option>
            <option value={`${currentYear + 8}`}>{currentYear + 8}</option>
            <option value={`${currentYear + 9}`}>{currentYear + 9}</option>
            <option value={`${currentYear + 10}`}>{currentYear + 10}</option>
            <option value={`${currentYear + 11}`}>{currentYear + 11}</option>
            <option value={`${currentYear + 12}`}>{currentYear + 12}</option>
            <option value={`${currentYear + 13}`}>{currentYear + 13}</option>
            <option value={`${currentYear + 14}`}>{currentYear + 14}</option>
            <option value={`${currentYear + 15}`}>{currentYear + 15}</option>
            <option value={`${currentYear + 16}`}>{currentYear + 16}</option>
            <option value={`${currentYear + 17}`}>{currentYear + 17}</option>
            <option value={`${currentYear + 18}`}>{currentYear + 18}</option>
            <option value={`${currentYear + 19}`}>{currentYear + 19}</option>
            <option value={`${currentYear + 20}`}>{currentYear + 20}</option>
            <option value={`${currentYear + 21}`}>{currentYear + 21}</option>
            <option value={`${currentYear + 22}`}>{currentYear + 22}</option>
            <option value={`${currentYear + 23}`}>{currentYear + 23}</option>
            <option value={`${currentYear + 24}`}>{currentYear + 24}</option>
            <option value={`${currentYear + 25}`}>{currentYear + 25}</option>
            <option value={`${currentYear + 26}`}>{currentYear + 26}</option>
            <option value={`${currentYear + 27}`}>{currentYear + 27}</option>
            <option value={`${currentYear + 28}`}>{currentYear + 28}</option>
            <option value={`${currentYear + 29}`}>{currentYear + 29}</option>
            <option value={`${currentYear + 30}`}>{currentYear + 30}</option>
          </select>
          <br/>
          <input type="submit" value="next"/>
        </form>
      </>
    )
  }
}