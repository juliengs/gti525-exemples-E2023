// Exemples de code -- fonctions et prototypes

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.dist = function(point) {
	return Math.sqrt( (this.x - point.x) * (this.x - point.x)
			  + (this.y - point.y) * (this.y - point.y) );
    };
    return 0;	
};

Point.prototype.toString = function() {
    return "(" + this.x + "," + this.y + ")";
};

// Méthode new qui imite le comportement d'un constructeur
// (spécifique à Point)
Point.new = function() {
    var obj = Object.create(Point.prototype);
    this.apply(obj, arguments);
    return obj;	
};

// Méthode new qui imite le comportement d'un constructeur
// Fonctionnera pour toutes les fonctions puisqu'ajouté au
// prototype de function
Function.prototype.new = function() {
    var obj = Object.create(this.prototype);
    this.apply(obj, arguments);
    return obj;	
};

var add = function(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
};

var add2 = function(p1, p2) {
    var res = Object.create(this);
    res.x = p1.x + p2.x;
    res.y = p1.y + p2.y;
    return res;
};

let addAll = function( ) {
	var sum = new Point(0,0);
	for (var i=0; i<arguments.length; i++) {
		var  p = arguments[i];  
        console.log(p)
		if ( p.x==undefined || p.y==undefined ) {
			throw new TypeError("Object " + p + " is not of type Point");
        }
        sum.x += p.x;
        sum.y += p.y;
    }
    return p;
}

try {
    addAll( new Point(0,0), new Point(1,1), [] );
} catch (e) {
    console.log("Error invoking addAll : " + e.toString())
}

var p1 = new Point(2, 3);
var p2 = new Point(5, 7);
console.log(Object.getPrototypeOf(p1) == Object.getPrototypeOf(p2));
console.log(Object.getPrototypeOf(p1).constructor);

// Utilisation de Point.new au lieu du constructeur
p1 = Point.new(2, 3);
p2 = Point.new(5, 7);
console.log(p1);
console.log(p2);
console.log(Object.getPrototypeOf(p1) == Object.getPrototypeOf(p2));
console.log(Object.getPrototypeOf(p1).constructor);

console.log( "Distance entre p1 et p2 = " + p1.dist(p2) );
var res1 = add(p1, p2);
console.log( "Somme de p1 et p2 = res1 =  " + res1 ); 

var Points = [ p1, p2 ];
var res2 = add2.apply( Object.getPrototypeOf(p1), Points);
console.log("Invocation de add2 sur p1 et p2 = res2 = " + res2);

var res3 = add2.call( Object.getPrototypeOf(p1), p1, p2 );
console.log("Invocation de add2 sur p1 et p2 = res3 = " + res3);

var res4 = addAll(p1, p2, res1, res2, res3);
console.log("Invocation de addAll sur p1,p2, res1, res2 and res3 = res4 = " + res4);

try {
	var res5 = addAll(p1, p2, "notapoint", res2, res3);
} catch (e) {
	console.log(e.name + " : " + e.message);
	res5 = e.result;
};
console.log("Invocation de addAll sur p1,p2, res1, res2 et res3 = res5 = " + res5);

