/**
 * API from: https://dictionaryapi.com/
 * API url: https://dictionaryapi.com/account/example?key=${your_key}
 */

const axios = require('axios');
const colors = require('colors');
const {argv} = require('process');
const apiKey = "bdad0449-74a6-49d6-90c2-a9900be76058";


let word = argv[2] || "";

if(word){
    getDataFromDictionaryAPI(apiKey, word);
}else{
    console.log('\nplease enter the word you would like to search for:\n'.red);
}

function getDataFromDictionaryAPI(apiKey, word){
    axios.get(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${apiKey}`)
        .then(function(response) {
            // console.log(response.data.length);
            if(response.data.length > 1 && response.data.length !== 4){
                console.log(`The word {${word}} is not exist!`.red);
                console.log('You could try the words below:');
                response.data.forEach((word)=>{
                    console.log('-', word.gray);
                });
            }
            if(response.data[0].meta.id){
                printWordInfo(response.data[0]);
            }
            
            console.log("");
        }).catch(function(error) {
            // console.log(error.red);
        });
}
function printWordInfo(data){
    console.log(`\nFollowing is the description of the word: {${data.meta.id}}`);
    const description = data.shortdef;
    for(let i=0; i<description.length;i++){
        console.log(`${i+1}: ${description[i]}.`.cyan);
    }
}