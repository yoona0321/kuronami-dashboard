import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [mainLines, setMainLines] = useState([]);
  const [subLines, setSubLines] = useState([]);
  const [open, setOpen] = useState(false);

  const lineList = ["ALL", "TOP", "JUNGLE", "MID", "ADC", "SUP"];

  // 🔥 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "lolUsers"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(data);
    };
    fetchData();
  }, []);

  // 🎨 티어 색상
  const getTierColor = (tier) => {
    if (!tier) return "#6b7280";
    const base = tier.toUpperCase().split(" ")[0];

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
      IRON: "#6b7280"
    };

    return colors[base] || "#6b7280";
  };

  const formatTier = (tier) => {
    if (!tier) return "UNRANKED";

    const parts = tier.toUpperCase().split(" ");
    const base = parts[0];
    const value = parts[1];

    if (["MASTER","GRANDMASTER","CHALLENGER"].includes(base) && value) {
      return `${base} ${value}LP`;
    }

    return value ? `${base} ${value}` : base;
  };

  const toggleMain = (line) => {
    setMainLines(prev =>
      prev.includes(line)
        ? prev.filter(l => l !== line)
        : [...prev, line]
    );
    setSubLines(prev => prev.filter(l => l !== line));
  };

  const toggleSub = (line) => {
    setSubLines(prev =>
      prev.includes(line)
        ? prev.filter(l => l !== line)
        : [...prev, line]
    );
    setMainLines(prev => prev.filter(l => l !== line));
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
      subLines
    };

    const docRef = await addDoc(collection(db, "lolUsers"), newUser);
    setUsers(prev => [...prev, { id: docRef.id, ...newUser }]);

    setName("");
    setTier("");
    setMainLines([]);
    setSubLines([]);
  };

  const removeUser = async (id) => {
    await deleteDoc(doc(db, "lolUsers", id));
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div style={container}>

      <h1>👥 리그오브레전드 인원 리스트</h1>

      {/* 입력 */}
      <div style={box}>
        <input
          placeholder="닉네임"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={input}
        />
        <input
          placeholder="티어 (예: GOLD 3 / MASTER 300)"
          value={tier}
          onChange={(e)=>setTier(e.target.value)}
          style={input}
        />

        <div style={{position:"relative"}}>
          <div style={dropdownBtn} onClick={()=>setOpen(!open)}>
            라인 선택 ▼
          </div>

          {open && (
            <div style={dropdown}>
              <b>⭐ 주라인</b>
              {lineList.map(l=>(
                <label key={l}>
                  <input type="checkbox"
                    checked={mainLines.includes(l)}
                    onChange={()=>toggleMain(l)}
                  /> {l}
                </label>
              ))}

              <hr/>

              <b>🔹 부라인</b>
              {lineList.map(l=>(
                <label key={l}>
                  <input type="checkbox"
                    checked={subLines.includes(l)}
                    onChange={()=>toggleSub(l)}
                  /> {l}
                </label>
              ))}
            </div>
          )}
        </div>

        <button onClick={addUser} style={addBtn}>추가</button>
      </div>

      {/* 카드 */}
      <div style={grid}>
        {users.map(user=>(
          <div key={user.id} style={card}>

            <h3>{user.name}</h3>

            <span style={{
              ...tierTag,
              background:getTierColor(user.tier)
            }}>
              {formatTier(user.tier)}
            </span>

            {/* 🔥 라인 UI */}
            <div style={lineBox}>

              <div style={row}>
                <span style={label}>주라인</span>
                <div style={tags}>
                  {user.mainLines.map((l,i)=>(
                    <span key={i} style={mainTag}>{l}</span>
                  ))}
                </div>
              </div>

              <div style={row}>
                <span style={label}>부라인</span>
                <div style={tags}>
                  {user.subLines.map((l,i)=>(
                    <span key={i} style={subTag}>{l}</span>
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={()=>removeUser(user.id)}
              style={delBtn}
            >
              삭제
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

/* 스타일 */
const container={padding:30,background:"#f3f4f6",minHeight:"100vh"}
const box={background:"white",padding:20,borderRadius:14,marginBottom:30}
const input={padding:8,marginRight:10,border:"1px solid #ddd",borderRadius:6}

const dropdownBtn={padding:8,border:"1px solid #ddd",borderRadius:6,cursor:"pointer",width:200}
const dropdown={position:"absolute",top:40,background:"white",padding:10,border:"1px solid #ddd",borderRadius:8}

const addBtn={marginTop:10,padding:8,background:"#6366f1",color:"white",border:"none",borderRadius:6}

const grid={display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}

const card={
  background:"white",
  padding:22,
  borderRadius:20,
  boxShadow:"0 12px 30px rgba(0,0,0,0.08)",
  display:"flex",
  flexDirection:"column",
  gap:12
}

const tierTag={
  color:"white",
  padding:"6px 14px",
  borderRadius:"999px",
  fontSize:12,
  fontWeight:"bold",
  width:"fit-content"
}

const lineBox={background:"#eef2f7",padding:14,borderRadius:14}

const row={display:"flex",justifyContent:"space-between",marginBottom:6}
const label={fontSize:12,color:"#777"}

const tags={display:"flex",gap:6,flexWrap:"wrap"}

const mainTag={background:"#6366f1",color:"white",padding:"4px 10px",borderRadius:"999px",fontSize:12}
const subTag={background:"#e5e7eb",padding:"4px 10px",borderRadius:"999px",fontSize:12}

const delBtn={
  padding:12,
  background:"#ef4444",
  color:"white",
  border:"none",
  borderRadius:12,
  fontWeight:"bold",
  width:"100%"
}