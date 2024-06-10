import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ProfileNav.css";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/slices/userSlice';
import { STATUSES } from '../../../redux/slices/productSlice';

const token = localStorage.getItem("token");

const ProfileNav = () => {
  const dispatch=useDispatch();
  const { data: user, status } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [])


  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }



  return (
    <>
      <nav className="profile-nav">
        {(user.isAdmin == true) ? (
          <>
            <h2>Admin Panel</h2>
            <hr />
            <ul type="none">

              <Link to="/profile_dashboard"><li>Profile</li></Link>
              <Link to="/profile_dashboard/notifications"><li>Notifications</li></Link>
              <Link to="/profile_dashboard/add_product"><li>Create Product</li></Link>
              <Link to="/profile_dashboard/view_products"><li>Products</li></Link>
              <Link to="/profile_dashboard/orders"><li>All Orders</li></Link>

            </ul>
          </>
        ) : (
          <>
            <h2>My Account</h2>
            <hr />
            <ul type="none">
              <Link to="/profile_dashboard"><li>Profile</li></Link>
              <Link to="/profile_dashboard/cart"><li>My Cart</li></Link>
              <Link to="/profile_dashboard/orders"><li>My Orders</li></Link>

            </ul>

          </>
        )}
        

      </nav>

    </>
  )
}

export default ProfileNav