import { Box, IconButton, makeStyles } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

QuantityInput.propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        position: 'relative'
    },
    quantityContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    formControl: {
        width: '40px',
        maxWidth: '100%',
        height: '24px',
        padding: '2px 4px',
        margin: '0 4px',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#000',
    },
    errorFormControl: {
        width: '40px',
        maxWidth: '100%',
        height: '24px',
        padding: '2px 4px',
        margin: '0 4px',
        fontSize: '14px',
        color: '#ff424e',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '1px solid #ff424e'
    },
    iconButton: {
        padding: 0
    },
    error: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: '14px',
        color: '#ff424e',
        fontWeight: 'bold'
    }
}))

function QuantityInput({item = {}, onChange = null}) {
    const {quantity} = item
    const classes = useStyles()

    const [quantityValue, setQuantityValue] = useState(quantity)
    const [firstErrorStatus, setFirstErrorStatus] = useState(false)
    const [secondErrorStatus, setSecondErrorStatus] = useState(false)

    const handleDecreaseValue = () => {
        if (quantityValue > 1) {
            const newQuantity = Number(quantityValue) - 1
            setQuantityValue(newQuantity)
            setFirstErrorStatus(false)
            setSecondErrorStatus(false)

            if (onChange) {
                onChange(newQuantity)
            }
        } else {
            setFirstErrorStatus(true)
            setSecondErrorStatus(false)
        }
    }

    const handleIncreaseValue = () => {
        if (quantityValue < 12) {
            const newQuantity = Number(quantityValue) + 1
            setQuantityValue(newQuantity)
            setFirstErrorStatus(false)
            setSecondErrorStatus(false)

            if (onChange) {
                onChange(newQuantity)
            }
        } else {
            setFirstErrorStatus(false)
            setSecondErrorStatus(true)
        }
    }
    
    const handleChangeInput = (e) => {
        const {value} = e.target
        const valueNumber = Number(value)

        if (valueNumber >= 1 && valueNumber <= 12) {
            setQuantityValue(valueNumber)
            setFirstErrorStatus(false)
            setSecondErrorStatus(false)

            if (onChange) {
                onChange(valueNumber)
            }
        }

        if (valueNumber < 1) {
            setFirstErrorStatus(true)
            setSecondErrorStatus(false)
        }

        if (valueNumber > 12) {
            setFirstErrorStatus(false)
            setSecondErrorStatus(true)
        }

    }
    return (
        <Box className={classes.root}>

            <Box className={classes.quantityContainer}>
                <IconButton onClick={handleDecreaseValue} className={classes.iconButton}>
                    <RemoveCircleOutline />
                </IconButton>
                <div className={classes.formGroup}> 
                    <input id="quantity" name="quantity" type="number" 
                    value={quantityValue} onInput={handleChangeInput}
                    className={(!firstErrorStatus && !secondErrorStatus) ? classes.formControl : classes.errorFormControl}
                    />

                    <span className={classes.formMessage}></span>
                </div>
                <IconButton onClick={handleIncreaseValue}  className={classes.iconButton}>
                    <AddCircleOutline />
                </IconButton>
            </Box>

            <Box className={classes.error}>
                {firstErrorStatus && (
                    <Box className={classes.errorNoti}>Vui lòng chọn mua tối thiểu 01 sản phẩm</Box>
                )}
                {secondErrorStatus && (
                    <Box className={classes.errorNoti}>Chỉ được mua tối đa 12 sản phẩm/1 đơn hàng</Box>
                )}
            </Box>
        </Box>
    );
}

export default QuantityInput;