import React from "react"
import {Link} from "react-router-dom";
import dummyStore from "./dummyStore";
import "./Header.css"


export default class Header extends React.Component {

handleClick(e) {
    const notes = dummyStore.notes
    this.props.onHeaderClick("")
    this.props.changeNotes(notes)
    
}

 render() {
     return (
         <div className="header">
             <Link to="/" onClick={(e) => this.handleClick(e)}>
                 <h1>Noteful</h1>
             </Link>
         </div>
     )
 }
}