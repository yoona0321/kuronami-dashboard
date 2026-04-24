import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [mainLines, setMainLines] = useState([]);
  const [subLines, setSubLines] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("high");

  const lineList = ["ALL", "TOP", "JUNGLE", "MID", "ADC", "SUP"];

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "lolUsers"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    };
    fetchData();
  }, []);

  const tierOrder = [
    "IRON","BRONZE","SILVER","GOLD","PLATINUM",
    "EMERALD","DIAMOND","MASTER","GRANDMASTER","CHALLENGER"
  ];

  const getTierScore = (tier) => {
    if (!tier) return 0;
    const parts = tier.toUpperCase().split(" ");
    const base = parts[0];
    const value = parseInt(parts[1]) || 0;
    return tierOrder.indexOf(base) * 1000 + value;
  };

  const getTierColor = (tier) => {
    const base = tier?.toUpperCase().split(" ")[0];
    const colors = {
      CHALLENGER: "#ef4444",
      GRANDMASTER: "#f97316",
      MASTER: "#9333ea",
      DIAMOND: "#3b82f6",
      EMERALD: "#10b981",
      PLATINUM: "#14b8a6",
      GOLD: "#eab308",
      SILVER: "#9ca3af",
      BRONZE: "#92400e",
      IRON: "#6b7280",
    };
    return colors[base] || "#6b7280";
  };

  const formatTier = (tier) => {
    if (!tier) return "UNRANKED";
    const [base, value] = tier.toUpperCase().split(" ");
    if (["MASTER","GRANDMASTER","CHALLENGER"].includes(base) && value) {
      return `${base} ${value}LP`;
    }
    return value ? `${base} ${value}` : base;
  };

  const toggleMain = (line) => {
    setMainLines((prev) =>
      prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
    );
    setSubLines((prev) => prev.filter((l) => l !== line));
  };

  const toggleSub = (line) => {
    setSubLines((prev) =>
      prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
    );
    setMainLines((prev) => prev.filter((l) => l !== line));
  };

  const addUser = async () => {
    if (!name || !tier || mainLines.length === 0) {
      alert("닉네임 / 티어 / 주라인 입력");
      return;
    }

    const newUser = {
      name,
      tier: tier.toUpperCase(),
      mainLines,
      subLines,
    };

    const docRef = await addDoc(collection(db, "lolUsers"), newUser);
    setUsers((prev) => [...prev, { id: docRef.id, ...newUser }]);

    setToast("✅ 추가 완료!");
    setTimeout(() => setToast(""), 2000);

    setName("");
    setTier("");
    setMainLines([]);
    setSubLines([]);
  };

  const removeUser = async (id) => {
    await deleteDoc(doc(db, "lolUsers", id));
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filteredUsers = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.tier.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "high"
        ? getTierScore(b.tier) - getTierScore(a.tier)
        : getTierScore(a.tier) - getTierScore(b.tier)
    );

  return (
    <div style={container}>
      <h1>👥 리그오브레전드 인원 리스트</h1>

      <div style={box}>
        <input placeholder="닉네임" value={name} onChange={(e)=>setName(e.target.value)} style={input}/>
        <input placeholder="티어" value={tier} onChange={(e)=>setTier(e.target.value)} style={input}/>
        <input placeholder="검색" value={search} onChange={(e)=>setSearch(e.target.value)} style={input}/>
        
        <select value={sort} onChange={(e)=>setSort(e.target.value)} style={input}>
          <option value="high">티어 높은순</option>
          <option value="low">티어 낮은순</option>
        </select>

        <div style={{display:"flex",gap:10,marginTop:10}}>
          <div style={{position:"relative"}}>
            <div style={dropdownBtn} onClick={()=>setOpen(!open)}>라인 선택 ▼</div>
            {open && (
              <div style={dropdown}>
                <b>주라인</b>
                {lineList.map(l=>(
                  <label key={l}><input type="checkbox" onChange={()=>toggleMain(l)}/> {l}</label>
                ))}
                <hr/>
                <b>부라인</b>
                {lineList.map(l=>(
                  <label key={l}><input type="checkbox" onChange={()=>toggleSub(l)}/> {l}</label>
                ))}
              </div>
            )}
          </div>

          <button onClick={addUser} style={btn}>추가</button>
        </div>
      </div>

      <div style={grid}>
        {filteredUsers.map(user=>(
          <div key={user.id} style={card}>
            <h3>{user.name}</h3>
            <span style={{...tierTag, background:getTierColor(user.tier)}}>{formatTier(user.tier)}</span>

            <div style={lineBox}>
              <div>주라인: {user.mainLines.join(", ")}</div>
              <div>부라인: {user.subLines.join(", ")}</div>
            </div>

            <button onClick={()=>removeUser(user.id)} style={delBtn}>삭제</button>
          </div>
        ))}
      </div>

      {toast && <div style={toastStyle}>{toast}</div>}
    </div>
  );
}

/* 스타일 */
const container = { padding:30, background:"#f3f4f6" };
const box = { background:"white", padding:20, borderRadius:14, marginBottom:20 };
const input = { marginRight:10, padding:8, border:"1px solid #ddd", borderRadius:6 };
const dropdownBtn = { padding:8, border:"1px solid #ddd", borderRadius:6, cursor:"pointer" };
const dropdown = { position:"absolute", top:40, background:"white", padding:10, border:"1px solid #ddd", zIndex:999 };
const btn = { padding:"10px 16px", background:"#6366f1", color:"white", border:"none", borderRadius:10, cursor:"pointer" };

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",
  gap:16
};

const card = {
  background:"white",
  padding:16,
  borderRadius:14,
  boxShadow:"0 8px 20px rgba(0,0,0,0.08)",
  transition:"all 0.2s"
};

const tierTag = {
  color:"white",
  padding:"4px 10px",
  borderRadius:"999px",
  fontSize:12
};

const lineBox = { background:"#eef2f7", padding:10, borderRadius:10 };
const delBtn = { marginTop:10, background:"#ef4444", color:"white", padding:10, border:"none", borderRadius:10 };
const toastStyle = {
  position:"fixed", bottom:30, left:"50%",
  transform:"translateX(-50%)",
  background:"#111", color:"white",
  padding:"10px 20px", borderRadius:999
};