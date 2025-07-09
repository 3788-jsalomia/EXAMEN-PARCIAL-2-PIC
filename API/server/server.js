const app=require("./app")
const pool=require("./config/db")

const PORT = process.PORT|| 3000;

pool.connect((err)=>{
    if(err){
        console.log("Error al conectar la base de datos")
    }else{
        console.log("Conectado a la base de datos")
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})