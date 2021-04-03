const mongoose = require('mongoose');
const { connect } = require('../src/db/index');
const character = require('../src/helpers/character');

const { defaultCharacters } = character;

const Character = mongoose.model('Character');
connect()
    .then(async () => {
        // insertMany 的参数是doc 文件
        Character.insertMany(defaultCharacters);
    });

console.log(defaultCharacters);