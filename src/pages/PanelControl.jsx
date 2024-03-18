import React from "react";
import Sidebar from "../components/panelControl/Sidebar.jsx";
import SidebarItem from "../components/panelControl/SidebarItem.jsx";
import { ScrollText, BookText, Heart, Settings } from "lucide-react";
import { Outlet } from "react-router-dom";

const PanelControl = () => {
  return (
    <div className="flex">
      <div className="">
        <Sidebar>
          <SidebarItem icon={<BookText />} text="Ofertas Creadas" path="/" />
          <SidebarItem icon={<Heart />} text="Ofertas Gustadas" path="/" />
          <SidebarItem
            icon={<ScrollText />}
            text="Ofertas Aplicadas"
            path="/"
          />
          <SidebarItem icon={<Settings />} text="Ajustes" path="ajustes" />
        </Sidebar>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default PanelControl;
