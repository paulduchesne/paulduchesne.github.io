
// australian-filmography.js
// pull data from wikidata and plot using d3.js

async function draw_about() {

  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  d3.select("#canvas")
    .append("rect")
    .attr("class", "about_back")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("opacity", 0)
    .style("pointer-events", "all")
    .style("fill", colour1)
    .on("click", () => {
      console.log('exit')
      d3.selectAll('.about_back').remove()
      d3.selectAll('.about_text1').remove()
      d3.selectAll('.about_text2').remove()
    });

  d3.select("#canvas")
    .append("text")
    .attr("class", "about_text1")
    .attr("x", 100)
    .attr("y", 150)
    .attr("opacity", 0)
    .style("stroke", colour3)
    .style("fill", colour3)
    .style("pointer-events", "none")
    .attr("font-family", "Spartan")
    .attr("font-weight", 500)
    .text("The ")
    .append("tspan")
    .style("stroke", colour2)
    .style("fill", colour2)
    .text("Australian Filmography ")
    .append("tspan")
    .style("stroke", colour3)
    .style("fill", colour3)
    .text("is an ongoing experiment involving visualisation of Creative Commons Zero data related to Australian Film.")

  d3.select("#canvas")
    .append("text")
    .attr("class", "about_text2")
    .attr("x", 100)
    .attr("y", 190)
    .attr("opacity", 0)
    .style("stroke", colour3)
    .style("fill", colour3)
    .style("pointer-events", "none")
    .attr("font-family", "Spartan")
    .attr("font-weight", 500)
    .text("All code by ")
    .append("tspan")
    .style("stroke", colour2)
    .style("fill", colour2)
    .text("Paul Duchesne")
    .append("tspan")
    .style("stroke", colour3)
    .style("fill", colour3)
    .text(". ")
    .append("tspan")
    .attr("id", "about_text3")
    .style("stroke", colour3)
    .style("fill", colour3)
    .text("All data from ")
    .append("tspan")
    .style("stroke", colour2)
    .style("fill", colour2)
    .text("Wikidata")
    .append("tspan")
    .style("stroke", colour3)
    .style("fill", colour3)
    .text(". ")
    .append("tspan")
    .style("stroke", colour3)
    .style("fill", colour3)
    .text("The font is ")
    .append("tspan")
    .style("stroke", colour2)
    .style("fill", colour2)
    .text("Spartan")
    .append("tspan")
    .style("stroke", colour3)
    .style("fill", colour3)
    .text(".")

  d3.selectAll('.about_back').transition().duration(500).style("opacity", 1)
  d3.selectAll('.about_text1').transition('x').delay(1500).duration(1000).style('opacity', 1)
  d3.selectAll('.about_text2').transition('x').delay(2500).duration(1000).style('opacity', 1)
}

async function setup_canvas() {
  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  canvas = d3
    .select("#paper")
    .append("svg")
    .attr("id", "canvas")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("background-color", colour1);

  d3.select("#canvas")
    .append("text")
    .attr("id", "title")
    .attr("x", 100)
    .attr("y", 40)
    .attr("opacity", 1)
    .style("stroke", colour2)
    .style("fill", colour2)
    .attr("font-family", "Spartan")
    .attr("font-weight", 500)
    .text("AUSTRALIAN FILMOGRAPHY")
    .append("tspan")
    .attr("font-weight", 200)
    .style("stroke", colour3)
    .style("fill", colour3)
    .text(" // ")
    .append("tspan")
    .attr("font-weight", 200)
    .style("stroke", colour3)
    .style("fill", colour3)
    .text("ABOUT")
    .on("click", () => draw_about());


  d3.select("#canvas")
    .append("line")
    .attr("id", "line")
    .attr("x1", 100)
    .attr("x2", "95%")
    .attr("y1", 65)
    .attr("y2", 65)
    .style("stroke-width", "10px")
    .style("stroke", colour2)
    .style("fill", colour2);
}

async function parse_data(data) {

  let film_array = [];

  data.forEach((d) => {
    if (!film_array.includes(d.film)) {
      film_array.push(d.film);
    }
  });

  film_array = film_array.map((d) => {
    return { film: d };
  });

  film_array.forEach((d) => {
    let select = data.filter((k) => {
      return k.film == d.film;
    });

    console.log(select)
    let years = [];
    select.forEach((b) => {
      years.push(parseInt(b.year.slice(0, 4)));
    });
    d.year = Math.min(...years);
    d.title = select.map((a) => {
      return a.filmLabel;
    })[0];
    d.director = Array.from(
      new Set(
        select.map((a) => {
          return a.dirLabel;
        })
      )
    ).join(", ");
    d.label = d.title + " [" + d.year + "]";
  });

  console.log(film_array)

  film_array.sort((a, b) => (a.year > b.year ? 1 : -1));

  return film_array;
}

async function draw_summary(x, y, text1, text2, film_id, col, inj) {

  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  d3.select("#canvas")
    .append("rect")
    .attr("class", 'summary_box' + inj)
    .attr('wikidata', film_id)
    .attr("x", x)
    .attr("y", y)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("width", 400)
    .attr("height", 80)
    .attr("opacity", 1)
    .style("pointer-events", "none")


  d3.select("#canvas")
    .append("text")
    .attr("class", "summary_text1" + inj)
    .attr("x", x + 20)
    .attr("y", y + 30)
    .attr("opacity", 1)
    .style("pointer-events", "none")
    .attr("font-family", "Spartan")
    .attr("font-weight", 500)
    .text(text1);

  d3.select("#canvas")
    .append("text")
    .attr("class", "summary_text2" + inj)
    .attr("x", x + 20)
    .attr("y", y + 60)
    .attr("opacity", 1)
    .style("pointer-events", "none")
    .attr("font-family", "Spartan")
    .attr("font-weight", 200)
    .text(text2);

  if (inj == '') {
    let text_size1 = d3.select(".summary_text1").node().getBBox().width + 40;
    let text_size2 = d3.select(".summary_text2").node().getBBox().width + 40;
    let text_max = Math.max(text_size1, text_size2);
    d3.select(".summary_box").attr("width", text_max);
  } else {

    let text_size1 = d3.select(".summary_text1-focus").node().getBBox().width + 40;
    let text_size2 = d3.select(".summary_text2-focus").node().getBBox().width + 40;
    let text_max = Math.max(text_size1, text_size2);
    d3.select(".summary_box-focus").attr("width", text_max);

  }
}

async function draw_detail_window() {

  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  d3.select("#canvas")
    .append("rect")
    .attr("class", "detail_back")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("opacity", 0)
    .style("pointer-events", "all")
    .style("fill", colour2)

    .transition()
    .duration(500)
    .style("opacity", 1);

}

async function send_sparql_query(q) {
  let sparql_request = d3.json(
    `https://query.wikidata.org/sparql?query=${encodeURIComponent(q)}`,
    { headers: { accept: "application/sparql-results+json" } }
  );

  return sparql_request;
}

async function detail_query(data) {
  let wikidata_id = data.film.split("/");
  wikidata_id = wikidata_id[wikidata_id.length - 1];

  let attributes = {
    director: "P57",
    actor: "P161",
    voice: "P725",
    writer: "P58",
    dop: "P344",
    editor: "P1040",
    composer: "P86",
    producer: "P162",
    genre: "P136",
    rating: "P3156",
    colour: "P462",
    aspect: "P2061",
    duration: "P2047",
  };

  let build_query = "select";
  Object.keys(attributes).forEach((d) => (build_query += " ?" + d));
  Object.keys(attributes).forEach((d) => (build_query += " ?" + d + "Label"));
  build_query += " where {";
  Object.entries(attributes).forEach(
    (d) =>
    (build_query +=
      " optional { wd:" + wikidata_id + " wdt:" + d[1] + " ?" + d[0] + ".}")
  );
  build_query +=
    ' service wikibase:label {bd:serviceParam wikibase:language "en". }}';

  let sparql_request = d3.json(
    `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      build_query
    )}`,
    { headers: { accept: "application/sparql-results+json" } }
  );

  return sparql_request;
}

async function parse_detail_data(d) {
  let adjusted = d.results.bindings;

  let attributes = {
    director: "P57",
    actor: "P161",
    voice: "P725",
    writer: "P58",
    dop: "P344",
    editor: "P1040",
    composer: "P86",
    producer: "P162",
    genre: "P136",
    rating: "P3156",
    colour: "P462",
    aspect: "P2061",
    duration: "P2047",
  };

  let top_collection = {};

  Object.keys(attributes).forEach((a) => {
    if (Object.keys(adjusted[0]).includes(a)) {
      let coll = [];

      adjusted.forEach((b) => {
        coll.push({ link: b[a].value, label: b[a + "Label"].value });
      });

      filtered = Array.from(new Set(coll.map(JSON.stringify))).map(JSON.parse);
      top_collection[a] = filtered;
    }
  });

  return top_collection;
}

async function find_individual(wd, wdt) {

  if (wdt == 'year') {
    let query = `select ?a where { ?a wdt:P31 wd:Q11424; wdt:P495 wd:Q408; wdt:P577 ?year. filter (year(?year) = ` + wd + `). }`;
    let sparql_request = d3.json(
      `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`,
      { headers: { accept: "application/sparql-results+json" } });
    return sparql_request;
  } else if (wdt == 'duration') {
    let query = `select ?a where { ?a wdt:P31 wd:Q11424; wdt:P2047 ` + wd + `. }`
    let sparql_request = d3.json(
      `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`,
      { headers: { accept: "application/sparql-results+json" } });
    return sparql_request;
  } else {
    let query = `select ?a  where { ?a wdt:P495 wd:Q408; ?b wd:` + wd + `}`;
    let sparql_request = d3.json(
      `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`,
      { headers: { accept: "application/sparql-results+json" } });
    return sparql_request;
  }
}

async function focus_clear(d) {
  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  d3.select(".clear_box").remove()
  d3.select(".clear_text").remove()

  d3.select("#canvas")
    .append("rect")
    .attr("class", "clear_box")
    .attr("x", 100)
    .attr("y", 100 - 15)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("width", 20)
    .attr("height", 35)
    .style("fill", colour2)
    .style("opacity", 1)
    .on("click", () => {
      d3.select(".clear_box").remove()
      d3.select(".clear_text").remove()
      d3.selectAll(".round-focus").attr("class", 'round')
      d3.selectAll(".round").transition().duration(1000).attr("cy", (d) => d.y)
      d3.selectAll(".round").attr("trigger", (d) => { return d.active = 'neg' })
    })

  d3.select("#canvas")
    .append("text")
    .attr("class", "clear_text")
    .attr("x", 120)
    .attr("y", 123 - 15)
    .style("pointer-events", "none")
    .attr("opacity", 1) // make 0 and transition up
    .style("stroke", colour3)
    .style("fill", colour3)
    .attr("font-family", "Spartan")
    .attr("font-weight", 500)
    .text(d)

  let clear_width = d3.select(".clear_text").node().getBBox().width + 40;
  d3.select(".clear_box").attr("width", clear_width);
}

async function focus_attribute(d, prop) {

  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  let attribute = d.link.split("/");
  attribute = attribute[attribute.length - 1];

  let associations = await find_individual(attribute, prop);
  console.log(associations)

  associations = associations.results.bindings;
  let association_list = [...new Set(associations.map((d) => d.a.value))];

  d3.selectAll(".round-focus").attr("class", 'round')
  d3.selectAll(".round").attr("cy", (d) => d.y + 45)
  d3.selectAll(".round").attr("class", (d) => {

    if (association_list.includes(d.wikidata)) { return 'round-focus' } else { return 'round' }
  });

  d3.selectAll(".round-focus").attr("trigger", (d) => { return d.active = 'pos' })
  d3.selectAll(".round").attr("trigger", (d) => { return d.active = 'neg' })

  d3.select(".detail_back").remove();
  d3.select(".headertext").remove();
  d3.select(".testing").remove();
  d3.selectAll(".castlabel").remove();
  d3.selectAll(".casttext").remove();
  d3.selectAll(".cross").remove();
  d3.selectAll(".editlink").remove();

  focus_clear(d.label)
}

async function draw_head_text(data1, data2) {
  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  d3.select("#canvas")

    .append("text")
    .attr("class", "headertext")
    .attr("x", 200)
    .attr("y", (d, i) => {
      return i * 20 + 200;
    })
    .attr("opacity", 0) // make 0 and transition up
    .style("stroke", colour1)
    .style("fill", colour1)
    .attr("font-family", "Spartan")
    .attr("font-weight", 800)
    .attr("font-size", "50px")
    .text(data1.title)

    .append("tspan")
    .attr("font-weight", 200)
    .style("stroke", colour1)
    .style("fill", colour1)
    .text(" (")

    .append("tspan")
    .text(data1.year)

    .style("stroke", colour1)
    .style("fill", colour1)
    .attr("font-weight", 200)
    .on("click", (d, k) => {
      // year is currently not working, sparql query just hangs.
      console.log(data1.year)
      // find_individual(data1.year, 'year')
    })
    .append("tspan")
    .attr("font-weight", 200)
    .style("stroke", colour1)
    .style("fill", colour1)
    .text(")");

  d3.select("#canvas")
    .selectAll("g")
    .data(["blah"])
    .join("text")
    .attr("class", "testing")
    .attr("x", (d, i) => {
      return 200;
    })
    .attr("y", (d, i) => {
      return 250;
    })
    .attr("opacity", 0)
    .style("pointer-events", "all")
    .style("stroke", colour1)
    .style("fill", colour1)
    .attr("font-family", "Spartan")
    .attr("font-weight", 200)
    .text("dir. ");

  data2.director.forEach((d, i) => {
    if (i != 0) {
      d3.select(".testing").append("tspan").text(", ");
    }

    d3.select(".testing")
      .append("tspan")
      .style("stroke", colour3) // COLOUR3
      .style("fill", colour3) // COLOUR3
      .style("opacity", 1)
      .text(d.label)
      .on("click", (e, k) => {
        focus_attribute(d, 'director');
      });
  });

  let sorter = [
    { name: "cast", keys: ["actor", "voice"] },
    { name: "crew", keys: ["writer", "dop", "editor", "composer", "producer"] },
    { name: "info", keys: ["genre", "rating", "colour", "aspect", "duration"] },
  ];

  let detail_body = {};

  sorter.forEach((d) => {
    let detail_role = {};
    Object.entries(data2).forEach((x) => {
      if (d["keys"].includes(x[0])) {
        detail_role[x[0]] = x[1];
      }
    });
    detail_body[d["name"]] = detail_role;
  });

  // Is there a point to collecting and then traversing?
  // the below code could probably be integrated above.

  let lowest_point = 0

  Object.entries(detail_body).forEach((d, i) => {

    let drop = 0;

    Object.entries(d[1]).forEach((e, j) => {
      d3.select("#canvas")
        .append("text")
        .attr("class", "castlabel")
        .attr("x", 200 + i * 500)
        .attr("y", drop * 20 + 400)
        .attr("opacity", 0)
        // .style("pointer-events", "all")
        .style("stroke", colour1)
        .style("fill", colour1)
        .attr("font-family", "Spartan")
        .attr("font-weight", 200)
        .text(e[0]);

      Object.entries(e[1]).forEach((f, k) => {
        d3.select("#canvas")
          .append("text")
          .attr("class", "casttext")
          .attr("x", 200 + i * 500 + 100)
          .attr("y", drop * 20 + 400)
          .attr("opacity", 0)
          .style("pointer-events", "all")
          .style("stroke", colour3)
          .style("fill", colour3)
          .attr("font-family", "Spartan")
          .attr("font-weight", 200)
          .text(f[1]["label"])
          .on("click", (d, k) => {
            focus_attribute(f[1], e[0]);
          });

        drop += 1;

        let new_low = drop * 20 + 400

        if (new_low > lowest_point) { return lowest_point = new_low }
      });
    });
  });

  d3.select("#canvas")
    .append("text")
    .attr("class", "editlink")
    .attr("x", 200)
    .attr("y", lowest_point + 50)
    .attr("opacity", 0)
    .style("pointer-events", "all")
    .style("stroke", colour1)
    .style("fill", colour1)
    .attr("font-family", "Spartan")
    .attr("font-weight", 200)
    .text('found an error? ')
    .append("tspan")
    .style("stroke", colour3)
    .style("fill", colour3)
    .attr("font-family", "Spartan")
    .attr("font-weight", 200)
    .text('edit the data.')
    .on("click", function () { window.open(data1.wikidata); })


  const distance = 15


  d3.select("#canvas")
    .append("line")
    .attr("class", "cross")
    .attr("x1", 0 + distance)
    .attr("x2", 20 + distance)
    .attr("y1", 20 + distance)
    .attr("y2", 0 + distance)
    .attr("opacity", 0)
    .style("stroke-width", "4px")
    .style("stroke", colour1)
    .style("fill", colour1);

  d3.select("#canvas")
    .append("line")
    .attr("class", "cross")
    .attr("x1", 20 + distance)
    .attr("x2", 0 + distance)
    .attr("y1", 20 + distance)
    .attr("y2", 0 + distance)
    .attr("opacity", 0)
    .style("stroke-width", "4px")
    .style("stroke", colour1)
    .style("fill", colour1);

  d3.select("#canvas")
    .append("rect")
    .attr("x", distance)
    .attr("y", distance)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", "aqua")
    .style("opacity", 0)
    .on("click", (e, k) => {
      // console.log("exit detail")
      d3.select(".detail_back").remove();
      d3.select(".headertext").remove();
      d3.select(".testing").remove();
      d3.selectAll(".castlabel").remove();
      d3.selectAll(".casttext").remove();
      d3.selectAll(".cross").remove();
      d3.selectAll(".editlink").remove();

    });

  d3.select(".headertext").transition().duration(5000).style("opacity", 1);
  d3.select(".testing").transition().duration(5000).style("opacity", 1);
  d3.selectAll(".castlabel").transition().duration(5000).style("opacity", 1);
  d3.selectAll(".casttext").transition().duration(5000).style("opacity", 1);
  d3.selectAll(".cross").transition().duration(5000).style("opacity", 1);
  d3.selectAll(".editlink").transition().duration(5000).style("opacity", 1);
}

async function draw_detail(data) {

  await draw_detail_window();
  let detail_wikidata = await detail_query(data);
  let detail_data = await parse_detail_data(detail_wikidata);
  await draw_head_text(data, detail_data);

}

async function draw_circles(data) {
  let colour1 = "#D8DBE2"; // background
  let colour2 = "#373F51"; // static
  let colour3 = "#58A4B0"; // active

  const row_length = 50;
  d3.select("#canvas")
    .selectAll("g")
    .data(data)
    .join("circle")
    .attr("class", "round")
    .attr("active", (d) => d.active = "neg")
    .attr('wikidata_id', (d) => d.wikidata = d.film)
    .attr("x_pos", (d, i) => (d.x = (i % row_length) * 24 + 100 + 10))
    .attr("y_pos", (d, i) => (d.y = Math.floor(i / row_length) * 24 + 100))
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 10)
    .style("opacity", 0)
    .on("mouseover", (k, d) => {

      if (d.active == 'neg') {
        draw_summary(k.x, k.y, d.label, d.director, d.film, 'aqua', '')

      } else {
        draw_summary(k.x, k.y, d.label, d.director, d.film, 'pink', '-focus')



      }

    })
    .on("mouseout", () => {
      d3.selectAll(".summary_box").remove();
      d3.selectAll(".summary_box-focus").remove();
      d3.selectAll(".summary_text1").remove();
      d3.selectAll(".summary_text2").remove();
      d3.selectAll(".summary_text1-focus").remove();
      d3.selectAll(".summary_text2-focus").remove();
    })
    .on("click", (e, k) => draw_detail(k));

  d3.selectAll(".round").transition("a").duration(500).style("opacity", 1);
}

async function pull_json(path) {
  return d3.json(path)
}

async function australian_filmography() {

  await setup_canvas();
  let dataset = await pull_json('https://raw.githubusercontent.com/paulduchesne/australian-film-data/main/cache/json/overview.json')
  let dataset2 = await parse_data(dataset)
  await draw_circles(dataset2);
  console.log("do something else");
}

australian_filmography();
