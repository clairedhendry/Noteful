import React, {Component} from "react";
import ValidationError from "./Validation"
import { DataContext } from "./Context"

export default class AddNote extends Component {

static contextType = DataContext

state = {
    name: {
        value: "",
        touched: false
    },
    content: "",
    folderId: ""
  
}

handleSubmit(e) {
    e.preventDefault();

    const name = this.state.name.value;
    const content = this.state.content;
    const allFolders = this.context.state.allFolders
    const folderId = allFolders[Math.floor(Math.random() * allFolders.length)]

    const fetchData = {
        "name": name,
        "content": content,
        "folderId": folderId.id,
    }
    
   
    const options = {
       method: "POST",
       headers: {
           "content-type": "application/json"
       },
       body: JSON.stringify(fetchData)
    }
   
   
       fetch(`http://localhost:9090/notes`, options)
           .then(response => {
           if(response.ok) {
               return response.json();
           } else {
               throw new Error(response.statusText)
           }
           })
           
        //    .then(data => this.setState({
        //         folderId: data.id
        //    }))
        //    .then(data => this.setState({
        //        currentNote: data
        //    }))
           .then(data => this.context.actions.updateAllNotes(data))
           .then(this.setState({
                    name: {
                        value: "",
                        touched: false
                    },
                    content: "",
                    folderId: ""
                }))
           .catch(err => alert(`something went wrong: ${err.message}`))
         
}




updateName(name) {
    this.setState({
        name: {value: name, touched: true}
    })
}

updateContent(content) {
    this.setState({
        content: content
    })
}

validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
        return "Name is required";
    } 
}



    render() {

        const nameError = this.validateName();

        return (
            <div>
                <form className="add_note_form" onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add a Note</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           name="name"
                           placeholder="Name this note"
                           onChange={e => this.updateName(e.target.value)}
                           value={this.state.name.value}/>
                    <label htmlFor="content">Content</label>
                    {this.state.name.touched && (<ValidationError message={nameError}/>)}
                    <input type="text"
                           name="content"
                           placeholder="Content Here"
                           onChange={e => this.updateContent(e.target.value)}
                           value={this.state.content}/>

                    <button type="submit"
                            disabled={this.validateName()}>Save Note</button>
                </form>
            </div>
        )
    }
}

