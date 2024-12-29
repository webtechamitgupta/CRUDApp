import { useState } from 'react'
import './App.css'
import axios  from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function addNote(){
    await axios({
      method: 'post',
      url: 'http://localhost:8080/addNote',
      data: {
        id: Math.random.toString(),
        title: "Title",
        content:"Content",
      }
    });
    setTitle("");
    setContent("");
  }
  return (
    <>
     <div className="form">
      <input type='text' placeholder='Title' value={title} onChange={(e) =>{
        setTitle(e.target.value);
      }}></input>
      <input type='text' placeholder='Content' value={content} onChange={(e) =>{
        setContent(e.target.value);
      }}></input>
      <button onClick={addNote}>Add</button>
     </div>
    </>
  )
}

export default App
