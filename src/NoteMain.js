import React from "react"
import Note from "./Note"


export default class NoteMain extends React.Component {
    render() {
        return (
            <div className="note_main">
                <Note id={this.props.currentNote.id}
                name={this.props.currentNote.name}
                modified={this.props.currentNote.modified}/>
                <p>{this.props.currentNote.content}</p>
            </div>
        )
    }
}