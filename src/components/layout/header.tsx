import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLoginStore } from "@/store/useLogin";
import { useState } from "react";
import User from "../shared/user";
import { useAuthStore } from "@/store/useAuthStore";
import Popups from "../shared/popups";
import { usePopupStore } from "@/store/usePopup";
import { BgTexture, EnterBtn } from "../shared";
import { Facebook, Linkedin, Youtube } from "lucide-react";

export const navData = [
  {
    link: "/about",
    view: "Özüm hakda kelam agyz",
  },
  {
    link: "/poems",
    view: "Täze goşgular",
  },
  {
    link: "/comments",
    view: "Synlar, ýatlamar, gutlaglar",
  },
  {
    link: "/moments",
    view: "Pursatlar",
  },
  {
    link: "/books",
    view: "Kitaplar",
  },
  {
    link: "/messages",
    view: "Teswirler",
  },
  {
    link: "/instruction",
    view: "Muşdaklar",
  },
  {
    link: "/contacts",
    view: "Kontaktlar",
  },
];

export const socials = [
  {
    link: "https://x.com/EHellenov99204?t=2ftaihWiQqDlZMSyVS3XgQ&s=35",
    icon: (
      <svg
        className="size-4"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.108 3.54798C3.27833 3.21184 3.62317 3 4 3H8.267C8.58555 3 8.88504 3.15177 9.07342 3.40865L13.348 9.23779L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L14.5446 10.8696L20.8064 19.4086C21.0293 19.7125 21.0623 20.1159 20.892 20.452C20.7217 20.7882 20.3768 21 20 21H15.733C15.4145 21 15.115 20.8482 14.9266 20.5914L10.652 14.7622L4.70711 20.7071C4.31659 21.0976 3.68342 21.0976 3.2929 20.7071C2.90237 20.3166 2.90237 19.6834 3.2929 19.2929L9.45539 13.1304L3.19359 4.59135C2.97075 4.28747 2.93766 3.88412 3.108 3.54798ZM12.3703 11.2866C12.4012 11.338 12.4371 11.3872 12.4781 11.4336L18.0266 19H16.2398L5.97338 5H7.76026L12.3703 11.2866Z"
          fill="#6D5E46"
        />
      </svg>
    ),
    name: "ezizgeldihellenov",
  },
  {
    link: "https://kz.linkedin.com/in/ezizgeldi-hellenov-970a2826",
    icon: <Linkedin className="size-4" />,
    name: "ezizgeldihellenov",
  },
  {
    link: "https://www.youtube.com/@EzizHellen2022",
    icon: <Youtube className="size-4" />,
    name: "ezizgeldihellenov",
  },
  {
    link: "https://www.facebook.com/ezizgeldi.hellenov/",
    icon: <Facebook className="size-4" />,
    name: "ezizgeldihellenov",
  },
];

export const texture = "/images/texture047.png";

const Header = () => {
  const [burger, setBurger] = useState(false);
  const [medBurger, setMedBurger] = useState(false);

  const setLoginActive = useLoginStore((state) => state.setActive);

  const setMode = usePopupStore((state) => state.setMode);

  const token = useAuthStore((state) => state.accessToken);

  return (
    <>
      <Popups
        burger={burger}
        setBurger={setBurger}
        medBurger={medBurger}
        setMedBurger={setMedBurger}
      />

      <header className="pt-4 xl:pt-6 flex flex-col gap-4">
        <div className="xl:hidden relative z-50 p-4 md:px-6 container h-20 w-[328px] md:w-[768px] shadow-bottom">
          <BgTexture className="bg-[url('/images/header-mob-shape.svg')] md:bg-[url('/images/header-med-shape.svg')] header-mob-path md:header-med-path" />

          <div className="flex leading-[120%] justify-between items-center">
            <Link className="kaushan" to="/">
              Ezizgeldi Helleňow
            </Link>

            <div className="flex items-center justify-between gap-4">
              {token ? (
                <User setBurger={setBurger} className="hidden md:flex" />
              ) : (
                <EnterBtn
                  className="!hidden md:!flex"
                  setActive={setLoginActive}
                  setMode={setMode}
                />
              )}

              <button
                className="p-2 border-OUTLINE border rounded-[4px]"
                onClick={() => {
                  setBurger(true);
                  setMedBurger(true);
                }}
              >
                <img src="/images/burger.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="xl:flex hidden relative z-50 items-end container justify-between">
          <div className="flex items-end">
            <Link to="/" className="kaushan text-[36px] mr-6">
              Ezizgeldi Helleňow
            </Link>
            <div className="flex gap-2 text-ON_SURFACE_VAR font-medium leading-[115%] text-[14px]">
              {socials.map((item, i) => (
                <Link
                  target="_blank"
                  to={item.link}
                  key={i}
                  className="flex items-center gap-1 transition-all hover:text-PRIM"
                >
                  <div className="size-4 object-cover">{item.icon}</div>
                  <div className="">{item.name}</div>
                </Link>
              ))}
            </div>
          </div>

          {token ? (
            <User />
          ) : (
            <EnterBtn
              className="!hidden md:!flex"
              setActive={setLoginActive}
              setMode={setMode}
            />
          )}
        </div>

        <div className="container hidden xl:block">
          <nav className="relative shadow-bottom h-14 z-30">
            <BgTexture className='bg-[url("/images/header-shape.svg")] header-path' />
            <div className="absolute inset-0 flex items-center justify-center py-4 -tracking-[1%] z-10 kaushan text-[18px] gap-4">
              {navData.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Link
                    to={item.link}
                    className={cn(
                      "flex items-center  transition-all group hover:text-PRIM"
                    )}
                  >
                    {item.view}
                  </Link>
                  {navData.length !== i + 1 && (
                    <img src="/images/romb.svg" className="size-2" />
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
