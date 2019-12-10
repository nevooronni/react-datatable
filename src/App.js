import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';

class App extends Component {

  state = {
    products: [],
    columns: [
      {
        dataField: 'id',
        text: 'Id',
        sort: true,
        // filter: textFilter()
      },
      {
        dataField: 'iso3',
        text: 'Iso3',
        sort: true,
        // filter: textFilter()

      }, 
      {
        dataField: 'name',
        text: 'Name',
        sort: true,
        // filter: textFilter()
      },
      {
        dataField: 'numcode',
        text: 'Num Code',
        sort: true,
        // filter: textFilter()
      },
      {
        dataField: 'phonecode',
        text: 'Phone Code',
        sort: true,
        // filter: textFilter()
      },
      {
        dataField: 'created_at',
        text: 'Created At',
        sort: true,
        // filter: textFilter()
      },
      {
        dataField: 'updated_at',
        text: 'Updated At',
        sort: true,
        // filter: textFilter()
      },
    ]
  } 

  componentDidMount() {
    axios.get('http://localhost:4000/results')
      .then(response => {
        console.log("yes" + response.data)
        this.setState({
          products: response.data
        });
      });
  }

  render() {
    const { ExportCSVButton } = CSVExport;
    const { SearchBar } = Search;

    return (
      <div className="container" style={{ marginTop: 50 }}>
        <ToolkitProvider
          keyField="id"
          data={this.state.products}
          columns={this.state.columns}
          ExportCSV
          search
        >
          {
            props => (
              <div>
                <ExportCSVButton {...props.csvProps}>Export CSV!</ExportCSVButton>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable
                  striped
                  hover
                  keyField='id'
                  data={this.state.products}
                  columns={this.state.columns} 
                  // filter={filterFactory()}  
                  pagination={paginationFactory()} 
                  cellEdit={cellEditFactory({mode: 'click' })}
                  {...props.baseProps}
                />
              </div>
            )
          }
        </ToolkitProvider>
        
      </div>
    );
  } 
}

export default App;
