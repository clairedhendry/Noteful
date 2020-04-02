import React from 'react';
import {Route} from "react-router-dom"
import Header from "./Header";
import MainSideBar from "./MainSideBar";
import HomePageContent from "./HomePageContent";
import NoteMain from "./NoteMain"
import NoteSideBar from "./NoteSidebar";


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
      <Route exact path="/" component={HomePageContent}/>
        <Route path="/folder/"
         component={HomePageContent}/>
        <Route path="/note/:noteId" component={NoteMain}/>
      </main>
      </div>
    </div>
  )
 

}
}



export default App;
