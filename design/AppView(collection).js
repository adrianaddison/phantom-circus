function AppView(collection) {
	var _this = this;
}

this.el.on('click', 'button', function () {
	this.fullView.show(collection.filter())
	// get the category from the button -- how?
});

AppView.prototype.render = function () {
	var _this = this;
}

this.el.html(`
	<div class="fullImage-container"></div>
	<div class="eventButtons">
		<button data-category="dance">Dance</button>
		<button>Aero</button>
		<button>Other</button>
	</div>	
`)

SlideView.render
this.el.css('background-image', 'url(' + this.data + ')')

var fullView = new FullView();

fullView.render();

fullView.show(firstCategoryModels);

this.el.find('.fullImage-container').append(fullView.el);