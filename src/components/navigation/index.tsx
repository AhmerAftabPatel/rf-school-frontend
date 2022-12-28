import { tw } from 'twind';
import { useContext, useState } from 'react';
import Button from '@/components/button';
import LogoDetails from '../logoDetails';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
import Link from 'next/link';
import { LinksContext } from '@/context/links/auth/LinkContext';
import { sub_menu } from '../../../strings/aboutstring';
import styled from 'styled-components';
interface IMenuButton {
  toggleMenu: React.MouseEventHandler<HTMLButtonElement>;
  showMenu: boolean;
}

const submenu_gallery = [
  {
    page: 'Photo Gallery',
    href: 'gallery?type=Photo',
  },
  {
    page: 'Video Gallery',
    href: 'video-gallery',
  },
];

type Link = {
  page: string;
  href: string;
};

const links = [
  {
    page: `Home`,
    href: `/`,
  },
  {
    page: `About Us`,
    href: `/about`,
    submenu: sub_menu,
  },
  {
    page: `Facilities`,
    href: `/facilities`,
  },
  {
    page: `Faculty`,
    href: `/faculty`,
  },
  // {
  //   page: `Academics`,
  //   href: `/academics`,
  // },
  {
    page: `Academics`,
    href: `/academics-overview`,
  },
  {
    page: `Careers`,
    href: `/careers`,
  },
  {
    page: `Gallery`,
    href: `/gallery`,
    submenu: submenu_gallery,
  },
  {
    page: `Contact Us`,
    href: `/contact`,
  },
];

const secondaryLinks = [
  {
    page: `Contact sales`,
    href: `/`,
  },
  {
    page: `Log in`,
    href: `/`,
  },
  {
    page: `Get Started`,
    href: `/`,
  },
];

const MenuButton = ({ toggleMenu, showMenu }: IMenuButton) => (
  <button
    type="button"
    aria-controls="mobile-menu"
    aria-expanded={showMenu}
    onClick={toggleMenu}
    className={tw(`p-2 text-gray-400 float-right`)}
    // style = {{float : 'right',position : "absolute",right : 0}}
  >
    <span className={tw(`sr-only`)}>Open menu</span>
    {showMenu ? (
      <svg
        className={tw(`h-6 w-6 float-right`)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg
        className={tw(`h-6 w-6`)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
);

const Navigation = () => {
  const { state } = useContext(LinksContext);
  // const {data :links} = state;
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const MobileMenu = () => (
    <div className={tw(`md:hidden`)}>
      <div className={tw(`px-2 pt-2 pb-3 space-y-1 sm:px-3`)}>
        {/* {links.map((link: Link) => (
          <a href={link.href} className={tw(`text-gray-500 block px-3 py-2 text-base font-medium`)} key={link.page}>
            {link.page}
          </a>
        ))} */}
        {links.map((link: any, index) => {
          if (link?.submenu && link?.submenu.length > 0) {
            return (
              <div className={tw(`text-white block px-3 py-2 text-base font-medium`)}>
                <Dropdown key={index} openOnFocus text={link.page} item className="link item">
                  <Dropdown.Menu>
                    {link?.submenu?.map((sub, index) => {
                      return (
                        // <Link href={sub.href} key={index}>
                        //   <Dropdown.Item>{sub.page}</Dropdown.Item>
                        // </Link>
                        <Link href={sub.href} key={sub.page} passHref>
                          <Menu.Item as={'a'} link className={tw(`text-white block px-3 py-2 text-base font-medium`)}>
                            {sub.page}
                          </Menu.Item>
                        </Link>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            );
          } else {
            return (
              <Link href={link.href} key={link.page} passHref>
                <Menu.Item as={'a'} link className={tw(`text-white block px-3 py-2 text-base font-medium`)}>
                  {link.page}
                </Menu.Item>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );

  // net-background.png
  return (
    <div>
      <StyledNav1>
        <div className={tw('flex items-center jusify-center')}>
          {/* <LogoDetails color="blue" logo='/logo.png'/> */}
          <LogoDetails color="blue" logo="/logo.png" />
        </div>
        <div className={tw('flex justify-self-end hidden lg:flex')}>
          <div className={tw('flex flex-col sm:flex-col lg:flex-row md:flex-col gap-10')}>
            <div className={tw('flex items-center')}>
              <div className={tw('flex')}>
                <Icon name="call" color="orange" size="large" />
              </div>
              &nbsp;&nbsp;
              <div>
                <h3 className={tw('font-bold m-0 text-blue-900')} style={{ letterSpacing: '2px' }}>
                  Call
                </h3>
                <p>9866459091</p>
              </div>
            </div>
            <div className={tw('flex flex-row items-center')}>
              <div className={tw('flex ')}>
                <Icon name="mail outline" color="orange" size="large" />
              </div>
              &nbsp;&nbsp;
              <div>
                <h3 className={tw('font-bold m-0 text-blue-900')} style={{ letterSpacing: '2px' }}>
                  Email
                </h3>
                <p>rfschool@yahoo.com</p>
              </div>
            </div>
            <div className={tw('flex flex-row items-center bg-orange')}>
              <button
                style={{
                  background: '#ea580c',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  padding: '15px 22px',
                  borderRadius: '5px',
                  border: 'none',
                }}
              >
                DONATE HERE
              </button>
            </div>
          </div>
        </div>
      </StyledNav1>
      <nav className={tw(`bg-blue-900 text-white hidden md:block`)}>
        <Menu style={{ background: 'transparent' }} size="large" inverted widths={'8'} stackable>
          {links.map((link: any) => {
            if (link?.submenu && link?.submenu.length > 0) {
              return (
                <Dropdown openOnFocus text={link.page} item className="link item">
                  <Dropdown.Menu>
                    {link?.submenu?.map((sub, index) => {
                      return (
                        // <Link href={sub.href} key={index}>
                        // <Dropdown.Item href={sub.href} key={index} link>
                        <Link
                          style={{
                            display: 'flex',
                            color: 'black',
                            width: '100%',
                            height: 40,
                            padding: '12px',
                            textAlign: 'center',
                            justifyContent: 'left',
                            alignItems: 'center',
                          }}
                          href={sub.href}
                          passHref
                        >
                          {sub.page}
                        </Link>
                        // </Dropdown.Item>
                        // </Link>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              );
            } else {
              return (
                // <Menu.Item as={'a'} key={link.page}>
                <Link
                  style={{
                    display: 'flex',
                    color: 'white',
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  href={link.href}
                  passHref
                >
                  {link.page}
                </Link>
                // </Menu.Item>
              );
            }
          })}
        </Menu>
      </nav>
      <nav className={tw(`bg-blue-800 text-white md:hidden`)}>
        <div className={tw(`mx-auto px-4 sm:px-6 lg:px-8`)}>
          <div className={tw(`flex items-center justify-center h-18`)}>
            <div className={tw(`flex items-center justify-between`)}>
              <div className={tw(`hidden md:block`)}>
                <div className={tw(`ml-10 flex items-baseline space-x-4 rounded-none p-3`)}>
                  {links.map((link: any) => {
                    if (link?.submenu && link?.submenu.length > 0) {
                      return (
                        <Dropdown openOnFocus text={link.page} item className="link item">
                          <Dropdown.Menu>
                            {link?.submenu?.map((sub, index) => {
                              return (
                                <Link href={sub.href} key={index}>
                                  <Dropdown.Item>{sub.page}</Dropdown.Item>
                                </Link>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      );
                    } else {
                      return (
                        // <Link href={link.href} key={link.page} passHref>
                        <Menu.Item as={'a'} href={link.href} link key={link.page}>
                          {/* <a href={link.href} > */}
                          {link.page}
                          {/* </a> */}
                        </Menu.Item>
                        // {/* </Link> */}
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <div className={tw(`-mr-4 flex justify-right md:hidden`)}>
            <MenuButton showMenu={showMenu} toggleMenu={toggleMenu} />
          </div> */}
        </div>
        {/* {showMenu ? <MobileMenu /> : null} */}
      </nav>
    </div>
  );
};

const StyledNav1 = styled.div`
   {
    background: url('/images/net-background.png');
    padding: 4px;
    display: flex;
    padding: 12px 50px;
    justify-content: space-between;
    flex-wrap: wrap;
    @media only screen and (max-width: 600px) {
      padding: 12px;
    }
  }
`;

export default Navigation;
