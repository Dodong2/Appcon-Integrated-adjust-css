import * as React from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDApiDemo1() {
  const [api, setApi] = React.useState(null); // Assuming the Carousel component provides an API object
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [services, setServices] = React.useState([]);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [failureMessage, setFailureMessage] = React.useState("");

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const hospitalNo = userData.hospital_no;
    
    // Fetch services
    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/services?hospital_no=${hospitalNo}`)
      .then(response => response.json())
      .then(data => {
          // Sort services in descending order based on service_id
          const sortedServices = data.services_data.sort((a, b) => b.service_id.localeCompare(a.service_id));
          setServices(sortedServices);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const deleteService = (serviceId) => {
    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/delete-service?service_id=${serviceId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setServices(prevServices => prevServices.filter(service => service.service_id !== serviceId));
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      } else {
        setFailureMessage(data.message);
        setTimeout(() => setFailureMessage(""), 3000); // Clear failure message after 3 seconds
      }
    })
    .catch(error => {
      console.error('Error deleting service:', error);
      setFailureMessage("An error occurred while deleting the service.");
      setTimeout(() => setFailureMessage(""), 3000); // Clear failure message after 3 seconds
    });
  };  

  return (
    <div>
      <Carousel setApi={setApi} className='carousel-tailwind1'>
        <CarouselContent>
          <CarouselItem>
            <Card className='bg-custom-dark carousel-tailwind2 rounded-none'>
            {successMessage && (
              <div className="text-center bg-green-500 text-white py-2 px-4 rounded-md mb-4">{successMessage}</div>
            )}
            {failureMessage && (
              <div className="text-center bg-red-500 text-white py-2 px-4 rounded-md mb-4">{failureMessage}</div>
            )}
              <CardContent className="aspect-square p-0">
                <div className="table-info">
                  <div className="table-date">Date <FaArrowDownLong className="icon4" /></div>
                  <h1 className="table-location">Location</h1>
                  <h1 className="table-location">Action</h1>
                </div>
                <table className="main-table">
                  <thead className="table-head">
                    <tr className="table-row1">
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr className='table-row2' key={index}>
                        <td className='history-date'>{service.service_id}</td>
                        <td>{service.service}</td>
                        <td><button onClick={() => deleteService(service.service_id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='rounded absolute'/>
        <CarouselNext className='rounded absolute'/>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground text-white">
        Page {current} of {count}
      </div>
    </div>
  );
}
