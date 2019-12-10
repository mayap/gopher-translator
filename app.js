const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const GopherTranslator = require('./gopher-translator');

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;

  if (path === '/word' && method === 'POST') {
    let body = [];

    req.on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () => {
      body = JSON.parse(body);

      let englishWord = body['english-word'];

      if (!englishWord) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid Request');

        return;
      }

      englishWord = englishWord.toLowerCase();

      const gopherWord = GopherTranslator.translateEnglishToGopher(englishWord);
      const response = {'gopher-word': gopherWord};

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    }).on('error', () => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Server Error');
    });

  } else if (path === '/sentence' && method === 'POST') {
    let body = [];

    req.on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () => {
      body = JSON.parse(body);

      let englishSentence = body['english-sentence'];

      if (!englishSentence) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid Request');

        return;
      }

      englishSentence = englishSentence.toLowerCase();
      const symbolInfo = englishSentence.match(/[.?!]$/);
      const symbolSign = symbolInfo[0];
      const symbolPosition = symbolInfo['index'];

      englishSentence = englishSentence.substr(0, symbolPosition) + '';

      const sentenceToWordsArray = englishSentence.split(' ');
      const gopherWordsInArray = [];

      sentenceToWordsArray.forEach(englishWord => {
        const gopherWord = GopherTranslator.translateEnglishToGopher(englishWord);

        gopherWordsInArray.push(gopherWord);
      });

      const gopherSentence = gopherWordsInArray.join(' ') + symbolSign;
      const response = {'gopher-sentence': gopherSentence};

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    }).on('error', () => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Server Error');
    });
  } else if (path === '/history' && method === 'GET') {
    console.log('GET /history');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
