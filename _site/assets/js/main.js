const raw_list = 'Astérix le gaulois, Bill Gates, Lancelot, Nanouk l’esquimau, Superman, Barack Obama, Tintin, Rayman, Einstein, Alice au pays des merveilles, Jack Sparrow, Louis Vuitton, Alphonse Daudet, Casimir, Napoléon, Bugs Bunny, Johnny Halliday, Lucky Luke, Charlie Chaplin, La Joconde, Dark Vador, Le génie de la lampe, Haroun Tazieff, Schreck, La reine d’Angleterre, Claude François, Gaston Lagaffe, Cindy Sanders, Zavatta, Lionel Messi, Agatha Christie, Hubert Reeves, Picasso, Steve Job, Louis de Funès, Mickey, Chantal Goya, Cousteau, Galilée, Un shadock, Chef indien, Harry Potter, Cyril Lignac, Archimède, L’Abbé Pierre, Louis XIV, Céline Dion, Les frères Grimm, Cléopâtre, Mr Bean, Yannick Noah, Isaac Newton, Le Dalaï lama, Bisounours, Homer Simpson, Jean-Pierre Pernaut, Jules Verne, Gad Elmaleh, Dorothée, Mac Gyver, Mimi Mathy, Zinedine Zidane, Michael Jackson, Mime Marceau, Marilyn Monroe';

const TIME_SECONDS = 40;

function start(){
	document.getElementById('game-run').style.display = "flex"; 
	document.getElementById('game-setup').style.display = "none"; 
	var countDownDate = new Date().getTime() + 40 * 1000;

	// Update the count down every 1 second
	var x = setInterval(function() {

	// Get today's date and time
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = countDownDate - now;

	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in the element with id="demo"
	document.getElementById("countdown").innerHTML = "<p class='countdown-timer'>Time Left :  " + seconds + "s</p>";

	if (seconds < 0) {
		clearInterval(x);
		document.getElementById("countdown").innerHTML = "<p class='countdown-timer'>OVER !</p>";
		document.getElementById('game-run').style.display = "none"; 
		report_number();
		document.getElementById('report').style.display ='flex';

		index = parseInt(Math.random()*REMAINING_WORDS.length);
		var result = REMAINING_WORDS[index];
		document.getElementById("word_to_guess").innerHTML= result;		
	  }

	}, 60);
}

var WORDLIST = []
var REMAINING_WORDS = WORDLIST;
var ALREADY_GUESSED_WORDS = [];	
var NEW_GUESSED_WORDS = [];	


console.log(WORDLIST)
console.log(ALREADY_GUESSED_WORDS)
console.log(REMAINING_WORDS)
console.log(NEW_GUESSED_WORDS)

function load(){
	WORDLIST = raw_list.split(', ');
	REMAINING_WORDS = WORDLIST;	
	text = '<ul>'
	for (i = 0; i < WORDLIST.length; i++) {
		text += "<li>" + WORDLIST[i] + "</li>";
	  }
	text+= '</ul>'
	document.getElementById("display_wordlist").innerHTML = text;	
	
	var ALREADY_GUESSED_WORDS = [];	
	var NEW_GUESSED_WORDS = [];	
}

function refresh_init(){
	text = '<ul>'
	for (i = 0; i < ALREADY_GUESSED_WORDS.length; i++) {
		text += "<li>" + ALREADY_GUESSED_WORDS[i] + "</li>";
	  }
	text+= '</ul>'
	document.getElementById("display_guessed_words").innerHTML = text;	
	console.log('guessed : ', ALREADY_GUESSED_WORDS)
	// Check sublist
	if (ALREADY_GUESSED_WORDS.every(val => WORDLIST.includes(val))){
		REMAINING_WORDS = WORDLIST.filter(value => !ALREADY_GUESSED_WORDS.includes(value))
		console.log('remaining: ', REMAINING_WORDS)
	}
	else{
		console.log(ALREADY_GUESSED_WORDS)
		alert('Sublists do not match!\nRestart the page with a valid sublist.')
	}
	
}

function refresh_next_word(){
	text = '<ul>'
	for (i = 0; i < guessed_words.length; i++) {
		text += "<li>" + guessed_words[i] + "</li>";
	  }
	text+= '</ul>'
	document.getElementById("display_guessed_words").innerHTML = text;	
}

function add_guessed_words(){	
	var input = document.getElementById("input_guessed_words").value;	
	let already_guessed_words_var = input.split(', ');
	for (i = 0; i < already_guessed_words_var.length; i++) {
		console.log(ALREADY_GUESSED_WORDS)
		ALREADY_GUESSED_WORDS.push(already_guessed_words_var[i]);
	  }
	refresh_init()
}

function display_next_word_to_guess(){		

	var element = document.getElementById("word_to_guess");	
	content = element.textContent;

	if (content != ''){	
		console.log(NEW_GUESSED_WORDS)	
		NEW_GUESSED_WORDS.push(content)		
		REMAINING_WORDS = REMAINING_WORDS.filter(e => e !== content);
		text = '<ul>'
		for (i = 0; i < NEW_GUESSED_WORDS.length; i++) {
			text += "<li>" + NEW_GUESSED_WORDS[i] + "</li>";
		}
		text+= '</ul>'
		document.getElementById("new_guessed_words").innerHTML= text;
	}

	console.log('Remaining words : ', REMAINING_WORDS)
	let length = REMAINING_WORDS.length;
	if (length ==0){
		document.getElementById("word_to_guess").textContent= 'No more words!';
		document.getElementById('game-run').style.display ='none';
		document.getElementById('countdown').style.display ='none';
		report_number();
		document.getElementById('report').style.display ='flex';
	}
	else{
		index = parseInt(Math.random()*length);
		var result = REMAINING_WORDS[index];
		document.getElementById("word_to_guess").innerHTML= result;
	}
}

function report_number(){
	text = '<p> Newly Guessed Words : ' + NEW_GUESSED_WORDS.length + '</p>' +'<p> Remaining Words to Guess : ' + REMAINING_WORDS.length + '</p>';			
	button = "<button onclick='copy_clipboard()'>Copy List of Already Found Words!</button>"
	all = text + button
	document.getElementById("report-number").innerHTML= all;
}

function copy_clipboard(){
	var processed_list = ''
	for (i = 0; i < ALREADY_GUESSED_WORDS.length; i++) {
		processed_list += ALREADY_GUESSED_WORDS[i] + ', '
	}
	for (i = 0; i < NEW_GUESSED_WORDS.length; i++) {
		processed_list += NEW_GUESSED_WORDS[i] + ', '
	}	
	processed_list = processed_list.substring(0, processed_list.length -2)
	
	var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = processed_list;
    dummy.select();
    document.execCommand("copy");
	document.body.removeChild(dummy);
	alert('Your turn is over! Please paste the found word list to the Messenger Conversation!')
}


class StickyNavigation {
	
		constructor() {
			this.currentId = null;
			this.currentTab = null;
			this.tabContainerHeight = 70;
			let self = this;
			$('.et-hero-tab').click(function() { 
				self.onTabClick(event, $(this)); 
			});
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