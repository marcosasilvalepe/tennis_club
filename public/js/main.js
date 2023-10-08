"use strict";

const global = {
    loading: false,
    screen_width: window.screen.width,
    token: null,
    user: null
}

document.addEventListener('DOMContentLoaded', () => {

    //alert(`screen inner height is ${window.innerHeight} --- screen outer height is ${window.outerHeight}`)
    //alert(`screen height is ${window.innerHeight} --- div height is ${document.querySelector('#hero-slideshow').offsetHeight}`)

})

function delay(delay_value) { return new Promise(resolve => setTimeout(resolve, delay_value)) }

function loader() {

    global.loading = true;

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
            <div class="text"> CLUB DE TENIS VALLE DEL ACONCAGUA ************** FUNDADO EN 2013 ***************</div>
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
    
        if (global.loading) {
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

	global.map = new google.maps.Map(document.getElementById('google-map'), { 
		center: center, 
		zoom: 16, 
		disableDefaultUI: true 
	});

	//REMOVE PLACES AND BUSINESSES IN MAP
	global.map.setOptions({ styles: [{
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
    marker = new google.maps.Marker({ map: global.map, icon, position: marker_position, draggable: false }),
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
    infowindow.open(global.map, marker);

    google.maps.event.addListener(infowindow, 'domready', () => {
        document.querySelector('.popup-window').addEventListener('click', () => {
            window.location = url;
        })
    })
    style_marker();
    style_map_popup();
}

/******************* GOOGLE MAP STUFF END ***************/

function start_slide_show() {
    global.slide_show = setInterval(() => {

        const
        active_slide = document.querySelector('#hero-slideshow .hero-slide.active'),
        next_slide = (active_slide === active_slide.parentElement.lastElementChild) ? active_slide.parentElement.firstElementChild : active_slide.nextElementSibling,
        next_slide_index = parseInt(next_slide.getAttribute('data-slide-index'));

        active_slide.classList.remove('active')
        next_slide.classList.add('active');

        document.querySelector('.bottom-navigation.active').classList.remove('active');
        document.querySelector(`.bottom-navigation[data-slide-index="${next_slide_index}"]`).classList.add('active');

    }, 12000)
}

function slide_show_bottom_navigation(e) {
        
    console.log(e)
    if (e.target.id === 'slideshow-bottom-navigation') return;

    const 
    active_slide = document.querySelector('.hero-slide.active'),
    next_slide_index = parseInt(e.target.getAttribute('data-slide-index'));

    if (active_slide === next_slide_index) return;

    clearInterval(global.slide_show);

    document.querySelector(`.hero-slide:nth-child(${next_slide_index})`).classList.add('active');
    document.querySelector('.bottom-navigation.active').classList.remove('active');

    active_slide.classList.remove('active');
    document.querySelector(`.bottom-navigation[data-slide-index="${next_slide_index}"]`).classList.add('active');

    start_slide_show();
}

function hero_arrow_navigation() {

    clearInterval(global.slide_show);

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

    start_slide_show();
}

function smaller_screen_hero_event_listener() {

    if (window.screen.width > 576) return;
    global.drag = {
        active: false,
        direction: null,
        min_x_move: 60,
        max_x_move: 2 * (window.screen.width / 3),
        max_y_move: 40,
        x_temp: null,
        x_start: null,
        y_start: null,
        x_end: null,
        y_end: null,
        x_move: null,
        x_offset: null
    };

    const hero_slideshow = document.querySelector('#hero-slideshow');

    hero_slideshow.addEventListener('touchstart', e => {

        console.log(e)

        if (global.drag.active) return;
        const rect = hero_slideshow.getBoundingClientRect();
        global.drag.x_start = e.targetTouches[0].screenX;
        global.drag.x_temp = e.targetTouches[0].screenX;
        global.drag.x_offset = e.targetTouches[0].clientX - rect.left;
        global.drag.y_start = e.targetTouches[0].screenY;
        global.drag.y_temp = e.targetTouches[0].screenY;
    });

    
    hero_slideshow.addEventListener('touchmove', e => {

        console.log(e);
        if (global.drag.active) return;

        global.drag.x_end = e.changedTouches[0].screenX;
        global.drag.y_end = e.changedTouches[0].screenY;
        
        const 
        x_move = Math.abs(global.drag.x_temp - global.drag.x_end),
        y_move = Math.abs(global.drag.y_start - global.drag.y_end);
    
        if (y_move > global.drag.max_y_move) return;
        if (x_move < global.drag.min_x_move) return;
    
        global.drag.x_temp = window.screen.width;
        global.drag.x_move = x_move;
        //home_modal.style.transform = `translateX(${e.targetTouches[0].clientX - global.drag.x_offset}px)`;

    });


    hero_slideshow.addEventListener('touchend', e => {

        if (global.drag.active) return;
        if (global.drag.x_start === null || global.drag.x_end === null) return;
    
        global.drag.x_end = e.changedTouches[0].clientX;
    
        if (global.drag.x_end - global.drag.x_start < 0 ) global.drag.direction = 'left';
        else global.drag.direction = 'right';
    
        const x_moved = Math.abs(global.drag.x_start - global.drag.x_end);

        if (x_moved < global.drag.max_x_move)
            console.log('can move slide here')
        else
            console.log('not enough to move slide')

    });

}

function show_reserve_hour_confirmation(e) {

    let target_div;
    if (e.target.matches('p') || e.target.matches('span')) target_div = e.target.parentElement;
    else if (e.target.hasAttribute('tabindex')) target_div = e.target;
    else return;

    if (target_div.classList.contains('disabled')) return;

    console.log(target_div);

    const 
    hour_id = parseInt(target_div.getAttribute('data-hour-id')),
    date_to_reserve = target_div.parentElement.parentElement.parentElement.getAttribute('data-date'),
    hour_to_reserve = target_div.querySelector('p').innerText,
    day_to_reserve = target_div.parentElement.previousElementSibling.innerText;

    const confirm_div = document.createElement('div');
    confirm_div.id = 'confirm-hour';
    confirm_div.setAttribute('data-hour-id', hour_id);
    confirm_div.setAttribute('data-date', date_to_reserve);

    confirm_div.innerHTML = `
        <div>
            <div>
                <div>
                    <h4>CONFIRMAR HORA</h4>
                    <h5>${day_to_reserve} - ${hour_to_reserve} hrs.</h5>
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

    console.log(hour_id)

    /********************** EVENT LISTENERS ***************************/
    confirm_div.querySelector('.hour-btn:first-child').addEventListener('click', function() {
        confirm_div.remove();
    });

    confirm_div.querySelector('.hour-btn:last-child').addEventListener('click', async function() {

        const 
        now = new Date(),
        month = (now.getMonth() + 1 < 10) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1,
        year = now.getFullYear(),
        date = year + '-' + month + '-' + date_to_reserve;

        console.log(date)

        socket.send(JSON.stringify({ msg: 'save hour', date, hour_id }));

    });


    document.querySelector('#reservations-table').appendChild(confirm_div);
}

function get_reservations() {
    return new Promise(async (resolve, reject) => {
        try {

            const
            get_hours = await fetch('./includes/main.php?get_hours', {
                method: 'GET'
            }),
            response = await get_hours.json();

            if (!response.success) throw 'Success response from server is false';
            else if (response.error !== undefined) throw response.error;

            console.log(response)

            for (const row of response.days) {

                const 
                date = row.day.split('-')[2],
                column = document.createElement('div');

                column.className = 'reservation-column';
                column.setAttribute('data-date', date);
                column.innerHTML = `
                    <div class="column-inner-div">
                        <div class="res-day"></div>
                        <div class="res-hours"></div>
                    </div>
                `;
                document.querySelector('#reservations-table').appendChild(column);
                column.addEventListener('click', show_reserve_hour_confirmation);

                for (const hour_row of row.hours) {

                    const hour = document.createElement('div');
                    hour.setAttribute('tabindex', 0);
                    hour.setAttribute('data-hour-id', hour_row.id);
                    hour.innerHTML = `
                        <p>${hour_row.hour.substring(0, 5)}</p>
                        <span>${6 - parseInt(hour_row.taken_hours)} canchas<br>disponibles</span>
                    `;
                    column.querySelector('.res-hours').appendChild(hour);
                }
            }

            const 
            now = new Date(),
            days = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'],
            day = now.getDay(),
            date = now.getDate(),
            current_day = days[day],
            next_day = (day === 6) ? days[0] : days[day + 1],
            current_hour = now.getHours(),
            current_minutes = now.getMinutes();

            let day_after_next;
            if (day === 5) day_after_next = days[0];
            else if (day === 6) day_after_next = days[day + 1];
            else day_after_next = days[day + 2];

            document.querySelector('.reservation-column:first-child .res-day').innerText = current_day + ' ' + date;
            document.querySelector('.reservation-column:nth-child(2) .res-day').innerText = next_day + ' ' + (date + 1);
            document.querySelector('.reservation-column:last-child .res-day').innerText = day_after_next + ' ' + (date + 2);

            console.log(current_hour + ':' + current_minutes);

            const
            year = now.getFullYear(),
            month = (now.getMonth() + 1 < 10) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;

            //DISABLE HOURS THAT HAVE ALREADY PASSED
            for (const row of response.days[0].hours) {

                const hour_date = new Date(`${year}-${month}-${(now.getDate() < 10) ? '0' + now.getDate() : now.getDate()} ${row.hour}`);

                if (now > hour_date) 
                    document.querySelector(`.reservation-column div[data-hour-id="${row.id}"]`).classList.add('disabled');
            }

            return resolve();
        } catch(e) { return reject(e) }
    })
}

document.querySelector('#user-account').addEventListener('click', () => {

    if (!!document.querySelector('#login')) {
        document.querySelector('#login').remove();
        return;
    }

    //LOGIN USER
    const login_div = document.createElement('div');
    login_div.id = 'login';
    login_div.className = 'hidden';
    login_div.innerHTML = `
        <div class="login-container">

            <form id="login-register-form" action="" class="form-login hidden">

                <div class="login-nav">
                    <div class="login-nav__item active">
                        <a href="#">INGRESAR</a>
                    </div>
                    <div class="login-nav__item">
                        <a href="#">REGISTRARSE</a>
                    </div>
                </div>

                <div id="login-content">
                    <div>
                        <label for="login-input-user" class="login__label">
                            Usuario
                        </label>
                        <input id="login-input-user" class="login__input" type="text" placeholder="Email o número de teléfono" />
                        <label for="login-input-password" class="login__label">
                            Password
                        </label>
                        <input id="login-input-password" class="login__input" type="password" />
                        <label for="login-sign-up" class="login__label--checkbox">
                            <input id="login-sign-up" type="checkbox" class="login__input--checkbox" />
                            Recordarme
                        </label>
                        <button class="login__submit">Iniciar Sesión</button>
                        <div class="login__forgot">¿ Olvidaste tu contraseña ?</div>
                    </div>
                    <div>
                        <div id="register-content"></div>
                    </div>
                </div>
            </form>

            <form id="logged-in-form" action="" class="form-login hidden">
                <div id="logged-in">
                
                    <div></div>

                </div>
            </form>
            
        </div>
    `;

    login_div.querySelector('button.login__submit').addEventListener('click', async (e) => {

        e.preventDefault();

        try {

            const 
            user = document.querySelector('#login-input-user').value,
            password = document.querySelector('#login-input-password').value;

            if (user.length === 0) throw 'Nombre de usuario vacío.';
            if (password.length === 0) throw 'Contraseña vacía.'

            await login_user(user, password);

            if (global.user !== null) {
                setInterval(async () => {
                    try { 
                        console.log('inside')
                        await login_user();
                        console.log('token renewed');
                    }
                    catch(err) { alert('error in interval updating user token!!!') }
                }, 9 * 60 * 1000);
            }

        } catch(e) { error_handler(e) }

    });


    if (global.user === null) login_div.querySelector('#login-register-form').classList.remove('hidden');
    else login_div.querySelector('#logged-in-form').classList.remove('hidden');

    document.body.appendChild(login_div);

    login_div.classList.add('zoomIn');
    login_div.classList.remove('hidden');
});

function login_user(user, password) {
    return new Promise(async resolve => {

        if (user === undefined) user = '';
        if (password === undefined) password = '';

        try {

            const
            check_token = await fetch('./includes/login.php', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ user: user, password: password })
            }),
            response = await check_token.json();

            console.log(response)

            if (!response.success) throw 'Unsuccessful login';
            if (response.error !== undefined) throw "Server error login in user";

            global.token = response.token;
            global.user = jwt_decode(global.token);

            

        }
        catch(e) { console.log("Couldn't login user") }
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

    smaller_screen_hero_event_listener();

    //HERO SECTION ARROW NAVIGATION
    document.querySelectorAll('#slideshow-arrows > div').forEach(div => div.addEventListener('click', hero_arrow_navigation) );

    //HERO SECTION BOTTOM NAVIGATION
    document.querySelector('#slideshow-bottom-navigation').addEventListener('click', slide_show_bottom_navigation);

    //GET AVAILABLE HOUR FOR RESERVATIONS
    await get_reservations();

    
    //WAIT FOR LOADER TO BE REMOVED
    global.loading = false;
    while (!!document.querySelector('#loader')) { await delay(10) }

    document.querySelector('#hero-slideshow .hero-slide:first-child').classList.add('active');

    await login_user();
    if (global.user !== null) {
        setInterval(async () => {
            try { 
                console.log('inside')
                await login_user();
                console.log('token renewed');
            }
            catch(err) { alert('error in interval updating user token!!!') }
        }, 3 * 60 * 1000);
    }
    

    start_slide_show();

})();