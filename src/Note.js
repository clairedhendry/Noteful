import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { DataContext } from "./Context"



export default class Note extends React.Component {

// static defaultProps ={
//         onDeleteNote: () => {},
//       }
static contextType = DataContext;



handleClick(e) {
    const props = this.props
    const folderId = this.props.folder_id
    const folder = this.context.state.allFolders.find((item) => 
        this.props.folder_id === item.id
     )
    const folderName = folder.name
  
    this.props.onNoteClick(props)
    this.props.changeSelectedFolder(folderId, folderName)
}

handleClickDelete(e) {
  e.preventDefault();
  const noteId = this.props.id;

    fetch(`http://localhost:8000/api/notes/${noteId}`, {
    method: "DELETE",
    header: {
        "content-type": "application/json"
    }
    })
    // .then(response => {
    // if(response.ok) {
    //     return response.json();
    // } else {
    //     throw new Error(response.statusText)
    // }
    // })
    .then(() =>
    this.context.actions.deleteNote(noteId))
    .catch(err => alert(`something went wrong: ${err.message}`))
    }



render() {

const noteId = this.props.id
const notePath = `/note/${noteId}`

if (this.props.disable === true) {
            return (
        <div className="note">
            
            <h2>{this.props.name}</h2>
            <p>{this.props.date_modified}</p>
           
            <Link to={{pathname: `/note/edit/${noteId}`, state: { id: `${noteId}`}}}>Edit</Link>
            
        </div>
    )} else {
        return (
            <div className="note">
            <Link to={notePath}
            onClick={(e) => this.handleClick(e)}
            id={this.props.id}
            >
            <h2>{this.props.name}</h2></Link>
            <p>{this.props.date_modified}</p>
            <button onClick={e => this.handleClickDelete(e)}>Delete</button> 
            <Link to={{pathname: `/note/edit/${noteId}`, state: { id: `${noteId}`}}}>Edit</Link>    
        </div>
        )
    }
}
}

Note.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    modified: PropTypes.string,
    folderId: PropTypes.string,
    content: PropTypes.string,
    context: PropTypes.shape({
        allFolders: PropTypes.array.isRequired
    })
}