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
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/extension/carousel";
import useWoodlandStoreData from "@/lib/store/store";
import { cn } from "@/lib/utils";

type Props = {
  urls: string[] | undefined;
};

const ZoomImages = (props: Props) => {
  const { zoomDialouge, setZoomDialouge } = useWoodlandStoreData();
  return (
    <Dialog open={zoomDialouge} onOpenChange={(e) => setZoomDialouge(e)}>
      <DialogContent className="min-h-screen sm:rounded-none origin-top-right min-w-[100vw]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {props.urls !== undefined && props?.urls?.length > 0 ? (
          <Carousel orientation="vertical" className="flex  items-center gap-2">
            <CarouselThumbsContainer className="h-[54vh] sm:h-[70vh] md:h-[94vh] my-auto w-40 sm:w-52 md:w-72">
              {props.urls.map((item, index) => (
                <SliderThumbItem
                  key={index}
                  index={index}
                  className={cn(
                    "rounded-md border cursor-pointer relative h-auto flex justify-center items-center overflow-hidden mt-2 "
                  )}
                >
                  <img
                    src={item}
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    className=" object-contain aspect-square h-[80%] w-[80%] "
                  />
                </SliderThumbItem>
              ))}
            </CarouselThumbsContainer>
            <div className="relative basis-[80%] border ">
              <CarouselMainContainer className="h-[94vh]">
                {props.urls.map((item, index) => (
                  <SliderMainItem
                    key={index}
                    onClick={() => setZoomDialouge(false)}
                    className="flex items-center cursor-pointer justify-center h-52 rounded-md"
                  >
                    <img
                      src={item}
                      alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                      className="h-full sm:cursor-zoom-out object-contain w-full"
                    />
                  </SliderMainItem>
                ))}
              </CarouselMainContainer>
            </div>
          </Carousel>
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImages;
