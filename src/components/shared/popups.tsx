import { AnimatePresence } from "framer-motion";
import { useContactsStore } from "@/store/useContacts";
import { useLoginStore } from "@/store/useLogin";
import { useAuthStore } from "@/store/useAuthStore";
import Login from "./login";
import LoginWindowMob from "./login-window-mob";
import MedBurger from "./med-burger";
import PopupMessage from "./popup-message";
import { Burger } from "./burger";
import { useGetStatic } from "@/query/use-get-static-words";

interface Burger {
  burger: boolean;
  medBurger: boolean;
  setBurger: (val: boolean) => void;
  setMedBurger: (val: boolean) => void;
}

const Popups = ({ burger, setBurger, medBurger, setMedBurger }: Burger) => {
  const contactsSucces = useContactsStore((state) => state.success);
  const contactsSetSucces = useContactsStore((state) => state.setSuccess);

  const registerSuccess = useAuthStore((state) => state.registerSuccess);
  const setRegisterSuccess = useAuthStore((state) => state.setRegisterSuccess);

  const loginSuccess = useLoginStore((state) => state.loginSuccess);
  const setLoginSuccess = useLoginStore((state) => state.setLoginSuccess);

  const loginActive = useLoginStore((state) => state.active);
  const mobActive = useLoginStore((state) => state.mobActive);

  const token = useAuthStore((state) => state.accessToken);

  const { data } = useGetStatic(15, "authData");
  const { data: contactsData } = useGetStatic(14, "contactsData");

  return (
    <>
      {contactsSucces && (
        <PopupMessage
          active={contactsSucces}
          title={contactsData?.slice(-3)[0]?.word || ""}
          text={contactsData?.slice(-2)[0]?.word || ""}
          setActive={contactsSetSucces}
        />
      )}

      {registerSuccess && (
        <PopupMessage
          active={registerSuccess}
          title={data?.slice(-6)[0].word || ""}
          text={data?.slice(-5)[0].word || ""}
          setActive={setRegisterSuccess}
        />
      )}

      {loginSuccess && (
        <PopupMessage
          active={loginSuccess}
          title={data?.slice(-3)?.[0]?.word || ""}
          text={data?.slice(-2)?.[0]?.word || ""}
          setActive={setLoginSuccess}
        />
      )}

      <AnimatePresence>{!token && loginActive && <Login />}</AnimatePresence>

      <AnimatePresence>{mobActive && <LoginWindowMob />}</AnimatePresence>

      <AnimatePresence>
        {burger && <Burger setBurger={setBurger} />}
      </AnimatePresence>

      {medBurger && <MedBurger setBurger={setMedBurger} burger={medBurger} />}
    </>
  );
};

export default Popups;
