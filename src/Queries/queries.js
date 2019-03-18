import { gql } from 'apollo-boost';

const getBooksQuery = gql`
{
    books{
        name
        genre
        id
    }
}`
const getAuthorsQuery = gql`
{
    authors{
        name
        age
        id
    }
}`
const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`
const getBookById = gql`
    query($id: ID) {
        book(id: $id) {
            name
            genre
            author{
                name
                id
            }
        }
    }
`
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`
const deleteBookMutation = gql`
    mutation( $id: ID!){
        deleteBook(id: $id) {         
            id
        }
    }
`
const updateBookMutation = gql`
    mutation($id: ID!, $name: String, $genre: String, $authorId: ID){
        updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
            name
            genre
          }	
    }
`
const addAuthorMutation = gql`
    mutation($name: String!, $age: Int!){
        addAuthor(name: $name, age: $age) {
            name
            id
        }
    }
`
const deleteAuthorMutation = gql`
    mutation( $id: ID!){
        deleteAuthor(id: $id) {         
            id
        }
    }
`
const getAuthorById = gql`
    query($id: ID) {
        author(id: $id) {
            name
            age            
        }
    }
`
const updateAuthorMutation = gql`
    mutation($id: ID!, $name: String, $age: Int){
        updateAuthor(id: $id, name: $name, age: $age) {
            name
            age
          }	
    }
`
export {
    getAuthorsQuery,
    getBooksQuery,
    addBookMutation,
    getBookQuery,
    deleteBookMutation,
    updateBookMutation,
    getBookById,
    addAuthorMutation,
    deleteAuthorMutation,
    getAuthorById,
    updateAuthorMutation
};