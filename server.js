const bodyParser = require ('body-parser')
const exprees= require('express')
const mongoose=require('mongoose')
const userSchema= require('./user.schema')

const app = exprees()
app.use(bodyParser.json())
const url="mongodb+srv://joeezat:jo1234jo@test.ojpkq.mongodb.net/?retryWrites=true&w=majority&appName=test"

const connect = async ()=>{
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(url)

        console.log("connected")
        
    }catch(error){
        console.log (error)
        process.exit
    }
}

connect()


app.get('/users' , async function(req,res){

        const users= await userSchema.find()

    res.json({Users:users , message:"done"})
})

app.post('/users' , async function(req,res){
    try{
        let user=await userSchema.create(req.body)
        res.json({message:"200",Users:user})
    }
    catch(error){
            res.status(400).json({message:"phone number exiset"})
    }
 
})

app.put('/users/:id' , async function(req,res){

        let {id}=req.params
        let{name,age,phone,jop}=req.body

            await userSchema.findByIdAndUpdate(id, {name,age,phone,jop})


        
            res.json({message:"edit 200"})
})

app.delete('/users/:id' , async function(req,res){

    let {id}=req.params
    let{name,age,phone,jop}=req.body

        await userSchema.findByIdAndDelete(id, {name,age,phone,jop})


    
        res.json({message:"deleted 200"})
})


app.get('/', function(req,res){
    res.send("hello")
})
app.listen(2200)