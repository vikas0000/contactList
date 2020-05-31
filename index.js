const express=require("express");
const path =require('path');

const db = require("./config/mongoose");

const Contact = require("./models/contact");

const port=8000;
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('asserts'))


var contactList=[

    {
        name:'Vikas',
        phone:'123456789'

    },
    {
        name:'Aakash',
        phone:'98743135'

    },
    {
        name:'Vijay',
        phone:'139865356'

    }
]

app.get('/',function(req,res){

    //res.send('<h1>cool, it working</h1>');

    Contact.find({},function(err,data){

        if(err){
            console.log('error in display contact in db');
            return;
        }
        return res.render('home',{

            title:'Contact list',
            contact_list:data
    
        });


    });
    
    

});

/*
app.get('/practice',function(req,res){

    //res.send('<h1>cool, it working</h1>');
    
    return res.render('practice',{

        title:'practive files',
        contact_list:contactList

    });
    
   
});
*/

app.post('/create_contact', function(req,res){
    
   /* contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    */
    //contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone


    }, function(err, data){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log("##########", data);
        return res.redirect('back');
    });

});

app.get('/delete-contact',function(req,res){

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){

            if(err){
                console.log('error in deleting');
                return;
            }
            return res.redirect('back');
    });

    
   
});


app.listen(port, function(err){

    if(err){
        console.log("error");
    }
    console.log("perfect working port ", port);
});