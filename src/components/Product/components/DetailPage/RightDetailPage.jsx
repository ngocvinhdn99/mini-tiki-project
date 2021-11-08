import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { formatPrice } from '../../../../constants/formatPrice';
import { freeShipImgUrl, tikiCartUrl, tikiNowUrl } from '../../../../constants/ImgUrl';
import AddToCartForm from './AddToCartForm';

RightDetailPage.propTypes = {
    name: PropTypes.string,
    categoryName: PropTypes.string,
    salePrice: PropTypes.number,
    originalPrice: PropTypes.number,
    promotionPercent: PropTypes.number,
    soldQuantityReal: PropTypes.number,
    isFreeShip: PropTypes.bool, 
    onChange: PropTypes.func,
};

RightDetailPage.defaultProps = {
    name: '',
    categoryName: '',
    salePrice: null,
    originalPrice: null,
    promotionPercent: null,
    soldQuantityReal: null,
    isFreeShip: null, 
    onChange: null
}

const useStyles = makeStyles(theme => ({
    mainRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '500px',
        padding: theme.spacing(0,0,0,4)
    },
    root: {
        padding: theme.spacing(1,4)
    },
    categoryTitle: {
        textAlign: 'left',
        fontSize: '15px',

    },
    categoryName: {
        color: '#1A94FF',
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontSize: '15px',
        marginLeft: '4px'
    },
    productName: {
        textAlign: 'left',
        fontSize: '20px',
        marginTop: theme.spacing(1)
    },
    reviewContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    staricon: {
        color: '#fdd836',
        fontSize: '16px',
    },
    reviewQuantity: {
        padding: theme.spacing(0,2),
        fontSize: '15px',
        color: '#787878',
        borderRight: '1px solid #cec6c6'
    },
    soldQuantity: {
        fontSize: '15px',
        color: '#787878',
        padding: theme.spacing(0,2),
    },
    priceContainer: {
        display: 'flex',
        marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    salePrice: {
        fontSize: '33px',
        color: '#ff424e',
        fontWeight: '600'
    },
    noSalePrice: {
        fontSize: '33px',
        color: '#222',
        fontWeight: '600'
    },
    promotionContainer: {
        display: 'flex',
        alignItems: 'end'
    },
    originalPrice: {
        fontSize: '15px',
        color: '#808089',
        textDecoration: 'line-through',
        padding: theme.spacing(0,2)
    },
    promotionPercent: {
        fontSize: '15px',
        color: '#ff424e',
        border: '1px solid #ff424e'
    },
    serviceContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0'
    },
    serviceImg: {
        width: '10%',
        objectFit: 'contain',
        padding: theme.spacing(0,1),
        border: `1px solid #ccc`,
        margin: '0 4%'
    },
    serviceImg2: {
        width: '18%',
        objectFit: 'contain',
        padding: theme.spacing(1,1),
        border: `1px solid #ccc`
    },
    serviceImg3: {
        width: '10%',
        objectFit: 'contain',
        padding: theme.spacing(1,1),
        border: `1px solid #ccc`,
        margin: '0 4%'
    },
    serviceDes: {
        marginLeft: theme.spacing(2),
        fontSize: '14px',
        color: '#111'
    },
    morecheap: {
        textAlign: 'left',
        marginBottom: theme.spacing(2)
    },
    morecheapImg: {
        width: '20%',

    }
}))

function RightDetailPage(props) {
    const {name, categoryName, salePrice, originalPrice, promotionPercent, soldQuantityReal, isFreeShip, onChange} = props
    const classes = useStyles()
    const reviewQuantity = Math.floor(Number(soldQuantityReal / 2.5))

    const reHonHoanTienUrl = 'https://salt.tikicdn.com/ts/upload/2e/da/c9/4b9c0150392c753ccb65b2595500e9d6.png'
    const handleCart = (quantity) => {
        if (onChange) {
            onChange(quantity)
        }
    }

    return (
        <Box className={classes.mainRoot}>
            <Box className={classes.root}>
                <Typography className={classes.categoryTitle}>
                    Loại sản phẩm:  
                    <span className={classes.categoryName}>{categoryName}</span>
                </Typography>
                <Typography className={classes.productName}>{name}</Typography>

                <Box className={classes.reviewContainer}>
                    <Box>
                        <StarIcon className={classes.staricon} />
                        <StarIcon className={classes.staricon} />
                        <StarIcon className={classes.staricon} />
                        <StarIcon className={classes.staricon} />
                        <StarIcon className={classes.staricon} />
                    </Box>
                    <Typography className={classes.reviewQuantity}>(Xem {reviewQuantity} đánh giá)</Typography>
                    <Typography className={classes.soldQuantity}>Đã bán: {soldQuantityReal}</Typography>
                </Box>

                <Box className={classes.priceContainer}>
                    <Typography className={promotionPercent > 0 ? classes.salePrice : classes.noSalePrice} >
                        {formatPrice(salePrice)}
                    </Typography>
                    {promotionPercent > 0 && (
                        <Box className={classes.promotionContainer}>
                            <Typography className={classes.originalPrice}>{formatPrice(originalPrice)}</Typography>
                            <Typography className={classes.promotionPercent}>{` -${promotionPercent}%`}</Typography>
                        </Box>
                    )}
                </Box>

                <Box>
                    <Box className={classes.morecheap}>
                        <img src={reHonHoanTienUrl} alt="Rẻ hơn hoàn tiền" className={classes.morecheapImg} />
                    </Box>
                    <Box className={classes.serviceContainer}>
                        <img src={tikiCartUrl} alt="Thanh toán" className={classes.serviceImg} />
                        <span className={classes.serviceDes}>Hoàn tiền 15% tối đa 600k/tháng</span>
                    </Box>
                    {isFreeShip && (
                        <Box className={classes.serviceContainer}>
                            <img src={freeShipImgUrl} alt="Miễn phí vận chuyển" className={classes.serviceImg2}/>
                            <span className={classes.serviceDes}>Miễn phí vận chuyển</span>
                        </Box>
                    )}
                    {promotionPercent > 0 && (
                        <Box className={classes.serviceContainer}>
                            <img src={tikiNowUrl} alt="Voucher giảm giá" className={classes.serviceImg3}/>
                            <span className={classes.serviceDes}>Nhiều Voucher giảm giá cho Tiki Now</span>
                        </Box>
                    )}
                </Box>
            </Box>
            <AddToCartForm className={classes.addToCartForm} onChange={handleCart} />
        </Box>
    );
}

export default RightDetailPage;