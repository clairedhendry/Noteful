import React from "react";
import {Route} from "react-router-dom"
import Note from "./Note";
import "./HomePageContent.css"

export default class HomePageContent extends React.Component {


    render() {

        const notes = this.props.currentNotes.map(note => 
            <Note key={note.id}
            name={note.name}
            modified={note.modified}
            folderId={note.folderId}
            content={note.content}
            onNoteClick={this.props.onNoteClick}/>
            )


        return (
            <div className="main_folder_content">
                {notes}
            </div>
        )
    }
}