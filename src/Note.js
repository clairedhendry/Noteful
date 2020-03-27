import React from "react"
import {Link} from "react-router-dom"


export default class Note extends React.Component {

handleClick(e) {
    const props = this.props
    this.props.onNoteClick(props)
}

render() {

const noteName = this.props.name
const notePath = `/note/${noteName}`
    return (
        <div className="note">
            <Link to={notePath}
            onClick={(e) => this.handleClick(e)}
            id={this.props.id}
            >
            <h2>{this.props.name}</h2></Link>
            <p>{this.props.modified}</p>
        </div>
    )
}
}