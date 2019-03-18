import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { getAuthorsQuery, addBookMutation, getBooksQuery, getBookById, updateBookMutation } from '../../Queries/queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,

            name: "",
            genre: "",
            authorId: 0
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

    displayAuthors() {
        let data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading Authors....</option>);
        }
        else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    onUpdate(e) {
        e.preventDefault();
        this.props.updateBookMutation({
            variables: {
                id: parseInt(this.props.bookId),
                name: this.state.name,
                genre: this.state.genre,
                authorId: parseInt(this.state.authorId)
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
        this.toggleModal();
    }


    renderUpdateModal() {
        let name = "", genre = "", authorId = ""
        if (this.props.getBookById.book) {
            name = this.props.getBookById.book.name;
            genre = this.props.getBookById.book.genre;
            authorId = this.props.getBookById.book.author.id
        }
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Add Book</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Book Name</Label>
                            <Input type="text" name="name" placeholder="Book Name" defaultValue={name} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <Input type="text" name="genre" placeholder="Genre" defaultValue={genre} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input type="select" name="authorId" defaultValue={authorId} id="author" onChange={this.changeHandler.bind(this)}>
                                <option value="" disabled="" style={{ display: "none" }}>Select Author</option>
                                {this.displayAuthors()}
                            </Input>
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
    graphql(addBookMutation, { name: "addBookMutation" }),
    graphql(updateBookMutation, { name: "updateBookMutation" }),
    graphql(getBookById, {
        name: "getBookById",
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    })
)(AddBook);