import React, { useEffect } from 'react';
import "./Notifications.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem("token");

const Notifications = () => {
    const navigate = useNavigate();
    const { data: user, sts } = useSelector((state) => state.user);
    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            if (user.isAdmin == false) {
                navigate("/");
            }
        }
    })
    return (
        <>
            {token && (
                <>
                    {user.isAdmin == true ? (
                        <>
                            <div>Notifications</div>
                        </>
                    ) : (
                        <h1 className='poppins-bold'>404 : NOT FOUND!</h1>
                    )}

                </>
            )}
        </>

    )
}

export default Notifications