import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Close from '@material-ui/icons/Close';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import {Check} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

function TodoComponent(props) {
    const [newTitle, setNewTitle] = useState(props.title);
    const [isShowImput, setIsShowImput]= useState(false);
    console.log(props);
    const handleChange = event => {
        console.log(event.target.checked);
        //props.onCheckTodo(props.id, event.target.check
        fetch(`http://localhost:3001/todos/${props.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: props.title,
                checked: event.target.checked
            })
        })
            .then(res=> {
                if (res.status === 200) {
                    props.loadTodos();
                }
            })
            .catch(e=> {
                console.log(e)
            });

    };

    const handleClick = () => {
        fetch(`http://localhost:3001/todos/${props.id}`,{
            method:'DELETE'
        })
            .then(res=> {
                if (res.status === 200){
                    props.loadTodos();
                }
            })
            .catch(e=> {
                console.log(e);
            });

    };

    const onClickShowImput =() => {
        setIsShowImput(true);
    };

    const onChangeImput = (event) => {
        setNewTitle(event.target.value);
    };

    const onClickSaveTitle = () => {
        fetch(`http://localhost:3001/todos/${props.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: newTitle,
                checked: props.checked
            })
        })
            .then(res=> {
                if (res.status === 200) {
                    props.loadTodos();
                }
            })
            .then(() =>{
                setIsShowImput(false);
            })
            .catch(e=> {
                console.log(e)
            });

    };


    return(
        <Grid item
              container
              xs={12}
              classes={{
                  item:'perfectTodo'
              }}
        >
            <Grid item
                  xs={3}
                  container
                  alignItems="center"
            >
                <Checkbox checked={props.checked}
                          onChange={handleChange}
                          disabled={isShowImput}
                />
            </Grid>

            <Grid item
                  xs={6}
                  container
                  alignItems="center"
            >
                {!isShowImput &&
                <Typography variant="h5"
                            classes={{
                                root: props.checked ? 'line' : 'defaultText'

                            }}
                            onClick={onClickShowImput}
                >
                    {props.title}
                </Typography>}
                {isShowImput &&
                    <Input value={newTitle}
                           onChange={onChangeImput}
                           endAdornment={
                               <IconButton onClick={onClickSaveTitle} >
                                    <Check />
                               </IconButton>
                           }

                    />
                }
            </Grid>
            <Grid item
                  xs={3}
            >
                <Fab onClick={handleClick}
                     disabled={isShowImput}

                >
                <Close />
                </Fab>
            </Grid>
        </Grid>

    );
}
export default TodoComponent;