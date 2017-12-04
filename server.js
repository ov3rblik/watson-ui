require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cfenv = require('cfenv');

var app = express();
var appEnv = cfenv.getAppEnv();

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.get('/api/getWorkspace', function(req, res) {
  conversation.getWorkspace({
    workspace_id: process.env.WORKSPACE_ID
  }, function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Oops, we ran into an error! Check your credentials and try again.');
    } else {
      res.json(result);
    }
  });
});

app.post('/api/message', function(req, res) {
  conversation.message({
    input: { text: req.body.text },
    context: req.body.context,
    workspace_id: process.env.WORKSPACE_ID
  }, function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Oops, we ran into an error! Check your credentials and try again.');
    } else {
      res.json(result);
    }
  });
});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log('Running on ' + appEnv.url);
});
