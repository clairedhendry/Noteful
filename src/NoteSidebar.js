import React from "react"
import {Link} from "react-router-dom"
import "./NoteSideBar.css"


export default class NoteSideBar extends React.Component {

 

    render() {
 
        return (
            <div className="note_sidebar">
                <Link to="/" className="button">Go Back</Link>
        <div className="current_folder"><p>{this.props.selectedFolder}</p></div>
        <p></p>
            </div>
        )
    }
}