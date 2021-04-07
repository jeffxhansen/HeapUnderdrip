const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());


// connect to the database
mongoose.connect('mongodb://localhost:27017/heap', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

const questionSchema = new mongoose.Schema({
    topic: String,
    date: String,
    title: String,
    body: String
});

// create a virtual paramter that turns the default _id field into id
questionSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised when we turn this into a JSON object
questionSchema.set('toJSON', {
  virtuals: true
});

const Question = mongoose.model('Question', questionSchema);

//const testQuestion = new Question({ topic:'java', date:'nov 2', title: 'testing title', body:'I dont know what I am doing'});
//testQuestion.save();

app.get('/api/questions', async (req, res) => {
    try {
        let questions = await Question.find();
        res.send({
          questions: questions
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/questions/:questionID', async (req, res) => {
    try {
        let question = await Question.findOne({_id:req.params.questionID});
        if (!question) {
            res.send(404);
            return;
        }
        res.send({question: question});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/questions', async (req, res) => {
    const question = new Question({
        topic: req.body.topic,
        date: req.body.date,
        title: req.body.title,
        body: req.body.body
    });
    try {
        await question.save();
        res.send({
            question: question
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/questions/:id', async (req, res) => {
    try {
        await Question.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const replySchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
    },
    text: String, 
    username: String,
    date: String,
})

const Reply = mongoose.model('Reply', replySchema);

app.post('/api/questions/:questionID/replies', async (req, res) => {
    try {
        let question = await Question.findOne({_id: req.params.questionID});
        if (!question) {
            res.send(404);
            return;
        }
        let reply = new Reply({
            question: question,
            text: req.body.text,
            username: req.body.username,
            date: req.body.date,
        });
        await reply.save();
        res.send(reply);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/questions/:questionID/replies', async (req, res) => {
    try {
        let question = await Question.findOne({_id: req.params.questionID});
        if (!question) {
            res.send(404);
            return;
        }
        let replies = await Reply.find({question: question});
        res.send(replies);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/questions/:questionID/replies/:replyID', async (req, res) => {
    try {
        let reply = await Reply.findOne({_id:req.params.replyID, question: req.params.questionID});
        if (!reply) {
            res.sendStatus(404);
            return;
        }
        reply.text = req.body.text;
        reply.username = req.body.username;
        reply.date = req.body.date;
        await reply.save();
        res.send(reply);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/questions/:questionID/replies/:replyID', async (req, res) => {
    try {
        let reply = await Reply.findOne({_id:req.params.replyID, question: req.params.questionID});
        if (!reply) {
            res.sendStatus(404);
            return;
        }
        await reply.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));


