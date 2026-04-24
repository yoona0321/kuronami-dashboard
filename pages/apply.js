import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Apply() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [game, setGame] = useState("LOL");
  const [date, setDate] = useState("");

  const [name, setName] = useState("");
  const [tier, setTier] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "applyPosts"));
    setPosts(data.docs.map(d => ({ id:d.id, ...d.data() })));
  };

  /* 내전 생성 */
  const createPost = async () => {
    if (!title || !date) return;

    const newPost = {
      title,
      game,
      date,
      participants: []
    };

    const docRef = await addDoc(collection(db, "applyPosts"), newPost);
    setPosts(prev => [...prev, { id:docRef.id, ...newPost }]);

    setTitle("");
    setDate("");
  };

  /* 참여 */
  const join = async (post) => {
    if (!name || !tier) return;

    const newList = [
      ...(post.participants || []),
      { name, tier }
    ];

    await updateDoc(doc(db, "applyPosts", post.id), {
      participants: newList
    });

    load();
  };

  /* 삭제 */
  const removePost = async (id) => {
    await deleteDoc(doc(db, "applyPosts", id));
    setPosts(prev => prev.filter(p=>p.id !== id));
  };

  return (
    <div style={wrap}>
      <h1>📢 내전 모집 / 참여</h1>

      {/* 생성 */}
      <div style={box}>
        <input placeholder="제목" value={title} onChange={e=>setTitle(e.target.value)} style={input}/>
        <input placeholder="날짜 (예: 4/27 21:00)" value={date} onChange={e=>setDate(e.target.value)} style={input}/>

        <select value={game} onChange={e=>setGame(e.target.value)} style={input}>
          <option>LOL</option>
          <option>VALORANT</option>
        </select>

        <button style={btn} onClick={createPost}>내전 생성</button>
      </div>

      {/* 참여 입력 */}
      <div style={box}>
        <input placeholder="닉네임" value={name} onChange={e=>setName(e.target.value)} style={input}/>
        <input placeholder="티어" value={tier} onChange={e=>setTier(e.target.value)} style={input}/>
      </div>

      {/* 리스트 */}
      <div style={grid}>
        {posts.map(post => (
          <div key={post.id} style={card}>
            <h3>{post.title}</h3>
            <div>{post.game} | {post.date}</div>

            <div style={{marginTop:10}}>
              {post.participants?.map((p,i)=>(
                <div key={i}>{p.name} ({p.tier})</div>
              ))}
            </div>

            <button style={joinBtn} onClick={()=>join(post)}>참여</button>
            <button style={delBtn} onClick={()=>removePost(post.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 스타일 */

const wrap = { padding:30, background:"#f3f4f6", minHeight:"100vh" };
const box = { background:"white", padding:20, borderRadius:12, marginBottom:15, display:"flex", gap:10, flexWrap:"wrap" };
const input = { padding:8, border:"1px solid #ddd", borderRadius:6 };

const btn = {
  background:"#6366f1",
  color:"white",
  padding:"8px 14px",
  border:"none",
  borderRadius:8,
  cursor:"pointer"
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill, minmax(240px,1fr))",
  gap:16
};

const card = {
  background:"white",
  padding:20,
  borderRadius:16,
  boxShadow:"0 6px 15px rgba(0,0,0,0.08)"
};

const joinBtn = {
  marginTop:10,
  background:"#22c55e",
  color:"white",
  padding:8,
  border:"none",
  borderRadius:8,
  cursor:"pointer",
  width:"100%"
};

const delBtn = {
  marginTop:6,
  background:"#ef4444",
  color:"white",
  padding:8,
  border:"none",
  borderRadius:8,
  cursor:"pointer",
  width:"100%"
};