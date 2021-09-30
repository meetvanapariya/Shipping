import React, { Component } from 'react';
import classes from './index.module.css';
import axios from 'axios';
import paginate from 'paginate-array';


export default class ShippingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          shippingdata: [],
          size: 5,
          page: 1,
          currPage: []
        };
        this.onSort = this.onSort.bind(this)
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
      }
  componentDidMount() {
    axios.get(' http://localhost:3333/shipments')
      .then(response => {
        const { page, size } = this.state;
        const currPage = paginate(response.data, page, size);
        this.setState({ ...this.state,shippingdata: response.data,currPage });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  exerciseList() {
    console.log(this.state);
    if(this.state.currPage.data != undefined){
      return this.state.currPage.data.map(data => {
        return (
            <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.mode}</td>
                <td>{data.origin}</td>
                <td>{data.type}</td>
                <td>{data.total}</td>
                <td>{data.userId}</td>
                <td>{data.status}</td>
                <td>view more</td>
            </tr>
        );
      })
    }
   
   
  }
    

  onSort(event, sortKey){
    console.log(">>>>>");
   console.log(this.state.shippingdata);
    const data = this.state.shippingdata;
    data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    // this.setState({shippingdata: data})
    const { page, size } = this.state;
    const currPage = paginate(data, page, size);
    this.setState({ ...this.state,shippingdata:data,currPage });
  }


  previousPage() {
    const { currPage, page, size, shippingdata } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(shippingdata, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, shippingdata } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(shippingdata, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  render() {
    return (
      <div className={classes.mainDiv}>
        <h3>Shipping Details</h3>
        <table className={classes.shippingTable}>
          <thead className="thead-light">
            <tr>
              <th onClick={e => this.onSort(e, 'id')}><a href="#" className={classes.sortBy}>id</a></th>
              <th onClick={e => this.onSort(e, 'name')}><a href="#" className={classes.sortBy}>Name</a></th>
              <th onClick={e => this.onSort(e, 'mode')}><a href="#" className={classes.sortBy}>Mode</a></th>
              <th onClick={e => this.onSort(e, 'origin')}><a href="#" className={classes.sortBy}>Origin</a></th>
              <th onClick={e => this.onSort(e, 'type')}><a href="#" className={classes.sortBy}>Type</a></th>
              <th onClick={e => this.onSort(e, 'total')}><a href="#" className={classes.sortBy}>Total</a></th>
              <th>User Id</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
        <button onClick={this.previousPage}>Previous Page</button>
        <button onClick={this.nextPage}>Next Page</button>
      </div>
    )
  }
}
