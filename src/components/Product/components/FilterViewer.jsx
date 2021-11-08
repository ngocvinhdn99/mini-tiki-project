import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import finalProductList from '../../../constants/finalProductList';
import { formatPrice } from '../../../constants/formatPrice';
import { Box, Chip, makeStyles } from '@material-ui/core';

FilterViewer.propTypes = {
    paramFilters: PropTypes.object,
    onChange: PropTypes.func,
};

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Miễn phí vận chuyển',
        isActive: () => true,
        isVisible: (paramFilters) => paramFilters.serviceFilterCase === 1,
        isRemovable: true,
        onRemove: (paramFilters) => {
            const newFilter = {
                SerViceFilterFunc(x) {
                    return true
                }
            }
            const newParamFilter = {
                serviceFilterCase: 0,
            }

            const filters = [newFilter, newParamFilter]
            return filters
        },
    },
    {
        id: 2,
        getLabel: () => 'Ưu đãi khuyến mãi',
        isActive: () => true,
        isVisible: (paramFilters) => paramFilters.serviceFilterCase === 2,
        isRemovable: true,
        onRemove: (paramFilters) => {
            const newFilter = {
                SerViceFilterFunc(x) {
                    return true
                }
            }
            const newParamFilter = {
                serviceFilterCase: 0,
            }

            const filters = [newFilter, newParamFilter]
            return filters
        },
    },
    {
        id: 3,
        getLabel: () => 'Miễn phí vận chuyển & Ưu đãi khuyến mãi',
        isActive: () => true,
        isVisible: (paramFilters) => paramFilters.serviceFilterCase === 12,
        isRemovable: true,
        onRemove: (paramFilters) => {
            const newFilter = {
                SerViceFilterFunc(x) {
                    return true
                }
            }
            const newParamFilter = {
                serviceFilterCase: 0,
            }

            const filters = [newFilter, newParamFilter]
            return filters
        },
    },
    {
        id: 4,
        getLabel: (paramFilters) => {
            const newProductList = finalProductList.filter(x => {
                const toString = x.id.toString()
                return toString.indexOf('01') >= 1
            })

            const categoryInfo = newProductList.find(x => x.idCategory === paramFilters.idCategory)

            if (categoryInfo) {
                return `Danh mục ${categoryInfo.categoryName}`
            }
        },
        isActive: () => true,
        isVisible: (paramFilters) => paramFilters.idCategory > 0,
        isRemovable: true,
        onRemove: (paramFilters) => {
            const newFilter = {
                CategoryFilterFunc(x) {
                    return true
                }
            }
            const newParamFilter = {
                idCategory: 0,
            }

            const filters = [newFilter, newParamFilter]
            return filters
        },
    },
    {
        id: 5,
        getLabel: (paramFilters) => {
            switch(paramFilters.priceFilterCase) {
                case 1:
                    return 'Những sản phẩm giá dưới 200.000 VND'
                case 2:
                    return 'Những sản phẩm giá từ 200.000 VND đến 800.000 VND'
                case 3:
                    return 'Những sản phẩm giá trên 800.000 VND'
                case 4:
                    return `Những sản phẩm giá
                    từ ${formatPrice(paramFilters.fourthCaseMinValue)} 
                    đến ${formatPrice(paramFilters.fourthCaseMaxValue)}`
                default:
                    console.log('Xuất hiện lỗi, vui lòng kiểm tra');
            }            
        },
        isActive: () => true,
        isVisible: (paramFilters) => paramFilters.priceFilterCase > 0,
        isRemovable: true,
        onRemove: (paramFilters) => {
            const newFilter = {
                PriceFilterFunc(x) {
                    return true
                }
            }
            const newParamFilter = {
                priceFilterCase: 0,
            }

            const filters = [newFilter, newParamFilter]
            return filters
        },
    },
]

const useStyles = makeStyles(theme => ({
    root: {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',

        '& > li': {
            margin: '0 12px'
        }
    }
}))

function FilterViewer({paramFilters = {}, onChange = null}) {
    const classes = useStyles()
    const visibleList = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(paramFilters))
    }, [paramFilters])

    return (
        <Box component="ul" className={classes.root}>
            {visibleList.map(x => (
                <li>
                    <Chip
                        label={x.getLabel(paramFilters)}
                        color="primary"
                        onDelete={() => {
                            if (!onChange) return

                            const filters = x.onRemove(paramFilters)
                            onChange(filters[0], filters[1])
                        }}
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;