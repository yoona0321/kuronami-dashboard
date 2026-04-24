import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const toggleMenu = (e, menu) => {
    e.stopPropagation();
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuTextStyle = {
    cursor: "pointer",
    fontSize: "15px",
    position: "relative",
    paddingBottom: "4px",
    transition: "color 0.2s ease"
  };

  const underlineStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    width: "0%",
    background: "#6366f1",
    transition: "width 0.3s ease"
  };

  const dropdownStyle = {
    position: "absolute",
    top: "45px",
    left: 0,
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "8px",
    minWidth: "170px",
    display: "flex",
    flexDirection: "column"
  };

  const itemStyle = {
    padding: "10px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "8px"
  };

  const arrowStyle = {
    fontSize: "14px",
    marginLeft: "6px",
    opacity: 0.6
  };

  const handleMenuHover = (e) => {
    e.currentTarget.style.color = "#6366f1";
    e.currentTarget.querySelector(".underline").style.width = "100%";
  };

  const handleMenuLeave = (e) => {
    e.currentTarget.style.color = "#333";
    e.currentTarget.querySelector(".underline").style.width = "0%";
  };

  return (
    
  );
}