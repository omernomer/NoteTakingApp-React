import './App.css';
import React from 'react';
import firebase from 'firebase';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

class App extends React.Component {
  constructor() {
    super();
    this.state={
      selectedNoteIndex:null,//this is an index for a selected note
      selectedNote:null,//content of the selected note or the body of the selected note
      notes:null//list of the notes
    };
  }
  
  render() {
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes} //this is for passing the notes as props
          deleteNote={this.deleteNote} // passing a delete function as a prop
          selectNote={this.selectNote} //passing selectNote function
          newNote={this.newNote}//
        />
        {
          this.state.selectedNote?
          <EditorComponent 
          selectedNote={this.state.selectedNote}
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          noteUpdate={this.noteUpdate}/>:
          null
        }
      </div>
    );
  }
  componentDidMount=()=>{
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot( serverUpdate=>{
        const notes=serverUpdate.docs.map(_doc=>{
          const data=_doc.data();
          data['id']=_doc.id;
          return data;
        });
        this.setState({notes:notes});
      });
  }
  selectNote=(note,index)=>{
    this.setState({
      selectedNoteIndex:index,
      selectedNote:note
    });
  }
  noteUpdate=(id,noteObj)=>{
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title:noteObj.title,
        body:noteObj.body,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
  }
  newNote=async(title)=>{
    const note={
      title:title,
      body:''
    }
    const newFromDB=await firebase
      .firestore()
      .collection('notes')
      .add({
        title:note.title,
        body:note.body,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
    const newID=newFromDB.id;
    await this.setState({
      notes:[...this.state.notes,note],
    });
    const newIndex=this.state.notes.indexOf(this.state.notes.filter(_note=>_note.id===newID)[0]);
    this.setState({
      selectedNote:this.state.notes[newIndex],
      selectedNoteIndex:newIndex,
    })
  }
  deleteNote=async(note)=>{
    const noteIndex=this.state.notes.indexOf(note);
    await this.setState({
      notes:this.state.notes.filter(_note=>_note!==note),
    })
    if (this.state.selectedNoteIndex===noteIndex) {//if the deleted note is the selected one make sure you null the vales so we dont have errors
        this.setState({
            selectedNoteIndex:null,
            selectedNote:null,
        })
    }
    else {
        this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex-1],this.state.selectedNoteIndex-1):
        //this means there are no more notes
        this.setState({
            selectedNoteIndex:null,
            selectedNote:null,
        })
    }
    firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
}
}

export default App;
