import React from "react";
import Note from "./Note";
import "./HomePageContent.css"

import { DataConsumer } from "./Context"
import PropTypes from "prop-types"



const MainHomePageContent = () => (

    <div>
       
        <DataConsumer>
            
            {value => (
                <div>{value.state.allNotes.map(note => {
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

export default MainHomePageContent;

MainHomePageContent.propTypes = {
    context: PropTypes.shape({
        allNotes: PropTypes.arrayOf({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            date_modified: PropTypes.string,
            content: PropTypes.string,
            changeSelectedFolder: PropTypes.func.isRequired,
            onNoteClick: PropTypes.func.isRequired
        })
    })
}