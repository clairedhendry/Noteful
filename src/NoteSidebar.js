import React from "react"
import {Link} from "react-router-dom"
import "./NoteSideBar.css"
import { DataConsumer } from "./Context"
import PropTypes from "prop-types"


const NoteSideBar = () => (
    <div>
        <DataConsumer>
            {value => (
                 <div className="note_sidebar">
                    <Link to="/" className="button">Go Back</Link>
                    <div className="current_folder"><p>{value.state.selectedFolderName}</p></div>
                    <p></p>
                 </div>
            )}
        </DataConsumer>
    </div>
)

export default NoteSideBar;

NoteSideBar.propTypes = {
    context: PropTypes.shape({
        selectedFolderName: PropTypes.string.isRequired
    })
}