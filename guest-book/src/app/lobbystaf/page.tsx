import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../assets/svgs/Navbarstaf.svg";
import TelkomBulat from "../assets/svgs/TelkomBulat.svg";
import Icon from "../assets/images/IconSchool.png";
import Home from "../assets/svgs/HomeStaff.svg";
import Notif from "../assets/svgs/Lonceng.svg";
import Profile from "../assets/svgs/Profile.svg";
import Bulat from "../assets/svgs/BulatStaff.svg";
import Text from "../assets/svgs/TextLobbyStaf.svg";
import IconCard from "../assets/svgs/IconCard.svg";
import './style.css'


function page() {
  return (
    <>
      <body>
        <div className="absolute">
          <Image
            src={Navbar}
            alt="Navbar"
            width={1536}
            style={{ marginTop: "-46px" }}
          />

          <Image
            src={Icon}
            alt="Navbar"
            width={230}
            style={{ marginTop: "-100px", }}
          />

        <div className='flex absolute top-[-22px] right-2'>
          <Image 
          src={Notif} 
          alt='Notif' 
          width={30} 
          className='mr-[35px] cursor-pointer hover:opacity-80' />
          <Link href="/profile">
            <Image
              src={Profile}
              alt="Profile"
              width={35}
              className="cursor-pointer hover:opacity-80 transition-opacity mr-[69px]"
            />
          </Link>
        </div>        
        </div>
        <Image
          src={TelkomBulat}
          alt="Telkom Bulat"
          style={{ marginTop: "47px", marginLeft: "758px" }}
        />

        <Image src={Bulat} alt="Bulat" style={{ marginTop: "-550px" }} />

        <Image
          src={Text}
          alt="Text"
          width={600}
          style={{ marginTop: "-275px", marginLeft: "100px" }}
        />

        <Link href="/daftarstaf" style={{ position: "absolute" }}>
          <button
            className="
              appearance-none rounded-[16px]
              cursor-pointer font-sans font-semibold
              px-9 py-3 text-center outline-none 
              transition duration-300 ease-[cubic-bezier(.23,1,.32,1)] 
              disabled:pointer-events-none 
              hover:shadow-white hover:-translate-y-1 bg-[#D9D9D9]
              active:shadow-none active:translate-y-0 flex items-center text-xl
              "
            style={{ marginLeft: "90px", marginTop: "63px" }}
          >
            Daftar Tamu
            <Image
              src={IconCard}
              alt="Logo Dokumen"
              className="ml-5 mr-[-15px]"
            />
          </button>
        </Link>
      </body>
    </>
  );
}

export default page;
