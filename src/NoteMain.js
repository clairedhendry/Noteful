import React from "react"
import Note from "./Note"
import { DataConsumer } from "./Context"
import PropTypes from "prop-types"


const NoteMain = () => (
    <div>
        <DataConsumer>
            
            {value => (
                <div className="note_main">
                    <Note id={value.state.selectedNote.id}
                    name={value.state.selectedNote.name}
                    modified={value.state.selectedNote.modified}
                    disable={true}/>
                    <p>{value.state.selectedNote.content}</p>
                </div>
            )}
           
        </DataConsumer>
    </div>
)

export default NoteMain;

NoteMain.propTypes = {
    context: PropTypes.shape({
        selectedNote: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            modified: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        })
    })
}