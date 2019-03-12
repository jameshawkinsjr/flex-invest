import React from 'react';

export class Form1 extends React.Component {
  constructor(props) {
    super (props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.checkFormInput()) {
      this.props.increaseFormState();
    };
  }

  render() {
    let currentYear = new Date().getFullYear()
    return (
      <>
      <div className="form1-parent">
        <div className="form1-container">
          <div className="form1-title">
            Tell us about yourself
          </div>
          <div className="form1-form">
            <form onSubmit={this.handleSubmit}>
              <label>
                <span>My first name is</span>
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
              <span>I want to retire in</span>
              <br/>
              <select onChange = {this.props.updateNumber("yearToRetire")}>
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
                <option value={`${currentYear + 31}`}>{currentYear + 31}</option>
                <option value={`${currentYear + 32}`}>{currentYear + 32}</option>
                <option value={`${currentYear + 33}`}>{currentYear + 33}</option>
                <option value={`${currentYear + 34}`}>{currentYear + 34}</option>
                <option value={`${currentYear + 35}`}>{currentYear + 35}</option>
                <option value={`${currentYear + 36}`}>{currentYear + 36}</option>
                <option value={`${currentYear + 37}`}>{currentYear + 37}</option>
                <option value={`${currentYear + 38}`}>{currentYear + 38}</option>
                <option value={`${currentYear + 39}`}>{currentYear + 39}</option>
                <option value={`${currentYear + 40}`}>{currentYear + 40}</option>
                <option value={`${currentYear + 41}`}>{currentYear + 41}</option>
                <option value={`${currentYear + 42}`}>{currentYear + 42}</option>
                <option value={`${currentYear + 43}`}>{currentYear + 43}</option>
                <option value={`${currentYear + 44}`}>{currentYear + 44}</option>
                <option value={`${currentYear + 45}`}>{currentYear + 45}</option>
                <option value={`${currentYear + 46}`}>{currentYear + 46}</option>
                <option value={`${currentYear + 47}`}>{currentYear + 47}</option>
                <option value={`${currentYear + 48}`}>{currentYear + 48}</option>
                <option value={`${currentYear + 49}`}>{currentYear + 49}</option>
                <option value={`${currentYear + 50}`}>{currentYear + 50}</option>
              </select>
              <br/>
              <input type="submit" value="next"/>
            </form>
          </div>
        </div>
      </div>
      </>
    )
  }
}