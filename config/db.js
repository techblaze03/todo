const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://monu:xxx@cluster0-qysc2.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true ,useNewUrlParser: true }) ;
// mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology:true})

mongoose.connection.on('open',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected to tht db ') ;
    }
})





module.exports = mongoose;