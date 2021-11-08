import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import finalProductList from '../../../constants/finalProductList';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import LeftDetailPage from '../components/DetailPage/LeftDetailPage';
import RightDetailPage from '../components/DetailPage/RightDetailPage';
import { addToCart, showMiniCart } from '../../../features/ReduxSlice/cartSlice';
import { useDispatch } from 'react-redux';


DetailPage.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4)
    }
}))

function DetailPage(props) {
    const {params: {productId} } = useRouteMatch()
    const [productInfo, setProductInfo] = useState({})
    const dispatch = useDispatch()

    const classes = useStyles()
    
    useEffect(() => {
        const productInfo = finalProductList.find(x => x.id === Number(productId))
        setProductInfo(productInfo)
    }, [productId])

    const {name, categoryName, salePrice, originalPrice, promotionPercent, srcImg, soldQuantityReal, isFreeShip} = productInfo

    const handleCart = (quantity) => {
        const action = addToCart({
            id: productInfo.id,
            product: productInfo,
            quantity: quantity
        })
        dispatch(action)

        dispatch(showMiniCart())
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                        <LeftDetailPage srcImg={srcImg} name={name} promotionPercent={promotionPercent} isFreeShip={isFreeShip} />
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                        <RightDetailPage
                        name={name} categoryName={categoryName} salePrice={salePrice}
                        originalPrice={originalPrice} promotionPercent={promotionPercent}
                        soldQuantityReal={soldQuantityReal} isFreeShip={isFreeShip} onChange={handleCart}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default DetailPage;