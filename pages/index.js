import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);
  const router = useRouter(); // 🔥 현재 페이지 감지

  const current = router.pathname;

  // 카드 스타일
  const cardStyle = {
    background: "linear-gradient(135deg, #ffffff, #f9fafb)",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.12)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.06)";
  };

  // 드롭다운
  const dropdownStyle = {
    position: "absolute",
    top: "42px",
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
    fontSize: "15px",
    marginLeft: "6px",
    opacity: 0.7,
    position: "relative",
    top: "1px"
  };

  const menuTextStyle = {
    cursor: "pointer",
    fontSize: "15px",
    position: "relative",
    paddingBottom: "4px",
    transition: "color 0.2s ease"
  };

  // 🔥 현재 페이지인지 확인
  const isActive = (path) => current === path;

  // hover
  const menuHover = (e) => {
    e.currentTarget.style.color = "#6366f1";
    e.currentTarget.querySelector(".underline").style.width = "100%";
  };

  const menuLeave = (e, active) => {
    if (!active) {
      e.currentTarget.style.color = "#333";
      e.currentTarget.querySelector(".underline").style.width = "0%";
    }
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>

      {/* 메뉴바 */}
      <div style={{
        position: "sticky",
        top: 0,
        display: "flex",
        gap: "22px",
        padding: "14px 24px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)"
      }}>

        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          쿠로나미 🎮
        </div>

        {/* 👥 소환사 관리 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpenMenu(openMenu === "member" ? null : "member")}
            onMouseEnter={menuHover}
            onMouseLeave={(e) => menuLeave(e, isActive("/lol") || isActive("/valo"))}
            style={{
              ...menuTextStyle,
              color: (isActive("/lol") || isActive("/valo")) ? "#6366f1" : "#333"
            }}
          >
            👥 소환사 관리 <span style={arrowStyle}>▾</span>

            <div className="underline" style={{
              ...underlineStyle,
              width: (isActive("/lol") || isActive("/valo")) ? "100%" : "0%"
            }} />
          </div>

          {openMenu === "member" && (
            <div style={dropdownStyle}>
              <Link href="/lol" style={itemStyle}>🎮 리그오브레전드</Link>
              <Link href="/valo" style={itemStyle}>🔫 발로란트</Link>
            </div>
          )}
        </div>

        {/* 📢 모집 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpenMenu(openMenu === "apply" ? null : "apply")}
            onMouseEnter={menuHover}
            onMouseLeave={(e) => menuLeave(e, isActive("/apply"))}
            style={{
              ...menuTextStyle,
              color: isActive("/apply") ? "#6366f1" : "#333"
            }}
          >
            📢 모집/참여 <span style={arrowStyle}>▾</span>

            <div className="underline" style={{
              ...underlineStyle,
              width: isActive("/apply") ? "100%" : "0%"
            }} />
          </div>

          {openMenu === "apply" && (
            <div style={dropdownStyle}>
              <Link href="/apply" style={itemStyle}>📌 내전 모집/참여</Link>
            </div>
          )}
        </div>

        {/* 🎯 랭킹 */}
        <Link
          href="/ranking"
          style={{
            ...menuTextStyle,
            textDecoration: "none",
            color: isActive("/ranking") ? "#6366f1" : "#333"
          }}
          onMouseEnter={menuHover}
          onMouseLeave={(e) => menuLeave(e, isActive("/ranking"))}
        >
          🎯 랭킹
          <div className="underline" style={{
            ...underlineStyle,
            width: isActive("/ranking") ? "100%" : "0%"
          }} />
        </Link>

        {/* 💰 장부 */}
        <Link
          href="/finance"
          style={{
            ...menuTextStyle,
            textDecoration: "none",
            color: isActive("/finance") ? "#6366f1" : "#333"
          }}
          onMouseEnter={menuHover}
          onMouseLeave={(e) => menuLeave(e, isActive("/finance"))}
        >
          💰 장부
          <div className="underline" style={{
            ...underlineStyle,
            width: isActive("/finance") ? "100%" : "0%"
          }} />
        </Link>

      </div>

      <div style={{ padding: "30px" }}>
        <h1>쿠로나미 대시보드</h1>
      </div>

    </div>
  );
}

// 밑줄
const underlineStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  height: "2px",
  width: "0%",
  background: "#6366f1",
  transition: "width 0.3s ease"
};