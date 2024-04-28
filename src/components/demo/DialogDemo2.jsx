import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogDemo2() {
  const [serviceInput, setServiceInput] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddService = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const hospitalNo = userData.hospital_no;

      const formData = new FormData();
      formData.append("service", serviceInput);

      const response = await fetch(
        `https://hean.mchaexpress.com/web-app/appcon/api/add-service?hospital_no=${hospitalNo}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add service: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Failed to add service: ${data.message || "Unknown error"}`);
      }

      setResponseMessage(data.message);
      setServiceInput("");

      // Hide the message after 3 seconds
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding service:", error.message);
      setResponseMessage(error.message);

      // Hide the error message after 3 seconds
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
  };

  return (
    <Dialog className="border-custom-red">
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-custom-blue">Services</DialogTitle>
        </DialogHeader>
        {responseMessage && (
          <div className={`bg-green-200 text-green-800 py-2 px-4 rounded-lg ${responseMessage.includes("success") ? 'block' : 'hidden'}`}>
            {responseMessage}
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Services
            </Label>
            <Input
              id="service"
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              className="col-span-3"
              name="service"
            />
          </div>
        </div>
        <DialogFooter className="gap-3">
          <Button type="button" onClick={handleAddService}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
