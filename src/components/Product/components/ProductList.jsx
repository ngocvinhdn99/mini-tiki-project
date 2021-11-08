import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Product from './Product';
import { useHistory } from 'react-router-dom';

ProductList.propTypes = {
    productList: PropTypes.array,
};

const useStyles = makeStyles(theme => ({
    productItem: {
        padding: theme.spacing(2, 2),

        '&:hover': {
            // boxShadow: '1px 3px 6px #c5bfbf'
            boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 20px',
            zIndex: '1',
        }
    }
}))

function ProductList({productList = []}) {
    const classes = useStyles()
    const history = useHistory()

    const handleNavigate = (x) => {
        history.push(`/products/${x.id}`)
    }

    return (
        <Box>
            <Grid container>
                {productList.map(x => (
                    <Grid item 
                    key={x.id} x
                    s={12} sm={6} md={4} lg={3} 
                    className={classes.productItem} 
                    onClick={() => {handleNavigate(x)}}
                    >
                        <Product product={x} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;