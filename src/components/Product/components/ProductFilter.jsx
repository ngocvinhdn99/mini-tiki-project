import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import FilterByCategory from './filter/FilterByCategory';
import FilterByPrice from './filter/FilterByPrice';
import FilterByService from './filter/FilterByService';

ProductFilter.propTypes = {
    onChange: PropTypes.func,
    paramFilters: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))

function ProductFilter({onChange = null, paramFilters = {}}) {
    const classes = useStyles()

    const handleCategoryFilter = (idCategoryClick) => {
        if (idCategoryClick > 0) {
            const newFilter = {
                CategoryFilterFunc(x) {
                    return x.idCategory === idCategoryClick
                }
            }
            const newParamFilters = {
                idCategory: idCategoryClick
            }
            if (onChange) {
                onChange(newFilter, newParamFilters)
            }
        } else {
            const newFilter = {
                CategoryFilterFunc(x) {
                    return x.idCategory > idCategoryClick
                }
            }
            const newParamFilters = {
                idCategory: 0
            }
            if (onChange) {
                onChange(newFilter, newParamFilters)
            }
        }

    }

    const handlePriceFilter = (newFilters, newParamFilters) => {
        if (onChange) {
            onChange(newFilters, newParamFilters)
        }
    }

    const handleSerViceFilter = (newFilters, newParamFilters) => {
        if (onChange) {
            onChange(newFilters, newParamFilters)
        } 
    }

    // switch(serviceFilterCase) {
    //     case 0:
    //         return {
    //             isPromotion: false,
    //             isFreeShip: false
    //         }
    //         break
    //     case 1:
    //         return {
    //             isPromotion: false,
    //             isFreeShip: true
    //         }
    //         break
    //     case 2:
    //         return {
    //             isPromotion: true,
    //             isFreeShip: false
    //         }
    //         break;
    //     case 12:
    //         return {
    //             isPromotion: true,
    //             isFreeShip: true
    //         }
    //         break;
    //     default:
    //         return {
    //             isPromotion: false,
    //             isFreeShip: false
    //         }
    // }

    return (
        <Box className={classes.root}>
            <FilterByCategory onChange={handleCategoryFilter} paramFilters={paramFilters} />
            <FilterByPrice onChange={handlePriceFilter} paramFilters={paramFilters} />
            <FilterByService onChange={handleSerViceFilter} paramFilters={paramFilters} />
        </Box>
    );
}

export default ProductFilter;