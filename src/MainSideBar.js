import React from "react"
import Folder from "./Folder"
import { DataConsumer } from "./Context"
import AddFolder from "./AddFolder"
import AddNote from "./AddNote"




const MainSideBar = () => (
    <div>
        <DataConsumer>
            
            {value => (
                <div>{value.state.allFolders.map(item => {
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
        <AddFolder />
        <AddNote />
    </div>
)

export default MainSideBar;