import React, {Component} from "react";
import ValidationError from "./Validation"

export default class AddNote extends Component {

state = {
    name: {
        value: "",
        touched: false
    },
    content: ""
}

handleSubmit(e) {
    e.preventDefault();
    

    //post to notes

    const name = this.state.name.value;
    const content = this.state.content;
    const fetchData = {
        "name": name,
        "content": content
    }
    console.log(fetchData)
   
    const options = {
       method: "POST",
       header: {
           "content-type": "application/json"
       },
       body: JSON.stringify(fetchData)
    }
   
   
       fetch(`http://localhost:9090/notes`, options)
           .then(response => {
           if(response.ok) {
               return response.json();
           } else {
               throw new Error(response.statusText)
           }
           })
           
           .catch(err => alert(`something went wrong: ${err.message}`))
       }
   

   //clear state and reset form


updateName(name) {
    this.setState({
        name: {value: name, touched: true}
    })
}

updateContent(content) {
    this.setState({
        content: content
    })
}

validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
        return "Name is required";
    } else if (name.length < 3) {
        return "Name must be at least 3 characters long."
    }
}



    render() {

        const nameError = this.validateName();

        return (
            <div>
                <form className="add_note_form" onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add a Note</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           name="name"
                           placeholder="Name this note"
                           onChange={e => this.updateName(e.target.value)}/>
                    <label htmlFor="content">Content</label>
                    {this.state.name.touched && (<ValidationError message={nameError}/>)}
                    <input type="text"
                           name="content"
                           placeholder="Content Here"
                           onChange={e => this.updateContent(e.target.value)}/>

                    <button type="submit">Save Note</button>
                </form>
            </div>
        )
    }
}