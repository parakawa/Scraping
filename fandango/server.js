var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'https://www.fandango.lat/pe/noticias/2';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var arrTitle = [], arrSubtitle = [], arrDate = [];


      $('.news__item__content').filter(function(){
        var title, subtitle, date;
        var data = $(this);
        title = [].concat(data.children().first().children().text());
        subtitle =[].concat(data.children().filter("p").text());
        date = [].concat(data.children().last().text());

        arrTitle= arrTitle.concat(title);
        arrSubtitle = arrSubtitle.concat(subtitle);
        arrDate = arrDate.concat(date);

      })

      var json = { title : arrTitle, subtitle : arrSubtitle, date : arrDate};
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })


    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
