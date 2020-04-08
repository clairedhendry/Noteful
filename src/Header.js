import React from "react"
import {Link} from "react-router-dom";
import "./Header.css";
import PropTypes from "prop-types";



export default class Header extends React.Component {

handleClick(e) {
    
    this.props.onHeaderClick("", "")
    
    
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

Header.propTypes = {
    onHeaderClick: PropTypes.func
}
