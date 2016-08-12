var game = new Phaser.Game(1000, 750, Phaser.AUT, 'cont', 'https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.1/phaser.min.js');
var audio = new Audio('assets/audio/song.mp3');

function updateLives(lives, text, list, trash)
{
	lives -= 1;
	text.text = 'Lives: '+ lives;
	text.update();
	list.push(trash);
	return lives;
}

function updateScore(score, text, level)
{
	score += 1;
	text.text = 'Score: '+ score;
	text.update();
	return score;
}

function checkLevel(l, s)
{
	if (l == 1 && s>4 || l==2 && s>5 || l==3 && s>6 || l==4 && s>7 || l==5 && s>8)
	{
		return true;
	}
	else 
	{
		return false;
	}

}

function pickTrash(c)
{
	var choice1 = Math.floor(Math.random() * 4);
	var choice2 = c[choice1];
	var choice3 = Math.floor(Math.random() * choice2.length);
	return choice2[choice3];
}

function updateTrash(trash, text, name)
{
	trash.anchor.setTo(0.5, 0,5);
	trash.scale.setTo(0.25);
	text.text = 'Trash: '+ name;
	text.update();
}

function resetMirror(mirror, trash)
{
	if (mirror == 'Mirror')
	{
		trash.anchor.setTo(0.5, 0,5);
		trash.scale.setTo(0.6);
	}

}

function contains(a, obj)
 {
	for (i = 0; i < a.length; i++) 
	{

	    if (a[i] == obj)
	    {
	        return true;
	    }
	}
	return false;
}

function myOverlap(a, b)
{
	if (a.position.x+a.width/2-40 >= b.position.x-b.width/2 && a.position.x-a.width/2-40 <=b.position.x+b.width/2 && 
		a.position.y+a.height/2 >= b.position.y-b.height/2)
	{
	    return true;
	}
	else
	{
	    return false;
	}
}
function doesntMatter(item, compost, recycle, electronic, trash, alum)
{
	var reason = '';
	if (item == 'CD')
	{
		reason = 'Because DVDs and CDs are #7 plastic, they can be \nrecycled.';
	}
	else if (item == 'Ink Cartridge' || item == 'Paint')
	{
		reason = 'These contain toxic materials inside that will \nincrease pollution if put in the trash, therefore should be taken \nto a drop-off location. ';
	}
	else if (item == 'Medicine')
	{
		reason = 'Powerful drugs may leach into the soil and water\nsupply, where they can wreak havoc with the environment.';
	}
	else if (item == 'Glass Jar')
	{
		reason = 'Glass products have the ability to be recycle\nbecause they never lose quality through the process.';
	}
	else if (item == 'Flower Pot')
	{
		reason = 'Although PS is used in our everyday life in the\nform of styrofoam take-out boxes and packing peanuts, it \nshould not be recycled. Like PVC, it may leach chemicals. It is \nbest for this materials to be thrown in the Trash. ';
	}
	else if (item == 'Cooler')
	{
		reason = 'PC(Polycarbonate) or OtherBecause #7 plastics\ncontain a broad spectrum of plastics, it is important to visit your \nlocal waste management site for disposal methods.';
	}
	else if (item == 'Thermometer')
	{
		reason = 'They contain 500 milligrams of mercury, which\ncan become a health hazard if the thermometer is accidentally \n broken.';
	}
	else if (item == 'Cosmetics')
	{
		reason = "cosmetics contain chemical substances and go\n into the hazardous waste. Even when empty, cosmetic containers \ncan't be recycled due to the blend of materials that they're made of.";
	}
	else if (item == 'Tire') 
	{
		reason = 'The steel-belt inside auto tires can puncture the \nliners of landfills, leading to ground contamination.';
	}
	else if (item == 'Bulb')
	{
		reason = 'These contain small amounts of mercury that pollute the \nair we breathe, therefore should be taken to a drop-off location.';
	}
	else if (contains(compost, item))
	{
		reason = 'These type of products should be composted\n because they are soiled in various types of materials, such as \ngrease.';
	}
	else if (contains(recycle, item))
	{
		reason = 'Paper products are shredded down in \nrecycling centers into a film that is screened and then can be \nrepurposed into new paper products.'; 
	}
	else if (contains(electronic, item))
	{
		reason = 'Many electronic devices contain harmful \nchemicals and metals that should not be thrown in the trash,\n but taken to drop-off locations.'; 
	}
	else if (contains(alum, item))
	{
		reason = 'This product provides extremely valuable and highly\nrecyclable metals and materials; therefore, it \nshould be recycled.';
	}
	else if (contains(trash, item))
	{
		reason = 'This product goes into trash because it cannot\nbe recycled or broken down.';
	}
	return reason;
}

	WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, create, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Bungee Inline', 'Arial Black','Exo', 'Hind','Dosis']
    }
    };


var GameState = {

	preload:function(){

		//backgrounds
		this.load.image('background', 'assets/images/background.png');
		this.load.image('beach', 'assets/images/beach.png');
		this.load.image('mall', 'assets/images/mall.png');
		this.load.image('hallway', 'assets/images/hallway.png');
		this.load.image('airport', 'assets/images/airport.png');
		this.load.image('mainMenu', 'assets/images/wood.png');

		//cans
		this.load.image('recycle', 'assets/images/recycle.png');
		this.load.image('compost', 'assets/images/compost.png');
		this.load.image('trashcan', 'assets/images/trashcan.png');
		this.load.image('othercan', 'assets/images/othercan.png');

		//trash
		this.load.image('Pizza Box', 'assets/images/pizza.png');
		this.load.image('Mail', 'assets/images/mail.png');
		this.load.image('Paper', 'assets/images/paper.png');
		this.load.image('Phonebook', 'assets/images/phonebook.png');
		this.load.image('Book', 'assets/images/book.png');
		this.load.image('Cereal', 'assets/images/cereal.png');
		this.load.image('Cardboard Box', 'assets/images/cardboardbox.png');
		this.load.image('Plastic Cup', 'assets/images/plasticcup.png');
		this.load.image('Plate', 'assets/images/plate.png');
		this.load.image('CD', 'assets/images/cd.png');
		this.load.image('Battery', 'assets/images/battery.png');
		this.load.image('Cell Phone', 'assets/images/cellphone.png');
		this.load.image('Powercord', 'assets/images/powercord.png');
		this.load.image('Apple Core', 'assets/images/applecore.png');
		this.load.image('Banana', 'assets/images/banana.png');
		this.load.image('Pasta', 'assets/images/pasta.png');
		this.load.image('Pistachio', 'assets/images/pistachio.png');
		this.load.image('Pretzel', 'assets/images/pretzel.png');
		this.load.image('Popcorn', 'assets/images/popcorn.png');
		this.load.image('Candy', 'assets/images/candy.png');
		this.load.image('Egg Carton', 'assets/images/eggcarton.png');
		this.load.image('Balloons', 'assets/images/balloons.png');
		this.load.image('Feather', 'assets/images/feather.png');
		this.load.image('Corn', 'assets/images/corn.png');
		this.load.image('Leaf', 'assets/images/leaf.png');
		this.load.image('Can', 'assets/images/can.png');
		this.load.image('Water Bottle', 'assets/images/waterbottle.png');
		this.load.image('Glass Jar', 'assets/images/glassjar.png');
		this.load.image('Ink Cartridge', 'assets/images/inkcartridge.png');
		this.load.image('Ceramic Vase', 'assets/images/ceramic.png');
		this.load.image('Mirror', 'assets/images/mirror.png');
		this.load.image('Flower Pot', 'assets/images/pot.png');
		this.load.image('PVC', 'assets/images/PVC.png');
		this.load.image('Soap', 'assets/images/soap.png');
		this.load.image('Computer', 'assets/images/computer.png');
		this.load.image('Microwave', 'assets/images/microwave.png');
		this.load.image('Clock', 'assets/images/clock.png');
		this.load.image('Camera', 'assets/images/camera.png');
		this.load.image('Bulb', 'assets/images/bulb.png');
		this.load.image('TV', 'assets/images/tv.png');
		this.load.image('Paint', 'assets/images/paint.png');
		this.load.image('Medicine', 'assets/images/medicine.png');
		this.load.image('Cosmetics', 'assets/images/cosmetics.png');
		this.load.image('Cooler', 'assets/images/cooler.png');
		this.load.image('Thermometer', 'assets/images/thermometer.png');
		this.load.image('Tire', 'assets/images/tire.png');
		this.load.image('Key', 'assets/images/key.png');
		this.load.image('Newspaper', 'assets/images/newspaper.png');
		this.load.image('Magazine', 'assets/images/magazine.png');
		this.load.image('Stereo', 'assets/images/stereo.png');
		this.load.image('MP3 Player', 'assets/images/mp3.png');
		this.load.image('Metal Lid', 'assets/images/metallid.png');


		//buttons
		this.load.image('play', 'assets/images/play.png');
		this.load.image('instructions', 'assets/images/instructions.png');
		this.load.image('next', 'assets/images/next_button.png');
		this.load.image('next level', 'assets/images/next_level.png');
		this.load.image('back', 'assets/images/back_button.png');
		this.load.image('try again', 'assets/images/tryAgain.png');
		this.load.image('play again', 'assets/images/playAgain.png');
		this.load.image('mistakes', 'assets/images/mistakes.png');

		//audio
		this.load.audio('background_music', 'assets/audio/song.mp3');
		this.load.audio('correct', 'assets/audio/correct.mp3');
		this.load.audio('wrong', 'assets/audio/wrong.mp3');




		//fonts
		this.game.load.script('Bungee Inline', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.game.load.script('Exo', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.game.load.script('Dosis', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

		this.recycle_list = ['Magazine', 'Mail', 'Paper', 'Phonebook', 'Book', 'Cereal', 'Cardboard Box', 'Plastic Cup', 'Plate','Can','Water Bottle','Newspaper','Glass Jar','PVC','Cooler', 'Metal Lid','Key'];
		
		this.trash_list = ['Ceramic Vase','Mirror','Flower Pot', 'Soap'];
		this.compost_list = ['Pizza Box','Apple Core','Banana','Pasta','Pistachio','Pretzel','Popcorn','Candy','Egg Carton','Balloons', 'Feather','Corn'];
		this.other_list = ['Stereo','MP3 Player', 'CD', 'Battery', 'Cell Phone', 'Powercord','Ink Cartridge','Computer','Microwave','Clock','Camera','Bulb','TV','Paint','Medicine','Cosmetics','Thermometer','Tire'];

		this.oldmed = ['Medicine'];
		this.paper = ['Paper', 'Mail', 'Newspaper', 'Phonebook', 'Cereal', 'Cardboard Box','Book'];
		this.electronic = ['Camera', 'Microwave', 'Computer', 'Battery', 'Powercord', 'Clock', 'TV', 'Cell Phone', 'Stereo', 'MP3'];
		this.alum = ['Key', 'Metal Lid'];
		this.ground = [];
		this.wrong = [];
		this.collection = [this.recycle_list, this.trash_list, this.compost_list, this.other_list];
		this.randomTrash = pickTrash(this.collection);

		this.dx = 10;
		this.dy = 0;

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		this.altKey = game.input.keyboard.addKey(Phaser.Keyboard.ALT);


		this.score =  0;
		this.scoreText;

		this.lives = 3;
		this.livesText;

		this.startText;
		this.enter;
		this.gameOverText;
		this.restart;
		this.learnText;
		this.title;
		this.levelText;
		this.instructions_text;
		this.pressSpace;
		this.doyou;
		this.goalScore;


		this.wrong1;
		this.wrong2;
		this.wrong3;

		this.g = 0;  
		this.time = 25;
		this.track = 0;

		this.level = 1;

		this.gameOver = false;

		this.reason1 = '';
		this.reason2 = '';
		this.reason3 = '';

	},
	create: function(){

		this.background = this.game.add.sprite(0, 0, 'mainMenu');
		this.background.scale.setTo(2.7);
		this.startText =  game.add.text(150, 100, 'Eco-Drop', {fontSize: '180px', fill: '#ffffff', fontFamily: 'Bungee Inline'});
		this.doyou = game.add.text(330, 320, 'Do you know your trash?', {fontSize: '40px', fill: '#ffffff', fontFamily: 'Arial Black'});
		this.startText.font = 'Exo';
		this.doyou.font = 'Dosis';

		
		this.play = this.game.add.button(200, 450, 'play', this.buttonClick, this, 2, 1, 0);
		this.instructions = this.game.add.button(550, 450, 'instructions', this.instructionsClick, this, 2, 1, 0);
		
	},
	instructionsClick: function() {
		this.instructions.destroy();
		this.startText.destroy();
		this.doyou.destroy();
		this.play.position.setTo(690, 600)
		this.instructions_text = game.add.text(240, 70, 'Instructions', {fontSize: '110px', fill:'#ffffff', fontFamily: 'Bungee Inline'});
		this.instructions_text.font = 'Exo';
		this.pressSpace1 = game.add.text(100, 260, '1. Press space to drop the trash in the correct bin.', {fontSize: '35px', fill:'#ffffff', fontFamily: 'Arial Black'});
		this.pressSpace2 = game.add.text(100, 320, '2. You have 25 seconds to complete each level.', {fontSize: '35px', fill:'#ffffff', fontFamily: 'Arial Black'});
		this.pressSpace3 = game.add.text(100, 380, '3. The goal is to reach level 5.', {fontSize: '35px', fill:'#ffffff', fontFamily: 'Arial Black'});
		this.pressSpace4 = game.add.text(100, 440, '4. Good luck!', {fontSize: '35px', fill:'#ffffff', fontFamily: 'Arial Black'});
		this.pressSpace1.font = 'Dosis';
		this.pressSpace2.font = 'Dosis';
		this.pressSpace3.font = 'Dosis';
		this.pressSpace4.font = 'Dosis';
	},
	backClicked: function(){
		this.gameOverText =  game.add.text(100, 200, 'Game Over', {fontSize: '150px', fill: '#ffffff'});
		this.tryAgain = this.game.add.button(200, 450, 'try again', this.buttonClick, this, 2, 1, 0);
		this.missedItems = this.game.add.button(500, 450, 'mistakes', this.missedClick, this, 2, 1, 0);
	},
	missedClick: function(){
		console.log('reached');
		this.tryAgain2 = this.game.add.button(25, 25, 'try again', this.buttonClick, this, 2, 1, 0);
		this.tryAgain2.scale.setTo(0.7);
		this.gameOverText.destroy();
		this.tryAgain.destroy();
		this.missedItems.destroy();
		this.title = game.add.text(300, 30, 'Why was I wrong?', {fontSize: '50px', fill: '#ffffff'});
		if (this.wrong.length == 3)
		{
			this.reason1 = doesntMatter(this.wrong[0], this.compost_list, this.recycle_list, this.electronic, this.trash_list, this.alum);
			this.reason2 = doesntMatter(this.wrong[1], this.compost_list, this.recycle_list, this.electronic, this.trash_list, this.alum);
			this.reason3 = doesntMatter(this.wrong[2], this.compost_list, this.recycle_list, this.electronic, this.trash_list, this.alum);
			this.wrong1 = game.add.text(16, 125, '1. '+this.wrong[0]+ ': '+this.reason1, {fontSize: '32px', fill: '#ffffff'});
			this.wrong2 = game.add.text(16, 350,'2. '+this.wrong[1]+ ': '+this.reason2, {fontSize: '32px', fill: '#ffffff'});
			this.wrong3 = game.add.text(16, 550, '3. '+this.wrong[2]+ ': '+this.reason3, {fontSize: '32px', fill: '#ffffff'});
		}
		else if (this.wrong.length == 2)
		{
			this.reason1 = doesntMatter(this.wrong[0], this.compost_list, this.recycle_list, this.electronic, this.trash_list, this.alum);
			this.reason2 = doesntMatter(this.wrong[1], this.compost_list, this.recycle_list, this.electronic, this.trash_list, this.alum);
			this.wrong1 = game.add.text(16, 125, '1. '+this.wrong[0]+ ': '+this.reason1, {fontSize: '32px', fill: '#ffffff'});
			this.wrong2 = game.add.text(16, 350, '2. '+this.wrong[1]+ ': '+this.reason2, {fontSize: '32px', fill: '#ffffff'});
		}
		else if (this.wrong.length == 1)
		{
			this.reason1 = doesntMatter(this.wrong[0], this.compost_list, this.recycle_list, this.electronic, this.trash_list, this.alum);
			this.wrong1 = game.add.text(16, 125, '1. '+this.wrong[0]+ ': '+this.reason1, {fontSize: '32px', fill: '#ffffff'})
		}
		
		this.wrong.splice(0, this.wrong.length-1);
		
	},

	buttonClick: function() {
		this.wrong.splice(0, this.wrong.length-1);
		this.music = game.add.audio('background_music');
		this.music.play();
		this.g = 1;
		this.background.destroy();
		if (this.level == 2)
		{
			this.background = this.game.add.sprite(0, 0, 'beach');
			this.background.scale.setTo(1.25);
		}
		else if (this.level == 3)
		{
			this.background = this.game.add.sprite(0, 0, 'mall');
			this.background.scale.setTo(0.75);
		}
		else if (this.level == 4)
		{
			this.background = this.game.add.sprite(0, 0, 'hallway');
			this.background.scale.setTo(0.33);
		}
		else if (this.level == 5)
		{
			this.background = this.game.add.sprite(0, 0, 'airport');
			this.background.scale.setTo(0.33);
		}
		else
		{
			this.background = this.game.add.sprite(0, 0, 'background');
		}
		this.randomTrash = pickTrash(this.collection);
		this.trash = this.game.add.sprite(500, 25, this.randomTrash);
		this.trash.anchor.setTo(0.5, 0,5);
		this.trash.scale.setTo(0.25);
		this.recycle = this.game.add.sprite(350, 600, 'recycle');
		this.recycle.anchor.setTo(0.2, 0.2);
		this.recycle.scale.setTo(0.5);
		this.compost = this.game.add.sprite(130, 600, 'compost');
		this.compost.anchor.setTo(0.2, 0.2);
		this.compost.scale.setTo(0.5);
		this.trashcan = this.game.add.sprite(590, 600, 'trashcan');
		this.trashcan.anchor.setTo(0.2, 0.2);
		this.trashcan.scale.setTo(0.5);
		this.othercan = this.game.add.sprite(815, 600, 'othercan');
		this.othercan.anchor.setTo(0.2, 0.2);
		this.othercan.scale.setTo(0.5);

		this.goalScore = game.add.text(16, 16, 'Goal Score: '+(5+this.level-1), {fontSize: '32px', fill: '#ffff66'});
		this.scoreText =  game.add.text(16, 50, 'Score: 0', {fontSize: '32px', fill: '#ffff66'});
		this.livesText =  game.add.text(16, 84, 'Lives: ' +this.lives, {fontSize: '32px', fill: '#ffff66'});
		this.timer = game.add.text(16, 118, 'Timer: 25', {fontSize: '32px', fill: '#ffff66'});
		this.trashName = game.add.text(16, 152, 'Trash: '+ this.randomTrash, {fontSize: '32px', fill: '#ffff66'});
		this.gameOver  = false;
		this.lives = 3;
		this.score = 0;
		this.time = 25;
		this.dx = 10;
			

	},
	update:function(){

		resetMirror(this.randomTrash, this.trash);

		if (this.g == 1)
		{
			this.track += 1;
			if (this.track > 50)
			{
				this.time -= 1;
				this.timer.text = 'Timer: '+this.time;
				this.timer.update();
				this.track = 0;
				if (this.time < 1)
				{
					this.gameOver = true;
				}
			}

			if (this.trash.position.x >= this.game.world.width-this.trash.width || this.trash.position.x <= this.trash.width) 
			{
				this.dx = -this.dx;
			}
			if (this.spaceKey.isDown && this.lives > 0)
			{
				this.dy = 10;
				this.dx = 0;
			}
			
			if (myOverlap(this.trash, this.trashcan))
			{
				this.dy = 0;
				this.dx = 10;
				if (contains(this.trash_list, this.randomTrash))
				{
					this.score = updateScore(this.score, this.scoreText);
					this.correct_music = game.add.audio('correct');
					this.correct_music.play();
				}
				else
				{
					this.lives = updateLives(this.lives, this.livesText, this.wrong, this.randomTrash);
					this.wrong_music = game.add.audio('wrong');
					this.wrong_music.play();
				}
				this.randomTrash = pickTrash(this.collection);
				this.trash.destroy();
				this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				updateTrash(this.trash, this.trashName, this.randomTrash);

			}
			else if (myOverlap(this.trash, this.recycle))
			{
				this.dy = 0;
				this.dx = 10;
				if (contains(this.recycle_list, this.randomTrash))
				{
					this.score = updateScore(this.score, this.scoreText);
					this.correct_music = game.add.audio('correct');
					this.correct_music.play();
				}
				else
				{
					this.lives = updateLives(this.lives, this.livesText, this.wrong, this.randomTrash);
					this.wrong_music = game.add.audio('wrong');
					this.wrong_music.play();
					console.log("recycle" + ", "+this.trash.position.x + ", " +this.trash.position.y);
				}
				this.randomTrash = pickTrash(this.collection);
				this.trash.destroy();
				this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				updateTrash(this.trash, this.trashName, this.randomTrash);
			}
			else if (myOverlap(this.trash, this.othercan))
			{
				this.dy = 0;
				this.dx = 10;
				if (contains(this.other_list, this.randomTrash))
				{
					this.score = updateScore(this.score, this.scoreText);
					this.correct_music = game.add.audio('correct');
					this.correct_music.play();
				}
				else
				{
					this.lives = updateLives(this.lives, this.livesText, this.wrong, this.randomTrash);
					this.wrong_music = game.add.audio('wrong');
					this.wrong_music.play();
				}
				this.randomTrash = pickTrash(this.collection);
				this.trash.destroy();
				this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				updateTrash(this.trash, this.trashName, this.randomTrash);
			}

			else if (myOverlap(this.trash, this.compost))
			{
				this.dy = 0;
				this.dx = 10;
				if (contains(this.compost_list, this.randomTrash))
				{

					this.score = updateScore(this.score, this.scoreText);
					this.correct_music = game.add.audio('correct');
					this.correct_music.play();
				}
				else
				{
					this.lives = updateLives(this.lives, this.livesText, this.wrong, this.randomTrash);
					this.wrong_music = game.add.audio('wrong');
					this.wrong_music.play();		
				}
				this.randomTrash = pickTrash(this.collection);
				this.trash.destroy();
				this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				updateTrash(this.trash, this.trashName, this.randomTrash);
			}

			if(this.trash.position.y < 650)
			{
				this.trash.position.setTo(this.trash.position.x + this.dx, this.trash.position.y + this.dy);
			}
			else
			{
				this.ground.push(this.trash);
				this.lives = updateLives(this.lives, this.livesText, this.wrong, this.randomTrash);
				this.dy = 0;
				this.dx = 10;
				this.randomTrash = pickTrash(this.collection);
				this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				updateTrash(this.trash, this.trashName, this.randomTrash);
			}

			if (this.lives <= 0)
			{
				this.gameOver = true;
				console.log(this.trash.position.x + ", " +this.trash.position.y);
			}

			if (this.gameOver)
			{
				for (i = 0; i<this.ground.length; i++)
				{
					this.ground[i].destroy();
				}
				this.background.destroy();
				this.background = game.add.sprite(0, 0, 'mainMenu');
				this.background.scale.setTo(2.7);
				this.gameOverText =  game.add.text(130, 200, 'Game Over', {fontSize: '150px', fill: '#ffffff'});
				this.gameOverText.font = 'Exo';
				this.dx = 0;
				this.dy = 0;
				this.level = 1;
				this.trash.destroy();
				this.music.stop();
				this.tryAgain = this.game.add.button(200, 450, 'try again', this.buttonClick, this, 2, 1, 0);
				this.missedItems = this.game.add.button(550, 450, 'mistakes', this.missedClick, this, 2, 1, 0);
				this.g = 0;
			}
			else if (checkLevel(this.level, this.score))
			{
				this.background.destroy();
				this.background = this.game.add.sprite(0, 0, 'mainMenu');
				this.music.stop();
				this.background.scale.setTo(2.7);
				this.level += 1;
				
				this.g = 3;
				this.time = 5;
				this.track = 0;
				if (this.level != 6)
				{
					this.levelText =  game.add.text(100, 200, 'Next level will start in 3', {fontSize: '70px', fill: '#ffffff'});
					this.nextLevel =  game.add.sprite(350, 400, 'next level');
				}

			} 

		}
		else if (this.g == 2)
		{
				// if (this.gameOver)
				// {		
				// 	this.gameOverText.destroy();
				// 	this.restart.destroy();
				// 	this.learnText.destroy();
				// 	this.gameOver = false;
				// 	this.background = this.game.add.sprite(0, 0, 'background');
				// 	this.randomTrash = pickTrash(this.collection);
				// 	this.trash.destroy();
				// 	this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				// 	updateTrash(this.trash, this.trashName, this.randomTrash);
				// 	this.wrong.splice(0, this.wrong.length-1);
				// 	this.recycle = this.game.add.sprite(350, 600, 'recycle');
				// 	this.recycle.anchor.setTo(0.2, 0.2);
				// 	this.recycle.scale.setTo(0.5);
				// 	this.compost = this.game.add.sprite(130, 600, 'compost');
				// 	this.compost.anchor.setTo(0.2, 0.2);
				// 	this.compost.scale.setTo(0.5);
				// 	this.trashcan = this.game.add.sprite(590, 600, 'trashcan');
				// 	this.trashcan.anchor.setTo(0.2, 0.2);
				// 	this.trashcan.scale.setTo(0.5);
				// 	this.othercan = this.game.add.sprite(815, 600, 'othercan');
				// 	this.othercan.anchor.setTo(0.2, 0.2);
				// 	this.othercan.scale.setTo(0.5);
				// 	this.trashName = game.add.text(16, 134, 'Trash: '+ this.randomTrash, {fontSize: '28px', fill: '#ffffff'});
				// 	this.timer = game.add.text(16, 84, 'Timer: 0', {fontSize: '32px', fill: '#ffffff'});
				// 	this.scoreText =  game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#ffffff'});
				// 	this.livesText =  game.add.text(16, 50, 'Lives: ' +this.lives, {fontSize: '32px', fill: '#ffffff'});

				// }
				this.music.play();
				this.background.destroy();
				if (this.level == 2)
				{
					this.background = this.game.add.sprite(0, 0, 'beach');
					this.background.scale.setTo(1.25);
				}
				else if (this.level == 3)
				{
					this.background = this.game.add.sprite(0, 0, 'mall');
					this.background.scale.setTo(0.75);
				}
				else if (this.level == 4)
				{
					this.background = this.game.add.sprite(0, 0, 'hallway');
					this.background.scale.setTo(0.33);
				}
				else if (this.level == 5)
				{
					this.background = this.game.add.sprite(0, 0, 'airport');
					this.background.scale.setTo(0.33);
				}
				else
				{
					this.background = this.game.add.sprite(0, 0, 'background');
				}

				this.trash = this.game.add.sprite(500, 25, this.randomTrash);
				this.trash.anchor.setTo(0.5, 0,5);
				this.trash.scale.setTo(0.25);
				this.recycle = this.game.add.sprite(350, 600, 'recycle');
				this.recycle.anchor.setTo(0.2, 0.2);
				this.recycle.scale.setTo(0.5);
				this.compost = this.game.add.sprite(130, 600, 'compost');
				this.compost.anchor.setTo(0.2, 0.2);
				this.compost.scale.setTo(0.5);
				this.trashcan = this.game.add.sprite(590, 600, 'trashcan');
				this.trashcan.anchor.setTo(0.2, 0.2);
				this.trashcan.scale.setTo(0.5);
				this.othercan = this.game.add.sprite(815, 600, 'othercan');
				this.othercan.anchor.setTo(0.2, 0.2);
				this.othercan.scale.setTo(0.5);
				this.goalScore = game.add.text(16, 16, 'Goal Score: '+(5+(this.level-1)*2), {fontSize: '32px', fill: '#ffffff'});
				this.scoreText =  game.add.text(16, 50, 'Score: 0', {fontSize: '32px', fill: '#ffffff'});
				this.livesText =  game.add.text(16, 84, 'Lives: ' +this.lives, {fontSize: '32px', fill: '#ffffff'});
				this.timer = game.add.text(16, 118, 'Timer: 0', {fontSize: '32px', fill: '#ffffff'});
				this.trashName = game.add.text(16, 152, 'Trash: '+ this.randomTrash, {fontSize: '32px', fill: '#ffffff'});

				

				this.g = 1;
				this.score = 0;
				this.lives   = 3; 
				this.time = 25;
				this.timer.text = 'Timer: '+this.time;
				this.timer.update();
				this.scoreText.text = 'Score: '+ this.score;
				this.scoreText.update();
				this.livesText.text =  'Lives: ' +this.lives;
				this.dx = 10;
		}
		else if (this.g == 3)
		{
			if (this.level == 6)
			{
				this.win = game.add.text(170, 200, 'YOU WIN!', {fontSize: '150px', fill: '#ffffff'});
				this.win.font = 'Exo';
				this.playAgain = this.game.add.button(350, 450, 'play again', this.buttonClick, this, 2, 1, 0);
				this.g = 0;
			}
			else
			{
				this.track += 1;
				if (this.track > 50)
				{
					this.time -= 1;
					this.timer.text = 'Timer: '+this.time;
					this.timer.update();
					this.track = 0;
				}
				this.levelText.text = 'Next level will start in '+this.time;
				if (this.time<1)
				{
					this.g = 2;
				}
			}
		}
	}
};


game.state.add('GameState', GameState);
game.state.start('GameState');






