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
  
  
  
  
render() {

const folderRoutePath = `/folder/${this.state.selectedFolderName}`

const homepage = (this.state.selectedFolder === "")
  ? <Route exact path="/"
          render={() => 
            <HomePageContent
                Folders={this.state.allFolders}
                currentNotes={this.state.currentNotes}
              />}
              />
  : <Route path={folderRoutePath}
          render={() => 
            <HomePageContent
                Folders={this.state.selectedFolder}
                currentNotes={this.state.currentNotes}
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
        <Route path="/" render={() =>
            <MainSideBar 
            currentFolder={this.state.allFolders}
            currentNotes={this.state.currentNotes} 
            onFolderClick={this.changeSelectedFolder}
            changeCurrentNotes={this.changeCurrentNotes}/>
        } />
        <Route exact path="/note-sidebar" 
            render={() => 
            <NoteSideBar 
            currentFolder={this.state.allFolders}
            currentNotes={this.state.currentNotes}
            />} 
            />
      </sidebar>
      <main> 
        {homepage}
        <Route path="/note-main" component={NoteMain} />
      </main>
      </div>
    </div>
  )
}

}

export default App;
