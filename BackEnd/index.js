const express = require("express")
const {Client} = require("pg");
const app = express()
app.use(express.json())


async function getClient(){
    const client = new Client(
        "postgresql://notes_owner:Tf2Gk5lQqbhY@ep-wild-moon-a1xfkc37.ap-southeast-1.aws.neon.tech/notes?sslmode=require"
    );
    await client.connect();
    return client;
}
app.post("/addNote",async function(req,res){
    //console.log(req.body);
    try {
        const note = req.body;
    const client = await getClient();
    const newLocal = "insert into notes(id,title,content) values($1,$2,$3)";
    addNoteQuery = newLocal
    values = [note.id,note.title,note.content]
    await client.query(addNoteQuery,values);
    return res.json({
        msg:"note added"
    });
    } catch (error) {
        return res.json({
            msg:"internal server error"
        })
    }
    
});
app.get("/notes",async function getNotes(req,res){
    try {
        const client = await getClient();
    const selectQuery = "select * from notes";
    const response = await client.query(selectQuery);
    return res.json({
        data :response.rows,
    });
    } catch (error) {
        return res.json({
            msg:"internal server error"
        })
    }
    
});

app.listen(8080,function(){
    console.log("app working");
});