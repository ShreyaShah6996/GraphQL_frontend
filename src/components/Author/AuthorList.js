import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Container } from 'reactstrap';

import AddAuthor from './AddAuthor';
import DeleteAuthor from './DeleteAuthor';
import UpdateAuthor from './UpdateAuthor';
// import BookDetails from '../Book/BookDetails';
import { getAuthorsQuery } from '../../Queries/queries';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
class AuthorList extends Component {
    render() {
        const options = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }],
            sizePerPage: 5,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'top',
            withFirstAndLast: false,
        };

        // function DetailedButtonDisplay(cell) {
        //     return (
        //         <div>
        //             <BookDetails bookId={cell} />
        //         </div>
        //     );
        // }

        function ActionButtonDisplay(cell) {
            return (
                <div style={{ "width": "100%", "display": "inline" }}>
                    <UpdateAuthor authorId={cell} />{' '}
                    <DeleteAuthor authorId={cell} />
                </div>
            );
        }

        return (
            <Container>
                <h3>Author List</h3>
                <AddAuthor />
                <BootstrapTable data={this.props.data.authors} pagination={true} options={options} striped hover>
                    <TableHeaderColumn isKey dataField="name" dataSort={true}>Books</TableHeaderColumn>
                    <TableHeaderColumn dataField="age" dataSort={true}>Age</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="id" dataFormat={DetailedButtonDisplay}>Details</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="id" dataFormat={ActionButtonDisplay}>Action</TableHeaderColumn>
                </BootstrapTable>
            </Container>
        );
    }
}
export default graphql(getAuthorsQuery)(AuthorList);