import { Badge, Box, Container, Grid, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import './grid.scss';
import './styles.scss'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsCountSelector } from '../../features/ReduxSlice/selector';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { hideMiniCart } from '../../features/ReduxSlice/cartSlice';
import { showUserForm } from '../../features/userSlice/userSlice';


Header.propTypes = {};

function Header() {
    const history = useHistory()
    const cartItemsCount = useSelector(cartItemsCountSelector)

    const showMiniCart = useSelector(state => state.cart.showMiniCart)
    const dispatch = useDispatch()

    const handleNavigate = () => {
        history.push('/')
    }

    const handleRemoveMiniCart = () => {
        dispatch(hideMiniCart())
    }

    const handleNavigateToCart = () => {
        history.push('/cart')
        dispatch(hideMiniCart())
    }

    const handleOpenUserForm = () => {
        const action = showUserForm()
        dispatch(action)
    }

    return (
        <Box className="header-root">
            <Container>
                <Grid container className="header-row">
                    <Grid item className='col itemgrid homeImage' xs={1} sm={1} md={1} lg={1} onClick={handleNavigate}>
                        <img src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png" className="header_img" alt="Tiki-Logo" />
                    </Grid>
                    <Grid item className='col itemgrid header-category' xs={2} sm={2} md={2} lg={2}>
                        <MenuIcon style={{color: '#fff', fontSize:'32px', marginRight: '8px'}} />
                         <div className="category-detail">
                            <div className="category-introduce">Danh mục</div>
                            <div className="category-viewerdetail">
                                Sản phẩm
                                <ArrowDropDownIcon />
                            </div>
                            
                        </div>
                    </Grid>
                    <Grid item className='col itemgrid header-search' xs={6} sm={6} md={6} lg={6}>
                        <input type="text" placeholder="Tìm sản phẩm, danh mục, hay thương hiệu mong muốn" className="header-input" />
                        <button className="header-button">
                                <SearchIcon />
                                <span>Tìm kiếm</span>
                        </button>
                    </Grid>
                    <Grid item className='col itemgrid header-account' xs={2} sm={2} md={2} lg={2} onClick={handleOpenUserForm}>
                        <AccountCircleIcon className="header-account-logo" />
                         <div>
                            <div className="header-login">Đăng nhập/Đăng ký</div>
                            <div className="header-user">
                                 Tài khoản
                                 <ArrowDropDownIcon />
                            </div>
                         </div>
                    </Grid>
                    <Grid item className='col itemgrid header-cart' xs={1} sm={1} md={1} lg={1}>
                        <IconButton aria-label="show 4 new mails" color="inherit" className="header-cart-container" onClick={handleNavigateToCart}>
                            <Badge badgeContent={cartItemsCount} color="secondary">
                                <ShoppingCart className="header-cart-logo" />
                            </Badge>
                        <span className="header-cart-des">Giỏ hàng</span>
                        </IconButton>

                        {showMiniCart && (
                            <div className="mini-cart">
                            <IconButton className="minicart-closeicon-btn" onClick={handleRemoveMiniCart} >
                                <CloseIcon className="minicart-closeicon"/>
                            </IconButton>
                            <div className="mini-cart-title">
                                <CheckCircleIcon className="check-minicart-icon" />
                                <span className="minicart-title-des">Thêm vào giỏ hàng thành công!</span>
                            </div>
                            <button className="minicart-btn" onClick={handleNavigateToCart}>Xem giỏ hàng và thanh toán</button>
                        </div>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Header;

        // <div id="header">
        //     <div className="grid wide">
        //         <div className="row">
        //             <div className=" l-1">
        //                 <img src="https://phariton.com/wp-content/uploads/2019/10/logo-tiki.png" className="header_img" alt="Tiki-Logo" />
        //             </div>
        //             <div className=" l-1">
        //                 <MenuIcon />
        //                 <div>
        //                     <div>Danh mục</div>
        //                     <div>Sản phẩm</div>
        //                 </div>
        //             </div>
        //             <div className=" l-8">
        //                 <input type="text" placeholder="Tìm sản phẩm, danh mục, hay thương hiệu mong muốn" />
        //                 <button>
        //                     <SearchIcon />
        //                     <span>Tìm kiếm</span>
        //                 </button>
        //             </div>
        //             <div className=" l-1">
        //                 <AccountCircleIcon />
        //                 <div>
        //                     <p>Đăng nhập/Đăng ký</p>
        //                     <p>Tài khoản</p>
        //                 </div>
        //             </div>
        //             <div className=" l-1">
        //             <IconButton aria-label="show 4 new mails" color="inherit">
        //                 <Badge badgeContent={4} color="secondary">
        //                     <ShoppingCart />
        //                 </Badge>
        //             </IconButton>
        //             </div>
        //         </div>
        //     </div>
        // </div> 

