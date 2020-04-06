import React, {Component} from "react";
import ValidationError from "./Validation";



export default class AddFolder extends Component {


state = {
    name: {
        value: "",
        touched: false
    }
   
}

updateName(name) {
    this.setState({
        name: {value: name,
        touched: true}
    })
}

handleSubmit(e) {
    e.preventDefault();

 const name = this.state.name.value;
 const fetchData = {
     "name": name
 }
 console.log(fetchData)

 const options = {
    method: "POST",
    header: {
        "content-type": "application/json"
    },
    body: JSON.stringify(fetchData)
 }


    fetch(`http://localhost:9090/folders`, options)
        .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText)
        }
        })
        .then((data) =>
        console.log(data))
        .catch(err => alert(`something went wrong: ${err.message}`))
    }



validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
        return "Name is required";
    } else if (name.length < 3) {
        return "Name must be at least 3 characters long."
    }
}


    render() {

        const nameError = this.validateName();

        return (
            <div className="form">
                <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
                    <h2>Create New Folder</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           name="name"
                           placeholder="Choose a name"
                           onChange={e => this.updateName(e.target.value)}
                           />
                    {this.state.name.touched && (<ValidationError message={nameError}/>)}
                    <button type="submit" className="add_folder_button">
                        Add
                    </button>
                </form>
            </div>
        )
    }
}