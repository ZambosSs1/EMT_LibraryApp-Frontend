import React, {Component} from "react";
import BookElement from '../Element/bookElement'
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import './books.css'

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page:0,
            size:5
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mt-5"}>
                <div className={"row"}>

                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className="btn btn-block btn-dark" to={"/books/add"}> Add new book</Link>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Categories</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available Copies</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="container w-75">
                    <ReactPaginate previousLabel={"<<"}
                                   previousClassName={"pageNumber"}
                                   nextLabel={">>"}
                                   nextClassName={"pageNumber"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"break-me"}
                                   pageClassName={"pageNumber"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handleChange}
                                   containerClassName={"d-flex justify-content-center list-unstyled"}
                                   activeClassName={"pageActive"}/>
                </div>
            </div>
        );
    }

    handleChange = (data) => {
        let selected = data.selected;
        this.setState({
            page : selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((el) => {
            return(
                <BookElement book={el} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onMark={this.props.onMark}/>
            )
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset
        })
    }
}

export default Books;