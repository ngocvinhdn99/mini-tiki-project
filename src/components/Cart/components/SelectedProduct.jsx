import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import QuantityInput from './QuantityInput';
import { formatPrice } from '../../../constants/formatPrice';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { removeFromCart, setQuantity } from '../../../features/ReduxSlice/cartSlice';
import { useDispatch } from 'react-redux';

SelectedProduct.propTypes = {
    item: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    itemImgContainer: {
        padding: theme.spacing(1),
        border: `1px solid #ccc`
    },
    itemImg: {
        width: '100%',
        objectFit: 'contain'
    },
    itemNameContainer: {
        padding: theme.spacing(2,0),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    itemName: {
        fontSize: '13px',
        color: 'rgb(36, 36, 36)',
        textAlign: 'left',
        margin: '0 10px',
        height: '48px',
        lineHeight: '16px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '3',
    },
    categoryIdContainer: {
        display: 'flex',
        fontSize: '13px',
        color: 'rgb(101 96 96)',
        margin: '0 10px',
        fontWeight: '550'
    },
    categoryName: {
        color: '#1A94FF',
        textDecoration: 'underline',
        fontWeight: 'bold',
        marginLeft: '4px'
    },
    id: {
        marginLeft: '4px',
        color: 'rgb(36, 36, 36)',
        fontWeight: '550',
        fontStyle: 'italic'
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    salePrice: {
        fontSize: '14px',
        color: '#242424',
        fontWeight: '500'
    },
    originalPrice: {
        fontSize: '12px',
        color: '#999999',
        marginLeft: '4px',
        textDecoration: 'line-through'
    },
    itemMoneyTotal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        color: '#ff424e',
        fontWeight: '500'
    },
    deleteIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        fontSize: '14px',
        color: '#887e7e',
        
    },
    // quantityInput: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // }
}))

function SelectedProduct({item = {}}) {
    const {id, product, quantity} = item
    const {srcImg, name, salePrice, originalPrice, categoryName} = product
    const itemMoneyTotal = quantity * salePrice

    const classes = useStyles()
    const dispatch = useDispatch()

    const handleSetQuantity = (newQuantity) => {
        const action = setQuantity({
            id,
            product,
            quantity: newQuantity
        })
        dispatch(action)
    }

    const handleRemoveItem = () => {
        const action = removeFromCart(id)
        dispatch(action)
    }

    return (
        <Box>
            <Grid container>
                <Grid item xs={2} sm={2} md={2} lg={2} className={classes.itemImgContainer}>
                    <img src={srcImg} alt={name} className={classes.itemImg} />
                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.itemNameContainer}>
                    <Typography className={classes.itemName}>{name}</Typography>
                    <Typography className={classes.categoryIdContainer}>
                        Loại sản phẩm: <Box className={classes.categoryName}>{categoryName}</Box>
                    </Typography>
                    <Typography className={classes.categoryIdContainer}>
                        Mã sản phẩm: <Box className={classes.id}>{id}</Box>
                    </Typography>
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2} className={classes.priceContainer}>
                        <Box className={classes.salePrice}>{formatPrice(salePrice)}</Box>
                        <Box className={classes.originalPrice}>{formatPrice(originalPrice)}</Box>
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <QuantityInput item={item} onChange={handleSetQuantity} className={classes.quantityInput} />
                </Grid>

                <Grid item xs={1} sm={1} md={1} lg={1} className={classes.itemMoneyTotal}>
                    {formatPrice(itemMoneyTotal)}
                </Grid>

                <Grid item xs={1} sm={1} md={1} lg={1} className={classes.deleteIconContainer}>
                    <IconButton className={classes.deleteIcon} onClick={handleRemoveItem}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </Grid>

            </Grid>
        </Box>
    );
}

export default SelectedProduct;