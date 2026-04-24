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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("high");

  const lines = ["ALL","TOP","JUNGLE","MID","ADC","SUP"];

  useEffect(() => { load(); }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "lolUsers"));
    setUsers(data.docs.map(d => ({ id:d.id, ...d.data() })));
  };

  const tierRank = ["IRON","BRONZE","SILVER","GOLD","PLATINUM","EMERALD","DIAMOND","MASTER","GRANDMASTER","CHALLENGER"];

  const getScore = (tier) => {
    if (!tier) return 0;
    const [base, num] = tier.toUpperCase().split(" ");
    const tierIndex = tierRank.indexOf(base) * 100;
    const division = num ? (5 - parseInt(num)) : 0;
    return tierIndex + division;
  };

  const getColor = (tier) => {
    const base = tier?.split(" ")[0];
    const map = {
      CHALLENGER:"#ef4444",
      GRANDMASTER:"#f97316",
      MASTER:"#9333ea",
      DIAMOND:"#3b82f6",
      EMERALD:"#10b981",
      PLATINUM:"#14b8a6",
      GOLD:"#eab308",
      SILVER:"#9ca3af",
      BRONZE:"#92400e",
      IRON:"#6b7280",
    };
    return map[base] || "#999";
  };

  const formatTier = (tier) => {
    if (!tier) return "";
    const [base, num] = tier.split(" ");
    if (["MASTER","GRANDMASTER","CHALLENGER"].includes(base) && num) {
      return `${base} ${num}LP`;
    }
    return num ? `${base} ${num}` : base;
  };

  const toggleMain = (l) => {
    setMainLines(prev => prev.includes(l) ? prev.filter(x=>x!==l) : [...prev, l]);
    setSubLines(prev => prev.filter(x=>x!==l));
  };

  const toggleSub = (l) => {
    setSubLines(prev => prev.includes(l) ? prev.filter(x=>x!==l) : [...prev, l]);
    setMainLines(prev => prev.filter(x=>x!==l));
  };

  const addUser = async () => {
    if (!name || !tier || mainLines.length === 0) return;

    const newUser = { name, tier: tier.toUpperCase(), mainLines, subLines };

    const docRef = await addDoc(collection(db, "lolUsers"), newUser);
    setUsers(prev => [...prev, { id:docRef.id, ...newUser }]);

    setName(""); setTier(""); setMainLines([]); setSubLines([]);
  };

  const removeUser = async (id) => {
    await deleteDoc(doc(db, "lolUsers", id));
    setUsers(prev => prev.filter(u=>u.id !== id));
  };

  const filtered = users
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.tier.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a,b)=>
      sort==="high"
        ? getScore(b.tier)-getScore(a.tier)
        : getScore(a.tier)-getScore(b.tier)
    );

  return (
    <div style={wrap}>
      <h1>👥 리그오브레전드 인원 리스트</h1>

      <div style={box}>
        <input placeholder="닉네임" value={name} onChange={e=>setName(e.target.value)} style={input}/>
        <input placeholder="티어" value={tier} onChange={e=>setTier(e.target.value)} style={input}/>

        <div style={{display:"flex", gap:10, marginTop:10}}>
          <div style={{position:"relative"}}>
            <div style={dropdownBtn} onClick={()=>setOpen(!open)}>라인 선택 ▼</div>

            {open && (
              <div style={dropdown}>
                <b>주라인</b>
                {lines.map(l=>(
                  <label key={l} style={checkRow}>
                    <input type="checkbox"
                      checked={mainLines.includes(l)}
                      onChange={()=>toggleMain(l)}
                    />
                    <span>{l}</span>
                  </label>
                ))}

                <hr/>

                <b>부라인</b>
                {lines.map(l=>(
                  <label key={l} style={checkRow}>
                    <input type="checkbox"
                      checked={subLines.includes(l)}
                      onChange={()=>toggleSub(l)}
                    />
                    <span>{l}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button style={addBtn} onClick={addUser}>추가</button>
        </div>
      </div>

      <div style={box}>
        <input placeholder="검색" value={search} onChange={e=>setSearch(e.target.value)} style={input}/>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={input}>
          <option value="high">티어 높은순</option>
          <option value="low">티어 낮은순</option>
        </select>
      </div>

      <div style={grid}>
        {filtered.map(user=>(
          <div key={user.id} style={card}>
            <h3>{user.name}</h3>

            <span style={{...tierTag, background:getColor(user.tier)}}>
              {formatTier(user.tier)}
            </span>

            <div style={lineBox}>
              <div style={row}>
                <span style={labelText}>주라인</span>
                <div style={tags}>
                  {user.mainLines.map((l,i)=><span key={i} style={mainTag}>{l}</span>)}
                </div>
              </div>

              <div style={row}>
                <span style={labelText}>부라인</span>
                <div style={tags}>
                  {user.subLines.map((l,i)=><span key={i} style={subTag}>{l}</span>)}
                </div>
              </div>
            </div>

            <button style={delBtn} onClick={()=>removeUser(user.id)}>
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 스타일 */

const wrap = { padding:30, background:"#f3f4f6" };
const box = { background:"white", padding:20, borderRadius:14, marginBottom:20 };
const input = { marginRight:10, padding:8, border:"1px solid #ddd", borderRadius:6 };

const dropdownBtn = { padding:8, border:"1px solid #ddd", borderRadius:6, cursor:"pointer" };

const dropdown = {
  position:"absolute",
  top:40,
  background:"white",
  padding:10,
  border:"1px solid #ddd",
  borderRadius:8,
  zIndex:999
};

const checkRow = {
  display:"flex",
  alignItems:"center",
  gap:6,
  marginBottom:4
};

const addBtn = {
  padding:"10px 16px",
  background:"#6366f1",
  color:"white",
  border:"none",
  borderRadius:10,
  cursor:"pointer"
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",
  gap:16
};

const card = {
  background:"white",
  padding:20,
  borderRadius:20,
  boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
  display:"flex",
  flexDirection:"column",
  gap:10
};

const tierTag = {
  color:"white",
  padding:"6px 14px",
  borderRadius:"999px",
  fontSize:12,
  fontWeight:"bold",
  width:"fit-content"
};

const lineBox = {
  background:"#eef2f7",
  padding:12,
  borderRadius:12
};

const row = { display:"flex", justifyContent:"space-between", marginBottom:6 };

const labelText = {
  fontSize:12,
  color:"#9ca3af"
};

const tags = { display:"flex", gap:6 };

const mainTag = {
  background:"#6366f1",
  color:"white",
  padding:"4px 10px",
  borderRadius:"999px",
  fontSize:12
};

const subTag = {
  background:"#e5e7eb",
  padding:"4px 10px",
  borderRadius:"999px",
  fontSize:12
};

const delBtn = {
  marginTop:10,
  background:"#ef4444",
  color:"white",
  padding:12,
  border:"none",
  borderRadius:12,
  cursor:"pointer"
};