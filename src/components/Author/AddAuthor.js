import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { addAuthorMutation, getAuthorsQuery } from '../../Queries/queries';

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,

            name: "",
            age: "",
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

    onAdd(e) {
        e.preventDefault();
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: parseInt(this.state.age)
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        });

        this.toggleModal();
    }

    renderAddModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Add Book</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Author Name</Label>
                            <Input type="text" name="name" placeholder="Author Name" onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="age">Genre</Label>
                            <Input type="text" name="age" placeholder="Age" onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.onAdd.bind(this)}>Add</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return (
            <div style={{ "float": "left", marginTop: "7px" }}>
                <Button color="success" onClick={this.toggleModal}>Add Author</Button>
                {this.renderAddModal()}
            </div>
        );
    }
}
export default graphql(addAuthorMutation, { name: "addAuthorMutation" })(AddAuthor);
