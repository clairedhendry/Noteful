import React from "react"

export default class FolderError extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
        
        return( 
            <h2>Could not display folders.</h2>
        );
    } return this.props.children
}
}