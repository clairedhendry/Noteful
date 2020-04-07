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
    
    const folderId = this.state.folderId

    const fetchData = {
        "name": name,
        "content": content,
        "folderId": folderId,
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

updateFolder(name) {
    const selectedFolder = this.context.state.allFolders.find(folder =>
        name === folder.name);
        console.log(selectedFolder.id)
    this.setState({
        folderId: selectedFolder.id
    })
}

    render() {

        const nameError = this.validateName();
        const options = this.context.state.allFolders.map(folder => 
                <option key={folder.id}>{folder.name}</option>)

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
                           <br />
                    <label htmlFor="content">Content</label>
                    {this.state.name.touched && (<ValidationError message={nameError}/>)}
                    <input type="text"
                           name="content"
                           placeholder="Content Here"
                           onChange={e => this.updateContent(e.target.value)}
                           value={this.state.content}/>
                           <br />
                    <label htmlFor="folder">Folder</label>
                    <select id="folder_select" 
                            onChange={e => this.updateFolder(e.target.value)}
                            required
                            >
                        <option>Select a folder</option>
                        {options}
                    </select>
                    <button type="submit"
                            disabled={this.validateName()}>Save Note</button>
                </form>
            </div>
        )
    }
}

