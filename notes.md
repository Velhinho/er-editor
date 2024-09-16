### Types
* checkable
  * model
  * shape
    * entity
    * relationship
    * attribute
    * weak-entity
  * connection
    * entity-relationship-conn
    * entity-attribute-conn
    * error-conn
* model-error

### Object Specifications
Primitives - checkable, model, shape, connection, model-error

model specification:
* (make-model) returns an empty model
* (add-shape! <model> <shape-type> <name>) adds a shape of <shape-type> with name <name> to the <model>, and
  returns this shape
* (connect <model> <shape1> <shape2> <connection-type>) adds connection of type <connection-type>
  between <shape1> and <shape2> to the <model>, and returns this connections
* (get-shape <model> <shape-type> <name>) returns nil or a shape of <shape-type> and name <name> from <model>
* (get-connection <model> <shape1> <shape2>) returns nil or the connection between <shape1> and <shape2>

shape specification:
* (get-name <shape>) returns the name of the shape

connection specification:
* (get-shapes <connection>) returns a list of the shapes bound by this connection
* (has-shape? <connection> <shape>) returns true if its binding <shape> to other shapes
* (add-shape! <connection> <shape>) adds shape to the list of shapes it's connecting

Global variables and functions:
* *model* the model being used
* (connect <shape> <shape>) adds two shapes and a connection to the model.
  And adds the shapes to the connection.
  The connection is a default connection based on the types of the shapes.
  For example, if it's an entity and an attribute then the default connection should be
  an entity-attribute-conn.
  Another example, if it's an entity and another entity then the default connection should be
  an error connection(?)
* (change-)

### ER diagram correctness rules
* All shapes have unique names
* All shapes have names
* There can only be one entity-relationship-conn for each entity and relationship

### ER diagram display rules
* Valid shapes have a white border
* Invalid shapes have a red border
* Invalid connections are cancelled and a warning is displayed
* Broken rules are stated and include the names of the invalid shapes
