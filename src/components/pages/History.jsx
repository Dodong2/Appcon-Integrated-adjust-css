import React, { useEffect, useState } from "react";
import { FaLocationDot, FaArrowLeft } from "react-icons/fa6";
import JPHost from '../images/JP Hostpital.svg';
import { CarouselDApiDemo } from "../demo/CarouselDApiDemo";
import Load from './Loading';
import { Link } from "react-router-dom";

const History = () => {
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const hospitalNo = userData.hospital_no;

    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/hospital-profile?hospital_no=${hospitalNo}`)
      .then(response => response.json())
      .then(data => {
          setHospitalProfile(data.hospital_profile);
          setIsLoading(false);
      })
      .catch(error => console.error('Error fetching hospital profile:', error));
  }, []);

  return (
    <>
      <Load />
      <div className='history-container'>
        <nav>
          <div className="host-name-left">
            <h1>{hospitalProfile ? hospitalProfile.hospital_name : "Loading..."}</h1>
            <div className="host-loc">
              <FaLocationDot className="icon" />
              <p>{hospitalProfile ? hospitalProfile.address : "Loading..."}</p>
            </div>
          </div>
          <div className="host-logo-right">
            <div className="right-layer1">
              <img src={JPHost} alt="Hospital Logo" />
            </div>
            <div className='right-layer2'>
              <h3>{hospitalProfile ? hospitalProfile.hospital_name : "Loading..."}</h3>
              <Link to='/EditProfile'>
                <p>Edit Profile</p>
              </Link>
            </div>
          </div>
        </nav>
        <div className='history-cont-layer1'>
          <Link to='/Home'>
            <div className="history-icon1"><FaArrowLeft /></div>
          </Link>
          <div className="history-title"><h1>Emergency history</h1></div>
        </div>
        <div className="history-table">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <CarouselDApiDemo />
          )}
        </div>
      </div>
    </>
  )
}

export default History;
