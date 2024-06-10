import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../redux/slices/cartSlice';

const token = localStorage.getItem("token");


const Menu = () => {



    return (
        <>
            <p>
                <Link to="/" >HomePage</Link>
            </p>
            <p>
                <Link to="/">About Us</Link>
            </p>
            <p>
                <Link to="/">Contact Us</Link>
            </p>
        </>
    );
};

const UserMenu = ({ handleClick, display }) => {
    return (
        <div className='user-account-menu  navbar-menu_account_container poppins-medium' style={{ display: `${display}` }}>

            {token ? (
                <>
                    <p onClick={handleClick}>
                        <Link to="/profile_dashboard">My Account</Link>
                    </p>

                    <p
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                            handleClick();
                        }}>

                        <Link>LogOut</Link>
                    </p>
                </>
            ) : (
                <>

                    <p onClick={handleClick}>
                        <Link to="/signup" >SignUP</Link>
                    </p>
                    <p onClick={handleClick}>
                        <Link to="/login" >LogIn</Link>
                    </p>
                </>
            )}

        </div>
    )
}

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { data: products, totalPrice, totalItems, status } = useSelector((state) => state.cart);

    useEffect(() => {
        if (token) {

            dispatch(fetchCartItems())
        }
    }, [])


    const [toggleMenu, setToggleMenu] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const handleOpenUserMenu = () => {
        if (openUserMenu == true) {
            setOpenUserMenu(false);
        } else {
            setOpenUserMenu(true);
        }
    }
    let display;
    if (openUserMenu == true) {
        display = "block"
    } else {
        display = "none"
    }



    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo-container">
                    <p className='navbar-logo poppins-semibold' onClick={() => { navigate("/") }}>
                        <i className="fa-solid fa-pizza-slice pizza-icon"></i> PizzaLand
                    </p>
                </div>
                <div className="navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="navbar-user-actions">
                <i className="fa-solid fa-circle-user user-icon" onClick={handleOpenUserMenu}></i>
                <UserMenu display={display} handleClick={() => { setOpenUserMenu(false) }} />
                {!token && (

                    <Link to="/login" ><i className="fa-solid fa-cart-shopping  cart-icon"></i></Link>
                )}
                {token && (
                    <Link to="/profile_dashboard/cart"><i className="fa-solid fa-cart-shopping  cart-icon"></i>({totalItems})</Link>
                )}
            </div>
            <div className="navbar-menu">
                {toggleMenu ? (
                    <i className="fa-solid fa-xmark cross-icon"
                        onClick={() => setToggleMenu(false)}></i>
                ) : (
                    <i className="fa-solid fa-bars menu-bar"
                        onClick={() => setToggleMenu(true)}></i>
                )}
                {toggleMenu && (
                    <div className="navbar-menu_container">
                        <div className="navbar-menu_container-links">
                            <Menu />
                            <div className="navbar-menu_container-links-user-actions">
                                <i className="fa-solid fa-circle-user user-icon" onClick={handleOpenUserMenu}></i>
                                <UserMenu display={display} handleClick={() => { setOpenUserMenu(false) }} />
                                {!token && (

                                    <Link to="/login"><i className="fa-solid fa-cart-shopping  cart-icon"></i></Link>
                                )}
                                {
                                    token && (

                                        <Link to="/profile_dashboard/cart"><i className="fa-solid fa-cart-shopping  cart-icon"></i>({totalItems})</Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;