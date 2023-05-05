
async function query_wikidata() {
  
  let query = `
    select ?personLabel ?personDescription ?residenceLabel where {
      values ?person {wd:Q115057988}
      optional {?person wdt:P551 ?residence} .
      service wikibase:label {bd:serviceParam wikibase:language "en". }
    } limit 1
  `

  let sparql_request = d3.json(
    `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      query
    )}`,
    { headers: { accept: "application/sparql-results+json" } }
  );

  return sparql_request
}

async function draw_page() {

  let data = await query_wikidata();
  data = data.results.bindings[0]
  console.log(data)

  var collection = []
  var phrase = data.personLabel.value
  phrase += ' is a '
  phrase += data.personDescription.value
  phrase += ', currently based in '
  phrase += data.residenceLabel.value
  phrase += '.'

  var lines = 1000
  collection.unshift('&nbsp;&nbsp;&nbsp;&nbsp;<tspan class="texting">'+phrase+'</tspan><br><br>')

  var html_string = ''
  html_string += '<br>'

  var loops;
  for (loops = 0; loops < lines; loops++) {
    var highlight = Math.floor(Math.random() * phrase.length)
    var moving = phrase[highlight]
    var smaller_string
    if (highlight === 0) {
      smaller_string = phrase.slice(1, )
    } else if (highlight === phrase.length) {
      smaller_string = phrase.slice(0, phrase.length - 1)
    } else {
      smaller_string = phrase.slice(0, highlight) + phrase.slice(highlight + 1, phrase.length)
    }

    var reinsert_index = Math.floor(Math.random() * (smaller_string.length + 1))
    while (reinsert_index === highlight) {
      reinsert_index = Math.floor(Math.random() * smaller_string.length + 1)
    }
    var mutation = smaller_string.slice(0, reinsert_index) + moving + smaller_string.slice(reinsert_index, smaller_string.length)

    collection.unshift('&nbsp;&nbsp;&nbsp;&nbsp;'+mutation+'<br>')
    phrase = mutation
  }

  var loopy
  for (loopy = 0; loopy < collection.length; loopy++) {
    html_string += (collection[loopy])
  }

  html_string += ('&nbsp;&nbsp;&nbsp;&nbsp;~')
  html_string += ('<br><br>')
  html_string += ('&nbsp;&nbsp;&nbsp;&nbsp;')
  html_string += ('Examples of his work can be found ')
  html_string += ('<a href="https://github.com/paulduchesne">here</a>.')
  html_string += ('<br><br>')

  div=document.getElementById('write_me');
  div.innerHTML = html_string

}

draw_page()
