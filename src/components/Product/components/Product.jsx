import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import './styles.scss';
import StarIcon from '@material-ui/icons/Star';
import { formatPrice } from '../../../constants/formatPrice';
import { freeShipImgUrl, tikiNowUrl } from '../../../constants/ImgUrl';

Product.propTypes = {
    product: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        cursor: 'pointer'
    },
    categoryProduct: {
        marginTop: theme.spacing(1),
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '16px',
        height: '32px'
    },
    starcontainer: {
        display: 'flex',
        alignItems: 'center'
    },
    staricon: {
        fontSize: '14px',
        color: '#fdd836'
    },
    soldQuantity: {
        fontSize: '12px',
        lineHeight: '16px',
        color: '#787878',
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        borderLeft: `1px solid ${theme.palette.grey[400]}`
    },
    salePrice: {
        fontSize: '17px',
        lineHeight: '24px',
        color: '#ff424e',
        fontWeight: '500',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    promotionPercent: {
        padding: '0px 4px',
        marginLeft: theme.spacing(1),
        border: `1px solid #ff424e`,
        fontSize: '12px'
    },
    originalPrice: {
        textAlign: 'left',
        fontSize: '17px',
        lineHeight: '24px',
        fontWeight: '500',
        marginTop: theme.spacing(1)
    },
    service: {
        height: '35px',
        objectFit: 'contain',
        marginBottom: theme.spacing(1)
    },
    imgContainer: {
        position: 'relative'
    },
    service2: {
        position: 'absolute',
        height: '22px',
        objectFit: 'contain',
        top: '-28px',
        right: '0',
    }
}))

function Product({product = {}}) {
    const {name, categoryName, salePrice, originalPrice, promotionPercent, srcImg, soldQuantity, isFreeShip, isPromotion} = product
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <img src={srcImg} alt={name} width="100%" />

            {isFreeShip && !isPromotion && (
                <img src={freeShipImgUrl} alt='FreeShip' width="100%" className={classes.service} />
            )}

            {!isFreeShip && (
                <Box>
                    <img src={tikiNowUrl} alt='TikiNow' width="100%" className={classes.service} />
                </Box>
            )}

            {isFreeShip && isPromotion && (
                <Box className={classes.imgContainer}>
                    <img src={freeShipImgUrl} alt='FreeShip' width="100%" className={classes.service} />
                    <img src={tikiNowUrl} alt='TikiNow' className={classes.service2} />
                </Box>
            )}

            <Typography variant="subtitle2" className="titleName">{name}</Typography>
            <Typography variant="subtitle2" className={classes.categoryProduct}>Loại sản phẩm: {categoryName}</Typography>

            <Box className={classes.starcontainer}>
                <Box>
                    <StarIcon className={classes.staricon} />
                    <StarIcon className={classes.staricon} />
                    <StarIcon className={classes.staricon} />
                    <StarIcon className={classes.staricon} />
                    <StarIcon className={classes.staricon} />
                </Box>
                <Box className={classes.soldQuantity}>
                    {soldQuantity}
                </Box>
            </Box>

            {promotionPercent > 0 && (
                <Box className={classes.salePrice}>
                    <span>{formatPrice(salePrice)}</span>
                    <span className={classes.promotionPercent}>{`-${promotionPercent}%`}</span>
                </Box>
            )}

            {promotionPercent === 0 && (
                <Box className={classes.originalPrice}>
                    {formatPrice(originalPrice)}
                </Box>
            )}
        </Box>
    );
}

export default Product;