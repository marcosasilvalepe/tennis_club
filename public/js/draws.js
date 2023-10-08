"use strict";

const SANITIZE = str => { return str };

const text = document.querySelector('#top-logo .text');
const rotate = new CircleType(text).radius(85);

const players = [
    {
      id: null,
      position: 1,
      name: "Nelson Rojas",
      club: "CVA",
      points: "340"
    },
    {
      id: null,
      position: 3,
      name: "Javier Leiva",
      club: "OTRO",
      points: "0"
    },
    {
      id: null,
      position: 5,
      name: "Julio Muñoz",
      club: "CVA",
      points: "60"
    },
    {
      id: null,
      position: 6,
      name: "Francisco Salgado",
      club: "CVA",
      points: "10"
    },
    {
      id: null,
      position: 8,
      name: "José Sánchez",
      club: "CVA",
      points: "60"
    },
    {
      id: null,
      position: 9,
      name: "Carlos Chávez",
      club: "CVA",
      points: "90"
    },
    {
      id: null,
      position: 11,
      name: "Sergio Vergara",
      club: "CVA",
      points: "70"
    },
    {
      id: null,
      position: 13,
      name: "Sergio Mejías",
      club: "CVA",
      points: "0"
    },
    {
      id: null,
      position: 16,
      name: "Matías Amar",
      club: "CVA",
      points: "120"
    },
    {
      id: null,
      position: 17,
      name: "Mario Mellado",
      club: "CVA",
      points: "140"
    },
    {
      id: null,
      position: 20,
      name: "Cristóbal Achú",
      club: "CVA",
      points: "-30"
    },
    {
      id: null,
      position: 21,
      name: "Nicolás Leiva",
      club: "SFE",
      points: "40"
    },
    {
      id: null,
      position: 22,
      name: "Angel Rojas",
      club: "CVA",
      points: "0"
    },
    {
      id: null,
      position: 24,
      name: "Juan Lepe S.",
      club: "CVA",
      points: "110"
    },
    {
      id: null,
      position: 25,
      name: "Rafael Mancilla",
      club: "CVA",
      points: "90"
    },
    {
      id: null,
      position: 26,
      name: "Nicolás Sabaj",
      club: "CVA",
      points: "0"
    },
    {
      id: null,
      position: 27,
      name: "Eduardo Moreno",
      club: "SFE",
      points: "50"
    },
    {
      id: null,
      position: 28,
      name: "Mario Polanco",
      club: "CVA",
      points: "0"
    },
    {
      id: null,
      position: 29,
      name: "Cristian Mier",
      club: "CLA",
      points: "10"
    },
    {
      id: null,
      position: 31,
      name: "Leslier Ulloa",
      club: "CVA",
      points: "0"
    },
    {
      id: null,
      position: 32,
      name: "Marcelo Sabaj",
      club: "CVA",
      points: "140"
    }
];

const DRAW = 64;

function players_select_trigger(e) {

    const 
    select = e.target,
    td = select.parentElement.parentElement,
    round = parseInt(td.getAttribute('data-round')),
    line_number = parseInt(td.parentElement.querySelector('td:first-child').innerText),
	option_text = select.options[select.selectedIndex].innerText;
  
	//SHOW INPUT FOR RESULT
    if (option_text !== 'SELECCIONAR GANADOR' && option_text !== '') td.classList.add('finished')
	else td.classList.remove('finished');

    let next_round_select;
    if (round === 1) {

        const lines_array = [1, 5, 9, 13, 17, 21, 25, 29];

        if (lines_array.includes(line_number)) {
            next_round_select = td.parentElement.nextElementSibling.querySelector('td:nth-child(7) select');
            next_round_select.options[1].innerText = select.options[select.selectedIndex].innerText;
        }
        else {
            next_round_select = td.parentElement.previousElementSibling.querySelector('td:nth-child(7) select')
            next_round_select.options[2].innerText = select.options[select.selectedIndex].innerText;
        }
    }

    else if (round === 2) {

        const lines_array = [2, 10, 18, 26];
        
        if (lines_array.includes(line_number)) {
            next_round_select = td.parentElement.nextElementSibling.nextElementSibling.querySelector('td:nth-child(8) select');
            next_round_select.options[1].innerText = select.options[select.selectedIndex].innerText;
        }

        else {
            next_round_select = td.parentElement.previousElementSibling.previousElementSibling.querySelector('td:nth-child(8) select');
            next_round_select.options[2].innerText = select.options[select.selectedIndex].innerText;
        }
    }

    else if (round === 3) {

        if (line_number < 16) {
            
            next_round_select = td.parentElement.parentElement.querySelector('tr:nth-child(8) td:last-child select');

            if (line_number < 8) 
                next_round_select.options[1].innerText = select.options[select.selectedIndex].innerText;
            else 
                next_round_select.options[2].innerText = select.options[select.selectedIndex].innerText;
        }

        else if (line_number > 16) {
            
            next_round_select = td.parentElement.parentElement.querySelector('tr:nth-child(24) td:last-child select');

            if (line_number < 24)
                next_round_select.options[1].innerText = select.options[select.selectedIndex].innerText;
            else
                next_round_select.options[2].innerText = select.options[select.selectedIndex].innerText;
        }
    }

    else if (round === 4) {
        
        next_round_select = td.parentElement.parentElement.querySelector('tr:nth-child(16) td:last-child select');
        if (line_number < 16) next_round_select.options[1].innerText = select.options[select.selectedIndex].innerText;
        else next_round_select.options[2].innerText = select.options[select.selectedIndex].innerText;
    }

    if (round < 5) next_round_select.selectedIndex = 0;
}

function add_players_to_selects() {

    //PUSH ALL PLAYERS THAT HAVE BYE IN 1ST ROUND TO 2ND ROUND
    document.querySelectorAll('#draw-body .round[data-round="1"]').forEach(td => {

        const 
        select = td.querySelector('select'),
        line_number = parseInt(td.parentElement.firstElementChild.innerText),
        player_1 = td.previousElementSibling.innerText,
        player_2 = td.parentElement.nextElementSibling.querySelector('td:nth-child(5)').innerText.trim();

        if (line_number % 2 === 0) select.options[1].innerText = player_1;
        else select.options[2].innerText = player_2;

        if (player_1 === 'Bye') select.selectedIndex = 2;
        else if (player_2 === 'Bye') select.selectedIndex = 1;

		if (select.options[select.selectedIndex].innerText !== 'SELECCIONAR GANADOR') 
			select.parentElement.parentElement.classList.add('finished');

    });

    //ADD PLAYERS TO SELECT OPTIONS IN SECOND ROUND
    document.querySelectorAll('#draw-body .round[data-round="2"]').forEach(td => {

        const
        select = td.querySelector('select'),
        select_1 = td.parentElement.previousElementSibling.querySelector('td[data-round="1"] select'),
        player_1 = select_1.options[select_1.selectedIndex].innerText,
        select_2 = td.parentElement.nextElementSibling.querySelector('td[data-round="1"] select'),
        player_2 = select_2.options[select_2.selectedIndex].innerText;

        if (player_1 !== 'SELECCIONAR GANADOR') select.options[1].innerText = player_1;
        if (player_2 !== 'SELECCIONAR GANADOR') select.options[2].innerText = player_2;

		if (select.options[select.selectedIndex].innerText !== 'SELECCIONAR GANADOR') {
			select.parentElement.parentElement.classList.add('finished');

		}

    });

    //ADD PLAYERS TO SELECT OPTIONS IN THIRD ROUND
    document.querySelectorAll('#draw-body .round[data-round="3"]').forEach(td => {

        const
        select = td.querySelector('select'),
        select_1 = td.parentElement.previousElementSibling.previousElementSibling.querySelector('td[data-round="2"] select'),
        player_1 = select_1.options[select_1.selectedIndex].innerText,
        select_2 = td.parentElement.nextElementSibling.nextElementSibling.querySelector('td[data-round="2"] select'),
        player_2 = select_2.options[select_2.selectedIndex].innerText;

        if (player_1 !== 'SELECCIONAR GANADOR') select.options[1].innerText = player_1;
        if (player_2 !== 'SELECCIONAR GANADOR') select.options[2].innerText = player_2;

		if (select.options[select.selectedIndex].innerText !== 'SELECCIONAR GANADOR') 
			select.parentElement.parentElement.classList.add('finished');

    });

    //ADD PLAYERS TO SELECT OPTIONS IN SEMIFINALS
    document.querySelectorAll('#draw-body .round[data-round="4"]').forEach(td => {

        const
        select = td.querySelector('select'),
        select_1 = td.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('td[data-round="3"] select'),
        player_1 = select_1.options[select_1.selectedIndex].innerText,
        select_2 = td.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('td[data-round="3"] select'),
        player_2 = select_2.options[select_2.selectedIndex].innerText;

        if (player_1 !== 'SELECCIONAR GANADOR') select.options[1].innerText = player_1;
        if (player_2 !== 'SELECCIONAR GANADOR') select.options[2].innerText = player_2;

		if (select.options[select.selectedIndex].innerText !== 'SELECCIONAR GANADOR') 
			select.parentElement.parentElement.classList.add('finished');

    });

    //ADD PLAYERS TO SELECT OPTIONS IN FINAL
    const
    final_select = document.querySelector('#draw-body td[data-round="5"] select'),
    select_1 = document.querySelector('#draw-body tr:nth-child(8) td[data-round="4"] select'),
    player_1 = select_1.options[select_1.selectedIndex].innerText,
    select_2 = document.querySelector('#draw-body tr:nth-child(24) td[data-round="4"] select'),
    player_2 = select_2.options[select_2.selectedIndex].innerText;

    if (player_1 !== 'SELECCIONAR GANADOR') select.options[1].innerText = player_1;
    if (player_2 !== 'SELECCIONAR GANADOR') select.options[2].innerText = player_2;

	if (final_select.options[final_select.selectedIndex].innerText !== 'SELECCIONAR GANADOR') 
		final_select.parentElement.parentElement.classList.add('finished');
}

(async () => {

	console.log(players.length)

    for (let i = 0; i < players.length; i++) {
        
        document.querySelector(`#draw-body tbody tr:nth-child(${players[i].position}) td.club`).innerText = players[i].club;
        document.querySelector(`#draw-body tbody tr:nth-child(${players[i].position}) td.points`).innerText = players[i].points;
        document.querySelector(`#draw-body tbody tr:nth-child(${players[i].position}) td:nth-child(5)`).innerHTML = SANITIZE(players[i].name);

        if (players[i + 1] === undefined) break;
        if (players[i].position % 2 === 0) continue;

        /************ CHOOSE PLAYER FOR FIRST ROUND ****************/
        const select = document.querySelector(`#draw-body tbody tr:nth-child(${players[i].position}) td[data-round="1"] select`);
        
        select.options[1].value =  players[i].id;
        select.options[1].innerText = players[i].name;

        select.options[2].value =  players[i + 1].id;
        select.options[2].innerText = players[i + 1].name;

        //BOTH PLAYERS ARE BYE
        if (players[i].name === 'Bye' && players[i + 1] === 'Bye') select.selectedIndex = 1;

        //BOTH ARE VALID PLAYERS
        else if (players[i].name !== 'Bye' && players[i + 1].name !== 'Bye') select.selectedIndex = 0;

        //ONE OF THE PLAYERS IS BYE. VALID PLAYER PASSES TO NEXT ROUND
        else select.selectedIndex = (players[i].name === 'Bye') ? 2 : 1;
            
    }

	//FORMAT INPUT TO MATCH VALID RESULT
    document.querySelectorAll('input:not(input[data-hour])').forEach(input => {
        input.addEventListener('input', e => {

            if (e.inputType === 'deleteContentBackward') {
                const str = e.target.value;

                //I NEED TO CHECK IF THE LAST CHARACTER IS A DASH
                //IF IT IS A DASH THE ADD THE DASH

                const last_char = str.substring(str.length - 1, str.length);
                const previous_to_last_char = str.substring(str.length - 2, str.length - 1);

                //LAST CHAR IS A NUMBER OR A DASH
                if (parseInt(last_char) !== NaN && previous_to_last_char === ' ') 
                    e.target.value = str.substring(0, str.length - 2) + ' ';
                return
            }
                
            let output = e.target.value.replace(/[^0-9- ]/gmi, '').trim();


            if (output.length === 1) output += '-';

            else {

                const sets = output.split(' ');

                if (sets.length === 1) {
                    if (output.length === 3) output += ' ';
                }

                else {

                    const last_set = sets[sets.length - 1];

                    if (last_set.length === 1) output += '-';
                    else output += ' ';    
                }
            }

            e.target.value = output;
        });
    });

	//FORMAT HOUR INPUTS
    document.querySelectorAll('input[data-hour]').forEach(input => {

        input.addEventListener('input', e => {

            let str = e.target.value.replace(/[^\d:]/gm, '').trim();

            if (e.inputType !== 'deleteContentBackward') {

                const last_char = str.substring(str.length - 1, str.length);

                if (str.length === 2 && last_char === ':') str = '0' + str;
                else if (str.length === 2 && last_char !== ':') str += ':';
                else if (str.length === 3 && last_char !== ':') str = str.substring(0, 2) + ':' + last_char;
                else if (str.length > 5) str = str.substring(0, str.length - 1);
            }

            const 
            str_split = str.split(':'),
            hours = str_split[0],
            minutes = str_split[1];

            //if (parseInt(hours) > 23) 

            e.target.value = str;
            

        })
    
    });

    document.querySelectorAll('.round[data-round]').forEach(td => {

        td.addEventListener('click', e => {

            if (e.target.matches('select')) return;
            
            let td;
            if (e.target.matches('td')) td = e.target;
            else if (e.target.matches('div')) td = e.target.parentElement;
            else if (e.target.matches('p')) td = e.target.parentElement.parentElement;
            else return;

            
        })

        td.querySelector('select').addEventListener('change', players_select_trigger);
    });

    //RESET ALL SELECTS
    document.querySelectorAll('#draw-body select').forEach(select => select.selectedIndex = 0);

    //RESET ALL INPUTS
    document.querySelectorAll('input').forEach(input => input.value = '');

    add_players_to_selects();

	

})();