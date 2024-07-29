import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  const userRole = getUserRole();

  // Filter the menu items based on user role
  let hideItems = false;
  const filteredMenuItems = Menuitems.filter((item) => {
    if (item.subheader === "Utilities") {
      hideItems = true;
    }
    if (hideItems && userRole !== "admin") {
      if (item.subheader === "Auth") {
        hideItems = false;
      }
      return false;
    }
    return true;
  });

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {filteredMenuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
