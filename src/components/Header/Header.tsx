import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { removeUser } from "../../auth/TokenManager";
import { Avatar, IconButton } from "@mui/material";
import "../Header/Header.css";
import { Dropdown } from "react-bootstrap";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Brightness3 } from "@mui/icons-material";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
}
function Header({ toggleTheme, currentTheme }: HeaderProps): JSX.Element {
  const { userData } = useContext(UserContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <i className="bi bi-card-list me-2"></i>
            BCard
          </NavLink>

          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              isNavCollapsed ? "" : "show"
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  ABOUT
                </NavLink>
              </li>
              {userData?.user && (
                <li className="nav-item">
                  <NavLink to="/favcards" className="nav-link">
                    FAV CARDS
                  </NavLink>
                </li>
              )}
              {userData?.user?.isAdmin && (
                <li className="nav-item">
                  <NavLink to="/mycards" className="nav-link">
                    MY CARDS
                  </NavLink>
                </li>
              )}
              {userData?.user?.isAdmin && (
                <li className="nav-item">
                  <NavLink
                    to="/adminarea"
                    className="nav-link"
                    style={{ fontWeight: "bold" }}
                  >
                    ADMIN AREA <AutoFixNormalIcon />
                  </NavLink>
                </li>
              )}
            </ul>

            <ul id="actions" className="navbar-nav">
              {!userData?.user && (
                <>
                  <li className="nav-item me-3 mt-1">
                    <NavLink to="/signup" className="nav-link">
                      REGISTER
                    </NavLink>
                  </li>

                  <li className="nav-item me-3 mt-1">
                    <NavLink to="/login" className="nav-link">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="m-2">
            <IconButton onClick={toggleTheme}>
              {currentTheme === "light" ? (
                <WbSunnyIcon className="light-icon" />
              ) : (
                <Brightness3 />
              )}
            </IconButton>
          </div>

          {userData?.user && (
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                {userData?.user && (
                  <Avatar
                    src="/broken-image.jpg"
                    alt={`${userData.user.firstName}`}
                    sx={{ bgcolor: "rgb(188, 143, 143)" }}
                  />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href={`/userinfo/${userData?.user._id}`}
                >{`my user`}</Dropdown.Item>
                <Dropdown.Item
                  href={`/edituser/${userData?.user._id}`}
                >{`Edit user (${userData.user.firstName})`}</Dropdown.Item>
                <Dropdown.Item onClick={removeUser} href="/login">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
