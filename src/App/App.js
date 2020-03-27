import React from 'react';
import {Route, Link} from "react-router-dom"
import Header from "./Header";
import MainSideBar from "./MainSideBar";
import HomePageContent from "./HomePageContent";
import NoteMain from "./NoteMain"
import NoteSideBar from "./NoteSidebar";
import dummyStore from "./dummyStore";

import './App.css';






class App extends React.Component {



state = {
  allFolders: dummyStore.folders,
  selectedFolder: "",
  selectedFolderName: "",
  currentNotes: dummyStore.notes,
  selectedNote: {},
}

changeCurrentFolder = (value) =>
  this.setState({
    currentFolder: value,
  })

changeSelectedFolder = (id, name) =>
  this.setState({
    selectedFolder: id,
    selectedFolderName: name,
  })


resetCurrentNotes = (value) =>
this.setState({
  currentNotes: value
})



changeCurrentNotes = (FolderId) => {
  
    let selectednotes = dummyStore.notes.filter(note => {
      return (note.folderId === FolderId) })
     this.setState({
      currentNotes: selectednotes
      })
    }
  
changeSelectedNote = (note) =>
this.setState({
  selectedNote: note
})
  
  
render() {

const folderRoutePath = `/folder/${this.state.selectedFolderName}`
const noteRoutePath = `/note/${this.state.selectedNote.name}`

const homepage = (this.state.selectedFolder === "")
  ? <Route exact path="/"
          render={() => 
            <HomePageContent
                Folders={this.state.allFolders}
                currentNotes={this.state.currentNotes}
                onNoteClick={this.changeSelectedNote}
              />}
              />
  : <Route path={folderRoutePath}
          render={() => 
            <HomePageContent
                Folders={this.state.selectedFolder}
                currentNotes={this.state.currentNotes}
                onNoteClick={this.changeSelectedNote}
              />}
              />

  return (
    <div className="main_body">
      <Header 
      onHeaderClick={this.changeSelectedFolder}
      changeNotes={this.resetCurrentNotes}
      
      />
      <div className="main_content">
      <sidebar>
        <Route exact path="/" render={() =>
            <MainSideBar 
            currentFolder={this.state.allFolders}
            currentNotes={this.state.currentNotes} 
            onFolderClick={this.changeSelectedFolder}
            changeCurrentNotes={this.changeCurrentNotes}
           />
        } />
        <Route exact path={folderRoutePath} render={() =>
            <MainSideBar 
            currentFolder={this.state.allFolders}
            currentNotes={this.state.currentNotes} 
            onFolderClick={this.changeSelectedFolder}
            changeCurrentNotes={this.changeCurrentNotes}/>
        } />
        <Route path="/note/"
            render={() => 
            <NoteSideBar 
            Folders={this.state.allFolders}
            currentNotes={this.state.currentNotes}
            selectedNote={this.state.selectedNote}
            />} 
            />
      </sidebar>
      <main> 
        {homepage}
        <Route path={noteRoutePath} 
        render={() =>
        <NoteMain 
        currentNote={this.state.selectedNote}/>}
        />
      </main>
      </div>
    </div>
  )
}

}

export default App;
