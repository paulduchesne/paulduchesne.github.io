var collection = []
var phrase = "Paul Duchesne is a Linked Open Data engineer and researcher, currently based in Canberra."

var birthday = new Date("1986-04-14");
var today = new Date(Date.now());
var day = 1000 * 3600 * 24
var lines = Math.round((today.getTime() - birthday.getTime()) / day);

collection.unshift('&nbsp;&nbsp;&nbsp;&nbsp;'+today.toISOString().slice(0, 10)+' '+phrase+'<br><br>')
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

  var shifting = new Date(Date.now())
  shifting.setDate(shifting.getDate() - (loops+1))
  shifting = shifting.toISOString().slice(0, 10)

  collection.unshift('&nbsp;&nbsp;&nbsp;&nbsp;'+shifting+' '+mutation+'<br><br>')
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