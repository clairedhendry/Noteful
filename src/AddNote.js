import React, {Component} from "react";
import ValidationError from "./Validation"
import { DataContext } from "./Context"
import PropTypes from "prop-types"
export default class AddNote extends Component {

static contextType = DataContext;

state = {
    name: {
        value: "",
        touched: false
    },
    content: "",
    folderId: "",
    folderChecked: false,
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
                    folderId: "",
                    folderChecked: false
                }))
           .catch(err => alert(`something went wrong: ${err.message}`))
         
}


updateName(name) {
    
    this.setState({
        name: {value: name, touched: true},
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
    if (!selectedFolder) {
        return "Please select a folder"
    } else {
    this.setState({
        folderId: selectedFolder.id,
        folderChecked: true
    })
}
}

validateFolder() {
    if(!this.state.folderChecked) {
  return "Please select a folder"
}
}

validations() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
        return "Name is required";
    }; 
    if(!this.state.folderChecked) {
        return "Please select a folder"
      }
}

    render() {

        const nameError = this.validateName();
        const folderError = this.validateFolder();
        const options = this.context.state.allFolders.map(folder => 
                <option key={folder.id}>{folder.name}</option>)
        

        return (
            <div>
                <form className="add_note_form" onSubmit={e => this.handleSubmit(e)} >
                    <h2>Add a Note</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           name="name"
                           placeholder="Name this note"
                           onChange={e => this.updateName(e.target.value)}
                           value={this.state.name.value}/>
                           <br />
                    {this.state.name.touched && (<ValidationError message={nameError}/>)}
                    <label htmlFor="content">Content</label>
                    <input type="text"
                           name="content"
                           placeholder="Content Here"
                           onChange={e => this.updateContent(e.target.value)}
                           value={this.state.content}/>
                           <br />
                    <label htmlFor="folder">Select a Folder</label>
                    <select id="folder_select" 
                            onChange={e => this.updateFolder(e.target.value)}
                            required
                            >
                        <option ></option>
                        {options}
                    </select>
                    {this.state.name.folderChecked && (<ValidationError message={folderError}/>)}
                    <button type="submit"
                            disabled={this.validations()}>Save Note</button>
                 </form>
                  
                   
                
            </div>
        )
    }
}

AddNote.propTypes = {
    context: PropTypes.shape({
        allFolders: PropTypes.array.isRequired
    })
}

