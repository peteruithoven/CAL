export default class Vector {
	constructor (x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	identity () {
		this.x = 0;
		this.y = 0;

		return this;
	}

	set (x, y) {
		this.x = x;
		this.y = y;

		return this;
	}

	copy (vector) {
		this.set(vector.x, vector.y);

		return this;
	}

	add (vector) {
		let x = this.x + vector.x;
		let y = this.y + vector.y;

		return new Vector(x, y);
	}

	subtract (vector) {
		let x = this.x - vector.x;
		let y = this.y - vector.y;

		return new Vector(x, y);
	}

	scale (scalar) {
		let x = this.x * scalar;
		let y = this.y * scalar;

		return new Vector(x, y);
	}

	rotate (angle) {
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);

		let x = cos*this.x - sin*this.y;
		let y = sin*this.x + cos*this.y;

		return new Vector(x, y);
	}

	multiply (vector) {
		let x = this.x * vector.x;
		let y = this.y * vector.y;

		return new Vector(x, y);
	}

	setLength (length) {
		return new Vector().copy(this).normalize().scale(length);
	}

	length () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normal () {
		return new Vector(this.y, -this.x);
	}

	normalize () {
		let length = this.length();

		let x = this.x / length;
		let y = this.y / length;

		return new Vector(x, y);
	}

	angle () {
		return Math.atan2(this.y, this.x);
	}

	dot (vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	cross (vector) {
		return this.x * vector.y - this.y * vector.x;
	}

	round () {
		let x = Math.round(this.x);
		let y = Math.round(this.y);

		return new Vector(x, y);
	}

	applyMatrix (matrix) {
		let m = matrix.matrix;

		let x = m[0]*this.x + m[1]*this.y + m[2];
		let y = m[3]*this.x + m[4]*this.y + m[5];

		return new Vector(x, y);
	}

	distanceTo (vector) {
		return this.subtract(vector).length();
	}

	clone () {
		return new Vector().copy(this);
	}

	equals (vector) {
		return this.x === vector.x && this.y === vector.y;
	}

	draw (context, x = 0, y = 0) {
		let end = new Vector(this.x + x, this.y + y);
		let arrowOrigin = new Vector(x, y).add(this.subtract(this.normalize().scale(10)));
		let left = this.normal().normalize().scale(10).add(arrowOrigin);
		let right = this.normal().normalize().scale(-10).add(arrowOrigin);

		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(end.x, end.y);
		context.moveTo(left.x, left.y);
		context.lineTo(end.x, end.y);
		context.lineTo(right.x, right.y);

		context.stroke();
	}

	toJSON () {
		return {
			metadata: {
				library: 'CAL',
				type: 'Vector'
			},
			x: this.x,
			y: this.y
		};
	}

	fromJSON (json) {
		this.copy(json);
	}
};
