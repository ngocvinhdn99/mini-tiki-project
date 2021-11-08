import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { freeShipImgUrl, tikiNowUrl } from '../../../../constants/ImgUrl';

LeftDetailPage.propTypes = {
    srcImg: PropTypes.string,
    promotionPercent: PropTypes.number,
    isFreeShip: PropTypes.bool,
    name: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
    root: {
        border: `1px solid #ccc`,
        position: 'relative',
        marginBottom: theme.spacing(4),
        boxShadow: '2px 2px 2px #e2dbdb',
        overflow: 'hidden'
    },
    serviceContainer: {
    },
    mainImg: {
        width: '100%',
        objectFit: 'cover'
    },
    serviceImg1: {
        width: '38%',
        objectFit: 'contain',
        position: 'absolute',
        bottom: '0',
        left: '0',
        margin: theme.spacing(1)
    },
    serviceImg2: {
        width: '28%',
        objectFit: 'contain',
        position: 'absolute',
        bottom: '0',
        right: '0',
        margin: theme.spacing(1),
        backgroundColor: '#fff'
    }
}))

function LeftDetailPage({srcImg = '', name = '', promotionPercent = null, isFreeShip = null}) {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <img src={srcImg} alt={name} className={classes.mainImg} />
            <Box className={classes.serviceContainer}>
                {isFreeShip && (
                    <img src={freeShipImgUrl} alt="FreeShip" className={classes.serviceImg1} />
                )}
                {promotionPercent > 0 && (
                    <img src={tikiNowUrl} alt="FreeShip" className={classes.serviceImg2} />
                )}
            </Box>
        </Box>
    );
}

export default LeftDetailPage;