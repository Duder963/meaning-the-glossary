import fs from "fs"
import data from './terms.json' with { type: 'json' };

// Back up before modifying data
fs.copyFile('./terms.json', './terms.json_', (err) => {
    if (err) {
        console.log("FAILED TO BACK UP LIST: ", err)
        return
    }
})

console.log(data.length)

data.sort((a,b) => a.name.localeCompare(b.name))

let terms = new Set()
let links = new Set()
for (let i in data){
    terms.add(data[i].name.replace(/\s/g, ""))

    let description = data[i].description.join("\n")

    //Get bracketed words that aren't mana symbols
    let found_links = [].concat(description.match(/(?!\{W\}|\{U\}|\{B\}|\{R\}|\{G\}|\{C\}|\{\d\})\{(.*?)\}/g));

    if (found_links[0] == null) found_links.pop() //Pop null returned from failed match
    found_links = found_links.concat(data[i].see_also)
    if (found_links.length) for (let j in found_links){
        if (found_links[j][0] != "{")
            found_links[j] = "{" + found_links[j] + "}"
        links.add(found_links[j]
            .slice(1,-1)
            .split(" ")
            .map(w => w[0].toUpperCase()+w.slice(1))
            .join("")
        )
    }
}
if (links.difference(terms).size) {
    console.log("Missing Terms")
    console.log(links.difference(terms))
}
const json_string = JSON.stringify(data,null,4)
fs.writeFile('./terms.json', json_string, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Data saved');
    }
});
