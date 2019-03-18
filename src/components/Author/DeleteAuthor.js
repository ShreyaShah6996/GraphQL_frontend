import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteAuthorMutation, getAuthorsQuery } from '../../Queries/queries';

class DeleteBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false          
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onDelete(e) {
        e.preventDefault();
        this.props.deleteAuthorMutation({
            variables: {
                id: parseInt(this.props.authorId)
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        });
        this.toggleModal();
    }

    renderDeleteModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete it?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onDelete.bind(this)}>Delete</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return (
            <div style={{ "width": "50%", "display": "inline" }}>
                <Button color="danger" onClick={this.toggleModal}>Delete</Button>
                {this.renderDeleteModal()}
            </div>
        );
    }
}
export default compose(
    graphql(deleteAuthorMutation, { name: "deleteAuthorMutation" }),
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
)(DeleteBook);
