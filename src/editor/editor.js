import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state={
            text:'',
            title:'',
            id:'',
        }
    }
    componentDidMount=()=>{
        this.setState({
            text:this.props.selectedNote.body,
            title:this.props.selectedNote.title,
            id:this.props.selectedNote.id
        })
    }
    componentDidUpdate=()=>{
        if(this.props.selectedNote.id!==this.state.id) {
            this.setState({
                text:this.props.selectedNote.body,
                title:this.props.selectedNote.title,
                id:this.props.selectedNote.id
            })
        }
    }
    render() {

        const {classes}=this.props;
        return(
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                    className={classes.titleInput}
                    placeholder='Note title...'
                    value={this.state.title?this.state.title:''}
                    onChange={(e)=>this.updateTitle(e.target.value)}
                ></input>
                <CKEditor editor={ ClassicEditor } data={this.state.text} onChange={this.updateBody}/>
            </div>
            );
    }
    updateBody = async (e,editor)=> {
        const data = editor.getData();
        await this.setState({text:data});
        this.update();
    };
    updateTitle= async (txt)=>{
        await this.setState({title:txt});
        this.update();
    }
    update = debounce(()=>{
        this.props.noteUpdate(this.state.id,{
            title:this.state.title,
            body:this.state.text
        });
    },1500);
}
export default withStyles(styles)(EditorComponent);