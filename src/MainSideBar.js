import React from "react"
import Folder from "./Folder"
import { DataConsumer } from "./Context"




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
    </div>
)

export default MainSideBar;