import fs from "fs"
import data from './terms.json' with { type: 'json' };

fs.rename('./terms.json', './terms.json_', (err) => {
    if (err) {
        console.log("FAILED TO BACK UP LIST: ", err)
        return
    }
})
data.sort((a,b) => a.name.localeCompare(b.name))
const json_string = JSON.stringify(data,null,4)
fs.writeFile('./terms.json', json_string, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Data saved');
    }
});
