import React from "react";
import {useNavigate} from "react-router-dom";

const BookEdit = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        author: 0,
        category: "",
        availableCopies:0

    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.book.name;
        const category = formData.category !== "" ? formData.category : props.book.category;
        const author = formData.author !== 0 ? formData.author : props.book.author.id;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.book.availableCopies;

        props.onEditBook(props.book.id, name, category, author, availableCopies);
        history("/books");
    }

    return(
        <div className={"row mt-5"}>
            <div className={"col-md-5"}>
                <form onSubmit={onFormSubmit}>

                    <div className={"form-group"}>
                        <label htmlFor="name">Book Name</label>
                        <input type="text"
                               className={"form-control"}
                               id={"name"}
                               name={"name"}
                               onChange={handleChange}
                               placeholder={props.book.name}
                        />
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"author"}>Book Author</label>
                        <select name="author" id="author" className={"form-control"} onChange={handleChange}>
                            {props.authors.map((el) => {
                                if(props.book.author !== undefined && props.book.author.id === el.id)
                                    return  <option selected={props.book.author.id} value={el.id}>{el.name} {el.surname}</option>
                                else return <option value={el.id}>{el.name} {el.surname}</option>
                            })}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"category"}>Book Category</label>
                        <select name="category" id="category" className={"form-control"} onChange={handleChange}>
                            {props.categories.map((el) => {
                                if(props.book.category !== undefined && props.book.category === el)
                                    return <option selected={props.book.category} value={el}>{el}</option>
                                else return <option value={el}>{el}</option>
                            })}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor="availableCopies">Book Available Copies</label>
                        <input type="number"
                               className={"form-control"}
                               id={"availableCopies"}
                               name={"availableCopies"}
                               onChange={handleChange}
                               placeholder={props.book.availableCopies}

                        />
                    </div>
                    <button id={"submit"} type={"submit"} className={"btn btn-primary"}>Submit</button>
                </form>
            </div>
        </div>
    );

}

export default BookEdit;