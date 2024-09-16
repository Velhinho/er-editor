function AttrConnection(source_shape, target_shape) {
  let link = new joint.shapes.erd.Line();

  link.attr({
    line: {
      stroke: 'orange'
    }
  });
  link.source(source_shape);
  link.target(target_shape);
  return link;
}

function set_attributes(shape, text_name) {
  shape.position(0, 0);
  let attr = {
    text: {
      text: text_name,
      fill: "white"
    }
  };
  shape.attr(attr);
  shape.attr(".outer/stroke", "none");
}

function Shape(shape_cons, size) {
  return (name) => {
    let shape = shape_cons();
    shape.size(size.x, size.y);
    set_attributes(shape, name);
    return shape;
  }
}

const Attribute = Shape(() => new joint.shapes.erd.Attribute(), {x: 80, y: 80});
const Entity = Shape(() => new joint.shapes.erd.Entity(), {x: 200, y: 80});
const WeakEntity = Shape(() => new joint.shapes.erd.WeakEntity(), {x: 200, y: 80});
const Relationship = Shape(() => new joint.shapes.erd.Relationship(), {x: 100, y: 100});


var namespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

var paper = new joint.dia.Paper({
  el: document.getElementById('myholder'),
  model: graph,
  width: 1280,
  height: 800,
  gridSize: 10,
  drawGrid: true,
  background: { color: 'white' },
  cellViewNamespace: namespace
});

function create_shape_handler(shape_cons) {
  return () => {
    let shape = shape_cons();
    shape.addTo(graph);
  }
}

function add_listener(elem_query, action) {
  document.querySelector(elem_query)
    .addEventListener("click", action);
}

const create_entity = create_shape_handler(() => Entity("entity"));
const create_relationship = create_shape_handler(() => Relationship("relationship"));
const create_attribute = create_shape_handler(() => Attribute("attribute"));
const create_weak_entity = create_shape_handler(() => WeakEntity("weak entity"));

add_listener("#create-entity-button", create_entity);
add_listener("#create-relationship-button", create_relationship);
add_listener("#create-attribute-button", create_attribute);
add_listener("#create-weak-entity-button", create_weak_entity);


var selected = [];

function change_name_handler(e) {
  if (selected.length == 1) {
    selected[0].attr({ text: { text: e.target.value } });
  }
}

const change_name_input = document.querySelector("#change-name-input");
change_name_input.addEventListener("input", change_name_handler);

function resetAll(paper) {
  paper.drawBackground({
    color: 'white'
  });

  var elements = paper.model.getElements();
  for (var i = 0, ii = elements.length; i < ii; i++) {
    var currentElement = elements[i];
    currentElement.attr('.outer/stroke', 'none');
  }

  var links = paper.model.getLinks();
  for (var j = 0, jj = links.length; j < jj; j++) {
    var currentLink = links[j];
    currentLink.attr('line/stroke', 'black');
    currentLink.label(0, {
      attrs: {
        body: {
          stroke: 'black'
        }
      }
    });
  }
}

paper.on('element:pointerdblclick', (elementView, event) => {
  if (event.shiftKey) {
    var currentElement = elementView.model;
    currentElement.attr('.outer/stroke', 'yellow');
    selected.push(currentElement);
  } else {
    resetAll(this);
    var currentElement = elementView.model;
    currentElement.attr('.outer/stroke', 'yellow');
    selected = [currentElement];
    change_name_input.value = currentElement.attr("text/text");
  }
});

paper.on('link:pointerdblclick', (linkView) => {
  console.log("selected link");
  var currentLink = linkView.model;
  currentLink.attr('line/stroke', 'orange');
});


document.addEventListener("keydown", event => {
  if (event.code === "Space") {
    event.preventDefault();
    let link = AttrConnection(selected[0], selected[1]);
    link.addTo(graph);
  } else if (event.code == "KeyD") {
    event.preventDefault();
    for (let element of selected) {
      element.remove();
    }
  }
});


let e = Entity("employee");
let a = Attribute("name");
e.addTo(graph);
a.addTo(graph);
let l = AttrConnection(e, a);
l.addTo(graph);