var collection = []
var phrase = "Paul Duchesne is a film archivist and developer, currently based in Paris."
var lines = 1000
collection.unshift('&nbsp;&nbsp;&nbsp;&nbsp;'+phrase+'<br><br>')
document.write('<br>')

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
  document.write(collection[loopy])
}

document.write('&nbsp;&nbsp;&nbsp;&nbsp;~')
document.write('<br><br>')
document.write('&nbsp;&nbsp;&nbsp;&nbsp;')
document.write('Examples of his work can be found ')
document.write('<a href="https://github.com/paulduchesne">here</a>.')
document.write('<br><br>')
