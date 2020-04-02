import React from "react";
import Note from "./Note";
import "./HomePageContent.css"
import { DataConsumer } from "./Context"



const HomePageContent = () => (
    <div>
        <DataConsumer>
            
            {value => (
                <div>{value.state.currentNotes.map(note => {
                    return ( <Note key={note.id}
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
    </div>
)

export default HomePageContent;