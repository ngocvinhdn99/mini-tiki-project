import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import SelectedProductList from './components/SelectedProductList';
import PayInfo from './components/PayInfo';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector, cartTotalSelector } from '../../features/ReduxSlice/selector';

CartFeaTure.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3)
    }
}))

function CartFeaTure(props) {
    const classes = useStyles()
    const cartItemsCount = useSelector(cartItemsCountSelector)
    const cartItemsTotal = useSelector(cartTotalSelector)

    return (
        <Box className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={9} lg={9}>
                        <SelectedProductList />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <PayInfo cartItemsCount={cartItemsCount} cartItemsTotal={cartItemsTotal} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CartFeaTure;