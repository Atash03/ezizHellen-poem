import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex w-screen flex-col items-center h-screen justify-center gap-6 relative">
      <div className="fixed top-0 left-0 right-0 pointer-events-none mix-blend-soft-light bottom-0 opacity-25">
        <img src="/images/home-bg.png" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-[32px] md:text-[42px] font-[700]">404 - Sahypa tapylmady</h1>
      <p className="">Gözleýän sahypaňyz ýok!</p>
      <Link to="/" className="px-4 py-[5px] rounded-[10px] bg-OUTLINE text-white text-[16px]">Baş sahypa dolan</Link>
    </div>
  );
};

export default NotFoundPage;
