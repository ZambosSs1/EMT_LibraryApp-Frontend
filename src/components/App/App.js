import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Books from '../Books/List/books';
import Categories from '../Categories/categories';
import NavBar from '../Navigation/navBar'
import BookAdd from '../Books/Add/bookAdd'
import libraryService from "../../repository/libraryRepository";
import BookEdit from "../Books/Edit/bookEdit";

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
        books: [],
        categories: [],
        authors: [],
        selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
            <main>
                <NavBar/>
                <div className={"container w-75"}>
                    <Routes>
                        {/*<Route path="*" element={<Navigate to ="/" />}/>*/}
                        <Route path={"/books/add"} element={<BookAdd categories = {this.state.categories}
                                                                     authors = {this.state.authors}
                                                                     onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} element={<BookEdit categories = {this.state.categories}
                                                                           authors = {this.state.authors}
                                                                           onEditBook={this.editBook}
                                                                           book={this.state.selectedBook}/>}/>
                        <Route path={"/books"} element={ <Books books={this.state.books}
                                                                onDelete={this.deleteBook}
                                                                onEdit={this.getBook}
                                                                onMark={this.markBook}/>}/>
                        <Route path={"/categories"} element={<Categories categories = {this.state.categories}/>}/>
                        <Route path={"/"} element={ <Books books={this.state.books}
                                                                onDelete={this.deleteBook}
                                                                onEdit={this.getBook}
                                                                onMark={this.markBook}/>}/>
                    </Routes>
                </div>
            </main>
        </Router>
    );
  }

  componentDidMount() {
      this.loadBooks();
      this.loadCategories();
      this.loadAuthors();
  }
    loadBooks = () => {
        libraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        libraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAuthors = () => {
        libraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    deleteBook = (id) => {
      libraryService.deleteBook(id)
          .then(()=>{
              this.loadBooks();
          });
    }

    addBook = (name, category, author, availableCopies) => {
      libraryService.addBook(name, category, author, availableCopies)
          .then(() => {
              this.loadBooks();
          });
    }

    getBook = (id) => {
      libraryService.getBook(id)
          .then((data) => {
              this.setState({
                  selectedBook: data.data
              })
          })
    }

    markBook = (id) => {
      libraryService.markAsTaken(id)
          .then(()=>{
              this.loadBooks();
          });
    }

    editBook = (id, name, category, author, availableCopies) => {
      libraryService.editBook(id, name, category, author, availableCopies)
          .then(() => {
              this.loadBooks();
          });
    }

}

export default App;
