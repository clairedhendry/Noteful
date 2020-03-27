import React from "react"
import Folder from "./Folder"



export default class MainSideBar extends React.Component {
    render() {

        const folders = this.props.currentFolder.map(item => 
            
     
            <Folder key={item.id} 
            name={item.name} 
            id={item.id}
            onFolderClick={this.props.onFolderClick}
            changeCurrentNotes={this.props.changeCurrentNotes}
            />)
      

        return (
            <div className="main_sidebar">
                {folders}
            </div>
        )
    }
}