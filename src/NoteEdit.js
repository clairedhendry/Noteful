import React from "react"
import { DataContext } from "./Context"

export default class NoteEdit extends React.Component {

    static contextType = DataContext;

    state = {
        id: parseInt(this.props.location.state.id),
        folder_id: this.context.state.selectedNote.folder_id,
        name: this.context.state.selectedNote.name,
        content: this.context.state.selectedNote.content,
        date_modified: this.context.state.selectedNote.date_modified
    }

    updateName(value) {
        this.setState({
            name: value
        })
    }

    updateFolderId(value) {
        this.setState({
            folder_id: value
        })
    }

    updateContent(value) {
        this.setState({
            content: value
        })
    }

    updateFolder(name) {
        const selectedFolder = this.context.state.allFolders.find(folder =>
            name === folder.name);
        if (!selectedFolder) {
            return "Please select a folder"
        } else {
        this.setState({
            folder_id: selectedFolder.id,
          
        })
    }
    }

// componentDidMount() {
//     const noteId = this.state.id
//     fetch(`http://localhost:8000/api/notes/${noteId}`,{
//         method: "GET"
//     })
//     .then(response => {
//         if(response.ok) {
//           return response.json();
//         } else {
//           throw new Error(response.statusText)
//         }
//       })
//       .then(response => {
//           this.setState({
//               id: response.id,
//               folder_id: response.folder_id,
//               name: response.name,
//               content: response.content
//           })
        
//       })
//       .catch(err => alert(`something went wrong: ${err.message}`))
//     }
    

    handleSubmit = (e) => {
        e.preventDefault();
        const noteId = this.state.id

        const fetchData = {
            id: this.state.id,
            folder_id: this.state.folder_id,
            content: this.state.content,
            name: this.state.name,
        }

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
        }
     


        fetch(`http://localhost:8000/api/notes/${noteId}`, options)
        .catch(alert(`note updated`))
        .then(
            fetch(`http://localhost:8000/api/notes/${noteId}`, 
            {
                method: "GET",
                heaaders: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                
        const newNote = {
            id: data.id,
            folder_id: data.folder_id,
            content: data.content,
            name: data.name,  
            date_modified: data.date_modified
        }
                this.context.actions.updateNote(newNote)
                console.log(data)
               
              
            })
          
          )
        
        }
    
    render() {

        const { name, content } = this.state
        const options = this.context.state.allFolders.map(folder => 
            <option key={folder.id}>{folder.name}</option>)

        return (
            <div className="note_editing">
               <form className="edit-note" onSubmit={this.handleSubmit}>
                    <h2>Edit Note</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           name="name"
                           placeholder="Edit name *optional*"
                           onChange={e => this.updateName(e.target.value)}
                           value={name}
                           />
                    <label htmlFor="content">Content</label>
                    <input type="text"
                           name="content"
                           placeholder="New content *optional*"
                           onChange={e => this.updateContent(e.target.value)}
                           value={content}
                           />
                    
                    <select id="folder_select" 
                            onChange={e => this.updateFolder(e.target.value)}
                            required
                            >
                        <option></option>
                        {options}
                    </select>
                    <button type="submit" 
                            className="edit-note-button"
                            >
                        Save
                    </button>
                </form>
            </div>
        )
    }
}