import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoBedSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogDemo() {
  const [availableBeds, setAvailableBeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const hospitalNo = userData.hospital_no;
        const response = await fetch(
          `https://hean.mchaexpress.com/web-app/appcon/api/available-beds?hospital_no=${hospitalNo}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch available beds: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(
            `Failed to fetch available beds: ${data.message || "Unknown error"}`
          );
        }
        setAvailableBeds(data.available_beds);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateAvailableBeds = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const hospitalNo = userData.hospital_no;

      const formData = new FormData();
      formData.append("available_beds", availableBeds);

      const response = await fetch(
        `https://hean.mchaexpress.com/web-app/appcon/api/update-available-beds?hospital_no=${hospitalNo}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update available beds: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Failed to update available beds: ${data.message || "Unknown error"}`);
      }

      setResponseMessage(data.message);

      // Hide the message after 3 seconds
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Dialog className="border-custom-red">
      <DialogTrigger asChild>
      <Button variant="outline" className='mt-4'><IoBedSharp className="text-black mr-2 hover:text-custom-blue" /> Update Beds</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-custom-blue">Available Beds</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {responseMessage && (
          <div className="bg-green-200 text-green-800 py-2 px-4 rounded-lg">
            {responseMessage}
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Beds
            </Label>
            <Input
              id="name"
              value={availableBeds}
              onChange={(e) => setAvailableBeds(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="gap-3">
          <Button type="button" onClick={handleUpdateAvailableBeds}>
            Update Changes
          </Button>
        </DialogFooter>
        {error && (
          <div className="bg-red-200 text-red-800 py-2 px-4 rounded-lg">{error}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
