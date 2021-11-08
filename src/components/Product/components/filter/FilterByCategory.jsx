import { Box, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import finalProductList from '../../../../constants/finalProductList';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
    paramFilters: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    list: {
        padding: 0,
        listStyleType: 'none',

        ' & > li': {
            margin: theme.spacing(1,0),
            cursor: 'pointer'
        }
    },
    categoryName: {
        fontSize: '15px',
        fontWeight: '500'
    },
    activeCategoryName: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#1A94FF',
        textDecoration: 'underline'
    },
    titleCategory: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    }
}))

function FilterByCategory({onChange = null, paramFilters = {}}) {
    const classes = useStyles()

    const newProductList = finalProductList.filter(x => {
        const toString = x.id.toString()
        return toString.indexOf('01') >= 1
    })

    const handleFilter = (categoryClick, className) => {
        const status = className.includes('categoryName')
        
        if (status) {
            if (onChange) {
                onChange(categoryClick.idCategory)
            }
        } else {
            if (onChange) {
                onChange(0)
            }
        }

        // if (onChange) {
        //     onChange(categoryClick.idCategory)
        // }
    }

    const handleResetFilter = (number) => {
        if (onChange) {
            onChange(number)
        }
    }

    return (
       <Box>
            <Typography variant="h6" className={classes.titleCategory} onClick={() => {handleResetFilter(0)}}>
                Danh mục sản phẩm
                <ExpandMoreIcon />
            </Typography>

            <ul className={classes.list}>
                {newProductList.map(x => (
                    <li key={x.idCategory} onClick={(e) => {handleFilter(x, e.target.className)}}>
                        <Typography
                        variant="subtitle2" 
                        className={x.idCategory === paramFilters.idCategory ? classes.activeCategoryName : classes.categoryName}>
                            {x.categoryName}
                        </Typography>
                    </li>
                ))}
            </ul>
       </Box>
    );
}


export default FilterByCategory;