import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import SelectedProduct from './SelectedProduct';


SelectedProductList.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    list: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    item: {
        padding: '15px 0',
        borderBottom: '1px solid #ccc'
    }
}))

function SelectedProductList(props) {
    const classes = useStyles()
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems)

    return (
        <Box>
            <ul className={classes.list}>
                {cartItems.map(item => (
                    <li key={item.id} className={classes.item}>
                        <SelectedProduct item={item} />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default SelectedProductList;