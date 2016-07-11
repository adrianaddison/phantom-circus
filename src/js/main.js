function View (data) {
    this.data = data;
    this.el = $('<div></div>');
}

var rawData = [
    { id: 1, title: 'ELECTRIFYING', description: 'We perform Tribal Style Bellydancing, Krump Dancing, and Breakdancing.', images: ['images/bellydance_1.jpg', 'images/bellydance_2.jpg','images/bellydance_3.jpg'] },
    { id: 2, title: 'DYNAMIC', description: 'We perform Aerial Lyra (hoop) and Aerial Silks.', images: ['images/aerialists_1.jpg','images/aerialists_2.jpg','images/aerialists_3.jpg'] },
    { id: 3, title: 'MYSTERIOUS', description: 'We have shows with Acrobalance, Fire, Clowns and more.', images: ['images/poi_2.jpg','images/acrobalance_2.jpg','images/clown_1.jpg']}
];

var ImageModel = Backbone.Model.extend({
    defaults: {
        title: '',
        description: '',
        images: []
    }
});

var ImageCollection = Backbone.Collection.extend({
    model: ImageModel
});

var collection = new ImageCollection(rawData);

// How to select first pic in first model
// console.log(collection.models[1].attributes.images[0]);
// collection.at(1).get('images')[0]
// collection.models[i].attributes.images[j]

var AppView = Backbone.View.extend({
    className: 'carousel',

    events: {
        'click button': 'handleButtonClick'
    },

    initialize: function () {
        this.fullView = new FullView();
        this.fullView.setModel(this.collection.first());
    },

    render: function () {
        this.$el.html(this.template());
        this.$('.fullImage-container').append(this.fullView.$el);
        this.fullView.render();
    },

    template: function () {
        var buttons = this.collection.map(function (model) {
            return '<button data-id="' + model.get('id') + '">' + model.get('title') + '</button>';
        }).join('');

        return `
            <div class="fullImage-container"></div>
            <div class="eventButtons">${buttons}</div>
        `;
    },

    handleButtonClick: function (e) {
        var model = this.collection.find({
            id: + e.target.getAttribute('data-id')
        });
        this.fullView.setModel(model);
    }

});

var SlideView = Backbone.View.extend({

    className: 'slide',

    initialize: function (options) {
        this.url = options.url;
    },

    render: function () {
        this.$el.css('background-image', 'url(' + this.url + ')');   
    },

    fadeIn: function () {
        var _this = this;
        setTimeout(function () {
            _this.$el.addClass('active');
        }, 100);
    },

    fadeOut: function () {
        var _this = this;
        setTimeout(function () {
            _this.$el.removeClass('active');
        }, 100);
    }

});

// var slideView = new SlideView("images/poi_2.jpg");

// slideView.render();
// $(document.body).append(slideView.el);

// // FullView

var FullView = Backbone.View.extend({

    className: 'full',

    initialize: function () {
        var _this = this;

        this.childViews = [];
        this.currentIndex = 0;
    },

    startInterval: function () {
        var _this = this;

        // Clear the id of the timer that was there previously
        if (this.interval) {
            clearInterval(this.interval);
        }

        // Start a new timer and store its id (so we can clear it later)
        this.interval = setInterval(function () {
            // Call the this.cycle function every 5s
            _this.cycle();
        }, 5000);
    },

    setModel: function (model) {
        var _this = this;

        this.currentIndex = 0;
        this.model = model;

        this.startInterval();

        // If we are re-rendering (had child views)
        if (this.childViews.length > 0) {
            // Hide the current SlideView
            this.hideCurrentImage();
            // And wait for it to animate out
            setTimeout(function () {
                _this.render();
            }, 250);

            return;
        }

        this.render();
    },

    render: function () {
        var _this = this;

        this.childViews = [];

        this.$el.html(this.template({
            title: this.model.get('title'),
            description: this.model.get('description')
        }));

        var images = this.model.get('images');

        images.forEach(function (url) {
            var singleImage = new SlideView({ url: url });
            _this.childViews.push(singleImage);
            // render and append to .fullImage-slide
            singleImage.render();
            _this.$('.fullImage-slides').append(singleImage.el);
        });

        this.showCurrentImage();
    },

    template: function (data) {
        // set up the template
        return `
            <div class="fullImage-info">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            </div>
            <div class="fullImage-slides"></div>
        `;
    },

    cycle: function () {
        this.hideCurrentImage();
        if (this.currentIndex === this.model.get('images').length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.showCurrentImage();
    },

    hideCurrentImage: function () {
        this.childViews[this.currentIndex].fadeOut();
    },

    showCurrentImage: function () {
        this.childViews[this.currentIndex].fadeIn();
    }

});

var appView = new AppView({ collection: collection });

appView.render();

$('.carousel-container').append(appView.el);
