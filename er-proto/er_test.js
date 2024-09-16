let e = new Entity("employee");
let a = new Attribute("name");
e.jointjs_shape().addTo(graph);
a.jointjs_shape().addTo(graph);
let l = new AttrConnection(e, a);
l.jointjs_link().addTo(graph);