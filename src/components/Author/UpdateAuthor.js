import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { getAuthorsQuery, getAuthorById, updateAuthorMutation } from '../../Queries/queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,

            name: "",
            age: 0
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onUpdate(e) {        
        e.preventDefault();
        this.props.updateAuthorMutation({
            variables: {
                id: parseInt(this.props.authorId),
                name: this.state.name,
                age: parseInt(this.state.age)
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        });
        this.toggleModal();
    }


    renderUpdateModal() {
        let name = "", age = ""
        if (this.props.getAuthorById.author) {
            name = this.props.getAuthorById.author.name;
            age = this.props.getAuthorById.author.age;
        }
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Add Book</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Book Name</Label>
                            <Input type="text" name="name" defaultValue={name} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="age">Genre</Label>
                            <Input type="text" name="age" defaultValue={age} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={this.onUpdate.bind(this)}>Update</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return (
            <div style={{ "width": "50%", "display": "inline" }}>
                <Button color="warning" onClick={this.toggleModal}>Update</Button>
                {this.renderUpdateModal()}
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(updateAuthorMutation, { name: "updateAuthorMutation" }),
    graphql(getAuthorById, {
        name: "getAuthorById",
        options: (props) => {
            return {
                variables: {
                    id: props.authorId
                }
            }
        }
    })
)(AddBook);