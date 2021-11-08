import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { hideUserForm, updateUserFormInfo } from '../../features/userSlice/userSlice';
import RegisterForm from './page/Register';
import { useDispatch } from 'react-redux';

UserFeature.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 3,
        background: 'rgba(0,0,0,0.7)',
        transition: 'all 0.3s ease-in-out'
    }
}))

function UserFeature(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleUserForm = (data) => {
        
    }

    const handleCloseUserForm = () => {
        const action = hideUserForm()
        dispatch(action)
    }

    return (
        <Box className={classes.root}>
            <RegisterForm onSubmit={handleUserForm} onClickClose={handleCloseUserForm} />
        </Box>
    );
}

export default UserFeature;