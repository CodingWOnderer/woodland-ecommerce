import React from "react";
import Image from "next/image";
import Link from "next/link";
import { shopAccessories, shopClothing, shopFootwear } from "@/lib/model/data";
import { AlertForm } from "../forum/AlertsForms";
import { Separator } from "../ui/separator";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const shareArr = [
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/woodlandexploremore/",
  },
  {
    icon: FaFacebook,
    link: "https://www.facebook.com/woodlandadventure",
  },
  {
    icon: FaXTwitter,
    link: "https://twitter.com/Woodland",
  },
  {
    icon: FaYoutube,
    link: "https://www.youtube.com/@woodland",
  },
  {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/company/woodland/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-foreground overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-4 lg:py-16 py-8 sm:px-6 lg:px-8">
        <div className="">
          <div className="hidden text-primary-foreground lg:block">
            <Image
              height={40}
              width={100}
              alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
              src="/footerlogo.png"
            />
          </div>
        </div>
        <div className="xl:grid xl:grid-cols-2">
          <div className=" lg:space-x-10 space-y-8 lg:space-y-0  grid lg:grid-cols-2  lg:order-last ">
            <div className="pt-6 max-w-xl space-y-2 xl:border-l-[0.5px] border-black/10 pl-2">
              <h4 className="text-primary-foreground font-semibold mb-2">
                Contact Us
              </h4>
              <p className="text-[13px] text-primary-foreground">
                Need some more help? Get in touch with us and we’ll be more than
                happy to guide you through!
              </p>
              <p className="text-[13px] text-primary-foreground underline">
                care@woodlandworldwide.com <br />
                1800 103 3445
              </p>
              <p className="text-xs text-primary-foreground -leading-6">
                Woodland Customer Service Reps are available for inquiries
                Monday to Friday from 10AM to 6PM.
              </p>
            </div>
            <AlertForm />
          </div>

          <div className=" lg:pe-16">
            <div className="mt-8 shrink grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="font-medium text-primary-foreground">
                  Shop Footwear
                </p>
                <ul className="mt-6 space-y-1 text-sm">
                  {shopFootwear.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className="text-primary-foreground transition hover:opacity-75"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium text-primary-foreground">Company</p>

                <ul className="mt-6 space-y-1 text-sm">
                  {" "}
                  {shopClothing.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className="text-primary-foreground transition hover:opacity-75"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium whitespace-nowrap text-primary-foreground">
                  Shop Accessories & Bags
                </p>

                <ul className="mt-6 space-y-1 text-sm">
                  {shopAccessories.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className="text-primary-foreground transition hover:opacity-75"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/**remaining section of footer */}
        <div className="flex items-center mt-6 space-x-6">
          <div className="flex justify-between w-full md:w-auto md:space-x-14">
            {shareArr.map((item, index) => (
              <Link key={index} href={item.link}>
                <item.icon size={24} className="text-primary-foreground" />
              </Link>
            ))}
          </div>
          <div className="flex-1 hidden md:block">
            <Separator className="bg-black/10" />
          </div>
        </div>
        {/**compliance links */}
        <div className="flex lg:flex-row flex-col justify-between pt-8">
          <div className="flex xl:space-x-12 space-y-2 xl:space-y-0 flex-col xl:flex-row text-[12px] tracking-wider font-semibold text-primary-foreground">
            <Link href={"/about-us"} className="hover:underline transition">
              About Us
            </Link>
            <Link
              href={"/compliance/terms"}
              className="hover:underline transition"
            >
              Terms of Service
            </Link>
            <Link
              href={"/compliance/privacy"}
              className="hover:underline transition"
            >
              Privacy Policy
            </Link>
            <Link href={"/blogs"} className="hover:underline transition">
              Blogs
            </Link>
            <Link
              href={"/compliance/refund"}
              className="hover:underline transition"
            >
              Refund policy
            </Link>
            <Link href={"/store"} className="hover:underline transition">
              Store Locator
            </Link>
          </div>
          <div className="text-xs mt-8 lg:mt-0 font-semibold tracking-wider text-primary-foreground">
            Copyright 2024, Woodland (Aero Club) Private Limited
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
