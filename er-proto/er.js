function Entity(graph, name) {
  let entity = new joint.shapes.standard.Rectangle();
  entity.position(0, 0);
  entity.resize(100, 100);
  entity.attr({
    body: {
      fill: 'lightblue'
    },
    label: {
      text: name,
      fill: 'white'
    }
  });
  entity.addTo(graph);
  return entity;
}

function Attribute(graph, name) {
  let attribute = new joint.shapes.standard.Circle();
  attribute.position(0, 0);
  attribute.resize(200, 80);
  attribute.attr({
    body: {
      fill: 'orange'
    },
    label: {
      text: name,
      fill: 'white'
    }
  });
  attribute.addTo(graph);
  return attribute;
}

function linkAttr(entity, attribute) {
  let link = new joint.shapes.standard.Link();
  link.source(entity);
  link.target(attribute);
  return link;
}

var namespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1280,
    height: 800,
    gridSize: 10,
    drawGrid: true,
    background: { color: 'lightblue' },
    cellViewNamespace: namespace
});

var rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40);
rect.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect.addTo(graph);

var rect2 = rect.clone();
rect2.translate(300, 0);
rect2.attr('label/text', 'World!');
rect2.addTo(graph);

var link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);

let employee = Entity(graph, 'Employee');
let number = Attribute(graph, 'Number');
let name = Attribute(graph, 'Name');
let skills = Attribute(graph, 'Skills');

let l = linkAttr(employee, skills);
l.addTo(graph);

document.querySelector('#create-entity-button').addEventListener('click', () => {
  let newEntity = Entity(graph, 'woah');
});