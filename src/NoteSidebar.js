import React from "react"
import {Link} from "react-router-dom"
import "./NoteSideBar.css"


export default class NoteSideBar extends React.Component {


    render() {
       
        const folder = this.props.Folders.find(item => {
            if (item.id === this.props.selectedNote.folderId) {
                return item.name
            }
        })
        console.log(folder)
       
        return (
            <div className="note_sidebar">
                <Link to="/" className="button">Go Back</Link>
        <p></p>
            </div>
        )
    }
}