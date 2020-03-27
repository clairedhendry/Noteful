import React from "react"


export default class Note extends React.Component {
render() {
    return (
        <div className="note">
            <h2>{this.props.name}</h2>
            <p>{this.props.modified}</p>
        </div>
    )
}
}