
/*
	REBEL RESCUE
	(C) Mark Wilcox 
	More games at www.spacemonsters.co.uk
*/

var GAMETITLE = "REBELRESCUE";
var SCOREFONT = "Arial";
var IPHONEHACK = true;
var ISPORTRAIT = false;
var DESKTOP = false;
var PI = 3.14159265;

var g = {}; 
g.go = 0;
g.locx = 0;
g.locy = 0;
g.scoresize = 28;
g.control = "TOUCH";

var skycol = [];
skycol[0] = [ "#1D3876", "#FDC4A2", "#FCA698" ];
skycol[1] = [ "#1D3876", "#EDD686", "#FCC998" ];
skycol[2] = [ "#1D3876", "#EDC386", "#FCEE98" ];
skycol[3] = [ "#1D3876", "#EDB286", "#FCD598" ];
var m = { 
	spritesheets : [],
	player : null,
	explosion : [],
	lasers : [],
	aliens : [],
	alienbomb : [],
	textsprites : [],
	pilots : [],
	raiders : [],
	bonuses : [],
	rockets : [],
	powerups : [],
	scouts : []
};

var NUM = {
	"lasers" : 32,
	"pilots" : 16,
	"textsprites" : 16,
	"aliens" : 2,
	"explosions" : 4,
	"alienbombs" : 32,
	"raiders" : 2,
	"bonuses" : 32,
	"rockets" : 8,
	"powerups" : 4,
	"scouts" : 8
};

var stars = [];
var gameaudio = []; 

g.checkSum = gamedata.imageFiles.length;// + gamedata.audioFiles.length; 
g.checkCount = 0;
g.imageData = [];
g.audioData = [];
g.aliensarray = [];

g.colours = [];
g.colours[0] = "#bf0000";
g.colours[1] = "#4386d0";
g.colours[2] = "#28d98c";
g.colours[3] = "#3de231";
g.colours[4] = "#d8e231";
g.colours[5] = "#feba4f";
g.colours[6] = "#fe5b4f";
g.colours[7] = "#fe4fd7";
g.colours[8] = "#ca4ffe";


function createStars()
{
	for (var a=0;a<20;a++) 
	{ 
		stars[a] = new star("star"+a, rnd(g.canvaswidth), rnd(g.canvasheight), 4, rnd(2)+1, 4, g.colours[rnd(g.colours.length)-1]); 
	}
};

function createSprites()
{
	try
	{
		// Load game media
		for (var a=0;a<imglib.length;a++)
		{
			m.spritesheets[imglib[a].sheetname] = new spritesheet(imglib[a]);
		}
		g.titlescreen	= new Image();	g.titlescreen.src	= g.imageData[0].src; 
		g.playpause		= new Image();	g.playpause.src		= "library/playpause.png";
		g.sky			= new Image();	g.sky.src			= "library/sky.gif";
		g.splash		= new Image();	g.splash.src		= "library/splash.png";

		g.ground		= [];
		g.ground[0]		= new sprite("ground1", "ground", m.spritesheets["ground"], 0, 0, 16, 4, 1);
		g.ground[1]		= new sprite("ground2", "ground", m.spritesheets["ground2"], 0, 0, 16, 4, 1);
		//g.volumecontrol = new Image(); g.volumecontrol.src = "library/volumecontrols.png";

		// STANDARD SPRITES
		m.player = new sprite("player", "player", m.spritesheets["playersheet"], 0, 0, 16, 4, 1);

		// SPRITE POTS
		
		for (var a=0;a<NUM.lasers;a++) m.lasers[a] = new sprite("laser"+a, "laser", m.spritesheets["laser"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.bonuses;a++) m.bonuses[a] = new sprite("bonus"+a, "bonus", m.spritesheets["bonussheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.pilots;a++) m.pilots[a] = new sprite("pilot"+a, "pilot", m.spritesheets["pilotsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.textsprites;a++) m.textsprites[a] = new textsprite("textsprite"+a,-32,-32,"",0.1);
		for (var a=0;a<NUM.powerups;a++) m.powerups[a] = new sprite("powerup"+a, "powerup", m.spritesheets["powerup"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.rockets;a++) m.rockets[a] = new sprite("rockets"+a, "rocket", m.spritesheets["rocket"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.aliens;a++) m.aliens[a] = new sprite("aliens"+a, "alien", m.spritesheets["aliensheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.raiders;a++) m.raiders[a] = new sprite("raider"+a, "raider", m.spritesheets["raidersheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.scouts;a++) m.scouts[a] = new sprite("scout"+a, "scout", m.spritesheets["raidersheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.explosions;a++) m.explosion[a] = new sprite("explosion"+a, "explosion", m.spritesheets["explosionsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.alienbombs;a++) m.alienbomb[a] = new sprite("alienbomb"+a, "alienbomb", m.spritesheets["alienbombsheet"], 0, 0, 2, 0, 0);

		// SET UP THE TOUCH SCREEN
		initTouch();

		// SET UP THE GAME START
		initHiScore();
		setSplash();

		// TICKER
		g.ticker = setTimeout("loop()", 0);
		
	}
	catch (e)
	{
		write("CreateSprites: " + e.message);
	}
};

function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
};

function preCache() {

	for (var a=0;a<gamedata.imageFiles.length;a++)
	{
		g.imageData[a] = new Image();
		g.imageData[a].src = gamedata.imageFiles[a];
		g.imageData[a].onload = function() {
			try
			{
				g.checkCount ++;
				var pc = Math.round((g.checkCount / g.checkSum) * 100);
				var bar = Math.round(g.canvaswidth * (pc / 100));
				g.ctx.fillStyle = "rgb(16,16,16)";
				g.ctx.fillRect(0,200,g.canvaswidth,16);
				g.ctx.fillStyle = "rgb(80,80,80)";
				g.ctx.fillRect(0,200,bar,16);
				if (g.checkCount >= g.checkSum)
				{
					createSprites();
				}
			}
			catch (e)
			{
				write ("Check: " + e.message);
			}
		}
	}

};

function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
};

function init()
{
	try
	{

		g.canvas = document.querySelector('canvas');
		g.ctx = g.canvas.getContext('2d');
		g.canvas.setAttribute('class', 'canvas');

		g.ori = 0;

		g.banad = document.getElementById("banad");

		setResolution();
		setCanvasDimensions();

		g.nextthink = 0;
		g.textblink = 40;
		g.textblinkmax = g.textblink;

		g.console = document.getElementById('console');
		g.console.style.display = 'none';
		g.console.style.textAlign = 'left';
		write("Console ready.");
		BrowserDetect.init();
		write("Browser: " + BrowserDetect.browser + " " + BrowserDetect.version);
		write("OS: " + BrowserDetect.OS);

		var br = new String(BrowserDetect.OS);
		g.framedelay = 30;
		g.ISIPHONE = false;
		if (br.indexOf("iPhone") != -1)
		{
			g.ISIPHONE = true;
		}

		g.nextthink = 0;
		g.banad.style.left = ((g.canvaswidth - 320) / 2) + "px";
		g.banad.style.top = "226px";
		g.banad.style.display = "none";
		pickAdURL();

		window.scrollTo(0,0);
	
		g.pausemode = 0;
		g.audiomode = 1;
		
		preCache();
	}
	catch (e)
	{
		write(e.message);
	}
};

function setResolution()
{

	g.canvasheight = 280;
	g.canvaswidth = 480;
		
};

function setCanvasDimensions(e)
{
	g.canvaspadding = 32;
	g.displaypadding = 0;
	if (typeof(window.orientation)!="undefined")
	{
		g.ori = window.orientation; // 0, -90 or 90
	}

	g.canvas.width = g.canvaswidth;
	g.canvas.height = g.canvasheight;

	g.textcentre = g.canvaswidth / 2;
	g.canvascentre = g.canvasheight / 2;

	window.scrollTo(0,1);
};


function initTouch()
{
	if(checkForTouch()) {
		if (document.body.addEventListener)
		{
			document.body.addEventListener('touchmove', touchMove, false);
			document.body.addEventListener('touchstart', touchStart, false);
			document.body.addEventListener('touchend', touchEnd, false);
		} else {
			window.addEventListener('touchmove', touchMove, false);
			window.addEventListener('touchstart', touchStart, false);
			window.addEventListener('touchend', touchEnd, false);
		}
	} else {
		window.addEventListener('mousemove', mouseMove, false);
		window.addEventListener('mouseup', mouseUp, false);
		window.addEventListener('mousedown', mouseDown, false);
		write("No touch capability.");
	}
};

function initHiScore()
{
	try
	{
		m.player.hiscore = 0;
		if (typeof localStorage.key == "function")
		{
			if (localStorage.getItem(GAMETITLE + "-hiscore") != null)
			{
				m.player.hiscore = localStorage.getItem(GAMETITLE + "-hiscore");
			} else {
				m.player.hiscore = 0;
			}
		} else if (window.localStorage)
		{
			if (window.localStorage.getItem(GAMETITLE + "-hiscore") != null)
			{
				m.player.hiscore = window.localStorage.getItem(GAMETITLE + "-hiscore");
			} else {
				m.player.hiscore = 0;
			}
		}
	}
	catch (e)
	{
		write("InitHiScore: " + e.message);
	}
};

function sfx(o)
{
};

function handleAudio()
{
};

function checkForTouch() {		
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
};

function touch(event) {
	if (g.mode == "title") setGame();
	
	var o = m.player;
	var tx = (event.pageX - g.canvas.offsetLeft);
	var ty = (event.pageY - g.canvas.offsetTop);	

	if (!o.dying)
	{
		o.y = ty; 
		if (o.y < 64) o.y = 64;
		if (o.y > g.floor - 8) o.y = g.floor - 8;
	}

	// Pause and Audio
	if (tx < (g.canvaswidth / 2) && ty < 64 && (g.mode == "pregame" || g.mode == "game"))  { g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0; }
	if (tx < 128 && tx > 64 && ty < 64) { g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0; }

};

function playerMovement(o,tx,ty)
{
	if (g.mode != "game") return;
};

function getXY(event) {
	// Store co-ords in global namespace g
	g.locx = (event.pageX - (g.canvas.offsetParent ? g.canvas.parentNode.offsetLeft : 0));
	g.locy = (event.pageY - (g.canvas.offsetParent ? g.canvas.parentNode.offsetTop : 0));
};

function touchStart(event) { 
	window.scrollTo(0,1);
	event.preventDefault();
	if (g.mode == "title")
	{
		setGame();
		g.control = "TOUCH";
	} else {
		g.touchtoggle = 1;
		// Get the point at which the touch was made
		getXY(event.touches[0]);
		if (g.locx < (g.canvaswidth / 2) && g.locy < 64 && (g.mode == "pregame" || g.mode == "game"))  { g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0; }
		// Store the point at which the touch was made
		m.player.touchx = g.locx; 
		m.player.touchy = g.locy;
		// Finally store the current location of the player
		m.player.basex = m.player.x;
		m.player.basey = m.player.y;
	}
};

function touchMove(event) {
	getXY(event.touches[0]);
	movePlayer(m.player);
	event.preventDefault();
};

function touchEnd(event) {
	g.touchtoggle = 0;
};

function mouseMove(event) {
};

function mouseUp(event) {
};

function mouseDown(event) {
};

function setSplash()
{
	g.mode = "splash";
	g.resetting = 100;
	g.banad.style.display = "none";
};

function setTitle()
{
	setGround();
	g.mode = "title";
	g.stage = 0; 
	g.banad.style.display = "block";
};

function setGround()
{
	g.ground[0].x = 0;
	g.ground[0].y = g.canvasheight - 128;
	g.ground[1].x = g.canvaswidth + (g.ground[1].w - g.canvaswidth);
	g.ground[1].y = g.canvasheight - 128;
	g.groundspeed = 8;
};

function setGame()
{
	g.banad.style.display = "none";
	g.mode = "pregame";
	g.leveltype = 0;
	g.resetting = 30;
	m.player.score = 0;
	m.player.targetscore = 0;
	m.player.lives = 3;
	g.level = 0;
	g.lap = 1;
	g.displaylevel = 1;
	g.bonuspoints = 0;
	g.lasercooldown = 0;
	g.pilotcooldown = 0;
	g.wavetype = 1;
	g.floor = g.canvasheight - 48;
	setLevel(); 
	playerStart();
	g.bonuslife1 = false; 
	g.bonuslife2 = false; 
	m.player.lasertype = 0;
	g.lastleveltype = 0;
	g.skycol = 0;
};

function setLevel()
{
	wipe(true);
	g.levelbonus = 0;
	m.player.dying = false;
	m.player.visible = true;
	g.shotsfired = 0;
	g.hitratio = 0;

	g.rocketnextthink = g.leveltype == 1 ? 0 : 200;
	g.probenextthink = 0;
	g.raidernextthink = 0;
	g.scoutnextthink = 0;
	g.alienbombcooldown = 0;
	g.scoutformationnextthink = 0;

	g.pilotssaved = 0;
	g.levelpilots = 1 + (g.level + 1);
	if (g.levelpilots > 8) g.levelpilots = 6;
	g.minpilots = 3;
	g.missedpilots = 0;
	g.storedlevelpilots = g.levelpilots;

	g.missionsuccess = false;

	m.player.speed = m.player.basespeed;

	g.distancetobase = 100;
};

function playerStart()
{
	g.touchtoggle = 0;
	m.player.x = -80; 
	m.player.y = (g.canvasheight / 2) - (m.player.h / 2);
	m.player.speed = 4;
	m.player.basespeed = 10;
	m.player.spritedirection = 2;
	m.player.basew = m.player.w;
	m.player.baseh = m.player.h;
	m.player.basex = m.player.x;
	m.player.basey = m.player.y;
	m.player.touchx = 0;
	m.player.touchy = 0;
	m.player.moveup = false;
	m.player.movedown = false;
	m.player.xmod = 0;
	m.player.ymod = 0;
	m.player.ducking = false;
	m.player.jumping = false;
	m.player.row = 0;
	m.player.size = 1;
	m.player.storedx = m.player.x;
	m.player.storedy = m.player.y;
	m.player.angle = 0;
	g.bonusmulti = 1;
	m.player.energy = 100;
	m.player.row = 0;
};

function setLandscape()
{
	g.oldmode = g.mode;
	g.mode = "landscape";
};

function wipe()
{
	for (var a=0;a<NUM.alienbombs;a++) { kill(m.alienbomb[a]); }
	for (var a=0;a<NUM.aliens;a++) { kill(m.aliens[a]); }
	for (var a=0;a<NUM.rockets;a++) { kill(m.rockets[a]); }
	for (var a=0;a<NUM.powerups;a++) { kill(m.powerups[a]); }
	for (var a=0;a<NUM.raiders;a++) { kill(m.raiders[a]); }
	for (var a=0;a<NUM.scouts;a++) { kill(m.scouts[a]); }
	for (var a=0;a<NUM.explosions;a++) { kill(m.explosion[a]); }
	for (var a=0;a<NUM.lasers;a++) { kill(m.lasers[a]); }
	for (var a=0;a<NUM.textsprites;a++) { kill(m.textsprites[a]); }
	for (var a=0;a<NUM.bonuses;a++) { kill(m.bonuses[a]); }
};

function kill(o)
{
	o.visible = false;
};

function playerDeath()
{
	if (m.player.dying) return;
	wipe();
	m.player.dying = true;
	m.player.ducking = false;
	m.player.jumping = false;
	m.player.lives --;
	m.player.ymod = 16;
	m.player.lasertype = 0;
	g.resetting = 50;
};

function movePlayer(o) {
	if (g.touchtoggle < 1 || m.player.dying || g.mode == "levelup" || g.pausemode > 0) return;
	try
	{
		var tx = (g.locx - o.touchx) * 1.4;
		o.x = o.basex + tx;
		var ty = (g.locy - o.touchy) * 1.4;
		o.y = o.basey + ty;
		if (o.x < 8) o.x = 8;
		if (o.x + o.w > g.canvaswidth - 8) o.x = g.canvaswidth - 8 - o.w;
		if (o.y < 32) o.y = 32;
		if (o.y + o.h > g.canvasheight - 32) o.y = g.canvasheight - 32 - o.h;
	}
	catch (e)
	{
		write("Move Player: " + e.message);
	}
};

function movePlayerKeys(o) {
	try
	{
		if (o.moveleft) o.x -= o.speed;
		if (o.moveright) o.x += o.speed;
		if (o.moveup) o.y -= o.speed;
		if (o.movedown) o.y += o.speed;

		if (o.x < 8) o.x = 8;
		if (o.x + o.w > g.canvaswidth - 8) o.x = g.canvaswidth - 8 - o.w;
		if (o.y < 32) o.y = 32;
		if (o.y + o.h > g.canvasheight - 32) o.y = g.canvasheight - 32 - o.h;
	}
	catch (e)
	{
		write("Move Player Keys: " + e.message);
	}
};

function drawPlayer(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.w, o.h);
		if (o.dying) 
		{
			if (isNaN(o.dyingticker)) o.dyingticker = 5;
			o.dyingticker --;
			if (o.dyingticker < 1)
			{
				spawnExplosion(o,rnd(8)-1,1);
				o.dyingticker = 5;
				if (g.groundspeed > 0) g.groundspeed --;
			}
		}
	}
	catch (e)
	{
		write("DrawPlayer: " + o.frame + " - " + e.message);
	}

};

function move(o)
{
	if (!o.visible || g.pausemode > 0) return;

	var explosion = o.spritesheet.type == "explosion" ? true : false;
	var alienbomb = o.spritesheet.type == "alienbomb" ? true : false;

	switch (o.direction)
	{
	case 0:
		o.y -= o.speed;
		break;			
	case 1:
		o.y -= (o.speed);
		o.x += (o.speed);
		break;			
	case 2:
		o.x += o.speed;
		break;			
	case 3:
		o.y += (o.speed);
		o.x += (o.speed);
		break;			
	case 4:
		o.x += alienbomb ? o.xmod : o.speed;
		o.y += o.speed;
		break;			
	case 5:
		o.y += (o.speed);
		o.x -= (o.speed);
		break;			
	case 6:
		o.x -= o.speed;
		break;			
	case 7:
		o.y -= (o.speed);
		o.x -= (o.speed);
		break;			
	}
	if (explosion)
	{
		o.x -= m.player.dying ? 0 : g.groundspeed;
		if (o.x + o.w < 0)
		{
			kill(o);
		}
	}
	if (alienbomb)
	{
		if (o.row == 1)
		{
			if (o.x > (g.canvaswidth / 2))
			{
				if (o.floatdir == 0)
				{
					o.y -= o.floatcount;
					o.floatcount -= 0.05;
					if (o.floatcount < 1)
					{
						o.floatcount = 2;
						o.floatdir = 4;
					}
				}
				if (o.floatdir == 4)
				{
					o.y += o.floatcount;
					o.floatcount -= 0.05;
					if (o.floatcount < 1)
					{
						o.floatcount = 2;
						o.floatdir = 0;
					}
				}
			} else {
				var inc = 2;
				//inc = inc > 4 ? 4 : inc;
				if (o.y < m.player.y)
				{
					o.y += inc;
				} else {
					o.y -= inc;
				}
			}
		}
		o.y -= o.ymod;
		o.x -= g.groundspeed;
		if (o.x + o.w < 0 || o.x > g.canvaswidth || o.y + o.h < 0 || o.y > g.canvasheight)
		{
			kill(o);
		}
	}
};

function draw(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else if (!o.diving) {
			if (isNaN(o.frame)) o.frame = o.startframe;
			o.framedelay --;
			if (o.framedelay < 0)
			{
				o.framedelay = o.framedelaymax;
				o.frame ++;
				if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
				{
					if (o.spritesheet.type == "explosion")
					{
						kill(o);
					} else {
						o.frame = o.startframe;
					}
				}
			}
			if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }
		} else {
			o.frame = 0;
		}
		g.ctx.save();
		if (o.diving)
		{
			var angle = 0;
			if (o.divestage == 1) angle = o.divedirection == 6 ? -45 : 45;
			if (o.divestage == 2) angle = o.divedirection == 6 ? 225 : 135;
			if (o.divestage == 3) angle = o.divedirection == 6 ? 165 : -165;
			g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
			g.ctx.rotate(angle * (Math.PI / 180));
			g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
		} else {
			g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
		}
		g.ctx.restore();
	}
	catch (e)
	{
		write("Draw: Angle = " + o.angle + " - " + o.spritesheet.type + ", " + o.frame + " - " + e.message);
	}

};

function moveLaser(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;
	o.x += o.speed;
	if (o.x > g.canvaswidth) kill(o);
	if (o.lasertype == 1) o.y -= m.player.lasertype == 1 ? 0 : 2;
	if (o.lasertype == 2) o.y += 2;
};

function drawLaser(o)
{
	try
	{
		if (!o.visible || o.dead || g.pausemode > 0) return;
		o.w = o.basew + m.player.lasertype + 2;
		o.h = o.baseh + m.player.lasertype + 2;
		g.ctx.drawImage(o.spritesheet.canvas,o.x,o.y,o.w,o.h);
	}
	catch (e)
	{
		write("DrawLaser: " + e.message);
	}
};

function movePilot(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;
	o.x -= g.groundspeed;
	if (o.x + o.w < 0) 
	{
		kill(o);
		g.missedpilots ++;
	}
};

function checkEndOfLevel()
{
	if (g.distancetobase < 0)
	{
		g.mode = "levelup";
		g.resetting = 100;
		m.player.score += (g.pilotssaved * 500);
		m.player.targetscore = m.player.score;

		if (g.leveltype < 1)
		{
			if (g.pilotssaved >= g.levelpilots)
			{
				g.missionsuccess = true;
				m.player.score += (g.level + 1) * 1000;
				m.player.targetscore = m.player.score;
			}
		} else {
			g.missionsuccess = true;
		}
	}
};

function drawPilot(o)
{
	try
	{
		if (!o.visible || o.dead || g.pausemode > 0 || o.x > g.canvaswidth) return;
		if (isNaN(o.frame)) o.frame = o.startframe;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
	}
	catch (e)
	{
		write("DrawPilot: " + e.message);
	}
};

function moveToTarget(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;

	o.oldx = o.x;
	o.oldy = o.y;

	if (o.targetx < 0 && o.targety < 0)
	{
		switch (o.direction)
		{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		}
	} else {
		if (o.jumping)
		{
			if (o.y >= o.targety)
			{
				if (!o.bounced)
				{
					o.bounced = true;
					o.y = o.y - 8;
					o.speed = -8;
				} else {
					o.speed = o.basespeed;
					o.jumping = false;
				}
			}
			if (o.dying > 0)
			{
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
				if (o.y < 0)
				{
					kill(o);
				}
			}
			if (o.bounced) o.speed += 2;
			if (o.y < o.targety) { o.y += o.speed; }
		} else {
			if (o.divestage == 4 && o.diving)
			{
				var thresh = 1;
				if ((Math.round(o.x) >= Math.round(o.targetx) - thresh) 
					&& 
					(Math.round(o.x) <= Math.round(o.targetx) + o.w + thresh) 
					&& 
					(Math.round(o.y) >= Math.round(o.targety) - thresh)
					&& 
					(Math.round(o.y) <= Math.round(o.targety) + o.h + thresh)
					)
				{
					o.divestage = 0;
					o.diving = false;
					write("Back");
					o.speed = o.basespeed;
					g.divingaliens --;
				} else {
					if (o.targetx > o.x) { o.x += o.speed; }
					if (o.targetx < o.x) { o.x -= o.speed; }
					if (o.targety < o.y) { o.y -= o.speed; }
					if (o.targety > o.y) { o.y += o.speed; }
				}
			} else {
				// Target co-ords set by screen touch.
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
			}
		}
	}
	if (o.dying < 1)
	{
		if (o.x < g.canvaspadding) o.x = g.canvaspadding;
		if ((o.x + o.w) > (g.canvaswidth - g.canvaspadding)) o.x = g.canvaswidth - g.canvaspadding - o.w;
		if (o.y < g.canvaspadding) o.y = g.canvaspadding;
		if ((o.y + o.h) > (g.canvasheight - g.canvaspadding)) o.y = g.canvasheight - g.canvaspadding - o.h;
	}
};

function moveRocket(o)
{
	if (!o.visible || g.pausemode > 0) return;
	switch (o.direction)
	{
		case 6:
			o.x -= o.speed;
			if (o.x + o.w < 0) kill(o);
			break;
	}

	if (g.leveltype < 1)
	{
		if (o.y < (m.player.y + 8)) o.y += 2;
		if (o.y > (m.player.y + 16)) o.y -= 2;
	} else {
		if (o.y < (o.targety)) o.y += 2;
		if (o.y > (o.targety)) o.y -= 2;
	}

	if (o.x + o.w < 0)
	{
		kill(o);
	}

};

function drawRocket(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, (o.frame == 0 ? 0 : o.row) * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Rocket: " + e.message);
	}
};

function moveAlien(o)
{
	if (!o.visible || g.pausemode > 0) return;
	switch (o.direction)
	{
		case 6:
			o.x -= o.speed;
			if (o.x + o.w < 0) kill(o);
			break;
	}

	if (o.x + o.w < 0)
	{
		kill(o);
	}

	spawnAlienBombType(o);

};

function drawAlien(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, (o.frame == 0 ? 0 : o.row) * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Alien: " + e.message);
	}
};


function moveRaider(o)
{
	if (!o.visible || g.pausemode > 0) return;
	switch (o.direction)
	{
		case 6:
			o.x -= o.speed;
			if (o.x + o.w < 0) kill(o);
			break;
	}

	if (o.speed > g.groundspeed) o.speed -= 0.1;
	

	switch (o.moddir)
	{
		case 0:
			o.ymod -= 1;
			if (o.ymod < (o.maxymod * -1)) o.moddir = 4;
			break;
		case 4:
			o.ymod += 1;
			if (o.ymod > o.maxymod) o.moddir = 0;
			break;
	}

	o.y -= o.ymod;

	if (o.x + o.w < 0)
	{
		kill(o);
	}

	spawnAlienBomb(o);

};

function drawRaider(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, (o.frame == 0 ? 0 : o.row) * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Raider: " + e.message);
	}
};


function moveScout(o)
{
	if (!o.visible || g.pausemode > 0) return;
	
	switch (o.direction)
	{
		case 6:
			o.x -= o.speed;
			if (o.x + o.w < 0) kill(o);
			break;
	}

		o.x += (Math.cos(o.angle*PI/180)*o.speed + 0.1);
		o.y += (Math.sin(o.angle*PI/180)*o.speed + 0.1);
		o.angle -= 6; 
		if (o.angle < 0) 
		{	
			o.angle = 360;
		}

	if (o.speed > g.groundspeed) o.speed -= 0.1;
	

	o.y += 1;
	
	if (o.x + o.w < 0)
	{
		kill(o);
	}

};

function drawScout(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, (o.frame == 0 ? 0 : o.row) * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Scout: " + e.message);
	}
};


function movePowerup(o)
{
	if (!o.visible || g.pausemode > 0) return;
	switch (o.direction)
	{
		case 6:
			o.x -= o.speed;
			if (o.x + o.w < 0) kill(o);
			break;
	}

	if (o.speed > g.groundspeed) o.speed -= 0.1;

	if (o.x + o.w < 0)
	{
		kill(o);
	}

};

function drawPowerup(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Powerup: " + e.message);
	}
};

function moveBonus(o)
{
	try
	{
		if (!o.visible || g.pausemode > 0) return;
		
		if (o.collected)
		{
			o.y -= o.speed;
			o.x += o.xmod;
			if (o.y < 28)
			{
				kill(o);
				m.player.targetscore += 20;
				g.scoresize = 32;
			}
		} else {
			switch (o.direction)
			{
				case 6:
					o.x += o.landed ? 0 : o.xmod;
					o.x -= o.landed ? o.speed : o.speed / 2;
					if (o.x + o.w < 0) kill(o);
					break;
			}
			o.ymod ++;
			if (!o.landed)
			{
				o.y += o.ymod;
			}

			if (o.y > g.floor)
			{
				if (!o.bounced)
				{
					o.bounced = true;
					o.ymod = (10 + rnd(6)) * -1;
				} else {
					o.landed = true;
				}
			}
		}

		if (o.x + o.w < 0)
		{
			kill(o);
		}
		
	}
	catch (e)
	{
		write("Move Bonus: " + e.message);
	}
};

function drawBonus(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Bonus: " + e.message);
	}
};

function changeDirection(o)
{
	switch (o.direction)
	{
	case 0:
		o.direction = 4;
	break;
	case 1:
		o.direction = 5;
	break;
	case 2:
		o.direction = 6;
	break;
	case 3:
		o.direction = 7;
	break;
	case 4:
		o.direction = 0;
	break;
	case 5:
		o.direction = 1;
	break;
	case 6:
		o.direction = 2;
	break;
	case 7:
		o.direction = 3;
	break;
	}
};


function entityCollision(o,m) 
{
	if (!o.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		switch(o.row) 
		{
			default:
				break;
		}
	}
};

function alienMissileCollision(o) 
{
	if (!o.visible || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	for (var z=0;z<m.aliens.length;z++)
	{
		var a = m.aliens[z];
		if (a.visible)
		{
			var mx = a.x;
			var my = a.y;
			var mw = a.w;
			var mh = a.h;

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
			if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
			if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
			if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				a.hp -= o.damage;
				if (a.hp < 1)
				{
					kill(a);
					alienKill(a);
				}
				kill(o);
			}
		}
	}
};

function endLevel()
{
	m.player.score += g.level * 500;
	g.levelbonus = Math.round(m.player.air) * 50;
	m.player.score += g.levelbonus;
	m.player.targetscore = m.player.score;
	g.mode = "levelup";
	g.resetting = 90;
};

function keyBonus(a)
{
	var bonus = 100;
	spawnTextSprite(a,bonus);
	m.player.score += bonus;
	m.player.targetscore = m.player.score;
	m.player.targetscore += 10;
	g.keys ++;
	if (g.keys >= g.levelkeys)
	{
		m.player.score += g.level * 500;
		g.levelbonus = Math.round(m.player.air) * 50;
		m.player.score += g.levelbonus;
		m.player.targetscore = m.player.score;
		g.mode = "levelup";
		g.resetting = 70;
	}
};

function alienBombCollision(o,m) 
{
	if (!o.visible || !m.visible || m.dead || m.dying || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 0; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
		switch(o.row)
		{
			case 0:
				playerDeath();
				spawnExplosion(o,0,1);
			break;
			case 1:
				m.energy -= 5;
				g.energyflash = 1;
			break;
		}
	}
};

function keyPlayerCollision(o,m) // o = key
{
	if (!o.visible || !m.visible || g.pausemode > 0 || m.dying) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 0; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
		keyBonus(o);
	}
};

function rocketPlayerCollision(o,m) // o = rocket
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 0; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		playerDeath();
		spawnExplosion(o,0,1);
		kill(o);
	}
};

function alienPlayerCollision(o,m) // o = alien
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 6; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		playerDeath();
		spawnExplosion(o,0,1);
		kill(o);
	}
};

function rocketLaserCollision(o) // o = laser
{
	if (!o.visible || g.pausemode > 0) return;

	for (var a=0;a < NUM.rockets;a++)
	{
		var l = m.rockets[a];
		if (l.visible)
		{
			var ox = o.x;
			var oy = o.y;
			var ow = o.w; 
			var oh = o.h; 

			var mx = l.x;
			var my = l.y;
			var mw = l.w;
			var mh = l.h;

			var t = 0; 

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
			if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
			if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
			if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				l.hp -= o.damage / 2;
				l.x += 8;
				kill(o);
				if (l.hp < 80) l.row = 1;
				if (l.hp < 50) l.row = 2;
				if (l.hp < 30) l.row = 3;
				if (l.hp <= 0)
				{
					spawnExplosion(l,0,1);
					spawnBonuses(o);
					kill(l);
					m.player.targetscore += 500;
					spawnTextSprite(o,"500");
					break;
				}
			}
		}
	}
};
function alienLaserCollision(o) // o = laser
{
	if (!o.visible || g.pausemode > 0) return;

	for (var a=0;a < NUM.aliens;a++)
	{
		var l = m.aliens[a];
		if (l.visible)
		{
			var ox = o.x;
			var oy = o.y;
			var ow = o.w; 
			var oh = o.h; 

			var mx = l.x;
			var my = l.y;
			var mw = l.w;
			var mh = l.h;

			var t = 0; 

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
			if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
			if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
			if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				l.hp -= o.damage;
				l.x += 8;
				kill(o);
				if (l.hp < 80) l.row = 1;
				if (l.hp < 50) l.row = 2;
				if (l.hp < 30) l.row = 3;
				if (l.hp <= 0)
				{
					spawnExplosion(l,0,1);
					spawnBonuses(o);
					kill(l);
					m.targetscore += 100;
					spawnTextSprite(o,"100");
					break;
				}
			}
		}
	}
};

function raiderLaserCollision(o) // o = laser
{
	if (!o.visible || g.pausemode > 0) return;

	for (var a=0;a < NUM.raiders;a++)
	{
		var l = m.raiders[a];
		if (l.visible)
		{
			var ox = o.x;
			var oy = o.y;
			var ow = o.w; 
			var oh = o.h; 

			var mx = l.x;
			var my = l.y;
			var mw = l.w;
			var mh = l.h;

			var t = 0; 

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
			if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
			if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
			if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				l.hp -= o.damage;
				l.x += 8;
				kill(o);
				if (l.hp < 50) l.row = 1;
				if (l.hp < 40) l.row = 2;
				if (l.hp < 30) l.row = 3;
				if (l.hp <= 0)
				{
					spawnExplosion(l,0,1);
					spawnBonuses(l);
					kill(l);
					m.player.targetscore += 50;
					spawnTextSprite(o,"50");
					spawnPowerup(l);
					break;
				}
			}
		}
	}
};

function scoutLaserCollision(o) // o = laser
{
	if (!o.visible || g.pausemode > 0) return;

	for (var a=0;a < NUM.scouts;a++)
	{
		var l = m.scouts[a];
		if (l.visible)
		{
			var ox = o.x;
			var oy = o.y;
			var ow = o.w; 
			var oh = o.h; 

			var mx = l.x;
			var my = l.y;
			var mw = l.w;
			var mh = l.h;

			var t = 0; 

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
			if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
			if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
			if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				l.hp -= o.damage;
				l.x += 8;
				kill(o);
				if (l.hp < 50) l.row = 1;
				if (l.hp < 40) l.row = 2;
				if (l.hp < 30) l.row = 3;
				if (l.hp <= 0)
				{
					spawnExplosion(l,0,1);
					kill(l);
					m.player.targetscore += 100;
					spawnTextSprite(o,"100");
					break;
				}
			}
		}
	}
};

function pilotPlayerCollision(o,m) // o = pilot
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 4; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
		spawnTextSprite(o,"250");
		m.targetscore += 250;
		g.pilotssaved ++;
		spawnTextSpriteXY(g.textcentre, g.canvascentre, (g.pilotssaved + " / " + g.levelpilots));
	}
};

function bonusPlayerCollision(o,m) // o = bonus
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = o.row == 0 ? -8 : 4; // threshold

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		switch(o.row)
		{
			case 0:
				m.targetscore = m.score;
				collect(o,m);
				break;
			case 1:
				m.targetscore = m.score;
				kill(o);
				break;
		}
	}
};

function powerupPlayerCollision(o,m) // o = bonus
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = o.row == 0 ? -8 : -8; // threshold

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
		m.targetscore = m.score;
		switch(o.row)
		{
			case 0:
				m.lasertype ++;
				if (m.lasertype > 2) m.lasertype = 2;
				break;
			case 1:
				m.energy += 4;
				if (m.energy > 100) m.energy = 100;
				break;
		}
	}
};

function collect(o,m)
{
	o.collected = true;
	var steps = (o.y - 28) / 16;
	o.xmod = (160 - m.x) / steps;
	o.speed = 16;
};

function writeText(t,x,y,s,f,c)
{
	var sx = x;
	var grid = {};
	grid.w = 10;
	grid.h = 16;
	var text = new String(t);	
	//text = text.toUpperCase();
	g.ctx.save();
	var ss = "";
	g.ctx.font = "normal "+s+"px '"+f+"', Sans-Serif";
	/*
	g.ctx.shadowOffsetX = 1;
	g.ctx.shadowOffsetY = 1;
	g.ctx.shadowBlur = 2;
	g.ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
	*/
	g.ctx.textAlign = "center";
	g.ctx.fillStyle = c ? c : "#ffffff";
	g.ctx.fillText(text, x,y+8);
	g.ctx.restore();
};

function drawTextSprite(o)
{
	if (!o.visible) return;
	var text = new String(o.text);	
	g.ctx.save();
	g.ctx.font = "normal " + o.size + "px Arial, Sans-Serif";
	g.ctx.textAlign = "left";
	g.ctx.fillStyle = o.colour;
	g.ctx.fillText(text, o.x,o.y+8);
	g.ctx.restore();
};

function moveTextSprite(o)
{
	if (!o.visible) return;
	o.y -= o.speed;
	o.ticks --;
	if (o.ticks < 0) kill(o);
};

function moveGround(o)
{
	if (!o.visible || g.pausemode > 0) return;
	try
	{
		o.x -= g.groundspeed;
		if (o.x <= (o.w * -1))
		{
			o.x = g.canvaswidth + (o.w - g.canvaswidth);
		}
	}
	catch (e)
	{
		write("Move ground: " + e.message);
	}
};

function drawGround(o)
{
	if (!o.visible || o.x > g.canvaswidth) return;
	try
	{
		g.ctx.drawImage(o.spritesheet.canvas,o.x,o.y);
	}
	catch (e)
	{
		write("Draw ground: " + e.message);
	}
};

function drawSky()
{
	try
	{
		g.sky = g.ctx.createLinearGradient(0, 0, 0, g.canvasheight);
		if (g.mode == "title")
		{
			g.sky.addColorStop(0, '#AA2288');
			g.sky.addColorStop(0.4, '#FFAB1D');
			g.sky.addColorStop(0.6, '#FFD03B');
			g.sky.addColorStop(0.8, '#FF8A6A');
			g.sky.addColorStop(1, '#FCEE98');
		} else if (g.mode == "game" || g.mode == "pregame")
		{
			g.skycol = g.distancetobase > 75 ? 0 : (g.distancetobase > 50 ? 1 : (g.distancetobase > 25 ? 2 : 3));
			switch (g.leveltype)
			{
				case 1:
				case 2:
					g.sky.addColorStop(0, '#A81300');
					g.sky.addColorStop(0.4, '#EC3B24');
					g.sky.addColorStop(0.6, '#CA4DA9');
					g.sky.addColorStop(0.8, '#CE76FA');
					g.sky.addColorStop(1, '#FFD84C');
				break;
				default:
					g.sky.addColorStop(0, skycol[g.skycol][0]); 
					g.sky.addColorStop(0.4, '#00ABCA');
					g.sky.addColorStop(0.6, skycol[g.skycol][1]); 
					g.sky.addColorStop(0.8, '#F5D862');
					g.sky.addColorStop(1, skycol[g.skycol][2]); 
				break;
				
			}
		} else if (g.mode == "levelup")
		{
			if (g.missionsuccess)
			{
				g.sky.addColorStop(0, '#1D3876');
				g.sky.addColorStop(0.4, '#00ABCA');
				g.sky.addColorStop(0.6, '#6AC2FF');
				g.sky.addColorStop(0.8, '#62CAF5');
				g.sky.addColorStop(1, '#98E3FC');
			} else {
				g.sky.addColorStop(0, '#A81300');
				g.sky.addColorStop(0.4, '#C8210A');
				g.sky.addColorStop(0.6, '#EC3B24');
				g.sky.addColorStop(0.8, '#FA5236');
				g.sky.addColorStop(1, '#FFE651');
			}
		} else if (g.mode == "gameover")
		{
			g.sky.addColorStop(0, '#A81300');
			g.sky.addColorStop(0.4, '#C8210A');
			g.sky.addColorStop(0.6, '#EC3B24');
			g.sky.addColorStop(0.8, '#FA5236');
			g.sky.addColorStop(1, '#FFE651');
		}
		g.ctx.fillStyle = g.sky;
		g.ctx.fillRect(0, 0, g.canvaswidth, g.canvasheight);
	}
	catch (e)
	{
		write("Sky: " + e.message);
	}
};

function ground()
{
	moveGround(g.ground[0]);
	moveGround(g.ground[1]);
	drawGround(g.ground[0]);
	drawGround(g.ground[1]);
};

/** ---------------------------------------------------------------- **/
/** ---------------------------------------------------------------- **/

function loop()
{
	try
	{
		clearTimeout(g.ticker);
		g.ctx.clearRect(0, 0, g.canvaswidth, g.canvasheight);

		switch (g.mode)
		{
			case "splash":
				g.ctx.drawImage(g.splash,0,0);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					setTitle();
				}
			break;
			case "title":
				drawSky();
				ground();
				hiScore();
				g.ctx.drawImage(g.titlescreen,(g.canvaswidth/2)-230,0);
				g.textblink --;
				if (g.textblink < (g.textblinkmax / 4) * 3)
				{
					writeText(textdata[1],g.textcentre,185,18,SCOREFONT);
					if (g.textblink < 0) g.textblink = g.textblinkmax;
				}
			break;
			case "pregame":
				drawSky();
				ground();
				m.player.x += m.player.speed; 
				if (m.player.x > 32) 
				{ 
					m.player.x = 32; m.player.speed = m.player.basespeed; 
				}
				drawPlayer(m.player);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					g.mode = "game";
				}
				for (var a=0;a < NUM.pilots;a++)
				{
					movePilot(m.pilots[a]);
					drawPilot(m.pilots[a]);
				}
				for (var a=0;a < NUM.explosions;a++)
				{
					move(m.explosion[a]);
					draw(m.explosion[a]);
				}
				if (g.leveltype > 0)
				{
					writeText(g.leveltype > 1 ? textdata[15] : textdata[13],g.textcentre,140,20,SCOREFONT);
				} else {
					writeText(textdata[0] + " " + (g.level + 1),g.textcentre,140,20,SCOREFONT);
					writeText(textdata[11] + " " + g.levelpilots + " " + textdata[12] ,g.textcentre,180,20,SCOREFONT);
				}

				updateScore();
				playerLives();
				energyBar();
				radar();
			break;
			case "game":
				drawSky();
				ground();

				if (!m.player.dying && g.pausemode < 1)
				{
					g.distancetobase -= g.leveltype < 1 ? 0.2 : 0.3;
					checkEndOfLevel();
				}

				if (g.rocketnextthink > 0) g.rocketnextthink --;
				if (g.probenextthink > 0) g.probenextthink --;
				if (g.raidernextthink > 0) g.raidernextthink --;
				if (g.scoutnextthink > 0) g.scoutnextthink --;
				if (g.scoutformationnextthink > 0) g.scoutformationnextthink --;
				if (g.alienbombcooldown > 0) g.alienbombcooldown --;
				if (g.pilotcooldown > 0) g.pilotcooldown --;

				spawnScoutFormation();

				if (!m.player.dying && g.pausemode < 1)
				{
					m.player.energy -= g.leveltype < 1 ? 0.1 : 0.2; // + (g.level * 0.01);
					if (m.player.energy < 0)
					{
						playerDeath();
					}
				}

				if (g.nextthink > 0) g.nextthink --;
				if (m.player.dying)
				{
					g.resetting --;
					if (g.resetting < 1)
					{
						if (m.player.lives < 1)
						{
							g.mode = "gameover";
							g.banad.style.display = "block";
							g.resetting = 80;
						} else {
							m.player.visible = true;
							m.player.dying = false;
							g.mode = "pregame";
							setLevel();
							
							setGround();

							playerStart();
							g.resetting = 30;
						}
					}
				}

				if (g.control != "KEYS")
				{
					if (g.lasercooldown < 1)
					{
						spawnLaser(m.player.x + m.player.w, m.player.y  + (m.player.h / 2) - 2);
						g.lasercooldown = 8 - (m.player.lasertype * 2);
					} else {
						g.lasercooldown --;
					}
				}

				if (g.energyflash > 0) { g.energyflash -= 0.025; }

				energyBar();
				radar();

				for (var a=0;a < NUM.lasers;a++)
				{
					moveLaser(m.lasers[a]);
					drawLaser(m.lasers[a]);
					alienLaserCollision(m.lasers[a]);
					raiderLaserCollision(m.lasers[a]);
					scoutLaserCollision(m.lasers[a]);
					rocketLaserCollision(m.lasers[a]);
				}

				for (var a=0;a < NUM.bonuses;a++)
				{
					moveBonus(m.bonuses[a]);
					drawBonus(m.bonuses[a]);
					bonusPlayerCollision(m.bonuses[a],m.player);
				}

				for (var a=0;a < NUM.powerups;a++)
				{
					movePowerup(m.powerups[a]);
					drawPowerup(m.powerups[a]);
					powerupPlayerCollision(m.powerups[a],m.player);
				}

				for (var a=0;a < NUM.pilots;a++)
				{
					movePilot(m.pilots[a]);
					drawPilot(m.pilots[a]);
					pilotPlayerCollision(m.pilots[a],m.player);
				}
				
				spawnRocket();
				for (var a=0;a < NUM.rockets;a++)
				{
					moveRocket(m.rockets[a]);
					drawRocket(m.rockets[a]);
					rocketPlayerCollision(m.rockets[a],m.player);
				}

				spawnRaider();
				for (var a=0;a < NUM.raiders;a++)
				{
					if (m.raiders[a].visible)
					{
						m.raiders[a].bombcooldown --;
						if (m.raiders[a].bombcooldown < 0) m.raiders[a].bombcooldown = 8;
					}
					moveRaider(m.raiders[a]);
					drawRaider(m.raiders[a]);
					alienPlayerCollision(m.raiders[a],m.player);
				}

				for (var a=0;a<NUM.alienbombs;a++)
				{
					move(m.alienbomb[a]);
					draw(m.alienbomb[a]);
					alienBombCollision(m.alienbomb[a],m.player);
				}

				if (g.leveltype < 1)
				{
					spawnAlien();
					for (var a=0;a < NUM.aliens;a++)
					{
						if (m.aliens[a].visible)
						{
							m.aliens[a].bombcooldown --;
							if (m.aliens[a].bombcooldown < 0) m.aliens[a].bombcooldown = 10;
						}
						moveAlien(m.aliens[a]);
						drawAlien(m.aliens[a]);
						alienPlayerCollision(m.aliens[a],m.player);
					}

				}

				for (var a=0;a < NUM.textsprites;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}
				
				if (g.control == "KEYS" && !m.player.dying)
				{
					movePlayerKeys(m.player);
				}

				spawnPilot(g.canvaswidth, g.floor);

				updateScore();
				playerLives();
				drawPlayer(m.player);
				for (var a=0;a < NUM.explosions;a++)
				{
					move(m.explosion[a]);
					draw(m.explosion[a]);
				}

			break;

			case "landscape":
			break;
			case "levelup":
				drawSky();
				ground();
				g.resetting --;
				if (g.resetting < 1)
				{
					g.leveltype = rnd(100) < 50 && g.lastleveltype == 0 ? (rnd(10) <= 5 ? 2 : 1) : 0;
					g.lastleveltype = g.leveltype;
	
					g.level ++;

					setLevel();
					playerStart();
					g.mode = "pregame";
					g.resetting = 50;
				}
				if (g.leveltype > 0)
				{
					writeText(textdata[14],g.textcentre,140,20,SCOREFONT);
				} else {
					if (g.missionsuccess)
					{
						writeText(textdata[4],g.textcentre,140,20,SCOREFONT);
						writeText(textdata[10] + " " + ((g.level + 1) * 1000),g.textcentre,220,20,SCOREFONT);
					} else {
						writeText(textdata[9],g.textcentre,140,20,SCOREFONT);
					}
					writeText(textdata[7] + " " + (g.pilotssaved * 500),g.textcentre,200,16,SCOREFONT);
				}

				if (g.leveltype < 1)
				{
					var w = g.textcentre - (g.pilotssaved * (m.spritesheets["pilotsheet"].framewidth + 4)) / 2;
					for (var a=0;a<g.pilotssaved;a++)
					{
						var o = m.spritesheets["pilotsheet"];
						g.ctx.drawImage(o.canvas, 0, 0, o.framewidth, o.frameheight, w + (a * (o.framewidth + 4)), 160, o.framewidth, o.frameheight);
					}
				}

				m.player.speed += 2;
				m.player.x += m.player.speed;
				drawPlayer(m.player);

				updateScore();
				playerLives();
				for (var a=0;a < NUM.textsprites;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}
				m.player.energy += 2; if (m.player.energy > 100) m.player.energy = 100;
				energyBar();
				radar();
			break;
			case "gameover":
				drawSky();
				ground();
				writeText(textdata[3],g.textcentre,140,32,SCOREFONT);
				g.resetting --;
				if (g.resetting < 1)
				{
					setTitle();
				}
				updateScore();
			break;
		}
		if (g.mode != "splash" && g.mode != "title") g.ctx.drawImage(g.playpause, g.pausemode * 32, 0, 32, 32, 8, 8, 32, 32);

		g.scoresize = 28;
		g.ticker = setInterval("loop()", g.framedelay);
		
	}
	catch (e)
	{
		write("Loop: " + e.message);
	}
};

// Redundant until I figure it out //
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

function playerLives()
{
	var o = m.player;
	for (var a=0;a<m.player.lives;a++)
	{
		g.ctx.drawImage(o.spritesheet.canvas, 0, 0, o.w, o.h, (g.canvaswidth - 100)+(a * 18), 16, 16, 16);
	}
};

function radar()
{
	var pc = Math.round((g.distancetobase / 100) * 100);
	var bar = Math.round((g.canvaswidth - 48) * (pc / 100));
	g.ctx.fillStyle = "rgba(255,236,172,0.3)";
	g.ctx.fillRect(40,70,(g.canvaswidth - 48),24);
	g.ctx.fillStyle = "rgb(255,255,0)";
	g.ctx.fillRect((bar-4) + 44,72,2,20);
	writeText(textdata[6],20,80,12,SCOREFONT);
};

function energyBar()
{
	var pc = Math.round((m.player.energy / 100) * 100);
	var bar = Math.round((g.canvaswidth - 48) * (pc / 100));
	g.ctx.fillStyle = g.energyflash > 0 ? "rgba(255,0,0," + g.energyflash + ")" : "rgba(255,236,172,0.3)";
	g.energyflash > 0 ? g.ctx.fillRect(20,20,(g.canvaswidth - 28),64) : g.ctx.fillRect(40,40,(g.canvaswidth - 48),24);
	g.ctx.fillStyle = g.energyflash > 0 ? "#bf0000" : (m.player.energy < 25 ? "#ff2c2c" : (m.player.energy < 50 ? "#FFC610" : "rgb(255,255,0)"));
	g.ctx.fillRect(42,42,bar-4,20);
	writeText(textdata[5],20,50,12,SCOREFONT);
};

function testFPS()
{
	try
	{
		// FPS
		if (isNaN(g.fps)) g.fps = 0;
		if (g.fps) 
		{
			var d = new Date();
			var c = Math.round(1000 / (d - g.fps));
		}
		var s = new String(c);
		g.fps = new Date();
		//if (c) writeText(s,220,g.canvasheight - 128,20,SCOREFONT);
		if (isNaN(g.testy)) g.testy = 0;
		if (isNaN(g.ave)) g.ave = 0;
		if (g.mode == "game" && g.testy < 20) 
		{ 
			g.testy ++; g.ave += c; 
		} else {
			var s2 = new String(g.ave/20);
			writeText(s2, 128,128,30,SCOREFONT);
		}
	}
	catch (e)
	{
		write(e.message);
	}
};

function spawnTextSprite(o,t)
{
	for (var a=0;a<NUM.textsprites;a++)
	{
		if (!m.textsprites[a].visible)
		{
			var e = m.textsprites[a];
			e.visible = true;
			e.ticks = 30;
			e.x = o.x;
			e.y = o.y;
			e.text = t;
			e.speed = 1;
			e.size = 18;
			e.colour = o.spritesheet.type == "pilot" ? "#ffff00" : g.colours[rnd(g.colours.length)-1];
			break;
		}
	}
};

function spawnTextSpriteXY(x,y,t)
{
	for (var a=0;a<NUM.textsprites;a++)
	{
		if (!m.textsprites[a].visible)
		{
			var e = m.textsprites[a];
			e.visible = true;
			e.ticks = 30;
			e.x = x;
			e.y = y;
			e.size = 32;
			e.text = t;
			e.speed = 1;
			e.colour = "#ffffff";
			break;
		}
	}
};

function spawnExplosion(o,d,sp)
{
	for (var a=0;a<NUM.explosions;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = o.x;
			e.y = o.y;
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
};

function spawnExplosionXY(x,y,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = x;
			e.y = y;
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
};

function spawnRocket() 
{
	if (rnd(100) > 20 || g.leveltype == 2 || (g.leveltype == 0 && g.level < 6) || g.mode != "game") return;
	if (g.rocketnextthink > 0) return;
	for (var a=0;a<m.rockets.length;a++)
	{
		if (!m.rockets[a].visible)
		{
			var e = m.rockets[a];
			e.visible = true;
			e.direction = 6;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = g.canvaswidth + 16;
			e.y = rnd(10) <= 5 ? 80 : 180;
			e.moddir = 0;
			e.ymod = 0;
			e.maxymod = rnd(6);
			e.hp = 10;
			e.targety = m.player.y;
			e.speed = g.groundspeed + 4;
			e.basespeed = e.speed;
			e.frame = 0;
			e.row = 0;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			g.rocketnextthink = g.leveltype < 1 ? 200 - (g.level * 10) : 10;
			if (g.leveltype < 1 && g.rocketnextthink < 100) g.rocketnextthink = 100;
			break;
		}
	}
};

function spawnAlien() // probe
{
	if (rnd(100) > 20 || g.mode != "game") return;
	if (g.probenextthink > 0) return;
	for (var a=0;a<m.aliens.length;a++)
	{
		if (!m.aliens[a].visible)
		{
			var e = m.aliens[a];
			e.visible = true;
			e.direction = 6;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = g.canvaswidth + 16;
			e.y = rnd(10) <= 5 ? 80 : 180;
			e.moddir = 0;
			e.ymod = 0;
			e.maxymod = rnd(6);
			e.hp = 20;
			e.speed = g.groundspeed - rnd(4);
			e.basespeed = e.speed;
			e.frame = 0;
			e.row = 0;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			g.probenextthink = 100;
			e.bombymod = 2;
			e.bombcooldown = 0;
			break;
		}
	}
};

function spawnAlienBombType(o,t)
{
	if (!o.visible || g.pausemode > 0 || o.x > g.canvaswidth || o.bombcooldown > 0 || o.x < (g.canvaswidth / 3) || g.level < 4) return;
	var d = 6;  
	for (var a=0;a<NUM.alienbombs;a++)
	{
		if (!m.alienbomb[a].visible)
		{
			var s = m.alienbomb[a];
			s.visible = true;
			s.direction = 6;
			s.x = o.x + (o.w/2);
			s.y = o.y + (o.h/2);
			s.row = 1;
			s.speed = 1;
			s.floatdir = 0;
			s.floatcount = 1;
			if (g.level > 4)
			{
				s.ymod = o.bombymod;
				o.bombymod -= 0.5; if (o.bombymod < -2) o.bombymod = -2;
			} else {
				s.ymod = 0;
			}
			break;
		}
	}
};

function spawnAlienBomb(o)
{
	if (!o.visible || g.pausemode > 0 || o.x > g.canvaswidth || g.alienbombcooldown > 0 || o.x < (g.canvaswidth / 3)) return;
	var d = 6;  
	for (var a=0;a<NUM.alienbombs;a++)
	{
		if (!m.alienbomb[a].visible)
		{
			var s = m.alienbomb[a];
			s.visible = true;
			s.direction = 6;
			s.x = o.x + (o.w/2);
			s.y = o.y + (o.h/2);
			s.row = 0;
			s.ymod = g.level > 5 || g.leveltype == 2 ? (rnd(4)-1) * (s.y < m.player.y ? -1 : 1) : 0;
			s.speed = 2;
			g.alienbombcooldown = g.leveltype == 2 ? 16 : 32 - (g.level * 2);
			if (g.alienbombcooldown < 16) g.alienbombcooldown = 16;
			break;
		}
	}
};

function spawnRaider() 
{
	if (rnd(100) > 20 || g.leveltype == 1 || g.mode != "game") return;
	if (g.raidernextthink > 0) return;
	for (var a=0;a<m.raiders.length;a++)
	{
		if (!m.raiders[a].visible)
		{
			var e = m.raiders[a];
			e.visible = true;
			e.direction = 6;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = g.canvaswidth + 16;
			e.y = rnd(10) <= 5 ? 90 : 190;
			e.moddir = e.y > 90 ? (rnd(10)<5 ? 0 : 4) : 4;
			e.ymod = (2 + rnd(3));
			e.maxymod = e.ymod;
			e.hp = 10;
			e.speed = g.groundspeed + rnd(3);
			e.basespeed = e.speed;
			e.frame = 0;
			e.row = 0;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			g.raidernextthink = g.leveltype == 2 ? 10 : 20;
			e.bombymod = 2;
			e.bombcooldown = 0;
			break;
		}
	}
};

function spawnScoutFormation()
{
	return;
	if (g.scoutformationnextthink > 0) return;
	for (var a = 0;a < 8;a++)
	{
		var x = g.canvaswidth + (32 * a);
		var y = 64 + (a * 8);
		spawnScout(x,y);
	}
	g.scoutformationnextthink = 200;
};

function spawnScout(x,y) 
{
	if (g.mode != "game") return;
	//if (g.scoutnextthink > 0) return;
	for (var a=0;a<m.scouts.length;a++)
	{
		if (!m.scouts[a].visible)
		{
			var e = m.scouts[a];
			e.visible = true;
			e.direction = 6;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = x;//g.canvaswidth + 16;
			e.y = y;//rnd(10) <= 5 ? 90 : 190;
			e.moddir = e.y > 90 ? (rnd(10)<5 ? 0 : 4) : 4;
			e.ymod = (2 + rnd(3));
			e.maxymod = e.ymod;
			e.hp = 20;
			e.speed = g.groundspeed + rnd(3);
			e.basespeed = e.speed;
			e.frame = 0;
			e.row = 0;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			//g.scoutnextthink = 8;
			e.bombymod = 2;
			e.bombcooldown = 0;
			e.angle = 0;
			break;
		}
	}
};

function spawnPowerup(o) 
{
	if (g.mode != "game" || rnd(100) > 50) return;
	for (var a=0;a<m.powerups.length;a++)
	{
		if (!m.powerups[a].visible)
		{
			var e = m.powerups[a];
			e.visible = true;
			e.direction = 6;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = o.x;
			e.y = o.y;
			e.ymod = (10 + rnd(6)) * -1;
			e.maxymod = e.ymod;
			e.hp = 20;
			e.speed = g.groundspeed;
			e.basespeed = e.speed;
			e.frame = 0;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			e.score = 100;
			e.bounced = false;
			e.landed = false;
			e.collected = false;
			e.row = rnd(2) - 1; //g.control != "KEYS" ? (m.player.lasertype < 2 ? 0 : 1) : 1;
			break;
		}
	}
};

function spawnBonuses(o)
{
	for (var a=0;a < (o.spritesheet.type == "raider" ? 4 : 8);a++)
	{
		spawnBonus(o.x + rnd(o.w),o.y);
	}
};

function spawnBonus(x,y) 
{
	if (g.mode != "game") return;
	for (var a=0;a<m.bonuses.length;a++)
	{
		if (!m.bonuses[a].visible)
		{
			var e = m.bonuses[a];
			e.visible = true;
			e.direction = 6;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = x;
			e.y = y;
			e.ymod = (10 + rnd(6)) * -1;
			e.xmod = rnd(6) * (rnd(100) < 50 ? 1 : -1);
			e.maxymod = e.ymod;
			e.hp = 20;
			e.speed = g.groundspeed;
			e.basespeed = e.speed;
			e.frame = 0;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			e.score = 50;
			e.bounced = false;
			e.landed = false;
			e.collected = false;
			e.row = rnd(e.spritesheet.height / e.spritesheet.frameheight) - 1;
			break;
		}
	}
};

function spawnPilot(x,y)
{
	if (m.player.dying || g.pilotcooldown >= 1 || g.levelaliens < 1 || g.leveltype > 0) return;
	for (var a=0;a < NUM.pilots;a++)
	{
		if (!m.pilots[a].visible)
		{
			var e = m.pilots[a];
			//g.levelpilots --;
			g.pilotcooldown = 50 + rnd(20);
			e.visible = true;
			e.x = x;
			e.y = y;
			e.speed = g.groundspeed;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.frame = 0;
			e.startframe = 0;
			e.framedelay = e.spritesheet.framedelay;
			e.framedelaymax = e.framedelay;
			break;
		}
	}
};



function spawnEntityChance(o)
{
	var x = 0; var y = 0;
	if ((rnd(100) < 10) && g.pausemode < 1) 
	{
		x = o.x + 32 + (rnd(g.roadwidth - 64));
		y = 0;
		var row = parseInt(m.spritesheets["entitysheet"].height) / parseInt(m.spritesheets["entitysheet"].frameheight);
		var r = rnd(100)<(g.level)?rnd(3)-1:2+rnd(row-3);
		if (g.level < 5 && r == 5)
		{
			if (rnd(100)>5) r = 4; // frig to prevent too much missile exposure on early levels
		}
		spawnEntity(x, y, r);
	}
};

function spawnEntity(x,y,row)
{
	for (var a=0;a<m.entity.length;a++)
	{
		if (!m.entity[a].visible)
		{
			var s = m.entity[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.direction = 4;
			s.speed = g.roadspeed;
			s.dying = 0;
			s.row = row;
			break;
		}
	}
};

function calculateModsAlien(a)
{
	var steps = (a.ghosty - (a.y + a.h)) / a.speed;
	var gx = a.ghostx; 
	a.xmod = (gx - a.x) / steps;
};

function calculateMods(a,p,o)
{
	var steps = ((p.y + p.h) - (a.y + a.h)) / o.speed;
	o.xmod = (p.x - a.x) / steps;
};

function spawnLaser(x,y)
{
	try
	{
		if (m.player.dying) return;
		for (var a=0;a<NUM.lasers;a++)
		{
			if (!m.lasers[a].visible)
			{
				var s = m.lasers[a];
				s.visible = true;
				s.x = x;
				s.y = y;
				s.speed = 16;
				s.damage = 10;
				break;
			}
		}
	}
	catch (e)
	{
		write("SpawnLaser: " + e.message);
	}
};

function writeString(s,x,y)
{
	var o = m.spritesheets["numberssheet"];
	for (var a=0;a<s.length;a++)
	{
		x += o.framewidth;
		var i = s.substr(a,1);
		g.ctx.drawImage(o.image, i*o.framewidth, 0, o.framewidth, o.frameheight, x, y, o.framewidth, o.frameheight);
	}
};

function writeLevel()
{
	var ph = new String();
	var ph2 = new String(g.level);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,190,200);

};

function hiScore()
{
	try
	{
		var sScore = new String();
		var sInScore = new String(m.player.hiscore);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeText(s,g.textcentre,26,28,SCOREFONT)
		
	}
	catch (e)
	{
		write(e.message);
	}
};

function updateScore()
{
	try
	{
		m.player.score += 10;
		if (m.player.score > m.player.targetscore) m.player.score = m.player.targetscore;
		if (m.player.score > m.player.hiscore) 
		{
			m.player.hiscore = Math.round(m.player.score);
			if (window.localStorage != null)
			{
				window.localStorage.setItem(GAMETITLE + "-hiscore", m.player.hiscore);
			} else {
				localStorage.setItem(GAMETITLE + "-hiscore", m.player.hiscore);
			}
		}
		if (m.player.score > 99999999) m.player.score = 99999999;
		var sScore = new String();
		var sInScore = new String(m.player.score);
		var ls = sInScore.length;
		var s = new String();
		
		if (m.player.score >= 50000 && !g.bonuslife1) 
		{
			m.player.lives ++;
			spawnTextSprite(m.player,"EXTRA LIFE");
			g.bonuslife1 = true;
		}

		if (m.player.score >= 100000 && !g.bonuslife2) 
		{
			m.player.lives ++;
			spawnTextSprite(m.player,"EXTRA LIFE");
			g.bonuslife2 = true;
		}

		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeText(s,g.textcentre,26,g.scoresize,SCOREFONT)
		
	}
	catch (e)
	{
		write("Score: " + e.message);
	}
};


function scanInput(e)
{
	if (window.event) keypress = e.keyCode;
	else if(e.which) keypress = e.which;
	switch (keypress)
	{
		case 16: // SHIFT
			break;
		case 18: // ALT
			break;
		case 32: // Space
			if (g.mode == "title") setGame();
			break;
		case 38: // Up
			m.player.moveup = true;
			break;
		case 40: // Down
			m.player.movedown = true;
			break;
		case 39: // Right
			m.player.moveright = true;
			break;
		case 37: // Left
			m.player.moveleft = true;
			break;
		case 67: // C
			g.console.style.display = g.console.style.display == "none" ? "block" : "none";
			break;
		case 80: // P
			g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0;
			break;
		case 83: // S
			g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0;
			handleAudio();
			break;
		case 17: // CTRL
		case 90: // Z
			if (g.mode == "title") 
			{
				setGame();
				g.control = "KEYS";
			}
			break;
	}
};

function stopMove(e)
{
	if (window.event) // IE
	{
		keyup = e.keyCode;
	}
	else if(e.which)
	{
		keyup = e.which;
	}

	var k = 0;
	if (keyup >= 48 && keyup <= 57)
	{
		k = (48 - keyup) * -1;
	}
	switch (keyup)
	{
		case 16: // SHIFT
			break;
		case 18: // ALT
			break;
		case 32: // Space
			break;
		case 38: // Up
			m.player.moveup = false;
			break;
		case 40: // Down
			m.player.movedown = false;
			break;
		case 39: // Right
			m.player.moveright = false;
			break;
		case 37: // Left
			m.player.moveleft = false;
			break;
		case 67: // C
			break;
		case 83: // S
			break;
		case 17: // CTRL
		case 90: // Z
			if (g.mode == "game")
			{
				spawnLaser(m.player.x + m.player.w, m.player.y  + (m.player.h / 2) - 2);
			}
			break;
	}
};

window.onorientationchange = function(event) {
	setCanvasDimensions(event);
};

