import React, {useState, useEffect, ChangeEvent} from 'react';


type PropsType = {
    status: string,
    updateStatus: (newStatus: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

        const [editMode, setEditMode] = useState(false);
        const [status, setStatus] = useState(props.status);

        useEffect(() => {
            setStatus(props.status)
        }, [props.status])

        const activateEditMode = () => {
            setEditMode(true);
        }

        const deactivateEditMode = () => {
            setEditMode(false);
            props.updateStatus(status);
        }

        const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                        <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
                    </div>
                }
            </div>
        );

}

export default ProfileStatusWithHooks;