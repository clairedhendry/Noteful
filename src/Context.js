import React from "react"

export const DataContext = React.createContext();

export class DataProvider extends React.Component {


state = {
    allFolders: [],
    allNotes: [],
    selectedFolder: "",
    selectedFolderName: "",
    currentNotes: [],
    selectedNote: {},
   }

changeCurrentFolder = (value) => {
    this.setState({
        currentFolder: value,
    })
}
    
changeSelectedFolder = (id, name) => {
    this.setState({
        selectedFolder: id,
        selectedFolderName: name,
    })
}
    
resetCurrentNotes = (value) => {
    this.setState({
    currentNotes: value
    })
}
    
changeCurrentNotes = (FolderId) => {
    let selectednotes = this.state.allNotes.filter(note => {
        return (note.folder_id === FolderId) })
        this.setState({
        currentNotes: selectednotes
        })
}
    
changeSelectedNote = (note) => {
    this.setState({
    selectedNote: note
    })
}

deleteNote = (noteId) => {
    const newNotes = this.state.allNotes.filter(note => 
        note.id !== noteId)
    const newCurrentNotes = this.state.currentNotes.filter(note => 
        note.id !== noteId)
    this.setState({
        currentNotes: newCurrentNotes,
        allNotes: newNotes
    })
}

updateAllFolders = (newFolder) => {
    const existingFolders = this.state.allFolders
    this.setState({
        allFolders: [...existingFolders, newFolder]
    })
}

updateAllNotes = (newNote) => {
    const existingNotes = this.state.allNotes;
    this.setState({
        allNotes: [...existingNotes, newNote]
    })
}

updateNote = updatedNote => {
  const newNotes = this.state.allNotes.map(note => 
    (note.id === updatedNote.id)
    ? updatedNote
    : note)
    this.setState({
      allNotes: newNotes
    })
}

componentDidMount() {
    fetch("http://localhost:8000/api/folders", {
      method: "GET",
      header: {
        "content-type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(data =>
      this.setState({
        allFolders: data
      }))
    .catch(err => alert(`something went wrong: ${err.message}`))
  
  
    fetch("http://localhost:8000/api/notes", {
      method: "GET",
      header: {
        "content-type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(data =>
      this.setState({
        allNotes: data,
        currentNotes: data
      }))
      .catch(err => alert(`something went wrong: ${err.message}`))
  }


render() {
    return (
        <DataContext.Provider
            value={{
                state: {
                    ...this.state
                },
                actions: {
                    changeCurrentFolder: this.changeCurrentFolder,
                    changeSelectedFolder: this.changeSelectedFolder,
                    resetCurrentNotes: this.resetCurrentNotes,
                    changeCurrentNotes: this.changeCurrentNotes,
                    changeSelectedNote: this.changeSelectedNote,
                    deleteNote: this.deleteNote,
                    updateAllFolders: this.updateAllFolders,
                    updateAllNotes: this.updateAllNotes,
                    updateNote: this.updateNote
                }
        }} >
            {this.props.children}
        </DataContext.Provider>
    );
}
}

export const DataConsumer = DataContext.Consumer;

