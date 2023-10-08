import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Tab({ title, url, icon }) {
    return (
     
  
  
      <NavLink
        to={url}
        className={
         
         (({ isActive }) =>
            isActive ? 
            "text-teal-700 bg-teal-100/50  border-l-[5px] border-teal-700 hover:bg-teal-100/50  duration-200 hover:cursor-pointer p-4 " : 
            "bg-white border-l-[5px] border-transparent text-zinc-600/70 hover:bg-gray-100  duration-200 hover:cursor-pointer  p-4 "
        )
        }
      
      >
        
          <div className="flex items-center gap-2">
            {icon}
            <p className="text-md font-semibold">{title}</p>
          </div>
        
      </NavLink>
    );
  }
  
  Tab.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
  };