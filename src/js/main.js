function View (data) {
    this.data = data;
    this.el = $('<div></div>');
}

var rawData = [
    { id: 1, title: 'ELECTRIFYING', description: 'We perform Tribal Style Bellydancing, Krump Dancing, and Breakdancing.', images: ['images/bellydance_1.jpg', 'images/bellydance_2.jpg','images/bellydance_3.jpg'] },
    { id: 2, title: 'DYNAMIC', description: 'We perform Aerial Lyra (hoop) and Aerial Silks.', images: ['images/aerialists_1.jpg','images/aerialists_2.jpg','images/aerialists_3.jpg'] },
    { id: 3, title: 'MYSTERIOUS', description: 'We have shows with Acrobalance, Fire, Clowns and more.', images: ['images/poi_2.jpg','images/acrobalance_2.jpg','images/clown_1.jpg']}
];

var collection = new Backbone.Collection(rawData);

// How to select first pic in first model
// console.log(collection.models[1].attributes.images[0]);
// collection.at(1).get('images')[0]
// collection.models[i].attributes.images[j]

function AppView (collection) {
	var _this = this;

	this.el = $('<div></div>', {
		class:'eventButtons'
	});

	this.collection = collection;
	this.fullView = new FullView();

	this.fullView.setModel(this.collection.first());

	this.el.on('click', 'button', function (e) {
		var model = _this.collection.find({
			id: +e.target.getAttribute('data-id')
		});
		_this.fullView.setModel(model);
	});
}

AppView.prototype.render = function () {
	var buttons = this.collection.map(function (model) {
		return '<button data-id="' + model.get('id') + '">' + model.get('title') + '</button>';
	}).join('');

	this.el.html(`
		<div class="fullImage-container"></div>
		<div class="eventButtons">${buttons}</div>
	`);

	this.fullView.render();

	this.el.find('.fullImage-container').append(this.fullView.el);
}

function SlideView (url) {
	var _this = this;
	this.url = url;
	this.el = $('<div/>', { class: 'slide' });
}

SlideView.prototype = Object.create(View.prototype);

SlideView.prototype.render = function () {
	var _this = this;

	this.el.css('background-image', 'url(' + this.url + ')');
};

SlideView.prototype.fadeIn = function () {
	this.el.fadeIn();
};

SlideView.prototype.fadeOut = function () {
	this.el.fadeOut();
};

// var slideView = new SlideView("images/poi_2.jpg");

// slideView.render();
// $(document.body).append(slideView.el);

// // FullView

function FullView() {
    var _this = this;

    this.childViews = [];
    this.currentIndex = 0;

    this.el = $('<div/>', { class: 'full' });

    // start some timer (setInterval) that will change classes after some time
    setInterval(function () {
    	_this.hideCurrentImage();
    	if (_this.currentIndex === _this.model.get('images').length - 1) {
    		_this.currentIndex = 0;
    	} else {
    		_this.currentIndex++;
    	}
        _this.showCurrentImage();
    }, 5000);
    
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
	var _this = this;

	this.childViews = [];

    // set up the template
    var images = this.model.get('images');
    this.el.html(`
        <div class="fullImage-info">
            <h3>${this.model.get('title')}</h3>
            <p>${this.model.get('description')}</p>
        </div>
        <div class="fullImage-slides"></div>
    `);
    
    images.forEach(function (url) {
        var singleImage = new SlideView(url);
        _this.childViews.push(singleImage);
        // render and append to .fullImage-slide
        singleImage.render();
        _this.el.find('.fullImage-slides').append(singleImage.el);
    });

    // Show the first SlideView
    _this.childViews[0].fadeIn();
};

FullView.prototype.hideCurrentImage = function () {
	this.childViews[this.currentIndex].fadeOut();
};

FullView.prototype.showCurrentImage = function (url) {
	this.childViews[this.currentIndex].fadeIn();
};

var appView = new AppView(collection);

appView.render();

$(document.body).append(appView.el);
var appView = new AppView();

	
appView.render();

$('#carousel-container').append(appView.el);
