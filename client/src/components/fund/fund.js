import React from 'react';

class Fund extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputBox: "",
    }
  }

  componentDidMount() {
    this.props.fetchFunds();
  }

  handleInput() {
    return (e) => {
        this.setState( { inputBox: e.target.value });
    };
}


  render() {
    let fundsList = (
        this.props.funds.map( fund => {
          if (
              fund.fund_name.toLowerCase().includes(this.state.inputBox.toLowerCase()) 
              ||
              fund.symbol.toLowerCase().includes(this.state.inputBox.toLowerCase()) 
              ||
              fund.asset_class_1.toLowerCase().includes(this.state.inputBox.toLowerCase()) 
              ||
              fund.asset_class_2.toLowerCase().includes(this.state.inputBox.toLowerCase()) 
              ||
              (parseFloat(fund['1_yr'])  > (this.state.inputBox) )
              ||
              (parseFloat(fund['3_yr'])  > (this.state.inputBox) )
              ||
              (parseFloat(fund['5_yr'])  > (this.state.inputBox) )
              ||
              (parseFloat(fund['10_yr'])  > (this.state.inputBox) )
              ){
          return (
            <tr className="fund-item" key={`fund-${fund.symbol}`}>
              <td><a href={`https://www.morningstar.com/funds/xnas/${fund.symbol}/quote.html`}>{ fund.symbol }</a></td>
              <td>{ fund.fund_name }</td>
              <td>{ fund.asset_class_1 }</td>
              <td>{ fund.asset_class_2 || "N/A" }</td>
              <td>{ parseFloat(fund.exp_ratio) }</td>
              <td>{ parseFloat(fund.aum) }</td>
              <td>{ parseFloat(fund.pct_of_all_401k_assets) }</td>
              { parseFloat(fund['1_yr']) < 0 ? (<td className="negative">{ parseFloat(fund['1_yr']) }</td>) : (<td className="positive">{ parseFloat(fund['1_yr']) }</td>) }
              { parseFloat(fund['3_yr']) < 0 ? (<td className="negative">{ parseFloat(fund['3_yr']) }</td>) : (<td className="positive">{ parseFloat(fund['3_yr']) }</td>) }
              { parseFloat(fund['5_yr']) < 0 ? (<td className="negative">{ parseFloat(fund['5_yr']) }</td>) : (<td className="positive">{ parseFloat(fund['5_yr']) }</td>) }
              { parseFloat(fund['10_yr']) < 0 ? (<td className="negative">{ parseFloat(fund['10_yr']) }</td>) : (<td className="positive">{ parseFloat(fund['10_yr']) }</td>) }
            </tr>
          )
        }
        })
    )
    return (
      <div className="fund-page flex-column">
        <div className="fund-page-header">
          <h1 >The top 100 most popular 401k Funds.</h1>
          <h2 >Search here and see how yours compare!</h2>
        </div>
        <div className="fund-page-search-container flex">
          <p> Search: </p>
            <input className="fund-page-search" 
            placeholder="Symbol, Name, Asset Class, or Annual Return Rate"
            onChange={this.handleInput()}
            autoFocus
            />
          </div>
        <table className="sortable" >
          <thead>
            <tr>
              <th>{ `Symbol` }</th>
              <th>{ `Fund Name` }</th>
              <th>{ `Primary Asset Class` }</th>
              <th>{ `Secondary Asset Class` }</th>
              <th>{ `Expense Ratio` }</th>
              <th>{ `Assets Under Management (Billions)` }</th>
              <th>{ `Percent of 401k Market` }</th>
              <th>{ `1 Year Returns` }</th>
              <th>{ `3 Year Returns` }</th>
              <th>{ `5 Year Returns` }</th>
              <th>{ `10 Year Returns` }</th>
            </tr>
          </thead>
            <tbody>
             { fundsList }
            </tbody>
        </table>

      </div>
    )}
}

export default Fund;