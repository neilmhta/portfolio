var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    this.txt = fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 45 - Math.random() * 15;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        if (this.loopNum < this.toRotate.length - 1) {
            delta = this.period;
        }
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // INJECT CSS
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #000 }';
    document.body.appendChild(css);

    // Determine the delay for the color transition based on your typing transition
    var typingSpeed = 45; // Adjust this value based on your typing speed
    var fullTxt = elements[elements.length - 1].getAttribute('data-type');
    var colorTransitionDelay = fullTxt.length * typingSpeed;

    setTimeout(function() {
        document.body.style.transition = 'background-color 1s ease, color 1s ease';
        document.body.style.backgroundColor = '#eef2e4'; // Replace with desired background color
        document.body.style.color = 'black'; // Replace with desired text color
    }, colorTransitionDelay);
};
