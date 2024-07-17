"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useWoodlandStoreData from "@/lib/store/store";
import React from "react";

type Props = {
  urls: string[] | undefined;
};

const ZoomImages = ({ urls }: Props) => {
  const { zoomDialouge, setZoomDialouge } = useWoodlandStoreData();
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (api && zoomDialouge.open) {
      api.scrollTo(zoomDialouge.index);
    }
  }, [api, zoomDialouge.open, zoomDialouge.index]);

  return (
    <Dialog
      open={zoomDialouge.open}
      onOpenChange={(e) => setZoomDialouge({ ...zoomDialouge, open: e })}
    >
      <DialogContent className="min-h-screen sm:rounded-none origin-top-right min-w-[100vw]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {urls && urls.length > 0 && (
          <div className="w-full">
            <Carousel
              opts={{ loop: true }}
              setApi={setApi}
              orientation="vertical"
              className="flex w-full items-center gap-2"
            >
              <div className="w-52 overflow-hidden overflow-y-scroll space-y-1 p-1 flex flex-col h-[94vh]">
                {urls.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className="flex p-4 items-center border cursor-pointer justify-center rounded-md"
                  >
                    <img
                      src={item}
                      alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                      className="h-full sm:cursor-zoom-out object-contain w-full"
                    />
                  </div>
                ))}
              </div>
              <div className="relative basis-[80%] border">
                <CarouselContent className="h-[94vh]">
                  {urls.map((item, index) => (
                    <CarouselItem
                      key={index}
                      onClick={() =>
                        setZoomDialouge({ ...zoomDialouge, open: false })
                      }
                      className="flex items-center cursor-pointer justify-center h-52 rounded-md"
                    >
                      <img
                        src={item}
                        alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                        className="h-full sm:cursor-zoom-out object-contain w-full"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
            </Carousel>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImages;
