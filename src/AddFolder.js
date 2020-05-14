import React, {Component} from "react";
import ValidationError from "./Validation";
import { DataContext } from "./Context"
import PropTypes from "prop-types"



export default class AddFolder extends Component {

    static contextType = DataContext;

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


 const options = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify(fetchData)
 }


    fetch(`https://thawing-taiga-89295.herokuapp.com/api/folders`, options)
        .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText)
        }
        })
        .then(data => this.context.actions.updateAllFolders(data))
        .catch(err => alert(`something went wrong: ${err.message}`))

this.setState({
    name: {
        value: "",
        touched: false
    }
})

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
                           value={this.state.name.value}
                           />
                    {this.state.name.touched && (<ValidationError message={nameError}/>)}
                    <button type="submit" 
                            className="add_folder_button"
                            disabled={this.validateName()}>
                        Add
                    </button>
                </form>
            </div>
        )
    }
}

AddFolder.propTypes = {
    context: PropTypes.shape({
        updateAllFolders: PropTypes.func
    })
}