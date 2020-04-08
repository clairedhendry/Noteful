import React from "react"
import Folder from "./Folder"
import { DataConsumer } from "./Context"
import AddFolder from "./AddFolder"
import AddNote from "./AddNote"
import FolderError from "./ErrorBoundaries/FolderError"
import PropTypes from "prop-types"
import "./MainSideBar.css"




const MainSideBar = () => (
    <div>
        <FolderError>
        <DataConsumer>
             {value => (
                <div className="sidebar">{value.state.allFolders.map(item => {
                    return (<Folder key={item.id} 
                        name={item.name} 
                        id={item.id}
                        onFolderClick={value.actions.changeSelectedFolder}
                        changeCurrentNotes={value.actions.changeCurrentNotes}
                        />)
                })}
                </div>
            )}
        </DataConsumer>
        </FolderError>
        <AddFolder />
        <AddNote />
    </div>
)

export default MainSideBar;

MainSideBar.propTypes = {
    context: PropTypes.shape({
        allFolders: PropTypes.arrayOf({
            id: PropTypes.string,
            name: PropTypes.string,
            onFolderClick: PropTypes.func,
            changeCurrentNotes: PropTypes.func
        })
    })
}