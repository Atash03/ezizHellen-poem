import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { cn, getCover } from './lib/utils';
import { usePathStore } from './store/usePathname';
import { Toaster } from './components/ui/toaster';

function App() {
  const { pathname } = useLocation();
  const path = usePathStore((state) => state.path);

  return (
    <div
      id="main"
      className={cn('flex flex-col relative w-full min-h-screen bg-[#EFDEBE] overflow-x-hidden')}>
      <div className="fixed  left-0 right-0 bottom-0 pointer-events-none top-0 w-[2000px] h-full mix-blend-multiply">
        <img
          src="/images/texture047.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      {pathname === '/' ? (
        <div className="fixed top-0 left-0 right-0 pointer-events-none mix-blend-soft-light bottom-0 opacity-25">
          <img src="/images/home-bg.png" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className={cn(
            'max-h-[396px] bottom-0 absolute top-0 left-0 right-0 opacity-35 mix-blend-soft-light',
            getCover(pathname)?.opacity,
            getCover(pathname)?.mode,
          )}>
          <img
            src={
              path === 'moment'
                ? '/images/faq/cover.png'
                : path === 'poem'
                ? '/images/poems/poem-cover.png'
                : getCover(pathname)?.img
            }
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <Header />

      <main id="main" className="flex-auto">
        <Outlet />
      </main>

      <div className="container relative md:block hidden">
        <Toaster />
      </div>

      <Footer />
    </div>
  );
}

export default App;
