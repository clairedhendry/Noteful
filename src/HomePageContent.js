import React from "react";
import Note from "./Note";
import "./HomePageContent.css"
import PropTypes from "prop-types"
import { DataConsumer } from "./Context"



const HomePageContent = () => (
    <div>
        <DataConsumer>
            
            {value => (
                <div>{value.state.currentNotes.map(note => {
                    return ( <Note 
                        key={note.id}
                        id={note.id}
                        name={note.name}
                        date_modified={note.date_modified}
                        folder_id={note.folder_id}
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

HomePageContent.propTypes = {
    context: PropTypes.shape({
        currentNotes: PropTypes.arrayOf({
            id: PropTypes.number,
            name: PropTypes.string,
            date_modified: PropTypes.string,
            folderId: PropTypes.string,
            content: PropTypes.string,
            changeSelectedFolder: PropTypes.func,
            onNoteClick: PropTypes.func
        })
    })
}