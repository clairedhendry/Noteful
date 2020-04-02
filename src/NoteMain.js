import React from "react"
import Note from "./Note"
import { DataConsumer } from "./Context"



const NoteMain = () => (
    <div>
        <DataConsumer>
            
            {value => (
                <div className="note_main">
                    <Note id={value.state.selectedNote.id}
                    name={value.state.selectedNote.name}
                    modified={value.state.selectedNote.modified}/>
                    <p>{value.state.selectedNote.content}</p>
                </div>
            )}
           
        </DataConsumer>
    </div>
)

export default NoteMain;