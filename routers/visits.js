const express = require('express')
const mongoose = require('mongoose');
const Post=require('../model/Posts')

siteViewsUp = function ( id ) {
    Post.findByIdAndUpdate(id, {$inc: {views: 1}}, {new:true})
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)});
}

module.exports = {siteViewsUp};