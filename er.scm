; Diagram Model
(define (make-model)
  (let ((shape-list '()) (meta-model (make-meta-model)))
    (define (add-shape! shape)
      (set! shape-list (cons shape shape-list))
      (check-shapes meta-model shape-list))
    (define (dispatch m)
      (cond ((eq? m 'add-shape!) add-shape)
            (else (error "unknown operation: model" m))))
    dispatch))

(define *model* (make-model))

(define (add-shape! shape)
  ((*model* 'add-shape!) shape))

(define (make-entity name)
  (let ((entity (list 'entity name)))
    (add-shape! entity)))

(define (make-attribute name)
  (let ((attribute (list 'attribute name)))
    (add-shape! attribute)))

(define (attribute-entity-conn entity attribute)
  (let ((conn (list 'attr-entity-conn entity attribute)))
    (add-conn! conn)))

(define (check-inconsistencies model)
  (cond ((duplicate-name? model) (add-inconsistency (list 'duplicate-name )))
  ))

; FIXME
; how to check for inconsistencies?
; meta-model contains the rules that define a correct model
; maybe the combinators should receive three elements: the two shapes and one constraint
; that way constraints are also primitive elements

(add-shape! model (create-entity "person"))
(change-shape-name! (get-shape "person") "employee")
(display-model model)
(get-inconsistencies model)
