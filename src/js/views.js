var rawData = [
	{ id: 1, title: 'Dance', description: 'We perform Tribal Style Bellydancing, Krump Dancing, and Breakdancing.', images: ['images/bellydance_1.jpg', 'images/bellydance_2.jpg','images/bellydance_3.jpg'] },
	{ id: 2, title: 'Aerial', description: 'We perform Aerial Lyra (hoop) and Aerial Silks.', images: ['images/aerialists_1.jpg','images/aerialists_2.jpg','images/aerialists_3.jpg'] },
	{ id: 3, title: 'Other', description: 'We have shows with Acrobalance, Fire, Clowns and more.', images: ['images/poi_2.jpg','images/acrobalance_2.jpg','images/clown_1.jpg']}
];

var collection = new Backbone.Collection(rawData);

function AppView(collection) {
	var _this = this;

	this.el = $('<div></div>', {
		class: 'eventButtons'
	});
	this.collection = collection;

	this.el.on('click', '.button', function (e) {
		var model = this.collection.find({
			id: e.target.getAttribute('data-id')
		});
		_this.fullView.setModel(model);
	})
}

// this.el.on('click', 'button', function () {
// 	this.fullView.show(collection.filter())
// 	// get the category from the button -- how?
// });

AppView.prototype.render = function () {
	var _this = this;

	this.el.html(`
	<div class="fullImage-container"></div>
	<div class="eventButtons">
		<button data-category="dance">Dance</button>
		<button>Aero</button>
		<button>Other</button>
	</div>	
	`)

	var defaultModel = this.collection.first();
}

var appView = new AppView(collection);

// // inside of app view constructor
// this.el.on('click', '.button', function (e) {
// 	this.collection.find({ id: e.target.getAttribute('data-id') })
// })

// inside of app view .render
// var defaultModel = this.collection.first();
// var defaultModel = this.collection.find({ id: 1 })


// FullView

function FullView() {
	var _this = this;
	
	this.currentIndex = 0;

	// start some timer (setInterval) that will change
	setInterval(function () {
		_this.showNextImage();
	}, 5000);
	// classes after some time
}

FullView.prototype.setModel = function (model) {
	// clear out content
	this.currentIndex = 0;
	this.model = model;
	this.render();
	// 
	// create all the SingleImageViews
};

FullView.prototype.render = function () {
	// set up the template
	var images = this.model.get('images');
	this.el.html(`
		<div class="fullImage-info">
			<h3>${this.model.get('title')}</h3>
			<p>${this.model.get('description')}</p>
		</div>
		<div class="fullImage-slides">
		</div>
	`);
	
	images.forEach(function (url) {
		var singleImage = new SlideView(url);
		// render and append to .fullImage-slide
		slideView.render()
		this.el.find('.fullImage-slides').append(slideView.el)
	});
};

FullView.prototype.showNextImage = function (url) {
	this.currentIndex++;
	var currentPic = this.el.find('.fullImage-container');
	currentPic.css('background-image', 'url(' + url + ')');


	this.collection.each(function () {
	// create and append a button with the corresponding model's title/id
	// <button data-id="1">Dance</button>
	this.el = collection;
	this.el.html(`
		<div class="eventButtons">
			<button>Dance</button>
			<button>Aerial</button>
			<button>Other</button>
		</div>
		`)
});
};



fullView.swap(defaultModel);
this.el.find('.fullImage-container').append(fullView.el);
var fullView = new FullView();

//
//
function SlideView (model) {
	var _this = this;
	this.model = model;
	model.on('change', this.render.bind(this));
}


SlideView.prototype.render = function () {
	var _this = this;

	this.el.css('background-image', 'url(' + this.data + ')')
}


// var fullView = new FullView();

// fullView.render();

// fullView.show(firstCategoryModels);

// this.el.find('.fullImage-container').append(fullView.el);