import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
// import Wrapper from '../Helpers/Wrapper';
import classes from './AddUser.module.css';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;

        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                tilte: 'Invalid Input',
                message: 'Please Enter Valid Data...!!!!!',
            });
            return;
        }

        //here + sign convert to number
        if (+enteredUserAge < 1) {
            setError({
                tilte: 'Invalid Age',
                message: 'Please Enter Valid Age (> 1)...!!!!!',
            });
            return;
        }

        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    // const usernameChangeHandler = (event) => {
    //     setEnteredUserName(event.target.value);
    // };

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // };

    const errorHandler = () => {
        setError(null);
    };

    return (
        // user Raact fragment instead of Wrapper
        <>
            {error && <ErrorModal title={error.tilte} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="userName">User Name</label>
                    <input type="text" id="userName" ref={nameInputRef} />

                    <label htmlFor="age">Age (Years)</label>
                    <input type="number" id="age" ref={ageInputRef} />

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    );
};

export default AddUser;
