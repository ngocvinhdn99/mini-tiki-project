import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './page/DetailPage';
import ListPage from './page/ListPage';



ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    const match = useRouteMatch()

    return (
        <Box>
            <Switch>
                <Route path={match.url} component={ListPage} exact />
                <Route path={`${match.url}/:productId`} component={DetailPage} />
            </Switch> 
        </Box>
    );
}

export default ProductFeature;

