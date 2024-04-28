import React, { useState, useEffect } from "react";
import { FaHospitalAlt, FaHome, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import AddIcons from '../images/addIcons.svg';
import { IoIosCloseCircle } from "react-icons/io";
import Load from './Loading';
import { Link } from "react-router-dom";

const EditProfile = () => {
    const [hospitalData, setHospitalData] = useState({
        hospital_no: "",
        hospital_name: "",
        address: "",
        phone_number: "",
        latitude: "",
        longitude: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        // Fetch hospital profile data
        const fetchData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("userData"));
                const hospitalNo = userData.hospital_no;
                const response = await fetch(`https://hean.mchaexpress.com/web-app/appcon/api/hospital-profile?hospital_no=${hospitalNo}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch hospital profile: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (!data.success) {
                    throw new Error(`Failed to fetch hospital profile: ${data.message || "Unknown error"}`);
                }
                const { hospital_no, hospital_name, address, phone_number, latitude, longitude } = data.hospital_profile;
                setHospitalData({
                    hospital_no,
                    hospital_name,
                    address,
                    phone_number,
                    latitude,
                    longitude
                });
            } catch (error) {
                console.error("Error fetching hospital profile:", error.message);
            }
        };
        fetchData();
    }, []);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const clearMessage = () => {
      setMessage(null);
  };
  
  const showMessageFor3Seconds = () => {
      setTimeout(clearMessage, 3000);
  };
  
  const updateHospitalProfile = async () => {
      try {
          const userData = JSON.parse(localStorage.getItem("userData"));
          const hospitalNo = userData.hospital_no;
          const formData = new FormData();
          formData.append("hospital_name", hospitalData.hospital_name);
          formData.append("address", hospitalData.address);
          formData.append("phone_number", hospitalData.phone_number);
          formData.append("latitude", parseFloat(hospitalData.latitude));
          formData.append("longitude", parseFloat(hospitalData.longitude));
  
          const response = await fetch(`https://hean.mchaexpress.com/web-app/appcon/api/update-hospital?hospital_no=${hospitalNo}`, {
              method: "POST",
              body: formData
          });
  
          if (!response.ok) {
              throw new Error(`Failed to update hospital profile: ${response.status} ${response.statusText}`);
          }
  
          const data = await response.json();
          if (!data.success) {
              throw new Error(`Failed to update hospital profile: ${data.message || "Unknown error"}`);
          }
  
          setMessage({ type: "success", content: data.message });
          showMessageFor3Seconds(); // Show message for 3 seconds
      } catch (error) {
          console.error("Error updating hospital profile:", error.message);
          setMessage({ type: "error", content: error.message });
          showMessageFor3Seconds(); // Show message for 3 seconds
      }
  };  

    const { hospital_name, address, phone_number, latitude, longitude } = hospitalData;

    return (
        <>
            <Load />
            <div className="main-edit-prof-container">
                <nav>
                    <div className="host-name-left">
                        <h1>Account Details</h1>
                        <div className="host-loc">
                            <p>Hostpital Information</p>
                        </div>
                    </div>
                    <Link to='/Home'>
                        <div className="host-logo-right">
                            <IoIosCloseCircle className="icon3" />
                        </div>
                    </Link>
                </nav>
                <div className="edit-container">
                    <div className="edit-img-left">
                        <form action="" method="post" className='form-account-detail'>
                            <div className="file-box">
                                {imageUrl ? <img src={imageUrl} alt="Selected Image" /> : <img src={AddIcons} alt="Add Image" />}
                                {!selectedFile}
                            </div>
                            <button type="button" onClick={() => document.getElementById('fileInput').click()}>Upload Image</button>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".jpg, .png, .webp"
                                className="img-file-uploader"
                                onChange={handleFileInputChange}
                                style={{ display: 'none' }} // Hide the default file input
                            />
                        </form>
                    </div>
                    <div className="edit-infor-right">
                            {message && (
                                <div className={`mt-4 p-2 ${message.type === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} rounded-md`}>
                                    <p>{message.content}</p>
                                    <button onClick={clearMessage} className="mt-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Close</button>
                                </div>
                            )}
                        <div className="form-info">
                            <span className='account-title'>Hospital Name</span>
                            <div className="input-cont">
                                <FaHospitalAlt className='input-icon' />
                                <input
                                    type="text"
                                    className='account-input'
                                    placeholder='Enter Hospital Name'
                                    value={hospital_name}
                                    onChange={(e) => setHospitalData({ ...hospitalData, hospital_name: e.target.value })}
                                />
                            </div>
                            <span className='account-title'>Address</span>
                            <div className="input-cont">
                                <FaHome className='input-icon' />
                                <input
                                    type="text"
                                    className='account-input'
                                    placeholder='Enter Address'
                                    value={address}
                                    onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })}
                                />
                            </div>
                            <span className='account-title'>Calling Number</span>
                            <div className="input-cont">
                                <FaPhoneAlt className='input-icon' />
                                <input
                                    type="text"
                                    className='account-input'
                                    placeholder='Enter Calling Number'
                                    value={phone_number}
                                    onChange={(e) => setHospitalData({ ...hospitalData, phone_number: e.target.value })}
                                />
                            </div>
                            <span className='account-title'>Latitude</span>
                            <div className="input-cont">
                                <FaMapMarkerAlt className='input-icon' />
                                <input
                                    type="text"
                                    className='account-input'
                                    placeholder='Latitude'
                                    value={latitude}
                                    readOnly
                                />
                            </div>
                            <span className='account-title'>Longitude</span>
                            <div className="input-cont">
                                <FaMapMarkerAlt className='input-icon' />
                                <input
                                    type="text"
                                    className='account-input'
                                    placeholder='Longitude'
                                    value={longitude}
                                    readOnly
                                />
                            </div>
                        </div><br />
                        <div className="edit-footer">
                            <button className="edit-btn-1" onClick={updateHospitalProfile}>Update</button>
                            <button className="edit-btn-2">Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;
