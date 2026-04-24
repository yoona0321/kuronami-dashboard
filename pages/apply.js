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
  const [max, setMax] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [tier, setTier] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "applyPosts"));
    setPosts(data.docs.map(d => ({ id:d.id, ...d.data() })));
  };

  /* 생성 */
  const createPost = async () => {
    if (!title) return;

    const newPost = {
      title,
      max,
      participants: []
    };

    const docRef = await addDoc(collection(db, "applyPosts"), newPost);
    setPosts(prev => [...prev, { id:docRef.id, ...newPost }]);

    setTitle("");
    setMax(10);
  };

  /* 참여 */
  const join = async (post) => {
    if (!name || !tier) return;

    if ((post.participants || []).length >= post.max) {
      alert("이미 인원이 가득 찼습니다");
      return;
    }

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
      <h1>📢 파티 모집</h1>

      {/* 생성 버튼 */}
      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:15}}>
        <button style={createBtn} onClick={()=>setModalOpen(true)}>
          + 파티 생성
        </button>
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

            <div style={{marginTop:6}}>
              참여 인원 {post.participants?.length || 0} / {post.max}
            </div>

            <div style={{marginTop:10}}>
              {post.participants?.map((p,i)=>(
                <div key={i}>{p.name} ({p.tier})</div>
              ))}
            </div>

            <button
              style={joinBtn}
              onClick={()=>join(post)}
            >
              참여하기
            </button>

            <button
              style={delBtn}
              onClick={()=>removePost(post.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {modalOpen && (
        <div style={overlay}>
          <div style={modal}>
            <h3>🎮 파티 생성</h3>

            <input
              placeholder="모집글 제목"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              style={input}
            />

            <input
              placeholder="최대 인원"
              value={max}
              onChange={(e)=>setMax(e.target.value)}
              style={input}
            />

            <div style={{display:"flex", gap:10, marginTop:10}}>
              <button onClick={()=>setModalOpen(false)} style={cancelBtn}>
                취소
              </button>

              <button
                onClick={()=>{
                  createPost();
                  setModalOpen(false);
                }}
                style={createBtn}
              >
                생성하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 스타일 */

const wrap = { padding:30, background:"#f3f4f6", minHeight:"100vh" };

const box = {
  background:"white",
  padding:15,
  borderRadius:12,
  marginBottom:15,
  display:"flex",
  gap:10
};

const input = {
  padding:8,
  border:"1px solid #ddd",
  borderRadius:6
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))",
  gap:16
};

const card = {
  background:"white",
  padding:20,
  borderRadius:16,
  boxShadow:"0 6px 15px rgba(0,0,0,0.08)"
};

const createBtn = {
  background:"#2563eb",
  color:"white",
  padding:"10px 16px",
  border:"none",
  borderRadius:10,
  cursor:"pointer",
  fontWeight:"bold"
};

const cancelBtn = {
  background:"#e5e7eb",
  padding:"10px 16px",
  border:"none",
  borderRadius:10,
  cursor:"pointer"
};

const joinBtn = {
  marginTop:10,
  background:"#22c55e",
  color:"white",
  padding:10,
  border:"none",
  borderRadius:10,
  cursor:"pointer",
  width:"100%"
};

const delBtn = {
  marginTop:6,
  background:"#ef4444",
  color:"white",
  padding:10,
  border:"none",
  borderRadius:10,
  cursor:"pointer",
  width:"100%"
};

const overlay = {
  position:"fixed",
  top:0,
  left:0,
  width:"100%",
  height:"100%",
  background:"rgba(0,0,0,0.4)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  zIndex:999
};

const modal = {
  background:"white",
  padding:20,
  borderRadius:14,
  width:400,
  display:"flex",
  flexDirection:"column",
  gap:10
};