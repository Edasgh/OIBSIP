import React from 'react'
import { Link } from 'react-router-dom';
import "./ProfileNav.css";
const ProfileNav = () => {
    return (
        <>
            <nav className="profile-nav">
                {/* {(isAdminTrue) ? (
            <>
              <h2>Admin Panel</h2>
              <hr />
              <ul type="none">
  
                <Link to="/"><li> Profile</li></Link>
  
  
                <Link to="/"><li>Create Product</li></Link>
  
  
                <Link to="/"><li>Orders</li></Link>
  
  
                <Link to="/"><li>Users</li></Link>
  
              </ul>
            </>
          ) : (
            <>
              <h2>User Account</h2>
              <hr />
              <ul type="none">
  
                <Link to="/"><li>Profile</li></Link>
  
  
                <Link to="/"><li>Cart</li></Link>
  
  
                <Link to="/"><li>My Orders</li></Link>
  
              </ul>
  
            </>
          )} */}
                <h2>Admin Panel</h2>
                <hr />
                <ul type="none">

                    <Link to="/profile_dashboard"><li>Profile</li></Link>
                    <Link to="/profile_dashboard/add_product"><li>Create Product</li></Link>
                    <Link to="/profile_dashboard/view_products"><li>Products</li></Link>
                    <Link to="/profile_dashboard/orders"><li>Orders</li></Link>
                    <Link to="/profile_dashboard"><li>Users</li></Link>

                </ul>

            </nav>

        </>
    )
}

export default ProfileNav