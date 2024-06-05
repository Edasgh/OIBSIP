import React , { useEffect }from 'react'
import { useNavigate} from 'react-router-dom';

const token = localStorage.getItem("token");

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, []);
  return (
    <>
    <div className="profile-header-content">
    <h2 className="poppins-semibold dashboard-section-title">My Profile</h2>
  </div>
  <div className="profile-content">
    <ul type="none">
      <li><span className='poppins-medium'>Name :</span> Piya Roy </li>
      <li><span className='poppins-medium'>Email : </span>pd24@gmail.com</li>
      <li><span className='poppins-medium'>Address :</span> 123dsp colony , gt villa, khidirpur, suvam apartment</li>
    </ul>
  </div>
  <ul type="none" className='buttons-container'>
    <button className="edit-details poppins-semibold">Edit Details</button>
    <button className="change-password poppins-semibold">Change Password</button>
  </ul>
  </>
  )
}

export default Profile