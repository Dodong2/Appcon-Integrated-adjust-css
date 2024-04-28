import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import JPHost from '../images/JP Hostpital.svg'
import Load from './Loading'
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import DialogDemo from '../demo/DialogDemo';
import DialogDemo2 from '../demo/DialogDemo2';
import { FaToolbox } from "react-icons/fa6";
import { BiSolidDoorOpen } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";

const Home = () => {
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve hospital number from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const hospitalNo = userData.hospital_no;

    // Fetch hospital profile data
    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/hospital-profile?hospital_no=${hospitalNo}`)
      .then(response => response.json())
      .then(data => {
          setHospitalProfile(data.hospital_profile);
          setIsLoading(false);
      })
      .catch(error => console.error('Error fetching hospital profile:', error));

    // Fetch emergency alerts
    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/alerts?hospital_no=${hospitalNo}`)
      .then(response => response.json())
      .then(data => {
          // Sort emergency alerts in descending order based on notified date
          const sortedAlerts = data.alerts_data.sort((a, b) => new Date(b.notified_date) - new Date(a.notified_date));
          // Limit the data to be displayed to only one alert
          const limitedAlerts = sortedAlerts.slice(0, 4);
          setEmergencyAlerts(limitedAlerts);
      })
      .catch(error => console.error('Error fetching emergency alerts:', error));

    // Fetch services
    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/services?hospital_no=${hospitalNo}`)
      .then(response => response.json())
      .then(data => {
          const limitedServices = data.services_data.slice(0, 4);
          setServices(limitedServices);
      })
      .catch(error => console.error('Error fetching services:', error));
    }, []);

  const handleLocationRedirect = (latitude, longitude) => {
    // Redirect to the location based on coordinates
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  };

  return (
    <>
    <Load/>
      <div className='home-adminSide-container'>
        {/* Reusable Code */}
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
              <img src={JPHost} />
            </div>
            <div className='right-layer2'>
              <h3>{hospitalProfile ? hospitalProfile.hospital_name : "Loading..."}</h3>
              <Link to='/EditProfile'>
              <p>Edit Profile</p>
              </Link>
            </div>
          </div>
        </nav>
        {/* Render the DialogDemo */}
        <Dialog>
          <DialogTrigger asChild={<Button variant="outline" className='btn-modal'>Edit Profile</Button>}></DialogTrigger>
          <DialogDemo />
          <DialogDemo2 />
        </Dialog>
        <div className='emergency-container'>
          {/* Emergency Left side*/}
          <div className='emergency'>
            <div className='emergency-history-layer1'>
              <h1>EMERGENCY ALERT</h1>
              <Link to='/History' style={{ textDecoration: 'none' }}>
                <div className='history-layer'>
                  <MdHistory className='icon1' />
                  <p>History</p>
                </div></Link>
            </div>
            {emergencyAlerts.map((alert, index) => (
              <div className='emergency-btns' key={index}>
                <Link to='' style={{ textDecoration: 'none' }}>
                  <div className="btns">
                    <div className="btns-layer1">
                      <div className="layer1-element1">
                        <IoIosWarning />
                      </div>
                      <div className="layer1-element2">
                        <h3>Emergency Alert</h3>
                        <div className="txt-loc">
                          <FaLocationDot className="icon2" />
                          <p>{`Latitude: ${alert.latitude}, Longitude: ${alert.longitude}`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="btns-layer2" onClick={() => handleLocationRedirect(alert.latitude, alert.longitude)}>
                      <FaAngleRight />
                    </div>
                  </div>
                </Link>
                <br/>
              </div>
            ))}
          </div>

          {/* Services offer right side*/}
          <div className='emergency'>
            <div className='emergency-history-layer1-blue'>
              <h1>SERVICES OFFERED</h1>
              <Link to='/ServicesView' style={{ textDecoration: 'none' }}>
                <div className='history-layer'>
                  <MdHistory className='icon1' />
                  <p>View All</p>
                </div></Link>
            </div>
            {services.map((service, index) => (
              <div className='emergency-btns-blue' key={index}>
                <Link to='' style={{ textDecoration: 'none' }}>
                  <div className="btns">
                    <div className="btns-layer1">
                      <div className="layer1-element1">
                        {/* Choose an appropriate icon based on the service */}
                        <FaToolbox />
                      </div>
                      <div className="layer1-element2">
                        <h3>{service.service}</h3>
                        <div className="txt-loc">
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <br/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
