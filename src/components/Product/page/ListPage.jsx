import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import finalProductList from '../../../constants/finalProductList';
import FilterViewer from '../components/FilterViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';

ListPage.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4)
    },
    
}))

function ListPage(props) {
    const classes = useStyles()
    const [productList, setProductList] = useState([])

    const [paramFilters, setParamsFilters] = useState({
        idCategory: 0,
        priceFilterCase: 0,
        serviceFilterCase: 0,
    })

    const [filter, setFilterFunc] = useState({
        CategoryFilterFunc(x) {
            return x.idCategory > 0
        },
        PriceFilterFunc(x) {
            return true
        },
        SerViceFilterFunc(x) {
            return true
        }
    })

    useEffect(() => {
        const firstProductList = finalProductList.filter(filter.CategoryFilterFunc)
        const secondProductList = firstProductList.filter(filter.PriceFilterFunc)
        const thirdProductList = secondProductList.filter(filter.SerViceFilterFunc)

        setProductList(thirdProductList)
        
    },[filter])

    const handleFilter = (newFilter, newParamFilters) => {
        setFilterFunc((prevFilters) => ({
            ...prevFilters,
            ...newFilter,
        }))
        setParamsFilters((prevParamFilter) => ({
            ...prevParamFilter,
            ...newParamFilters
        }))
    }

    return (
        <Paper elevation={0} className={classes.root}>
            <Box>
                <Container>
                    <Grid container>

                        <Grid item xs={0} sm={0} md={3} lg={3}>
                            <ProductFilter onChange={handleFilter} paramFilters={paramFilters} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            <FilterViewer paramFilters={paramFilters} onChange={handleFilter} />
                            <ProductList productList={productList} />
                        </Grid>
                        
                    </Grid>
                </Container>
            </Box>
        </Paper>
    );
}

export default ListPage;