import { Outlet } from "react-router-dom";

import './Navigation.styles.scss';

const Navigation = () => {
  return (
    <div className='navigation'>
      {/* <DomainRecord /> */}
      <Outlet />
      {/* <Navbar /> */}
    </div>
  )
  
}

export default Navigation;