import React from 'react';
import {Route} from "react-router-dom"
import Header from "./Header";
import MainSideBar from "./MainSideBar";
import HomePageContent from "./HomePageContent";
import NoteMain from "./NoteMain"
import NoteSideBar from "./NoteSidebar";
import MainHomePageContent from "./MainHomePageContent";
import NoteEdit from "./NoteEdit"

import './App.css';
import { DataConsumer } from './Context';

class App extends React.Component {
  
render() {

  return (

    <div className="main_body">
      <DataConsumer>
        {value => (
          <Header 
          notes={value.state.allNotes}
          onHeaderClick={value.actions.changeSelectedFolder}
          changeNotes={value.actions.resetCurrentNotes}
            />
        )}
      </DataConsumer>
      <div className="main_content">
      <div>
        <Route exact path="/" component={MainSideBar}/>
        <Route path="/folder/" component={MainSideBar}/>
        <Route path="/note/" component={NoteSideBar}/>
      </div>
      <main> 
      <Route exact path="/" component={MainHomePageContent}/>
        <Route path="/folder/:folder_id"
         component={HomePageContent}/>
      <Route exact path="/note/:note_id" component={NoteMain}/>
      <Route path="/note/edit/:note_id" component={NoteEdit}/>
      </main>
      </div>
    </div>
  )
 

}
}



export default App;
