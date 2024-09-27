import { Carousel } from "flowbite-react";
import AkShopPhoto1 from '@assets/ak-cycles1.jpg';
import AkShopPhoto2 from '@assets/custom-bike.jpg';
import AkShopPhoto3 from '@assets/bike2.jpg';
import AkShopPhoto4 from '@assets/bike-photos-3.jpg';
import AkShopPhoto5 from '@assets/parts-photo-1.jpg';

export function PhotosCarousel() {
  return (
      <Carousel className="mt-16 w-full md:w-3/5 h-[240px] md:h-[360px] overflow-hidden px-16 md:px-0">
        <img
          src={AkShopPhoto1.src}
          alt="AK Cycles Custom Bike"
          className="w-full h-full object-contain"
        />
        <img
          src={AkShopPhoto2.src}
          alt="AK Cycles Custom Bike 2"
          className="w-full h-full object-contain"
        />
        <img
          src={AkShopPhoto3.src}
          alt="AK Cycles Custom Bike 2"
          className="w-full h-full object-contain"
        />
        <img
          src={AkShopPhoto4.src}
          alt="AK Cycles Custom Bike 2"
          className="w-full h-full object-contain"
        />
        <img
          src={AkShopPhoto5.src}
          alt="AK Cycles Custom Bike 2"
          className="w-full h-full object-contain"
        />
      </Carousel>
  );
}


export default PhotosCarousel;