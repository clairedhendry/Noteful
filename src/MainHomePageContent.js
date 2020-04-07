import React from "react";
import Note from "./Note";
import "./HomePageContent.css"
import NoteError from "./ErrorBoundaries/NoteError";
import { DataConsumer } from "./Context"



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