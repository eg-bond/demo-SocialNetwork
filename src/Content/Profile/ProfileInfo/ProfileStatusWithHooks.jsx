import React, {useState, useEffect} from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {

        const [editMode, setEditMode] = useState(false);
        const [status, setStatus] = useState(props.status);

        useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

        const activateEditMode = () => {
            setEditMode(true);
        }

        const deactivateEditMode = () => {
            setEditMode(false);
            props.updateStatus(status);
        }

        const onStatusChange = (e) => {
            setStatus(e.currentTarget.value)
        }

        console.log(status);
        return (
            <div>
                { !editMode &&
                    <div>
                        <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
                    </div>
                }
                { editMode &&
                    <div>
                        <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}></input>
                    </div>
                }
            </div>
        );

}

export default ProfileStatusWithHooks;