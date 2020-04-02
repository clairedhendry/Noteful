import React from "react"
import {Link} from "react-router-dom"

import { DataContext } from "./Context"



export default class Note extends React.Component {

static defaultProps ={
        onDeleteNote: () => {},
      }
static contextType = DataContext;

handleClick(e) {
    const props = this.props
    const folderId = this.props.folderId
    const folderName = this.props.name
    this.props.onNoteClick(props)
    this.props.changeSelectedFolder(folderId, folderName)
}

handleClickDelete(e) {
  e.preventDefault();
  const noteId = this.props.id;

fetch(`http://localhost:9090/notes/${noteId}`, {
    method: "DELETE",
    header: {
        "content-type": "application/json"
    }
    })
    .then(response => {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText)
    }
    })
    .then(() =>
    this.context.actions.deleteNote(noteId))
    .catch(err => alert(`something went wrong: ${err.message}`))
}



render() {

const noteId = this.props.id
const notePath = `/note/${noteId}`
    return (
        <div className="note">
            <Link to={notePath}
            onClick={(e) => this.handleClick(e)}
            id={this.props.id}
            >
            <h2>{this.props.name}</h2></Link>
            <p>{this.props.modified}</p>
            <button onClick={e => this.handleClickDelete(e)}>Delete</button>
              
             
        </div>
    )
}
}

