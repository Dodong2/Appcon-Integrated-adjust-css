import * as React from "react";
import { useState, useEffect } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDApiDemo() {
  const [api, setApi] = React.useState(null);
  const [alerts, setAlerts] = React.useState([]);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const hospitalNo = userData.hospital_no;

  React.useEffect(() => {
    // Fetch alerts
    fetch(`https://hean.mchaexpress.com/web-app/appcon/api/alerts?hospital_no=${hospitalNo}`)
      .then(response => response.json())
      .then(data => {
          // Sort alerts in descending order based on the notified_date
          const sortedAlerts = data.alerts_data.sort((a, b) => new Date(b.notified_date) - new Date(a.notified_date));
          setAlerts(sortedAlerts);
      })
      .catch(error => console.error('Error fetching alerts:', error));
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

  // Function to open Google Maps link in new window
  const openMapLink = (latitude, longitude) => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  };

  return (
    <div>
      <Carousel setApi={setApi} className='carousel-tailwind1'>
        <CarouselContent>
          <CarouselItem>
            <Card className='bg-custom-dark carousel-tailwind2 rounded-none'>
              <CardContent className="aspect-square p-0">
                <div className="table-info">
                  <div className="table-date">Date <FaArrowDownLong className="icon4" /></div>
                  <h1 className="table-location">Location</h1>
                </div>
                <table className="main-table">
                  <thead className="table-head">
                    <tr className='table-row2'>
                      <th className='history-date'>Date</th>
                      <th className='history-location'>Coordinates</th>
                      <th className='history-location'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through sorted alerts to generate table rows */}
                    {alerts.map((alert, index) => (
                      <tr key={index} className='table-row2'>
                        <td>{alert.notified_date}</td>
                        <td >{alert.latitude} {alert.longitude}</td>
                        <td><button onClick={() => openMapLink(alert.latitude, alert.longitude)}>View Map</button></td>
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
