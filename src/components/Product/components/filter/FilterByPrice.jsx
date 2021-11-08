import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
    paramFilters: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    priceSelected: {
        background: 'rgb(212 212 212)',
        fontSize: '13px',
        padding: '2px 12px',
        lineHeight: '25px',
        height: '25px',
        color: 'rgb(36, 36, 36)',
        borderRadius: '12px',
        margin: '0 auto 12px',
        textAlign: 'center',
        width: '180px',
        fontWeight: '500',
        cursor: 'pointer'
    },
    activePriceSelected: {
        backgroundColor: 'rgb(26,148,255)',
        fontSize: '13px',
        padding: '2px 12px',
        lineHeight: '25px',
        height: '25px',
        color: '#fff',
        borderRadius: '12px',
        margin: '0 auto 12px',
        textAlign: 'center',
        width: '180px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    root: {
        marginTop: theme.spacing(3)
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    priceInput: {
        width: '35%',
        height: '30px',
        padding: theme.spacing(0,1),
        background: 'rgb(255, 255, 255)',
        textAlign: 'left',
        fontSize: '13px',
        border: `1px solid rgb(184, 184, 184)`
    },
    activePriceInput: {
        width: '35%',
        height: '30px',
        padding: theme.spacing(0,1),
        background: 'rgb(255, 255, 255)',
        textAlign: 'left',
        fontSize: '14px',
        border: `1px solid #1a6cb3`,
        color: '#1A94FF',
        fontWeight: 'bold'
    },
    priceBetween: {
        margin: theme.spacing(0,1)
    },
    applyandreset: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    applyPrice: {
        fontSize: '14px',
        background: 'rgb(255,255,255)',
        border: '1px solid rgb(13, 92, 182)',
        padding: '5px 15px',
        borderRadius: '6px',
        flexBasis: '35%',

        '&:hover': {
            color: '#fff',
            background: 'rgb(13, 92, 182)',
            cursor: 'pointer'
        }
    },
    activeApplyPrice: {
        fontSize: '14px',
        border: '1px solid rgb(13, 92, 182)',
        padding: '5px 15px',
        borderRadius: '6px',
        flexBasis: '35%',
        color: '#fff',
        background: 'rgb(13, 92, 182)',
        cursor: 'pointer'
    },
    resetPrice: {
        fontSize: '14px',
        background: 'rgb(255,255,255)',
        border: '1px solid rgb(13, 92, 182)',
        padding: '5px 15px',
        borderRadius: '6px',
        flexBasis: '35%',

        '&:hover': {
            color: '#fff',
            background: 'rgb(13, 92, 182)',
            cursor: 'pointer'
        }
    },
}))

function FilterByPrice({onChange = null, paramFilters = {}}) {
    const classes = useStyles()
    const [values, setValues] = useState({
        minPrice: 0,
        maxPrice: 0,
    })

    const handleChangeValue = (e) => {
        const {name, value} = e.target
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        if (onChange) {
            const newFilters = {
                PriceFilterFunc(x) {
                    return (x.salePrice > values.minPrice && x.salePrice < values.maxPrice)
                }
            }
            const newParamsFilters = {
                priceFilterCase: 4,
                fourthCaseMinValue: Number(values.minPrice),
                fourthCaseMaxValue: Number(values.maxPrice),
            }
            onChange(newFilters, newParamsFilters)
        }
    }

    const handleReset = () => {
        setValues({
            minPrice: 0,
            maxPrice: 0,
        })
        
        if (onChange) {
            const newFilters = {
                PriceFilterFunc(x) {
                    return true
                }
            }
            const newParamsFilters = {
                priceFilterCase: 0
            }
            onChange(newFilters, newParamsFilters)
        }
    }

    const handleEditPrice1 = (price, className) => {
        if (!onChange) return
        if (className.includes('priceSelected')) {
            const newFilters = {
                PriceFilterFunc(x) {
                    return x.salePrice < price
                }
            }
            const newParamsFilters = {
                priceFilterCase: 1
            }
            onChange(newFilters, newParamsFilters)
        } else {
            const newFilters = {
                PriceFilterFunc(x) {
                    return true
                }
            }
            const newParamsFilters = {
                priceFilterCase: 0
            }
            onChange(newFilters, newParamsFilters)
        }
    }

    const handleEditPrice2 = (minPrice, maxPrice, className) => {
        if (!onChange) return
        if (className.includes('priceSelected')) {
            const newFilters = {
                PriceFilterFunc(x) {
                    return (x.salePrice > minPrice && x.salePrice < maxPrice)
                }
            }
            const newParamsFilters = {
                priceFilterCase: 2
            }
            onChange(newFilters, newParamsFilters)
        } else {
            const newFilters = {
                PriceFilterFunc(x) {
                    return true
                }
            }
            const newParamsFilters = {
                priceFilterCase: 0
            }
            onChange(newFilters, newParamsFilters)
        }
    }

    const handleEditPrice3 = (price, className) => {
        if (!onChange) return 
        if (className.includes('priceSelected')) {
            const newFilters = {
                PriceFilterFunc(x) {
                    return x.salePrice > price
                }
            }
            const newParamsFilters = {
                priceFilterCase: 3
            }
            onChange(newFilters, newParamsFilters)
        } else {
            const newFilters = {
                PriceFilterFunc(x) {
                    return true
                }
            }
            const newParamsFilters = {
                priceFilterCase: 0
            }
            onChange(newFilters, newParamsFilters)
        }
    }

    const formatActivePrice = (priceCase) => {
        return paramFilters.priceFilterCase === priceCase ? classes.activePriceSelected : classes.priceSelected
    }

    const formatActivePriceInput = (priceCase) => {
        return paramFilters.priceFilterCase === priceCase ? classes.activePriceInput : classes.priceInput
    }

    const formatActivePriceButton = (priceCase) => {
        return paramFilters.priceFilterCase === priceCase ? classes.activeApplyPrice : classes.applyPrice
    }

    return (
        <Box className={classes.root}>
            <Box>
                <Typography variant="subtitle2">GIÁ</Typography>
                <Box className={formatActivePrice(1)} onClick={(e) => {handleEditPrice1(200000, e.target.className)}}>
                    Dưới 200.000
                </Box>
                <Box className={formatActivePrice(2)} onClick={(e) => {handleEditPrice2(200000,800000, e.target.className)}}>
                    Từ 200.000 đến 800.000
                </Box>
                <Box className={formatActivePrice(3)} onClick={(e) => {handleEditPrice3(800000, e.target.className)}}>
                    Trên 800.000
                </Box>
            </Box>
            <Box>
                <Typography>Chọn khoảng giá</Typography>
                <Box className={classes.priceContainer}>
                    <input name="minPrice" value={values.minPrice} type="number" className={formatActivePriceInput(4)} onChange={handleChangeValue} />
                    <span className={classes.priceBetween}>-</span>
                    <input name="maxPrice" value={values.maxPrice} type="number" className={formatActivePriceInput(4)} onChange={handleChangeValue} />
                </Box>
                <Box className={classes.applyandreset}>
                    <button className={formatActivePriceButton(4)} onClick={handleSubmit}>Áp dụng</button>
                    <button className={classes.resetPrice} onClick={handleReset}>Reset</button>
                </Box>
            </Box>
        </Box>
    );
}

export default FilterByPrice;