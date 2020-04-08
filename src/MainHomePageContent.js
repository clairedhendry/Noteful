import React from "react";
import Note from "./Note";
import "./HomePageContent.css"
import NoteError from "./ErrorBoundaries/NoteError";
import { DataConsumer } from "./Context"
import PropTypes from "prop-types"



const MainHomePageContent = () => (

    <div>
        <NoteError>
        <DataConsumer>
            
            {value => (
                <div>{value.state.allNotes.map(note => {
                    return ( <Note 
                        key={note.id}
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        folderId={note.folderId}
                        content={note.content}
                        changeSelectedFolder={value.actions.changeSelectedFolder}
                        onNoteClick={value.actions.changeSelectedNote}/>)
                })}
                </div>
            )}
        </DataConsumer>
        </ NoteError> 
    </div>
)

export default MainHomePageContent;

MainHomePageContent.propTypes = {
    context: PropTypes.shape({
        allNotes: PropTypes.arrayOf({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            modified: PropTypes.string,
            content: PropTypes.string,
            changeSelectedFolder: PropTypes.func.isRequired,
            onNoteClick: PropTypes.func.isRequired
        })
    })
}