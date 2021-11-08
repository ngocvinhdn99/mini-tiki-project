import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../constants/formatPrice';


PayInfo.propTypes = {
    cartItemsCount: PropTypes.number,
    cartItemsTotal: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    userInfo: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: theme.spacing(1,0)
    },
    userInfoTitle1: {
        borderRight: '1px solid #988e8e',
        paddingRight: '22px',
        fontSize: '15px'
    },
    userInfoTitle2: {
        fontSize: '15px', 
    },
    address: {
        fontSize: '13px',
        color: theme.palette.grey[700],
        textAlign: 'left',
        margin: theme.spacing(1, 0, 3, 1)
    },
    paycontainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(1,0)
    },
    paytitle: {
        fontSize: '14px'
    },
    paynumber1: {
        fontWeight: '600',
        fontStyle: 'italic',
    },
    paynumber2: {
        color: 'rgb(254, 56, 52)',
        fontSize: '22px',
        fontWeight: '400',
    },
    button: {
        backgroundColor: 'rgb(228 42 54)',
        color: 'rgb(255, 255, 255)',
        padding: '13px 10px',
        textAlign: 'center',
        borderRadius: '4px',
        width: '100%',
        display: 'block',
        margin: theme.spacing(2,0),
        opacity: 0.9,
        cursor: 'pointer',
        border: 'none',

        '&:hover': {
            opacity: 1
        }
    }
}))

function PayInfo({cartItemsCount = null, cartItemsTotal = null}) {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Typography variant="h6">Thông tin người nhận</Typography>

            <Box className={classes.userInfo}>
                <Typography variant="subtitle2" className={classes.userInfoTitle1}>Huỳnh Ngọc Vinh</Typography>
                <Typography variant="subtitle2"className={classes.userInfoTitle2}>0773374284</Typography>
            </Box>

            <Box className={classes.address}>K58 H19/17A Ông Ích Khiêm , TP Đà Nẵng, Phường Thanh Bình, Quận Hải Châu, Đà Nẵng</Box>

            <Box className={classes.paycontainer}>
                <Typography className={classes.paytitle}>Số lượng sản phẩm mua: </Typography>
                <Typography className={classes.paynumber1}>{cartItemsCount}</Typography>
            </Box>
            <Box className={classes.paycontainer}>
                <Typography className={classes.paytitle}>Tổng tiền: </Typography>
                <Typography className={classes.paynumber2}>{formatPrice(cartItemsTotal)}</Typography>
            </Box>

            <button className={classes.button}>Mua hàng</button>
        </Box>
    );
}

export default PayInfo;