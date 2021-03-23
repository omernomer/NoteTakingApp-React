import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote:false,
            title:null,
        };
    }
    render() {
        const {notes,classes,selectedNoteIndex}=this.props;
        if (notes) {
            return(
                <div className={classes.sidebarContainer}>
                    <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>{this.state.addingNote?'Cancel':'New Note'}</Button>
                    {
                        this.state.addingNote ? 
                        <div>
                            <input type='text'
                            className={classes.newNoteInput}
                            placeholder="Enter Note Title"
                            onKeyUp={(e)=>this.updateTitle(e.target.value)}
                            />
                            <button className={classes.newNoteSubmitBtn}
                            onClick={this.newNote}>Submit Note</button>
                        </div>:null
                    }
                    <List>
                        {
                            notes.map((_note,_index)=>{
                                return(
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        >
    
                                        </SidebarItemComponent>
                                        <Divider></Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            );
        }
        else {
            return(<div></div>)
        }
    };
    newNoteBtnClick=()=> {
        this.setState({
            addingNote:!this.state.addingNote,
            title:null
        });
    }
    updateTitle=(txt)=>{
        this.setState({
            title:txt
        });
    }
    newNote=()=>{
        this.props.newNote(this.state.title);
        this.setState({
            title:null,
            addingNote:false,
        })
    }
    selectNote=(note,index)=>this.props.selectNote(note,index);
    deleteNote=(note)=>this.props.deleteNote(note);
    
}

export default withStyles(styles)(SidebarComponent);