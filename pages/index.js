import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const toggleMenu = (e, menu) => {
    e.stopPropagation();
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // 🎨 카드 스타일
  const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.12)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
  };

  // 🎯 메뉴 hover 스타일
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

  // hover 효과 함수
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