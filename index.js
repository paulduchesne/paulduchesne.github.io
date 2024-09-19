async function draw_page() {

  var collection = []
  var phrase = 'Paul Duchesne is a composer/producer/whatever, currently based in Canberra.'
  
  var distance = new Date() - new Date('1986-04-14');
  var distance_days = Math.floor(distance / (1000 * 60 * 60 * 24));
  
  collection.unshift('&nbsp;&nbsp;&nbsp;&nbsp;<tspan class="texting">'+phrase+'</tspan><br><br>')

  var html_string = ''
  html_string += '<br>'

  var loops;
  for (loops = 0; loops < distance_days; loops++) {
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

  html_string += ('&nbsp;&nbsp;&nbsp;&nbsp;~<br><br>')

  div=document.getElementById('page');
  div.innerHTML = html_string

}

draw_page()
