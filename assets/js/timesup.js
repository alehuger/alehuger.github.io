function d2h(d) {
    return d.toString(16);
}
function h2d (h) {
    return parseInt(h, 16);
}
function stringToHex (tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;
    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i);
        str += d2h(c) + '_';
    }
    return str;
}
function hexToString (tmp) {
    var arr = tmp.split('_'),
        str = '',
        i = 0,
        arr_len = arr.length,
        c;
 
    for (; i < arr_len; i += 1) {
        c = String.fromCharCode( h2d( arr[i] ) );
        str += c;
    }
 
    return str;
}

var joining_key = '_2c_20_'
var WORDLIST;
var NEW_GUESSED_WORDS = [];	
var PERSONNAL_WORDLIST = [];

function load(){
	TIME_SECONDS = 45;
	WORDLIST = [];
	NEW_GUESSED_WORDS = [];	
	PERSONNAL_WORDLIST = [];
}

// HEX CODE INIT

function initialize_wordlist_hexcode_form(){	
	document.getElementById('wordlist_code_generator').style.display = "flex"; 
	document.getElementById('initialize_wordlist_div').textContent = ""; 
}

function add_word_wordlist(){	
	let element = document.getElementById("input_word_wordlist");
	var input = element.value;		
	element.value = '';
	PERSONNAL_WORDLIST.push(input);
	refresh_personnal_wordlist();
	generate_hex_code();
}

function refresh_personnal_wordlist(){
	text = '<ol>'
	for (i = 0; i < PERSONNAL_WORDLIST.length; i++) {text += "<li>" + PERSONNAL_WORDLIST[i] + "</li>";}
	text+= '</ol>'
	document.getElementById("display_current_wordlist").innerHTML = text;	
}

function generate_hex_code(){
	text = PERSONNAL_WORDLIST.join(', ');		
	var hex = stringToHex(text);
	console.log('hex', hex);
	hex = hex.substring(0, hex.length -1);
	document.getElementById("hexcode").innerHTML = hex;	
}

function copy_hexcode_clipboard(){
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	value = document.getElementById("hexcode").textContent;
    dummy.value = value;
    dummy.select();
    document.execCommand("copy");
	document.body.removeChild(dummy);
}

function generate_wordlist_hexcode(){
	value = document.getElementById("input_wordlist_hexcode").value;	
	var raw_dict = hexToString(value);
	WORDLIST = raw_dict.split(', ')
	alert("Wallah, t'es un bon! Press start to play!")
	console.log('Wordlist!: ', WORDLIST)
	
}

// START 

function start(){
	// update tag views
	document.getElementById('game-run').style.display = "flex"; 
	document.getElementById('game-setup').style.display = "none";
	document.getElementById('wordlist_code_generator').style.display = "none"; 
	document.getElementById('custom-time').style.display = "none"; 
	document.getElementById('initialize_wordlist_div').textContent = "";	
	console.log('Wordlist : ', WORDLIST)
	display_random_word_from_wordlist();
	var custom_time = document.getElementById('custom-time');
	if (Number.isInteger(parseInt(custom_time.value))){
		TIME_SECONDS = parseInt(custom_time.value);
	}	
	
	// start countdown
	var countDownDate = new Date().getTime() + TIME_SECONDS * 1000;
	var x = setInterval(function() {		
	var now = new Date().getTime();
	var distance = countDownDate - now;
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	document.getElementById("countdown").innerHTML = "<p class='countdown-timer'>Time Left :  " + seconds + "s</p>";	

	if (seconds < 0) {
		clearInterval(x);
		document.getElementById("countdown").innerHTML = "<p class='countdown-timer'>OVER !</p>";
		document.getElementById('game-run').style.display = "none"; 
		report_number();
		document.getElementById('report').style.display ='flex';			
	  }

	}, 100);
}

// GAME 

function display_random_word_from_wordlist(){
	let length = WORDLIST.length;
	index = parseInt(Math.random()*length);
	var result = WORDLIST[index];
	document.getElementById("word_to_guess").innerHTML= result;
}

function display_next_word_to_guess(){		
	var element = document.getElementById("word_to_guess");	
	content = element.textContent;
	NEW_GUESSED_WORDS.push(content);

	console.log(WORDLIST[WORDLIST.length-1].length)	
	WORDLIST = WORDLIST.filter(e => e !== content);
	refresh_guessed_words()	
	
	console.log('Remaining words : ', WORDLIST)

	if (WORDLIST.length == 0){
		document.getElementById("word_to_guess").textContent= 'No more words!';
		document.getElementById('game-run').style.display ='none';
		document.getElementById('countdown').style.display ='none';
		report_number();
		document.getElementById('report').style.display ='flex';
	}
	else{
		display_random_word_from_wordlist();
	}
}

function display_shuffled_next_word(){
	display_random_word_from_wordlist();
}

function refresh_guessed_words(){
	text = '<ol>'
	for (i = 0; i < NEW_GUESSED_WORDS.length; i++) {
		text += "<li>" + NEW_GUESSED_WORDS[i] + "</li>";
	}
	text+= '</ol>'
	document.getElementById("new_guessed_words").innerHTML= text;
}

// REPORT

function report_number(){
	text = '<p> Newly Guessed Words : ' + NEW_GUESSED_WORDS.length + '</p>' +'<p> Remaining Words to Guess : ' + WORDLIST.length + '</p>';			
	button = "<button class='btn btn-warning' onclick='copy_clipboard()'>Copy Report!</button>";
	all = text + button;
	document.getElementById("report-number").innerHTML= all;
}

function copy_clipboard(){
	let nb_remain = WORDLIST.length;
	let score = NEW_GUESSED_WORDS.length;
	to_encode = WORDLIST.join(', ');		
	var hex = stringToHex(to_encode);	
	hex = hex.substring(0, hex.length -1);

	text = "TURN REPORT: \n" +
	score + " word(s) were found! \n" 
	
	if (nb_remain == 0){
		text += "It is the end of the turn! \n" +
		"Please fetch the original hexcode.";
	}
	else{
		text += nb_remain + " word(s) are still to be found in that round. \n" +
		"Next in turn: " + hex ;
	}
	var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
	document.body.removeChild(dummy);
	alert('Your turn is over! Please paste the report on your friend conversation!')
}