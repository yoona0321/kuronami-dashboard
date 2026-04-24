import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

export default function Apply() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [max, setMax] = useState(10);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "applyPosts"));
    setPosts(data.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const createPost = async () => {
    if (!title) return;

    const newPost = {
      title,
      max,
      participants: []
    };

    const docRef = await addDoc(collection(db, "applyPosts"), newPost);

    // 🔥 생성 후 상세 페이지 이동
    router.push(`/apply/${docRef.id}`);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>📢 파티 모집</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="모집글 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          placeholder="최대 인원"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          style={input}
        />

        <button onClick={createPost} style={btn}>
          생성하기
        </button>
      </div>

      {posts.map(post => (
        <div key={post.id} style={card}>
          <h3>{post.title}</h3>
          <p>인원 {post.participants?.length || 0} / {post.max}</p>
        </div>
      ))}
    </div>
  );
}

const input = {
  padding: 8,
  marginRight: 10,
  border: "1px solid #ddd",
  borderRadius: 6
};

const btn = {
  padding: "8px 14px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};

const card = {
  background: "white",
  padding: 15,
  borderRadius: 12,
  marginBottom: 10,
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};