import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';


AddToCartForm.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
       padding: theme.spacing(1,0,0,4)
    },
    quantityTitle: {
        textAlign: 'left',
        margin: theme.spacing(0,0,0,2),
        fontSize: '15px',
        color: '#000',
        fontWeight: '600',
        textDecoration: 'underline'
    },
    errorQuantityTitle: {
        textAlign: 'left',
        margin: theme.spacing(0,0,0,2),
        fontSize: '15px',
        color: '#ff424e',
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    formGroup: {
        display: 'flex',
        // marginBottom: '16px',
        flexDirection: 'column',

        '&.invalid .formControl': {
            borderColor: '#f33a58',
        },

        '&.invalid .formMessage': {
            borderColor: '#f33a58',
        }
    },
    formControl: {
        height: '28px',
        width: '38px',
        padding: '2px 4px',
        border: '1px solid #b3b3b3',
        borderRadius: '3px',
        outline: 'none',
        fontSize: '1rem',
        textAlign: 'center',

        '&:hover': {
            borderColor: '#1dbfaf',
        }
    },
    errorFormControl: {
        height: '28px',
        width: '38px',
        padding: '2px 4px',
        border: '1px solid #b3b3b3',
        borderRadius: '3px',
        outline: 'none',
        fontSize: '1rem',
        textAlign: 'center',
        color: '#ff424e',
        fontWeight: 'bold',

        '&:hover': {
            borderColor: '#1dbfaf',
        }
    },
    formMessage: {
        fontSize: '1rem',
        lineHeight: '1.6rem',
        padding: '4px 0 0',
        textAlign: 'left'
    },
    formSubmit: {
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: 'rgb(255, 57, 69)',
        color: 'rgb(255, 255, 255)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '190px',
        maxWidth: '300px',
        width: '100%',
        height: '48px',
        fontSize: '15px',
        lineHeight: '24px',
        fontWeight: '500',
        border: 'none',
        outline: 'none',
        margin: theme.spacing(2,0,0,0),

        '&:hover': {
            opacity: '0.8'
        }
    },
    errorNoti: {
        color: '#ff424e',
        fontWeight: '500'
    }
}))


function AddToCartForm({onChange}) {
    const classes = useStyles()
    const [quantityValue, setQuantityValue] = useState(1)
    const [firstErrorStatus, setFirstErrorStatus] = useState(false)
    const [secondErrorStatus, setSecondErrorStatus] = useState(false)

    const handleDecreaseValue = () => {
        if (quantityValue === 1) {
            setQuantityValue(1)
            setFirstErrorStatus(true)
            setSecondErrorStatus(false)
        } else if (quantityValue > 1) {
            const newQuantityValue = Number(quantityValue) - 1
            setQuantityValue(newQuantityValue)
            setFirstErrorStatus(false)
            setSecondErrorStatus(false)
        }
    }

    const handleIncreaseValue = () => {
        if (quantityValue === 12) {
            setQuantityValue(12)
            setSecondErrorStatus(true)
            setFirstErrorStatus(false)
        } else if (quantityValue > 0) {
            const newQuantityValue = Number(quantityValue) + 1
            setQuantityValue(newQuantityValue)
            setFirstErrorStatus(false)
            setSecondErrorStatus(false)
        }
    }

    const handleChangeInput = (e) => {
        const {value} = e.target
        const valueNumber = Number(value)
        if (valueNumber >= 1 && valueNumber <= 12) {
            setQuantityValue(valueNumber)
            setFirstErrorStatus(false)
            setSecondErrorStatus(false)
        } else if (valueNumber < 1) {
            setQuantityValue(valueNumber)
            setFirstErrorStatus(true)
            setSecondErrorStatus(false)
        } else if (valueNumber > 12) {
            setQuantityValue(valueNumber)
            setFirstErrorStatus(false)
            setSecondErrorStatus(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (quantityValue >= 1 && quantityValue <=12) {
            if (onChange) {
                onChange(quantityValue)
            }
        }
    }

    return (
        <Box className={classes.root}>

            <Typography className={(!firstErrorStatus && !secondErrorStatus) ? classes.quantityTitle : classes.errorQuantityTitle}>
                Số lượng: 
            </Typography>
            <form action="" id="form-1" onSubmit={handleSubmit}>
                <Box className={classes.quantityContainer}>
                    <IconButton onClick={handleDecreaseValue}>
                        <RemoveCircleOutline />
                    </IconButton>
                    <div className={classes.formGroup}> 
                        <input id="quantity" name="quantity" type="number" 
                        value={quantityValue} onInput={handleChangeInput}
                        className={(!firstErrorStatus && !secondErrorStatus) ? classes.formControl : classes.errorFormControl}
                        />

                        <span className={classes.formMessage}></span>
                    </div>
                    <IconButton onClick={handleIncreaseValue}>
                        <AddCircleOutline />
                    </IconButton>
                    {firstErrorStatus && (
                        <Box className={classes.errorNoti}>Vui lòng chọn mua tối thiểu 01 sản phẩm</Box>
                    )}
                    {secondErrorStatus && (
                        <Box className={classes.errorNoti}>Chỉ được mua tối đa 12 sản phẩm/1 đơn hàng</Box>
                    )}
                </Box>

                <button className={classes.formSubmit}>Chọn mua</button>
            </form>

        </Box>
    );
}

export default AddToCartForm;