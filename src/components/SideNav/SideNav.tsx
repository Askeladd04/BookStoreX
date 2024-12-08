import { motion } from "framer-motion";
import "./SideNav.css";
import union from "../../assets/Union.svg";
import GetSVGSelector from "../../common/GetSVGSelector";
import { FC, memo, useEffect, useState } from "react";
import Basket from "../Basket/Basket";
import { NavLink, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
type Props = {
  setOverlay: any;
};

type Mode = "basket" | "menu" | null;

const SideNav: FC<Props> = memo(({ setOverlay }) => {
  const [sideMode, setSideMode] = useState<Mode>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOverlay(sideMode === "basket" ? true : false);
  }, [sideMode]);

  const handleClick = (type: Mode) => {
    if (sideMode === type) {
      setSideMode(null);
    } else setSideMode(type);
  };

  useEffect(() => {
    setSideMode(null);
  }, [pathname]);

  return (
    <>
      <motion.div
        className="nav_wrapper"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="nav_content">
          <a href="#">
            <img
              src={union}
              alt="Logo"
              style={{ width: "50px", cursor: "pointer" }}
            />
          </a>
          <nav>
            <button>
              <NavLink to={"/search"}>
                <GetSVGSelector id="search" />
              </NavLink>
            </button>
            <button>
              <NavLink to={"/home"}>
                <GetSVGSelector id="home" />
              </NavLink>
            </button>
            <button
              onClick={() => {
                handleClick("basket");
              }}
            >
              <GetSVGSelector id="basket" />
            </button>
            <button onClick={() => handleClick("menu")}>
              <MenuOutlined />
            </button>
          </nav>
        </div>
      </motion.div>
      {sideMode === "basket" && <Basket />}
      {sideMode === "menu" && <MenuBooks />}
    </>
  );
});

const MenuBooks: FC = memo(() => {
  return (
    <div className="menu_wrapper">
      <motion.div
        className="menu_content"
        initial={{ opacity: 0, x: 0, y: "60%" }}
        animate={{ opacity: 1, x: 131 }}
      >
        <NavLink className={"nav_link"} to={"/category/romance"}>
          <button>Romance</button>
        </NavLink>
        <NavLink className={"nav_link"} to={"/category/biography"}>
          <button>Bioraphy</button>
        </NavLink>
        <NavLink className={"nav_link"} to={"/category/fantasy"}>
          <button>Fantasy</button>
        </NavLink>
      </motion.div>
    </div>
  );
});

export default SideNav;
