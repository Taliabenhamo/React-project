import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import "../footer/Footer.css";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
function Footer() {
  const [value, setValue] = React.useState(0);
  const { userData } = useContext(UserContext);

  return (<>

    <Box className="footer-container ">

      <BottomNavigation className="wraper-icons"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >

        <BottomNavigationAction
          label="About"
          icon={<HelpOutlineIcon />}
          id="icon"
          component={Link}
          to='/about'
        />
        {userData?.user && (

          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            id="icon"
            component={Link}
            to='/favcards'

          />
        )}

        {userData?.user?.isAdmin && (

          <BottomNavigationAction
            label="My Cards"
            icon={<FolderCopyIcon />}
            id="icon"
            component={Link}
            to='/mycards'
          />

        )}
        
      </BottomNavigation>

    </Box>

  </>
  );
}


export default Footer;
