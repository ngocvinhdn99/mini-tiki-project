import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

FilterByService.propTypes = {
    onChange: PropTypes.func,
    paramFilters: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4)
    },
    title: {
        fontWeight: '500'
    },
    list: {
        padding: '0',
        listStyleType: 'none',


        '& > li': {
            textAlign: 'center'
        }
    }
}))

function FilterByService({onChange = null, paramFilters = {}}) {
    const {serviceFilterCase} = paramFilters
    const classes = useStyles()

    const [checkStatus, setCheckStatus] = useState({
        isPromotion: false,
        isFreeShip: false
    })
    const [checkedArray, setCheckedArray] = useState([])

    useEffect(() => {
        console.log(Number(serviceFilterCase))
        if (Number(serviceFilterCase) === 0) {
            setCheckStatus({
                isPromotion: false,
                isFreeShip: false
            })

            setCheckedArray([])
        }
        if (Number(serviceFilterCase) === 1) {
            setCheckStatus({
                isPromotion: false,
                isFreeShip: true
            }) 

            setCheckedArray(['isFreeShip'])
        }
        if (Number(serviceFilterCase) === 2) {
            setCheckStatus({
                isPromotion: true,
                isFreeShip: false
            }) 

            setCheckedArray(['isPromotion'])
        }
        if (Number(serviceFilterCase) === 12) {
            setCheckStatus({
                isPromotion: true,
                isFreeShip: true
            }) 

            setCheckedArray(['isFreeShip', 'isPromotion'])
        }
    }, [serviceFilterCase])


    const handleChange = (e) => {
        const {name, checked} = e.target
        setCheckStatus((prevStatus) => ({
            ...prevStatus,
            [name]: checked
        }))

        const checkedIndex = checkedArray.indexOf(name)

        if (checkedIndex < 0 && checked) {
            checkedArray.push(name)
            const newCheckedArray = [...checkedArray]
            // console.log(checkedArray)
            setCheckedArray(newCheckedArray)
        } else if (!checked) {
            checkedArray.splice(checkedIndex, 1)
            const newCheckedArray = [...checkedArray]
            // console.log(checkedArray)
            setCheckedArray(newCheckedArray)
        }

        if (checkedArray.length === 0) {
            const newFilter = {
                SerViceFilterFunc(x) {
                    return true
                }
            }
            const newParamFilters = {
                serviceFilterCase: 0
            }
            onChange(newFilter, newParamFilters)
        } else if (checkedArray.length === 1) {
            const firstService = checkedArray[0]
            const newFilter = {
                SerViceFilterFunc(x) {
                    return x[firstService]
                }
            }

            if (firstService === 'isFreeShip') {
                const newParamFilters = {
                    serviceFilterCase: 1
                }
                onChange(newFilter, newParamFilters)
            } else if (firstService === 'isPromotion') {
                const newParamFilters = {
                    serviceFilterCase: 2
                }
                onChange(newFilter, newParamFilters)
            }

            
        } else if (checkedArray.length === 2) {
            const firstService = checkedArray[0]
            const secondService = checkedArray[1]

            const newFilter = {
                SerViceFilterFunc(x) {
                    return x[firstService] && x[secondService]
                }
            }
            const newParamFilters = {
                serviceFilterCase: 12
            }
            
            onChange(newFilter, newParamFilters)
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" className={classes.title}>CÁC DỊCH VỤ</Typography>

            <ul className={classes.list}>
                {[
                    {value: 'isPromotion', label: 'Có giảm giá'},
                    {value: 'isFreeShip', label: 'Miễn phí vận chuyển'}
                ].map(service => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={checkStatus[service.value]}
                                onChange={handleChange}
                                name={service.value}
                                color="primary"
                            />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>

            {/* <FormControlLabel
                control={
                <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
                }
                label="Primary"
            /> */}
        </Box>
    );
}

export default FilterByService;