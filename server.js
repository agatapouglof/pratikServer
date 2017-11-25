var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var algoliasearch = require('algoliasearch');
var config = require('./config/config');
var app     = express();

// import iportants files
var JumiaHouse = require('./scraping/JumiaHouse');
app.use('/jumia', JumiaHouse);


function jumia(i){
  var tab = [];
 // console.log("done", compt);
  request(url+"?page="+i+"&size=30", function(error, response, html){
    var $ = cheerio.load(html);
      if(!error){
        var p1 = new Promise(function(resolve, reject) {
          var ter = $('.wrapper').filter(function(){
              var data = $(this);
              var adresse = data.children('.listing-info-container').children('.listing-info').children('.listing-address').text();
              var prix = data.children('.listing-info-container').children('.listing-info').children('.listing-price').text();
              var link = data.children('.listing-image').children('a').prop('href');
              var  img = data.children('.listing-image').children('a').children('img').attr('data-src');
              var  src = data.children('.listing-image').children('a').children('img').attr('src');
              // console.log(src);

              // obj.adresse = adresse;
              // obj.prix = prix;
              // obj.img = img;
              tab.push({"origin":"JumiaHouse","adresse" : adresse, "prix" :prix, "image":img,"link":"https://house.jumia.ci"+link,"flag":0,"src":src,"date":Date.now()});

          });
          if(ter){resolve(i);}

          // ou
          // reject("Erreur !");
        });
        p1.then(function(valeur) {
            console.log(valeur); // Succès !
            index.addObjects(tab, function(err, content) {
              console.log("added ",compt);
              compt++;
              if (valeur<50) {
                jumia(valeur+1);
              }else{
                console.log("end");
              }
              // console.log(compt);
            });
            }, function(raison) {
            console.log(raison); // Erreur !
          });

      }else{
        console.log('error getting jumia page');
      }
 });
}
app.get('/scrape', function(req, res){

// url = 'http://www.imdb.com/title/tt1229340/';
url = 'https://house.jumia.ci/rent/';
var tab = [];
compt = 1;
console.log("test");
request(url, function(error, response, html){
  console.log(html);
  if (error) {
    console.log("error");
  }
    if(!error){
          // j=1;
      //write the entire scraped page to the local file system

      // fs.writeFile('entire-page.html', html, function(err){
      //     console.log('entire-page.html successfully written to HTML folder');
      // })
        var $ = cheerio.load(html);
        var hd = $('.h3');
        // console.log(hd);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};
    var obj = new Object();
    $('.wrapper').filter(function(){
        var data = $(this);
        console.log("data");
        console.log(data);
        var adresse = data.children('.listing-info-container').children('.listing-info').children('.listing-address').text();
        var prix = data.children('.listing-info-container').children('.listing-info').children('.listing-price').text();
        var link = data.children('.listing-image').children('a').prop('href');
        var img = data.children('.listing-image').children('a').children('img').attr('data-src');


        console.log(adresse);
        console.log(prix);
        console.log(img);
        obj.adresse = adresse;
        obj.prix = prix;
        obj.img = img;
        tab.push({"origin":"JumiaHouse","adresse" : adresse, "prix" :prix, "image":img,"link":"https://house.jumia.ci"+link,"flag":0,"date":Date.now()});

        // // console.log(data.text());
        // title = data.children().first().text();
        // // console.log(title);
        // release = data.children().last().children().text();
        // json.title = title;
        // json.release = release;
    })

    // $('.star-box-giga-star').filter(function(){
    //     var data = $(this);
    //     rating = data.text();
    //
    //     json.rating = rating;
    // });
    $('img').filter(function(){
        var data = $(this);
        // img = data.prop('src');
        // console.log(img);

        // json.rating = rating;
    })
    $('.Pagination').filter(function(){
      var data = $(this);
      // var last = data.children('.Pagination-item-link').children('a').attr('href');
      // var last = data.last().text();
       last = data.children('li').eq(-2).children('a').text();
      // last -= 1;

      // console.log("last");
      // console.log(last);
      // console.log(Date.now());
    });

    // if (last) {
    //   for ( j=1 ; j <= last; j++) {
    //     jumia(j);
    //
    //   }
    // }


        jumia(1);


      //  jumia(1);jumia(2);jumia(3);jumia(4);jumia(5);jumia(6);jumia(7);jumia(8);jumia(9);jumia(10);
      //  jumia(21);jumia(22);jumia(23);jumia(24);jumia(25);jumia(26);jumia(27);jumia(28);jumia(29);jumia(30);
      //  jumia(31);jumia(32);jumia(33);jumia(34);jumia(35);jumia(36);jumia(37);jumia(38);jumia(39);jumia(40);
      //  jumia(41);jumia(42);jumia(43);jumia(44);jumia(45);jumia(46);jumia(47);jumia(48);jumia(49);jumia(50);
      // //  jumia(2);
      //  jumia(3);
    // while (j<50) {
    //   var prom = new Promise(function(resolve, reject) {
    //     jumia(j);
    //     resolve("done"+j)
    //   });
    //   prom.then(function(valeur) {
    //       console.log(valeur); // Succès !
    //       // index.addObjects(tab, function(err, content) {
    //       //   console.log("added");
    //       // });
    //       j++;
    //       }, function(raison) {
    //       console.log(raison); // Erreur !
    //     });
    // }

    // i=1;
  // while(i<=last){
  //     console.log(i);
  //     tab = [];
    //   request(url+"?page="+i+"&size=30", function(error, response, html){
    //     var $ = cheerio.load(html);
    //       if(!error){
    //         $('.wrapper').filter(function(){
    //             var data = $(this);
    //             var adresse = data.children('.listing-info-container').children('.listing-info').children('.listing-address').text();
    //             var prix = data.children('.listing-info-container').children('.listing-info').children('.listing-price').text();
    //             var link = data.children('.listing-image').children('a').prop('href');
    //             img = data.children('.listing-image').children('a').children('img').attr('data-src');
    //             obj.adresse = adresse;
    //             obj.prix = prix;
    //             obj.img = img;
    //             tab.push({"origin":"JumiaHouse","adresse" : adresse, "prix" :prix, "image":img,"link":"https://house.jumia.ci"+link,"flag":0,"date":Date.now()});
    //
    //         });
    //         index.addObjects(tab, function(err, content) {
    //           // console.log(content);
    //           i++;
    //           console.log("added"+i);
    //         });
    //       }else{
    //         console.log('error getting jumia page');
    //       }
    // });
  // }
}else{
  console.log(error);
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//
//     console.log('File successfully written! - Check your project directory for the output.json file');
//
// })

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
// res.send('Check your console!')
setTimeout(function(){
  // index.addObjects(tab, function(err, content) {
  //   // console.log(content);
  //   // res.send(content);
  // });
  return res.json("render");
},100000)
  // if(tab.length >5){
  // }
// if (last) {
//   if (compt >= last) {
//     res.json("render");
//   }
// }

    }) ;
})


app.listen('8081')

console.log('Magic  on port 8081');

exports = module.exports = app;
