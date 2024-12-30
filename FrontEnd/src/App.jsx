import { useEffect, useState } from 'react'
import './App.css'
import axios  from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes,setNotes]= useState([]);
  async function getNotes(){
    const response =await axios({
      method:"get",
      url:"http://localhost:8080/notes",
    });
    console.log(response.data.data)
    setNotes(response.data.data);
  }

  async function addNote(){
    await axios({
      method: 'post',
      url: 'http://localhost:8080/addNote',
      data: {
        id: Math.random().toString(),
        title: title,
        content:content,
      }
    });
    
        setTitle("");
    setContent("");
    getNotes();
  }
    useEffect(() => {
      getNotes();
    }, []);
    


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
     <div className='notes'>
      {
        notes.map((element) => {
           return (
            <div key={element.id} style={{backgroundColor:'lightgrey'}}>
              <h2>{element.title}</h2>
              <p>{element.content}</p>
            </div>
           );
        })}
     </div>
    </>
  )
}

export default App
