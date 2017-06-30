'use strict';

const router = require('express').Router();
const Models = require('../models');

//Scraping tools
const request = require("request");
const cheerio = require("cheerio");

// A GET request to scrape the echojs website

module.exports = {
    scrapeWebsite: (req, res, next) => {
      request({
          url: "http://www.houstonchronicle.com/local",
        //   har: {
        //       url: "https://google.com"
        //   }
        }, (error, response, html) => {
            
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          const $ = cheerio.load(html);
          $("div.prem-hl-item").each(function(i, element) {

            const result = {};
            result.title = $(this).children("h2.headline").text().trim();
            result.link = 'http://www.houstonchronicle.com' + $(this).find("h2.headline a").attr("href");
            result.blurb = $(this).children("p.blurb").text().trim();

            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            const entry = new Models.Article(result);

            // Now, save that entry to the db
            entry.save((err, doc) => {
              console.log(err ? err : doc);
            });
        });
      }); //End request
    
      // next();
      res.redirect('back');
    }, 

    renderHome: (req, res) => {
      Models.Article.find({}, (error, article) => {
        error ? console.log(error) : res.render('../views/index', {article});
      });
    },

    saveArticle: (req, res) => {
      Models.Article.findOneAndUpdate({"_id": (req.body._id)}, {saved: true},
      (error) => {
        error ? console.log(error) : res.redirect('back');
      });
    },

     unsaveArticle: (req, res) => {
      Models.Article.findOneAndUpdate({"_id": (req.body._id)}, {saved: false},
      (error) => {
        error ? console.log(error) : res.redirect('back');
      });
    },

    viewSaved:  (req, res) => {
      Models.Article.find({saved: true}).sort({updatedAt: -1}).populate("comment").exec((error, article) => {
        error ? console.log(error) : res.render('../views/saved', {article})
      });
    },

}





