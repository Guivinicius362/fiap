var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        ifEquals: (arg1, arg2, options) => {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const days = [
    {
        id: 1,
        title: "Segunda",
        subtitle: "Jogo da forca",
        data: "",
        isLocked: false,
        path: '/forca?palavra=gui&dica=gui',
        type: 1
    },
    {
        id: 2,
        title: "Terça",
        subtitle: "Saga dos doces",
        data: "",
        isLocked: false,
        path: "/candy",
        type: 2
    },
    {
        id: 3,
        title: "Quarta",
        subtitle: "Jogo da forca",
        data: "",
        isLocked: true,
        path: "/",
        type: 1
    },
    {
        id: 1,
        title: "Quinta",
        subtitle: "Jogo da forca",
        data: "",
        isLocked: true,
        path: "/",
        type: 1
    },
    {
        id: 2,
        title: "Sexta",
        subtitle: "Jogo da forca",
        data: "",
        isLocked: true,
        path: "/",
        type: 1
    },
    {
        id: 2,
        title: "",
        subtitle: "Feedback para a Escola",
        data: "",
        isLocked: false,
        path: "/",
        type: 3
    },
]

app.get('/', function (req, res) {
    res.render('home', { days });
});

app.get('/candy', function (req, res) {
    res.render('candy', { days });
});

app.get('/forca', function (req, res) {
    res.render('forca', { days });
});

app.listen(3000);