import React from "react";
import {Route, NavLink} from "react-router-dom"
import "./Folder.css"
import HomePageContent from "./HomePageContent";

export default class Folder extends React.Component {

handleClick(e) {
    const folderId = this.props.id
    const folderName = this.props.name
    this.props.onFolderClick(folderId, folderName)
    this.props.changeCurrentNotes(folderId)
    
}

  
    render() {

        const folderPath = `/folder/${this.props.name}`

        return (
             
                <NavLink to={folderPath} 
                    id={this.props.id} 
                    className="folder"
                    onClick={(e) => 
                        this.handleClick(e)}
                    
                    >
                    {this.props.name}
                </NavLink>
         
         
        )
    }
}