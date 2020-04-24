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
	document.getElementById('initialize_wordlist_div').textContent = "";	
	console.log('Wordlist : ', WORDLIST)
	display_random_word_from_wordlist();
	
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
	text = '<ul>'
	for (i = 0; i < NEW_GUESSED_WORDS.length; i++) {
		text += "<li>" + NEW_GUESSED_WORDS[i] + "</li>";
	}
	text+= '</ul>'
	document.getElementById("new_guessed_words").innerHTML= text;
}

// REPORT

// 52_6f_62_69_6e_73_6f_6e_20_43_72_75_73_6f_e9_2c_20_43_68_61_72_6c_65_6d_61_67_6e_65

function report_number(){
	text = '<p> Newly Guessed Words : ' + NEW_GUESSED_WORDS.length + '</p>' +'<p> Remaining Words to Guess : ' + WORDLIST.length + '</p>';			
	button = "<button onclick='copy_clipboard()'>Copy Wordlist Hexcode!</button>";
	all = text + button;
	document.getElementById("report-number").innerHTML= all;
}

function copy_clipboard(){
	text = WORDLIST.join(', ');		
	var hex = stringToHex(text);	
	hex = hex.substring(0, hex.length -1);

	var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = hex;
    dummy.select();
    document.execCommand("copy");
	document.body.removeChild(dummy);
	alert('Your turn is over! Please paste the found hexcode to the Messenger Conversation!')
}


class StickyNavigation {

	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		// $('.et-hero-tab').click(function() { 
		// 	self.onTabClick(event, $(this)); 
		// });
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
	this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();