import React, { Component } from 'react';

export default class App extends Component {


  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      name: '',
      price: '',
      day: '',

      list: [],
      temp: '',
    }
  }
 
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onClicks = (event) => {
    this.setState({
      temp: event.target.name
    })
  }
  componentDidMount() {
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
          <td> <button  className="bt1" type="submit" onClick={() => this.onRemoveItem(itemKey)} >
          </button></td>
        </tr>
        )
      });
    return (
      <div className="container">
        <div className="header">
          <form onSubmit={this.handleFormSubmit}>
            <h1 className='head'><b>Food Chart</b></h1>
            <br />
      
            <table>
              <tr>
                <td>  <label className="label">Food Name:</label>
                  <input required pattern="([a-zA-Z\s]){2,}" placeholder="Enter food item" onChange={this.handleInputChange} type="text" className="text" name="name" />
                </td>
                <td>  <label className="label">Price:</label>
                  <input required pattern="([0-9]){1,}" placeholder="Enter price" onChange={this.handleInputChange} type="text" className="text" name='price' />
                </td>
                <td>
                  <label className="label">Day:</label>
                  <select className="text" value={this.state.value} onChange={this.handleInputChange} name='day' required  >
                    <option value="">Select</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </td>
                <td>
                  <br />
                  <button type="submit" className="btn btn-success btn-block">Submit </button>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div className="leftbody">
          <button className="btn btn-primary btn-block" name="Sunday" onClick={this.onClicks}>Sunday</button>
          <button className="btn btn-primary btn-block" name="Monday" onClick={this.onClicks}>Monday</button>
          <button className="btn btn-primary btn-block" name="Tuesday" onClick={this.onClicks} >Tuesday</button>
          <button className="btn btn-primary btn-block" name="Wednesday" onClick={this.onClicks} >Wednesday</button>
          <button className="btn btn-primary btn-block" name="Thursday" onClick={this.onClicks}>Thursday</button>
          <button className="btn btn-primary btn-block" name="Friday" onClick={this.onClicks} >Friday</button>
          <button className="btn btn-primary btn-block" name="Saturday" onClick={this.onClicks}>Saturday</button>
        </div>
        <div className='rightbody'>
          <table>
            <th>Name</th>
            <th>Price</th>
            <th>Day</th>
            <th>Remove</th>
            {filteredData}
          </table>
        </div>
      </div>
    );
  }
}

