
import express, {json} from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

let tweets = [];

let usuario ={
    username: "",
    avatar: ""
}

// function filtrarLength(mov, page){
//     return mov.length/10 === page
// }


app.post('/sign-up',(req, res) => {
    const user = req.body;
    usuario.username = user.username;
    usuario.avatar = user.avatar;
    if (!usuario.username || !usuario.avatar){
        res.status(422).send("Todos os campos são obrigatórios");
        return;
    }
    res.send("OK");
})

app.post('/tweets',(req,res) => {
    let tweet = req.body;
    tweets.push({...usuario, ...tweet});
    if(!tweet.username || !tweet.avatar || !tweet.tweet){
        res.status(422).send("Todos os campos são obrigatórios");
        return;
    }

    res.send("OK");


})



app.get('/tweets',(req,res) => { 
    console.log(tweets.length);
    if(tweets.length < 10){
        res.send(tweets);
    } else {
        let tweetFiltrado = tweets.slice(tweets.length - 10, tweets.length);
        res.send(tweetFiltrado);
    }
    // res.send(tweets.filter((value,index) => index < 10));
    
})

app.get('/tweets/:USERNAME',(req,res) => {
    const usuarioFiltrado = tweets.find(
        (usr) => usr.username === req.params.USERNAME
    );
    if(!usuarioFiltrado){
        res.sendStatus(404);
        return;
    }
    res.send(usuarioFiltrado)
})

// object9 = object2.filter((value,index) => index < 10)

app.listen(5000);
