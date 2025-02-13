import { useGetStatic } from '@/query/use-get-static-words';
import { BgTexture } from '../shared';

const Footer = () => {
  const { data } = useGetStatic(1, 'footerData');

  return (
    <footer className="relative shadow-top h-[164px] md:h-[123px] py-4 md:py-6">
      <BgTexture png className='bg-[url("/images/footer-shape.png")] h-full' />
      <div className="container top-0 left-0 bottom-0 relative flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:gap-0 gap-4 text-center md:text-left items-center justify-between">
          <div className="kaushan md:text-left text-center">Ezizgeldi Helleňow</div>
          <div className="text-14 !leading-[140%]">{data?.[0]?.word}</div>
        </div>

        <hr className="text-OUTLINE_VAR" />

        <span className="text-14 !leading-[140%] text-center text-ON_SURFACE_VAR">
          {data?.[1]?.word}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
