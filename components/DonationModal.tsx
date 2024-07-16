"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useWoodlandStoreData from "@/lib/store/store";

const DonationModal = () => {
  const { donationModel, setDonationModel } = useWoodlandStoreData();
  return (
    <Dialog open={donationModel} onOpenChange={(e) => setDonationModel(e)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> </DialogTitle>
          <DialogDescription>
            <img
              width="100%"
              src="https://storage.googleapis.com/wdl-varun/woodland-images/may2024/wwf.jpg"
              alt="WWF"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
