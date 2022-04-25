import React from "react";
import {useNavigate} from "react-router-dom";

const BookAdd = (props) => {

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
        const name = formData.name;
        const category = formData.category;
        const author = formData.author;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name, category, author, availableCopies);
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
                               required
                               placeholder={"Enter book name"}
                               onChange={handleChange}
                        />
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"author"}>Book Author</label>
                        <select name="author" id="author" className={"form-control"} onChange={handleChange}>
                            {props.authors.map((el) =>
                                <option value={el.id}>{el.name} {el.surname}</option>
                            )}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"category"}>Book Category</label>
                        <select name="category" id="category" className={"form-control"} onChange={handleChange}>
                            {props.categories.map((el) =>
                                <option value={el}>{el}</option>
                            )}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor="availableCopies">Book Available Copies</label>
                        <input type="number"
                               className={"form-control"}
                               id={"availableCopies"}
                               name={"availableCopies"}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <button id={"submit"} type={"submit"} className={"btn btn-primary"}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookAdd;