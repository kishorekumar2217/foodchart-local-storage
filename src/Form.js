import React, { Component } from 'react';

export default class Form extends Component {


  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dayDetails = this.dayDetails.bind(this);

    this.state = {
      name: '',
      list: [],
      temp: '',
      storage: [],
      price: '',
      day: '',
      tempdata: [],
      Name: '',
      Price: '',
      Day: ''



    }
  }
  dayDetails() {

  }


  onChangeName(e) {
    this.setState({ name: e.target.value })
  }



  onChangePrice(e) {
    this.setState({ price: e.target.value })
  }
  handleChange(e) {
    this.setState({ day: e.target.value })
  }


  onClicks = (event) => {
    this.setState({
      temp: event.target.name
    })

  }
  componentDidMount() {
    // localStorage.setItem('detail', JSON.stringify([]));+
    let store = (JSON.parse(localStorage.getItem('detail'))) ? JSON.parse(localStorage.getItem('detail')) : []
    this.setState({
      list: store
    })

  }







  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, price, day } = this.state;

    var detail = { name: name, price: price, day: day };
    let store = (JSON.parse(localStorage.getItem('detail'))) ? JSON.parse(localStorage.getItem('detail')) : []
    store.push(detail);
    localStorage.setItem('detail', JSON.stringify(store));
    this.setState({
      list: store
    });
  }


  onRemoveItem = (index) => {
    let store = (JSON.parse(localStorage.getItem('detail'))) ? JSON.parse(localStorage.getItem('detail')) : []
    store.splice(index, 1);
    localStorage.setItem('detail', JSON.stringify(store));
    this.setState({
      list: store
    })
  }

  render() {
    

     
      
    let store = (JSON.parse(localStorage.getItem('detail'))) ? JSON.parse(localStorage.getItem('detail')) : [];
    let filteredData = store.filter((days, key) => days.day === this.state.temp)
    .map((filtereddays, index) => {
      let itemKey = store.indexOf(filtereddays);
      return (<tr key={filtereddays.index}>
        <td>{filtereddays.name}</td>
        <td>{filtereddays.price}</td>

        <td>{filtereddays.day}</td>
        <td> <button type="button" type="submit" onClick={() => this.onRemoveItem(itemKey)} >

        </button></td>
      </tr>)
    });



    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>

          <div className="form-group">

            <label>
              Days:
          <select value={this.state.value} onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="thursday">thursday</option>
                <option value="Wednesday">Wednesday</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label> Food Name</label>
            <input type="text" className="form-control" onChange={this.onChangeName} />
          </div>
          <h1>{this.state.n}</h1>
          <h1></h1>
          <div className="form-group">
            <label>Price</label>
            <input type="text" className="form-control" onChange={this.onChangePrice} />
          </div>
          <button type="submit" className="btn btn-primary btn-block" >Submit</button>
        </form>
        <br />

        <button className="btn btn-primary btn-block" name="Sunday" onClick={this.onClicks}>Sunday</button>
        <button className="btn btn-primary btn-block" name="Monday" onClick={this.onClicks}>Monday</button>
        <button className="btn btn-primary btn-block" name="thursday" onClick={this.onClicks} >thursday</button>
        <button className="btn btn-primary btn-block" name="Wednesday" onClick={this.onClicks} >Wednesday</button>
        {/* <button className="btn btn-primary btn-block" name="5" onClick={this.onClicks}>5</button>
                <button  className="btn btn-primary btn-block" name="6" onClick={this.onClicks} >6</button>
                <button className="btn btn-primary btn-block" name="7" onClick={this.onClicks}>7</button>
 */}

        <div>
          <table>
            <th>Name</th>
            <th>Price</th>
            <th>Day</th>
            {filteredData}
          </table>

        </div>

        <h1>
          {this.state.Price}
        </h1>

        <div>
    
    </div>

      </div>

    )
  }
}