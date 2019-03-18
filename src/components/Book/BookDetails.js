import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { getBookQuery } from '../../Queries/queries';

class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookId: null,
            modal: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    btnDisplay(id) {
        this.setState({
            modal: !this.state.modal,
            selectedBookId: id
        })
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    displayBookDetails() {
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>Genre: <b>{book.genre}</b></p>
                    <p>Author: <b>{book.author.name}</b></p>
                    <p>All Books by this author: </p>
                    <ul className="other-books">
                        {book.author.books.map(bookitem => {
                            return <li key={bookitem.id}>{bookitem.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>
                    No book selected..!!
                </div>
            )
        }
    }

    renderShowModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Book Details</ModalHeader>
                <ModalBody>
                    {this.displayBookDetails()}
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.toggleModal}>OK</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                <Button color="info" onClick={this.btnDisplay.bind(this, this.props.bookId)}>Details</Button>
                {this.renderShowModal()}
            </div>
        );
    }
}
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);