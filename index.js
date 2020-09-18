const FIELD = document.querySelector('.field');
const BALL_ELEMENTS = [['div', '#214BF2'], ['span', '#1CECBB'], ['p', '#E58F1F'], ['a', '#E23FB7'], ['b', '#EBFB10'], ['i', '#75E23F']];
const LEFT_POST = document.querySelector('#left-post');
const RIGHT_POST = document.querySelector('#right-post');

BALL_ELEMENTS.forEach(element => {
    const NODE = document.createElement(element[0]);
    const NODE_TEXT = document.createTextNode(element[0]);

    NODE.appendChild(NODE_TEXT);

    FIELD.appendChild(NODE);

    const DRAGABLE_El = document.querySelector(`.field ${element[0]}`);

    DRAGABLE_El.classList.add("ball");
    DRAGABLE_El.setAttribute('draggable', true);
})


function Draggable(elem, bgColor) {
    let el = document.querySelector(`.field ${elem}`),
        isDragReady = false,
        dragoffset = {
            x: 0,
            y: 0
        };

    this.init = function () {
        this.initPosition();
        this.events();
    };
    
    this.initPosition = function () {
        el.style.cursor= 'move';
        el.style.position = "absolute";
        el.style.backgroundColor = bgColor;
        // Math.round(6.5625 * 10000) to handle js decimal calculation errors
        el.style.top = `calc(${Math.floor(Math.random() * ((Math.round(100 * 10000) - Math.round(6.5625 * 10000) + Math.round(1 * 10000)) ) + Math.round(6.5625 * 10000)) / 10000}% - 42px)`;
        el.style.left = `calc(${Math.floor(Math.random() * ((Math.round(100 * 10) - Math.round(3.5 * 10) + Math.round(1 * 10)) ) + Math.round(3.5 * 10)) / 10}% - 42px)`;
    };
    //events for the element
    this.events = function () {

        _on(el, 'mousedown', function (event) {
            event.preventDefault()
            isDragReady = true;
            //crossbrowser mouse pointer values
            event.pageX = event.pageX || event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : FIELD.scrollLeft);
            event.pageY = event.pageY || event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : FIELD.scrollTop);
            dragoffset.x = event.pageX - el.offsetLeft;
            dragoffset.y = event.pageY - el.offsetTop;
        });

        _on(document, 'mouseup', function () {
            isDragReady = false;
        });

        _on(document, 'mousemove', function (event) {
            event.preventDefault()
            if (isDragReady) {
                event.pageX = event.pageX || event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : FIELD.scrollLeft);
                event.pageY = event.pageY || event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : FIELD.scrollTop);
                // left/right constraint
                if (event.pageX - dragoffset.x < 0) {
                    offsetX = 0;
                } else if (event.pageX - dragoffset.x + 42 > FIELD.clientWidth) {
                    offsetX = FIELD.clientWidth - 42;
                } else {
                    offsetX = event.pageX - dragoffset.x;
                }

                // top/bottom constraint   
                if (event.pageY - dragoffset.y < 0) {
                    offsetY = 0;
                } else if (event.pageY - dragoffset.y + 42 > FIELD.clientHeight) {
                    offsetY = FIELD.clientHeight - 42;
                } else {
                    offsetY = event.pageY - dragoffset.y;
                }

                el.style.top = offsetY + "px";
                el.style.left = offsetX + "px";
            }
        });
    };

    //cross browser event Helper function
    let _on = function (el, event, fn) {
        document.attachEvent ? el.attachEvent('on' + event, fn) : el.addEventListener(event, fn, !0);
    };

    this.init();
}

BALL_ELEMENTS.forEach(element => new Draggable(element[0], element[1]));