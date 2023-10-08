"use strict";

import './main.css';
//import socket from './socket.js';

const GLOBAL = {
    loading: false,
    screen_width: window.screen.width,
    JWT: null,
    user: null,
    account_interval: null
}

document.addEventListener('DOMContentLoaded', () => {
    //alert(`screen inner height is ${window.innerHeight} --- screen outer height is ${window.outerHeight}`)
    //alert(`screen height is ${window.innerHeight} --- div height is ${document.querySelector('#hero-slideshow').offsetHeight}`)
});

function sanitize(str) { return str }

function delay(delay_value) { return new Promise(resolve => setTimeout(resolve, delay_value)) }

function loader() {

    GLOBAL.loading = true;

    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'hidden';
    loader.innerHTML = `
        <div>
            <img src="images/logo.png" alt="logo">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="600.000000pt" height="600.000000pt" viewBox="0 0 600.000000 600.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"  stroke="none">
                <path d="M1400 5963 c0 -3 9 -17 21 -31 32 -42 199 -320 199 -331 0 -14 -15 -14 -78 3 l-53 13 15 -21 c9 -11 31 -43 50 -71 69 -99 67 -97 106 -84 19 7 42 18 50 25 8 7 18 13 22 14 13 2 103 43 108 49 3 3 12 7 20 9 8 1 25 7 37 13 35 18 51 6 23 -18 -29 -25 -485 -388 -509 -406 -9 -7 -38 -63 -63 -126 l-47 -114 30 -78 c33 -85 35 -66 -20 -191 -12 -26 -21 -54 -21 -62 0 -8 -4 -17 -9 -20 -5 -3 -12 -18 -15 -32 -4 -14 -18 -49 -31 -77 -14 -28 -21 -53 -16 -56 4 -3 16 -21 25 -39 l17 -33 73 41 c113 62 122 53 51 -50 -44 -63 -46 -64 -86 -61 l-41 3 50 -64 c42 -53 55 -63 83 -65 25 -2 41 -12 62 -38 l29 -35 149 0 c168 0 164 3 128 -78 -35 -78 -37 -84 -70 -167 -17 -44 -37 -96 -46 -115 -8 -19 -19 -44 -23 -55 -4 -11 -18 -42 -30 -69 -19 -44 -20 -54 -10 -121 6 -40 13 -95 15 -122 5 -55 20 -173 41 -323 14 -101 20 -154 23 -213 1 -19 48 -85 161 -226 87 -109 172 -208 187 -220 15 -12 79 -59 141 -105 l112 -83 65 -124 c72 -138 100 -197 110 -229 7 -22 7 -22 -16 -5 -13 10 -67 68 -119 130 -54 63 -108 117 -125 124 -16 7 -39 16 -50 21 -11 4 -41 18 -68 30 -26 13 -49 21 -51 19 -2 -2 2 -88 9 -191 8 -126 17 -194 26 -207 13 -19 127 -175 257 -351 31 -41 59 -79 63 -83 4 -5 14 17 23 50 33 117 48 169 56 193 4 14 34 117 65 230 32 113 66 223 77 245 l19 40 -5 -55 c-2 -30 -9 -86 -15 -125 -13 -76 -48 -320 -61 -425 -5 -36 -14 -104 -21 -152 -9 -70 -9 -91 1 -103 7 -8 17 -15 23 -15 5 0 67 -36 137 -80 70 -44 130 -80 134 -80 3 0 6 13 6 29 0 16 5 42 10 57 6 15 19 68 30 118 11 50 22 100 25 111 2 12 22 48 44 82 21 33 50 81 64 106 14 24 55 92 91 149 36 58 66 111 66 117 0 6 5 11 10 11 6 0 10 7 10 15 0 8 4 15 9 15 5 0 11 8 15 18 6 18 27 53 37 62 12 11 191 319 189 326 -1 4 3 10 8 13 5 3 34 45 65 93 31 49 61 88 67 88 15 0 12 -11 -10 -48 -11 -18 -20 -37 -20 -43 0 -6 -11 -35 -25 -65 -14 -30 -25 -59 -25 -63 0 -5 -9 -26 -20 -48 -31 -61 -60 -126 -60 -134 0 -4 -16 -42 -35 -83 -19 -42 -35 -78 -35 -81 0 -2 -11 -28 -24 -57 -20 -44 -52 -119 -84 -198 -4 -12 -3 -13 9 -4 8 6 66 38 129 71 384 201 567 298 645 344 17 10 59 32 95 50 36 18 68 35 73 37 4 2 7 -3 7 -12 0 -9 -3 -16 -7 -16 -8 0 -52 -32 -192 -137 -35 -26 -71 -52 -81 -58 -10 -5 -37 -23 -60 -40 -23 -16 -76 -54 -118 -84 -42 -30 -99 -70 -127 -90 -27 -20 -57 -41 -66 -46 -9 -6 -51 -35 -94 -65 -42 -30 -93 -66 -114 -80 -20 -14 -58 -41 -83 -60 -26 -19 -76 -55 -111 -80 -64 -45 -64 -45 -82 -120 -9 -41 -23 -97 -30 -125 -17 -67 -37 -176 -33 -180 17 -15 170 -105 178 -105 5 0 10 -4 10 -8 0 -5 18 -17 40 -28 22 -10 40 -22 40 -26 0 -5 4 -8 9 -8 6 0 39 -18 75 -41 l65 -41 123 -3 c68 -2 177 -6 243 -10 66 -3 203 -7 305 -10 l185 -6 32 43 c18 24 43 54 56 68 13 14 37 43 53 66 16 22 61 78 100 124 83 99 87 106 107 185 9 33 32 123 52 200 20 77 54 212 76 300 22 88 43 169 46 180 3 13 -12 3 -46 -29 -28 -28 -53 -47 -56 -45 -4 5 -70 316 -80 379 -11 72 -20 121 -56 296 -21 104 -41 210 -44 234 -3 24 -10 64 -16 89 -22 96 -80 387 -85 421 -2 19 -20 113 -40 208 -19 95 -37 184 -38 198 -2 19 -29 41 -129 104 -70 44 -131 80 -137 80 -5 0 -10 4 -10 10 0 5 -11 12 -25 16 -14 3 -25 10 -25 15 0 5 -6 9 -14 9 -8 0 -16 4 -18 8 -1 5 -46 34 -98 64 -52 31 -120 72 -150 91 l-54 35 -12 -26 c-20 -47 -41 -96 -54 -132 -7 -19 -17 -39 -22 -44 -22 -26 -28 11 -53 379 l-5 70 -149 146 -149 146 -4 205 c-4 201 -5 206 -32 259 -16 30 -34 61 -42 70 -8 8 -14 18 -14 22 0 3 -50 90 -110 194 -77 131 -124 201 -158 232 -113 106 -323 304 -421 398 l-106 102 -13 -37 c-8 -20 -23 -62 -34 -92 -11 -30 -24 -64 -28 -75 -5 -11 -19 -50 -31 -87 -14 -42 -28 -68 -37 -68 -8 0 -51 17 -96 39 -44 21 -117 55 -161 76 -199 94 -317 150 -407 194 -54 26 -98 46 -98 44z m970 -255 c17 -28 36 -60 64 -113 12 -22 40 -68 64 -103 23 -35 42 -67 42 -71 0 -4 10 -18 23 -31 12 -14 20 -25 17 -25 -5 -1 76 -148 103 -187 6 -9 8 -21 3 -25 -7 -7 -60 46 -196 196 -63 69 -55 68 -198 35 -35 -8 -66 -14 -69 -14 -7 0 6 67 17 89 4 9 18 48 30 86 59 189 70 208 100 163z m-310 -825 c0 -10 -89 -50 -207 -94 l-92 -34 -11 -50 c-7 -27 -14 -58 -17 -67 -5 -19 -38 -24 -48 -8 -3 5 -14 14 -25 20 -15 8 -27 -2 -81 -70 -62 -79 -79 -93 -79 -66 0 27 145 311 160 313 8 1 67 11 130 23 63 12 133 24 155 26 22 3 42 7 44 10 8 7 71 4 71 -3z m-56 -108 c-4 -8 -9 -15 -13 -15 -4 0 -39 -27 -79 -60 -72 -61 -92 -71 -92 -46 0 42 22 67 87 100 75 38 106 45 97 21z m746 -10 c0 -2 -10 -26 -22 -52 -55 -122 -68 -152 -93 -213 -34 -83 -51 -120 -86 -197 -16 -34 -29 -64 -29 -67 0 -3 -16 -40 -36 -83 -42 -90 -44 -94 -83 -188 -32 -76 -58 -94 -53 -35 2 19 10 64 18 100 15 65 35 173 58 307 7 39 19 79 27 89 8 10 22 28 31 39 80 96 223 273 232 288 10 15 36 24 36 12z m611 -1227 c-18 -51 -37 -104 -43 -118 -13 -30 -17 -40 -58 -150 -18 -47 -36 -94 -40 -105 -4 -11 -13 -36 -20 -55 -7 -19 -20 -53 -30 -75 -9 -22 -23 -58 -31 -80 -7 -22 -16 -44 -20 -50 -3 -5 -12 -32 -20 -59 -15 -54 -17 -56 -367 -410 -137 -138 -198 -193 -200 -181 -2 9 5 27 16 38 20 21 56 73 237 343 43 66 82 121 85 124 20 19 103 151 160 255 15 28 36 66 47 85 11 19 33 60 49 90 16 30 31 57 34 60 3 3 25 43 49 90 24 47 52 96 61 110 9 14 27 45 39 70 51 102 68 127 79 115 2 -2 -10 -46 -27 -97z"/>
                <path d="M1772 1653 c-23 -33 -38 -63 -35 -67 5 -5 171 -522 187 -586 3 -8 5 -16 6 -17 2 -2 3 -6 5 -10 19 -72 16 -69 165 -168 58 -39 107 -72 110 -76 3 -3 22 -15 43 -28 21 -13 43 -28 50 -34 6 -7 30 -24 52 -39 22 -15 81 -55 131 -90 51 -35 138 -94 195 -133 57 -38 106 -73 107 -77 2 -5 10 -8 17 -8 7 0 15 -3 17 -7 2 -5 41 -34 88 -66 47 -31 103 -70 125 -87 22 -16 47 -33 55 -37 8 -4 32 -19 53 -34 35 -26 44 -27 190 -33 199 -7 420 -15 637 -21 96 -3 230 -8 296 -11 l121 -6 49 64 c27 34 54 69 61 76 7 7 29 34 50 60 21 26 40 49 43 52 3 3 27 33 53 66 l46 61 -50 149 c-28 82 -53 159 -56 172 -6 23 -23 31 -23 9 0 -6 -17 -31 -37 -53 -21 -23 -74 -87 -118 -142 -44 -56 -85 -103 -92 -106 -6 -3 -96 -1 -200 4 -103 5 -260 11 -348 14 -461 16 -445 15 -500 48 -234 144 -408 248 -416 248 -5 0 -9 5 -9 10 0 6 -5 10 -10 10 -6 0 -46 22 -90 50 -44 27 -82 50 -84 50 -3 0 -48 27 -100 60 -53 33 -100 60 -106 60 -5 0 -10 5 -10 10 0 6 -5 10 -10 10 -6 0 -46 22 -90 50 -44 27 -82 50 -86 50 -10 0 -31 25 -68 81 -20 30 -52 77 -72 104 -19 28 -67 96 -107 153 -40 57 -94 134 -122 172 -27 37 -55 76 -61 86 -9 16 -16 11 -52 -43z"/>
                <path d="M1965 615 c-22 -13 -69 -31 -105 -41 -36 -9 -70 -22 -76 -28 -13 -13 -37 -192 -29 -207 4 -5 14 -9 23 -9 9 0 35 -7 57 -15 57 -20 59 -20 80 28 55 127 66 146 87 153 13 3 30 12 38 19 8 7 32 18 53 26 20 7 37 15 37 19 -1 4 -105 72 -120 77 -3 1 -23 -9 -45 -22z"/>
                <path d="M2216 491 c-3 -5 -29 -21 -58 -36 -93 -48 -111 -68 -132 -135 -11 -39 -15 -75 -11 -96 5 -32 8 -34 45 -34 34 0 42 -4 55 -31 15 -29 19 -30 64 -25 26 3 88 8 137 11 49 3 103 7 119 10 17 3 71 7 120 10 82 5 107 2 170 -20 11 -4 1 6 -22 22 -22 15 -61 42 -85 59 -23 16 -68 48 -98 69 -93 65 -195 139 -200 145 -8 8 -89 60 -94 60 -3 0 -7 -4 -10 -9z"/>
                </g>
            </svg>
            <div class="white-bg"></div>
            <div class="blue-bg"></div>
            <div class="text"> CLUB DE TENIS VALLE DEL ACONCAGUA °°°°°°°°°°°°°°°°°°° FUNDADO EN 2013 °°°°°°°°°°°°°°°°</div>
        </div>
    `;
    document.body.prepend(loader);
    loader.classList.remove('hidden');
    loader.classList.add('active');

    const text = loader.querySelector('#loader .text');
    const rotate = new CircleType(text).radius(85);

    let i = 1;

    text.style.transform = 'rotate(' + (i * 20) + 'deg)';
    const loader_animation = setInterval(async () => {
    
        if (GLOBAL.loading) {
            i++;
            text.style.transform = 'rotate(' + (i * 20) + 'deg)';
            return                
        }

        //REMOVE LOADER
        clearInterval(loader_animation);
        document.querySelector('#loader').classList.remove('active');
        document.querySelector('#loader').classList.add('fade_away');
        await delay(300);
        loader.remove();

    }, 1000);
}

function formatDate(date) {
    const 
    year = date.getFullYear(),
    month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
}

function zoom_in(element) {
    return new Promise(async resolve => {
        element.classList.add('zoomIn');
        element.classList.remove('hidden');
        await delay(400);
        element.classList.remove('zoomIn');
        return resolve();
    })
}

function zoom_out(element) {
    return new Promise(async resolve => {
        element.classList.add('zoomOut');
        await delay(400);
        element.classList.add('hidden');
        element.classList.remove('zoomOut');
        return resolve();
    })
}

function bounce_in_animation(element) {
    return new Promise(async resolve => {
        element.classList.add('bounceIn');
        await delay(750);
        element.classList.remove('bounceIn');
    })
}

function error_handler(error) { console.log(error) }

/******************* GOOGLE MAP STUFF START ***************/
function style_marker(style) {

    const markers = document.querySelectorAll('img[src*="SinCityRed"]');
    if (markers.length < 1) setTimeout(function(){style_marker(style)}, 100);

    else {
    
        for (const marker of markers) {

            const pulse = document.createElement('div');
            pulse.classList.add('pulse', 'SinCityRed');

            const shadow = document.createElement('div');
            shadow.classList.add('shadow');

            //marker.classList.add('animateMarker');
            marker.parentElement.append(pulse, shadow);
            marker.parentElement.classList.add('overflow-visible');
            return;
        }
    }
}

function style_map_popup() {

    const popup = document.querySelectorAll('.popup-window');
    if (popup.length === 1) {
        for (const div of popup) {
            div.parentElement.parentElement.classList.add('overflow-hidden');
            div.parentElement.parentElement.nextElementSibling.classList.add('hidden');
            div.parentElement.parentElement.parentElement.addEventListener('click', function() {
                const el = this;
                if (el.classList.contains('gm-style-iw-c')) el.classList.toggle('active');
            });
        }
        return;
    } else setTimeout(function(){ style_map_popup(); }, 100);
}

function load_map() {

    return;

    const center = new google.maps.LatLng(-32.7475068, -70.7186883);

	GLOBAL.map = new google.maps.Map(document.getElementById('google-map'), { 
		center: center, 
		zoom: 16, 
		disableDefaultUI: true 
	});

	//REMOVE PLACES AND BUSINESSES IN MAP
	GLOBAL.map.setOptions({ styles: [{
		featureType: "poi",
		stylers: [
				{ visibility: "off" }
			]
		}]
	})

    const 
    template = document.getElementById('SinCityRed').innerHTML.trim(),
    icon = { 
        url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(template) 
    },
    marker_position = new google.maps.LatLng(-32.7475068, -70.7186883),
    marker = new google.maps.Marker({ map: GLOBAL.map, icon, position: marker_position, draggable: false }),
    url =`https://goo.gl/maps/VrXjdaGaJbwnyiCX8`,
    contentString = `
        <div class="popup-window">
            <div>
                <p>Alameda Yungay<br>esquina de Alameda Chacabuco</p>
                <span>Haz click para ver en Google Maps</span>
            </div>
        </div>
    `;

    const infowindow = new google.maps.InfoWindow({ content: contentString });
    infowindow.setOptions({disableAutoPan: true});
    infowindow.open(GLOBAL.map, marker);

    google.maps.event.addListener(infowindow, 'domready', () => {
        document.querySelector('.popup-window').addEventListener('click', () => {
            window.location = url;
        })
    })
    style_marker();
    style_map_popup();
}

/******************* GOOGLE MAP STUFF END ***************/

function startSlideShow() {
    GLOBAL.slideShow = setInterval(() => {

        const
        activeSlide = document.querySelector('#hero-slideshow .hero-slide.active'),
        nextSlide = (activeSlide === activeSlide.parentElement.lastElementChild) ? activeSlide.parentElement.firstElementChild : activeSlide.nextElementSibling,
        nextSlideIndex = parseInt(nextSlide.getAttribute('data-slide-index'));

        activeSlide.classList.remove('active')
        nextSlide.classList.add('active');

        document.querySelector('.bottom-navigation.active').classList.remove('active');
        document.querySelector(`.bottom-navigation[data-slide-index="${nextSlideIndex}"]`).classList.add('active');

    }, 11900);
}

function slideShowBottomNavigation(e) {
        
    if (e.target.id === 'slideshow-bottom-navigation') return;

    const 
    active_slide = document.querySelector('.hero-slide.active'),
    next_slide_index = parseInt(e.target.getAttribute('data-slide-index'));

    if (active_slide === next_slide_index) return;

    clearInterval(GLOBAL.slideShow);

    document.querySelector(`.hero-slide:nth-child(${next_slide_index})`).classList.add('active');
    document.querySelector('.bottom-navigation.active').classList.remove('active');

    active_slide.classList.remove('active');
    document.querySelector(`.bottom-navigation[data-slide-index="${next_slide_index}"]`).classList.add('active');

    startSlideShow();
}

function heroArrowNavigation() {

    clearInterval(GLOBAL.slideShow);

    const 
    btn = this,
    action = btn.getAttribute('data-slide'),
    current_slide = document.querySelector('.hero-slide.active');

    let next_slide;

    if (action === 'previous') {

        if (current_slide === current_slide.parentElement.firstElementChild) 
            next_slide = current_slide.parentElement.lastElementChild;
        else 
            next_slide = current_slide.previousElementSibling;

    }

    else {

        if (current_slide === current_slide.parentElement.lastElementChild)
            next_slide = current_slide.parentElement.firstElementChild
        else
            next_slide = current_slide.nextElementSibling;
    }

    const next_slide_index = next_slide.getAttribute('data-slide-index');

    current_slide.classList.remove('active');
    next_slide.classList.add('active')

    document.querySelector('.bottom-navigation.active').classList.remove('active');
    document.querySelector(`.bottom-navigation[data-slide-index="${next_slide_index}"]`).classList.add('active');

    startSlideShow();
}

function smallerScreenHeroEventListener() {

    if (window.screen.width > 576) return;

    GLOBAL.drag = {
        active: false,
        direction: null,
        min_x_move: 40,
        max_x_move: 2 * (window.screen.width / 3),
        max_y_move: 40,
        x_start: null,
        y_start: null,
        x_end: null,
        y_end: null,
        x_move: null,
        x_offset: null
    };

    const hero_slideshow = document.querySelector('#hero-slideshow');

    hero_slideshow.addEventListener('touchstart', e => {

        if (GLOBAL.drag.active) return;

        const rect = hero_slideshow.getBoundingClientRect();
        GLOBAL.drag.x_start = e.targetTouches[0].screenX;
        GLOBAL.drag.x_offset = e.targetTouches[0].clientX - rect.left;
        GLOBAL.drag.y_start = e.targetTouches[0].screenY;
    });

    
    hero_slideshow.addEventListener('touchmove', e => {

        if (GLOBAL.drag.active) return;

        GLOBAL.drag.x_end = e.changedTouches[0].screenX;
        GLOBAL.drag.y_end = e.changedTouches[0].screenY;
        
        const 
        x_move = GLOBAL.drag.x_start - GLOBAL.drag.x_end,
        y_move = GLOBAL.drag.y_start - GLOBAL.drag.y_end;

        if (y_move > GLOBAL.drag.max_y_move) return;
        if (Math.abs(x_move) < GLOBAL.drag.min_x_move) return;
    
        GLOBAL.drag.x_move = x_move;
        //home_modal.style.transform = `translateX(${e.targetTouches[0].clientX - GLOBAL.drag.x_offset}px)`;

    });


    hero_slideshow.addEventListener('touchend', e => {

        if (GLOBAL.drag.active) return;
        if (GLOBAL.drag.x_start === null || GLOBAL.drag.x_end === null) return;
    
        GLOBAL.drag.x_end = e.changedTouches[0].clientX;

        if (GLOBAL.drag.x_move < 0 ) GLOBAL.drag.direction = 'left';
        else GLOBAL.drag.direction = 'right';
    
        const x_moved = Math.abs(GLOBAL.drag.x_start - GLOBAL.drag.x_end);

        if (x_moved > GLOBAL.drag.max_x_move) {

            clearInterval(GLOBAL.slideShow);

            const activeSlide = document.querySelector('.bottom-navigation.active');

            if (activeSlide === activeSlide.parentElement.firstElementChild && GLOBAL.drag.direction === 'left')
                activeSlide.parentElement.lastElementChild.click();
            else if (activeSlide === activeSlide.parentElement.lastElementChild && GLOBAL.drag.direction === 'right')
                activeSlide.parentElement.firstElementChild.click();
            else {

                if (GLOBAL.drag.direction === 'left') activeSlide.previousElementSibling.click();
                else activeSlide.nextElementSibling.click();

            }
        }

    });
}

async function showReservHourConfirmation(hour_id, hour_to_reserve, day_to_reserve, date_to_reserve) {
    const confirm_div = document.createElement('div');
    confirm_div.id = 'confirm-hour';
    confirm_div.className = 'hidden';
    confirm_div.setAttribute('data-hour-id', hour_id);
    confirm_div.setAttribute('data-date', date_to_reserve);

    confirm_div.innerHTML = `
        <div>
            <div>
                <div>
                    <h4>CONFIRMAR HORA</h4>
                    <h5>${day_to_reserve} - ${hour_to_reserve} Hrs.</h5>
                </div>
                <div id="confirm-hour-btns">
                    <div class="hour-btn">
                        <p>CANCELAR</p>
                    </div>
                    <div class="hour-btn">
                        <p>ACEPTAR</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    /********************** EVENT LISTENERS ***************************/

    //CLOSE CONFIRMATION DIV
    confirm_div.querySelector('.hour-btn:first-child').addEventListener('click', async function() {
        await zoom_out(confirm_div);
        confirm_div.remove();
    });

    //SAVE HOUR TO DB
    confirm_div.querySelector('.hour-btn:last-child').addEventListener('click', async function() {
        socket.send(JSON.stringify({ token: GLOBAL.JWT, msg: 'save hour', date: date_to_reserve, hour_id }));
    });

    document.querySelector('#reservations-table').appendChild(confirm_div);
    await zoom_in(confirm_div);
}

async function reserveHour(e) {

    if (GLOBAL.JWT === null) {
        document.querySelector('#user-account').click();
        return;
    }

    let target_div;
    if (e.target.matches('p') || e.target.matches('span')) target_div = e.target.parentElement;
    else if (e.target.hasAttribute('tabindex')) target_div = e.target;
    else return;

    if (target_div.classList.contains('disabled')) return;

    const 
    hour_id = parseInt(target_div.getAttribute('data-hour-id')),
    date_to_reserve = target_div.parentElement.parentElement.parentElement.getAttribute('data-date'),
    hour_to_reserve = target_div.getAttribute('data-hour'),
    day_to_reserve = target_div.parentElement.previousElementSibling.innerText;


    //DELETE ALREADY SAVED HOUR
    if (target_div.classList.contains('reserved')) {
        socket.send(JSON.stringify({ token: GLOBAL.JWT, msg: 'delete saved hour', date: date_to_reserve, hour_id }));
        return;
    }

    console.log(hour_id,hour_to_reserve, day_to_reserve, date_to_reserve);

    showReservHourConfirmation(hour_id,hour_to_reserve, day_to_reserve, date_to_reserve);
}

function createReservationColumns() {
    return new Promise(async (resolve, reject) => {
        try {

            const
            get_hours = await fetch('./includes/main.php?get_hours'),
            response = await get_hours.json();

            if (!response.success) throw 'Success response from server is false';
            else if (response.error !== undefined) throw response.error;

            console.log(response);

            GLOBAL.active_hours = response.active_hours;
            GLOBAL.available_days = response.days;

            for (const row of response.days) {

                const column = document.createElement('div');
                column.className = 'reservation-column';
                column.setAttribute('data-date', row.day);

                column.innerHTML = `
                    <div class="column-inner-div">
                        <div class="res-day">
                            <div></div>
                        </div>
                        <div class="res-hours"></div>
                    </div>
                `;

                document.querySelector('#reservations-table').appendChild(column);
                column.addEventListener('click', reserveHour);

                for (const hour_row of row.hours) {

                    const hour = document.createElement('div');
                    hour.setAttribute('tabindex', 0);
                    hour.setAttribute('data-hour-id', hour_row.id);
                    hour.setAttribute('data-hour', hour_row.hour.substring(0, 5))
                    hour.setAttribute('data-taken-hours', hour_row.taken_hours);
                    hour.innerHTML = `
                        <p>${hour_row.hour.substring(0, 5)}</p>
                        <span>${6 - parseInt(hour_row.taken_hours)} canchas<br>disponibles</span>
                    `;
                    column.querySelector('.res-hours').appendChild(hour);

                    if (hour_row.taken_hours === 6) hour.classList.add('disabled');
                }
            }

            const
            days = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'],
            today = new Date(),
            todays_date = days[today.getDay()] + ' ' + today.getDate(),
            tomorrow = new Date(today.getTime() + 86400000),
            tomorrows_date = days[tomorrow.getDay()] + ' ' + tomorrow.getDate(),
            day_after_tomorrow = new Date(today.getTime() + (86400000 * 2)),
            day_after_tomorrows_date = days[day_after_tomorrow.getDay()] + ' ' + day_after_tomorrow.getDate();

            document.querySelector('.reservation-column:first-child .res-day > div').innerText = todays_date;
            document.querySelector('.reservation-column:nth-child(2) .res-day > div').innerText = tomorrows_date;
            document.querySelector('.reservation-column:last-child .res-day > div').innerText = day_after_tomorrows_date;

            //DISABLE HOURS THAT HAVE ALREADY PASSED
            const
            year = today.getFullYear(),
            month = (today.getMonth() + 1 < 10) ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;

            for (const row of response.days[0].hours) {

                const hour_date = new Date(`${year}-${month}-${(today.getDate() < 10) ? '0' + today.getDate() : today.getDate()} ${row.hour}`);

                if (today > hour_date) 
                    document.querySelector(`.reservation-column div[data-hour-id="${row.id}"]`).classList.add('disabled');
            }

            return resolve();
        } catch(e) { return reject(e) }
    })
}

function profileFillData(login_div) {
    return new Promise(async resolve => {

        if (GLOBAL.user === null) {
            login_div.querySelector('#login-register-form').classList.remove('hidden');
            return resolve();
        }
        
        //SET PROFILE IMAGE
        let profile_image;
        if (GLOBAL.user.profile_image === null) profile_image = './images/default.png';
        else {
            profile_image = './images/profiles/' + GLOBAL.user.profile_image;
            login_div.querySelector('.user-image-background').style.backgroundImage = `url(${profile_image})`;
        }

        login_div.querySelector('.user-image-src').style.backgroundImage = `url(${profile_image})`;

        //FILL USER DATA IN PROFILE
        login_div.querySelector('.user-name').innerText = GLOBAL.user.name;
        login_div.querySelector('.user-lastname').innerText = GLOBAL.user.last_name;
        login_div.querySelector('.user-email').innerText = GLOBAL.user.email;
        login_div.querySelector('.user-phone').innerText = GLOBAL.user.phone;

        login_div.querySelector('.user-birth p').innerText = new Date(GLOBAL.user.birth_date).toLocaleString('es-CL').split(',')[0];
        login_div.querySelector('.user-category p').innerText = GLOBAL.user.category.name;
        login_div.querySelector('.user-drive p').innerText = (GLOBAL.user.drive === null) ? '-' : GLOBAL.user.drive;
        login_div.querySelector('.user-backhand p').innerText = (GLOBAL.user.backhand === null) ? '-' : GLOBAL.user.backhand;
        login_div.querySelector('.user-height p').innerText = (GLOBAL.user.height === null) ? '-' : GLOBAL.user.height + ' Cm.';
        login_div.querySelector('.user-weight p').innerText = (GLOBAL.user.weight === null) ? '-' : GLOBAL.user.weight + ' Kg.';

        let sex;
        if (GLOBAL.user.sex === 'M') sex = 'Masculino';
        else if (GLOBAL.user.sex === 'F') sex = 'Femenino';
        else sex = '-';

        login_div.querySelector('.user-sex p').innerText = sex;

        //FILL INPUTS WITH USER DATA
        login_div.querySelector('#change-user-name').value = GLOBAL.user.name;
        login_div.querySelector('#change-user-lastname').value = GLOBAL.user.last_name;
        login_div.querySelector('#change-user-email').value = GLOBAL.user.email;
        login_div.querySelector('#change-user-phone').value = GLOBAL.user.phone;

        login_div.querySelector('#change-user-sex').value = GLOBAL.user.sex;
        login_div.querySelector('#change-user-drive').value = GLOBAL.user.drive;
        login_div.querySelector('#change-user-backhand').value = GLOBAL.user.backhand;

        login_div.querySelector('#change-user-birth').value = GLOBAL.user.birth_date;
        login_div.querySelector('#change-user-height').value = (GLOBAL.user.height === null) ? '' : GLOBAL.user.height + ' Cm.';
        login_div.querySelector('#change-user-weight').value = (GLOBAL.user.weight === null) ? '' : GLOBAL.user.weight + ' Kg.';

        login_div.querySelector('#logged-in-form').classList.remove('hidden');

        return resolve();
    })
}

function profileEventListeners(login_div) {
    return new Promise(resolve => {
        /********************* EVENT LISTENERS ******************/
        //LOGIN BTN
        login_div.querySelector('button.login__submit').addEventListener('click', async e => {

            e.preventDefault();

            try {

                const 
                user = document.querySelector('#login-input-user').value,
                password = document.querySelector('#login-input-password').value;

                if (user.length === 0) throw 'Nombre de usuario vacío.';
                if (password.length === 0) throw 'Contraseña vacía.'

                const 
                persist_session_checkbox = document.querySelector('#login-persist-session'),
                persist_session = (persist_session_checkbox.checked) ? true : false;

                zoom_out(document.getElementById('login-register-form'));
                
                await login_user(user, password, persist_session);
                await profileFillData(login_div);

                zoom_in(document.getElementById('logged-in-form'));

                if (GLOBAL.user !== null) {
                    setInterval(async () => {
                        try { 
                            console.log('inside')
                            await login_user();
                            console.log('token renewed');
                        }
                        catch(err) { alert('error in interval updating user token!!!') }
                    }, 60 * 1000 * 7);
                }

                //FILL RESERVED HOURS
                for (const row of GLOBAL.user.reservations) {
                    const hour_div = document.querySelector(`.reservation-column[data-date="${row.date}"] div[data-hour-id="${row.hour_id}"]`);
                    hour_div.classList.add('reserved');
                }


            } catch(e) { error_handler(e) }

        });

        //CLICK ON CAMERA TO CHANGE PROFILE PICTURE
        login_div.querySelector('#user-icons').addEventListener('click', () => { login_div.querySelector('#change-profile-image').click() });

        //INSERT IMAGE AFTER SELECTING IT
        login_div.querySelector('#change-profile-image').addEventListener('change', async e => {
            try {

                const 
                file_extension_split = e.target.value.split('.'),
                file_extension = file_extension_split[file_extension_split.length - 1].toLowerCase();

                if (
                    file_extension !== 'png' && file_extension !== 'jpg' && file_extension !== 'jpeg' && 
                    file_extension !== 'webp' && file_extension !== 'bmp' && file_extension !== 'gid'
                ) throw 'El archivo seleccionado no es una imagen';
        
                login_div.querySelector('.user-image-src').style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
                
                await zoom_out(document.querySelector('#user-icons'));
                await zoom_in(document.querySelector('#logged-in .user-image .save-cancel-btns'));

            } catch(e) { error_handler(e) }
        });

        //RESET PROFILE IMAGE TO ORIGINAL
        login_div.querySelector('#logged-in .user-image .save-cancel-btns > div:first-child').addEventListener('click', async () => {
            login_div.querySelector('.user-image-src').style.backgroundImage = (GLOBAL.user.profile_image === null) ? './images/default.png' : `url('./images/profiles/${GLOBAL.user.profile_image}')`;
            await zoom_out(document.querySelector('#logged-in .user-image .save-cancel-btns'));
        });

        //SAVE IMAGE PROFILE TO SERVER
        login_div.querySelector('#logged-in .user-image .save-cancel-btns > div:last-child').addEventListener('click', async () => {
            
            const 
            image_input = document.querySelector('#change-profile-image'),
            image = image_input.files[0];


            //RESIZE IMAGE BEFORE UPLOADING TO SERVER
            function get_blob_from_image(img) {
                return new Promise(resolve => {

                    const file_reader = new FileReader();

                    file_reader.onload = e => {

                        const original_image = new Image();
    
                        original_image.onload = function() {
    
                            var targetWidth = original_image.width * 0.9;  // Adjust the division factor as needed
                            var targetHeight = original_image.height * 0.9;
            
                            // Create a canvas element
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
            
                            // Set the canvas dimensions to the target dimensions
                            canvas.width = targetWidth;
                            canvas.height = targetHeight;
            
                            // Draw the image on the canvas at the reduced size
                            ctx.drawImage(original_image, 0, 0, targetWidth, targetHeight);
            
                            canvas.toBlob(
                                blob => { return resolve(blob) },
                                image.type
                            );
                        }
    
                        original_image.src = e.target.result;
                    }

                    file_reader.readAsDataURL(img);
                })
            }

            let image_blob = await get_blob_from_image(image);

            //DISPLAY LOADER HERE WHILE IMAGE IS GETTING RESIZED!!
            
            let i = 0;
            while (image_blob.size > 250000) {
                i++;
                console.log(i + ' try');
                const image_file = new File([image_blob], 'untitled', { type: image_blob.type });
                image_blob = await get_blob_from_image(image_file);
            }
            
            const form_data = new FormData();
            form_data.append('image', image_blob);

            try {

                const 
                send_image = await fetch('../includes/save_image.php', {
                    method: 'POST',
                    body: form_data
                }),
                response = await send_image.json();

                if (!response.success) throw 'Response from server was unsuccessful';
                if (response.error !== undefined) throw response.error;

                document.querySelector('#logged-in .user-image-background').style.backgroundImage = `url('${URL.createObjectURL(image_input.files[0])}')`;
                await zoom_out(document.querySelector('#logged-in .user-image .save-cancel-btns'));

            } catch(e) { error_handler(e) }
        });

        //CLOSE USER SESSION
        login_div.querySelector('#user-profile-close-session').addEventListener('click', async () => {
            
            try {

                const 
                logout = await fetch("./includes/main.php?logout"),
                response = await logout.json();

                if (!response.success) throw 'Success response from server is false';
                else if (response.error !== undefined) throw response.error;

                GLOBAL.JWT = null;
                GLOBAL.user = null;

                document.querySelector('#user-account').click();
                document.querySelector('#logged-in-user-account').classList.add('hidden');
                document.querySelector('#login-user-btn').classList.remove('hidden');

            } catch(e) { error_handler(e) }

        });

        //EDIT PROFILE BTN
        login_div.querySelector('#user-profile-edit').addEventListener('click', async () => {
            await zoom_out(login_div.querySelector('#user-profile-data'));
            await zoom_in(login_div.querySelector('#user-profile-edit-data'));
        });

        //CHANGE PASSWORD
        login_div.querySelector('#user-profile-change-password-btn').addEventListener('click', async () => {
            await zoom_out(login_div.querySelector('#user-profile-data'));
            await zoom_in(login_div.querySelector('#change-password-container'));
        });

        login_div.querySelector('#user-profile-show-reservations').addEventListener('click', () => {

            socket.send(JSON.stringify({ token: GLOBAL.JWT, msg: 'get my reservations' }));
            
        });

        /************ EDIT PROFILE INPUTS ************/
        login_div.querySelector('#change-user-height').addEventListener('input', e => {
            const current_value = e.target.value.replace(/\D/gm, '');
            e.target.value = current_value + ' Cm.';
        })

        login_div.querySelector('#change-user-weight').addEventListener('input', e => {
            const current_value = e.target.value.replace(/\D/gm, '');
            e.target.value = current_value + ' Kg.';
        });


        //CANCEL EDIT PROFILE BTN
        login_div.querySelector('#user-profile-edit-cancel').addEventListener('click', async e => {
            await zoom_out(login_div.querySelector('#user-profile-edit-data'));
            await zoom_in(login_div.querySelector('#user-profile-data'));
        });

        //SAVE EDIT PROFILE BTN
        login_div.querySelector('#user-profile-edit-save').addEventListener('click', async e => {

            try {

                await zoom_out(login_div.querySelector('#user-profile-edit-data'));

                //DISPLAY LOADER HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                const 
                sex_select = document.querySelector('#change-user-sex'),
                drive_select = document.querySelector('#change-user-drive'),
                backhand_select = document.querySelector('#change-user-backhand');

                const data = {
                    name: document.querySelector('#change-user-name').value,
                    lastname: document.querySelector('#change-user-lastname').value,
                    phone: document.querySelector('#change-user-phone').value,
                    birth: document.querySelector('#change-user-birth').value,
                    sex: sex_select.options[sex_select.selectedIndex].value,
                    height: document.querySelector('#change-user-height').value,
                    weight: document.querySelector('#change-user-weight').value,
                    drive: drive_select.options[drive_select.selectedIndex].value,
                    backhand: backhand_select.options[backhand_select.selectedIndex].value
                };

                //SANITIZE OBJECT
	            for (let key in data) { data[key] = sanitize(data[key]) }

                const 
                save_data = await fetch('../includes/save_profile_data.php', {
                    method: 'POST',
                    body: JSON.stringify(data)
                }),
                response = await save_data.json();

                console.log(response)

                if (!response.success) throw 'Unsuccessful login';
                if (response.error !== undefined) throw "Server error login in user";

                GLOBAL.user = jwt_decode(response.jwt).user;

                await zoom_in(login_div.querySelector('#user-profile-data'));
                await profileFillData(login_div);

            } catch(e) { error_handler(e) }

        });

        /************ CHANGE PASSWORD ************/
        login_div.querySelector('#user-profile-save-change-password').addEventListener('click', async () => {

            try {

                const
                new_password = login_div.querySelector('#user-profile-change-password').value,
                confirm_password = login_div.querySelector('#user-profile-confirm-password').value;

                if (new_password.length === 0 || confirm_password.length === 0) throw 'Contraseña nueva vacía';
                if (new_password !== confirm_password) throw 'Contraseñas no coinciden';

                const 
                change_password = await fetch('../includes/change_password.php',{
                    method: 'POST',
                    body: JSON.stringify({ new_password })
                }),
                response = await change_password.json();

                console.log(response);

            } catch(e) { error_handler(e) }
        });

        login_div.querySelector('#user-profile-cancel-change-password').addEventListener('click', async () => {

            await zoom_out(login_div.querySelector('#change-password-container'));
            await zoom_in(login_div.querySelector('#user-profile-data'));

        });

        return resolve();
    })
}

function profileAvailableDaysColumns(login_div) {
    return new Promise(resolve => {

        const activeHoursColumn = document.createElement('div');
        activeHoursColumn.className = 'active-hours';
        activeHoursColumn.innerHTML = `
            <div class="table">
                <div class="table-col">
                    <div class="th">HORA</div>
                </div>
            </div>
        `;

        for (const hourObj of GLOBAL.active_hours) {
            
            const hourDiv = document.createElement('div');
            hourDiv.innerText = hourObj.hour.substring(0, 5);
            activeHoursColumn.querySelector('.table-col').appendChild(hourDiv);
        }
        login_div.querySelector('#user-profile-my-reservations .container').appendChild(activeHoursColumn);

        //CREATE REST OF THE CELLS
        const 
        days = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'],
        today = new Date(),
        todays_date = days[today.getDay()] + ' ' + today.getDate(),
        tomorrow = new Date(today.getTime() + 86400000),
        tomorrows_date = days[tomorrow.getDay()] + ' ' + tomorrow.getDate(),
        day_after_tomorrow = new Date(today.getTime() + (86400000 * 2)),
        day_after_tomorrows_date = days[day_after_tomorrow.getDay()] + ' ' + day_after_tomorrow.getDate();

        const dates = [
            { day: todays_date, date: formatDate(today) }, 
            { day: tomorrows_date, date: formatDate(tomorrow) }, 
            { day: day_after_tomorrows_date, date: formatDate(day_after_tomorrow) }
        ];

        let i = 0;
        for (const day of GLOBAL.available_days) {
            
            const column = document.createElement('div');
            column.className = 'reserve-day';
            column.innerHTML = `
                <div class="table">
                    <div class="table-col" data-date="${dates[i].date}">
                        <div class="th">${dates[i].day}</div>
                    </div>
                </div>
            `;

            for (const hourObj of day.hours) {
                const hourDiv = document.createElement('div');
                hourDiv.setAttribute('data-hour-id', hourObj.id);
                hourDiv.setAttribute('data-hour', hourObj.hour.substring(0, 5));
                column.querySelector('.table-col').appendChild(hourDiv);
            }

            column.addEventListener('click', e => {
                
                if (e.target.classList.contains('th') || !e.target.hasAttribute('data-hour-id')) return;

                const
                    hourId = parseInt(e.target.getAttribute('data-hour-id')),
                    hour = e.target.getAttribute('data-hour'),
                    day = e.target.parentElement.firstElementChild.innerText,
                    date = e.target.parentElement.getAttribute('data-date');

                console.log(hourId, hour, day, date)

                showReservHourConfirmation(hourId, hour, day, date);

            });

            login_div.querySelector('#user-profile-my-reservations .container').appendChild(column);
            i++;
        }

        //SHOW RESERVED HOURS
        for (const reservation of GLOBAL.user.reservations) {

            login.querySelector(`.table-col[data-date="${reservation.date}"] div[data-hour-id="${reservation.hour_id}"]`).classList.add('active');

            const reserved_div = login.querySelector(`.table-col[data-date="${reservation.date}"] div[data-hour-id="${reservation.hour_id}"]`);
            reserved_div.innerHTML = `<p>CANCHA<br>RESERVADA</p>`;
        }

        return resolve();
    })
}

document.querySelector('#user-account').addEventListener('click', async () => {

    if (!!document.querySelector('#login')) {
        await zoom_out(document.querySelector('#login'));
        document.querySelector('#login').remove();
        return;
    }

    //LOGIN USER
    const 
    takenCourts = await fetch('./includes/main.php?get_taken_courts'),
    response = await takenCourts.json();

    if (!response.success) throw 'Success response from server is false';
    else if (response.error !== undefined) throw response.error;

    console.log(response);

    const 
    template = await (await fetch('../templates/profile.html')).text(),
    login_div = document.createElement('div');

    login_div.id = 'login';
    login_div.className = 'hidden';
    login_div.innerHTML = template;
    
    document.body.appendChild(login_div);

    await profileFillData(login_div);
    await profileEventListeners(login_div);
    await profileAvailableDaysColumns(login_div);

    /*
    for (const element of response.dates) {
        login_div.querySelector(`.table-col[data-date="${element.date}"]`)
    }
    */

    await zoom_in(login_div);
});

function login_user(user, password, persist_session) {
    return new Promise(async resolve => {

        if (user === undefined) user = '';
        if (password === undefined) password = '';
        if (persist_session === undefined) persist_session = null;

        try {

            const
            check_token = await fetch('./includes/login.php', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ user: user, password: password, persist_session })
            }),
            response = await check_token.json();

            if (!response.success) throw 'Unsuccessful login';
            if (response.error !== undefined) throw "Server error login in user";

            clearInterval(GLOBAL.account_interval);
            GLOBAL.JWT = response.token;
            GLOBAL.user = jwt_decode(response.token).user;

            document.querySelector('#logged-in-user-account > div').style.backgroundImage = (GLOBAL.user.profile_image === null) ? './images/default.png' : `url('./images/profiles/${GLOBAL.user.profile_image}')`;
            document.querySelector('#login-user-btn').classList.add('hidden');
            document.querySelector('#logged-in-user-account').classList.remove('hidden');

        }
        catch(e) { console.log(e) }
        finally { return resolve() }
    })
}

(async () => {

    //CACHE LOGO
    await fetch(`images/logo.png`, {
        method: 'GET',
        headers: { "Cache-Control" : "max-age=31536000" }
    });

    loader();

    /********************** LOAD ALL RESOURCES HERE *********************/

    const images = ["logo.png", "group5.jpg", "group6.jpg", "foto1.jpg"];

    for (const image of images) {
        await fetch(`images/${image}`, {
            method: 'GET',
            headers: { "Cache-Control" : "max-age=31536000" }
        });
    }

    smallerScreenHeroEventListener();

    //HERO SECTION ARROW NAVIGATION
    document.querySelectorAll('#slideshow-arrows > div').forEach(div => div.addEventListener('click', heroArrowNavigation) );

    //HERO SECTION BOTTOM NAVIGATION
    document.querySelector('#slideshow-bottom-navigation').addEventListener('click', slideShowBottomNavigation);

    //GET AVAILABLE HOUR FOR RESERVATIONS
    await createReservationColumns();

    await login_user();

    if (GLOBAL.user !== null) {

        //SHOW USER RESERVED HOURS
        for (const row of GLOBAL.user.reservations) {
            const hour_div = document.querySelector(`.reservation-column[data-date="${row.date}"] div[data-hour-id="${row.hour_id}"]`);
            hour_div.classList.add('reserved');
        }

        //RENEW ACCESS TOKEN 
        GLOBAL.account_interval = setInterval(async () => {
            try { 
                
                await login_user();
                console.log('token renewed');
            }
            catch(err) { alert('error in interval updating user token!!!') }
        }, 60 * 1000 * 9);
    }

    //WAIT FOR LOADER TO BE REMOVED
    GLOBAL.loading = false;
    while (!!document.querySelector('#loader')) { await delay(10) }

    document.querySelector('body > main').classList.remove('hidden');

    document.querySelector('#hero-slideshow .hero-slide:first-child').classList.add('active');
    startSlideShow();

})();

function show_hour_confirmation_success() {

    const success = document.createElement('div');
    success.id = 'hour-reservation-success';
    success.innerHTML = `
        <div>

        </div>
    `;

}

// Create a WebSocket object and connect to the server
const socket = new WebSocket('ws://192.168.0.6:6060');

// WebSocket event: connection established
socket.onopen = function(event) {

    console.log('Connected to WebSocket server');
    // You can send initial data to the server if needed
    // socket.send('Hello Server');

    socket.send(JSON.stringify({ msg: 'get available courts' }));
};

// WebSocket event: received a message from the server
socket.onmessage = async function(event) {

    const data = JSON.parse(event.data);
    console.log('Message received from server:', data);

    // Handle the received message as needed
    if (data.msg === 'hour reserved by user') {

        console.log(GLOBAL.user)

        if (data.userId === GLOBAL.user.id) {

            document.querySelector('#confirm-hour-btns .hour-btn:first-child').click();
            await delay(400);

            //SHOW MESSAGE FOR SUCCESSFUL RESERVATION
            show_hour_confirmation_success();

            //SAVE HOUR IN USER PROFILE DIV
            if (!!document.querySelector('#login')) {

                const reservedDiv = document.querySelector(`#login .table-col[data-date="${data.dateToReserve}"] div[data-hour-id="${data.hourId}"]`);
                reservedDiv.classList.add('active');
                reservedDiv.innerHTML = `<p>CANCHA<br>RESERVADA</p>`;
            }

            //CHANGE RESERVED HOUR
            const reserved_hour = document.querySelector(`.reservation-column[data-date="${data.dateToReserve}"] div[data-hour-id="${data.hourId}"]`);
            reserved_hour.classList.add('reserved');
        }

        //UPDATE HOURS COLUMNS
        console.log(data.reservedHours);

        for (const row of data.reservedHours) {

            const column = document.querySelector(`#reservations-table .reservation-column[data-date="${row.date}"]`);
            const hour_div = column.querySelector(`div[data-hour-id="${row.hour_id}"]`);
            const previous_taken_hours = parseInt(hour_div.getAttribute('data-taken-hours'));

            if (previous_taken_hours !== row.hours.length) {

                bounce_in_animation(hour_div);
                hour_div.setAttribute('data-taken-hours', row.hours.length);
                hour_div.querySelector('span').innerHTML = `${6 - row.hours.length} canchas<br>disponibles`;

                if (row.hours.length === 6) hour_div.classList.add('disabled');
            }
        }
    }

    else if (data.msg === "no available courts") {

        document.querySelector('#confirm-hour-btns .hour-btn:first-child').click();
        await delay(400);

        const date = new Date(data.dateToReserve).toLocaleString('es-CL').split(',')[0];
        const hour = document.querySelector(`.reservation-column div[data-hour-id="${data.hourId}"] p`).innerText;

        error_handler(`No hay canchas disponibles para el día ${date} a las ${hour} hrs.`);
    }

    else if (data.msg === "hour deleted by user") {

        if (data.userId === GLOBAL.user.id) {

            //document.querySelector('#confirm-hour-btns .hour-btn:first-child').click();
            //await delay(400);

            //SHOW MESSAGE FOR SUCCESSFUL RESERVATION
            //show_hour_confirmation_success();

            //CHANGE RESERVED HOUR
            const reserved_hour = document.querySelector(`.reservation-column[data-date="${data.dateToDelete}"] div[data-hour-id="${data.hourId}"]`);
            const previous_taken_hours = parseInt(reserved_hour.getAttribute('data-taken-hours'));

            reserved_hour.setAttribute('data-taken-hours', previous_taken_hours - 1);

            bounce_in_animation(reserved_hour);
            reserved_hour.querySelector('span').innerHTML = `${6 - (previous_taken_hours - 1)} canchas<br>disponibles`;
            reserved_hour.classList.remove('reserved');
            
        }

        for (const row of data.reservedHours) {

            const column = document.querySelector(`#reservations-table .reservation-column[data-date="${row.date}"]`);
            const hour_div = column.querySelector(`div[data-hour-id="${row.hour_id}"]`);
            const previous_taken_hours = parseInt(hour_div.getAttribute('data-taken-hours'));

            console.log(previous_taken_hours, row.hours.length)

            if (previous_taken_hours !== row.hours.length) {

                bounce_in_animation(hour_div);
                hour_div.setAttribute('data-taken-hours', row.hours.length);
                hour_div.querySelector('span').innerHTML = `${6 - row.hours.length} canchas<br>disponibles`;

                if (row.hours.length < 6) hour_div.classList.add('disabled');
            }

        }

    }

    else if (data.msg === "list of available courts") {
        
        for (const date of data.dates) {

        }

    }
};

// WebSocket event: connection closed
socket.onclose = function(event) {
    console.log('Disconnected from WebSocket server');
};

// WebSocket event: an error occurred
socket.onerror = function(event) {
    console.error('WebSocket error:', event);
};
