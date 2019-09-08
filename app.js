// establishing the basic ship properties and functions.
class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

}

let player1 = new Ship('USS Schwarzenegger', 20, 5, .7);

// I want a way to generate a random alien ship (six times) so that each one has unique stats and each game
// iteration has a new combination of ships to battle.
// I'm reusing a function I created for my calculator on day 5. In order to return the desired accuracy I just need
// to divide the result by 10.
function randomNumberBetween(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
}

let alienShipGenerator = [];
for (let i = 0; i < 6; i++) {
    let randomHull = randomNumberBetween(3, 6);
    let randomFirepower = randomNumberBetween(2, 4);
    let randomAccuracy = randomNumberBetween(6, 8) / 10;
    let alienShipName = 'BOGEY #' + [i + 1];
    alienShipGenerator.push(new Ship(alienShipName, randomHull, randomFirepower, randomAccuracy));
}
console.log(alienShipGenerator);
// creating a test ship so I can try out the other game funcitons.
// testing how to calculate a hit
// this test allowed me to be able to test without accessing the class.
/*function hit() {
    if (Math.random() < player1.accuracy) {
        console.log('You have been hit!');
    } else {
        console.log('You dodged a bullet. Lucky you!');
    }
}*/

// calculate the damage done to the hull of the ship you are attacking.
/*function damage() {
return player1.hull - alienTestShip.firepower;
}
console.log(damage());

player1.attack();
alienTestShip.attack();*/

// looking at logic for the game... I'm adding a function to initiate the first prompt
function multiGameStart() {
    //document.getElementById('multi-ship-start');
    let move = prompt(`Hello again Captain! Please enter your next move. 
    Your choices are attack, check hull, or retreat`, 'attack');
    if (move === 'retreat') {
        return retreat();
    } else if (move === 'check hull') {
        alert(`The hull can withstand ${player1.hull} more damage.`);
        return multiGameStart();
    } else if (move === 'attack') {
        return attack(player1, alienShipGenerator[0]);
    } else {
        return multiGameStart();
    }
}

// created a new function since damage will change as the game progresses

/*function enemyHit() {
    damage -= hit;
    totalDamage.splice(0, 1, damage);
    return player1.hullIntegrity();
}*/

// I needed to move this out of the class so either ship could use it
function attack(attacker, victim) {
    if (Math.random() < attacker.accuracy) {
        if (victim.hull <= 0) {
            alert(`${victim.name} ship destroyed!`);
            return gameStatus();
        } else if (victim.hull > 0) {
            victim.TotalDamage = [];
            let damage = victim.hull - attacker.firepower;
            victim.TotalDamage.splice(0, 1, damage);
            alert(`GREAT HIT!! ${attacker.name} reduced ${victim.name}'s hull by ${attacker.firepower}!!`);
            // (damage = victim.hull - attacker.firepower;)
            victim.hull = victim.TotalDamage[0];
            if (victim.hull <= 0) {
                return gameStatus();
            } else {
                return checkScore();
            }
        }
    } else {
        alert(`${attacker.name} missed!`);
        if (attacker === 'alienShipGenerator[0]') {
            return checkScore();
        } else {
            return enemyAttack();
        }
    }
}

// Now that I have check all other options.. I need to decide what happens if you miss and how the enemy will fight
// back!
let enemyHit = [];

function enemyAttack() {// all hard coded for single player game
    if (player1.hull <= 0) {
        return gameStatus();
    } else if (player1.hull > 0) {
        return attack(alienShipGenerator[0], player1);
    }
}

let damageAccrued = [];

function hullIntegrity() { // I had to also move this out of the constructor.
    // need a way to increment the total damage with each hit. => see enemyHit()
    let damage = player1.hull - enemyHit;
    damageAccrued.splice(0, 1, damage);
    alert(`The hull can withstand ${damageAccrued[0]} more damage.`);
    return checkScore();
}

// need a way to destroy the enemy ship (this will end up in the attack function)
// i need to hard code this one first and once working I will try to change it.
/*
if (alienTestShip.hull <= 0) {
    alert(`Enemy ship destroyed!`);
}  else if (alienTestShip.hull > 0) {
    herodamage -= player1.firepower;
    heroTotalDamage.splice(0, 1, herodamage);
}
*/

// need a way to win the game
function gameStatus() {
    if (player1.hull <= 0) {
        alert(`The ${player1.name} has been destroyed. GAME OVER!`);
    } else if (alienShipGenerator[0].hull <= 0 && alienShipGenerator.length > 0) {
        alienShipGenerator.shift();
        if (player1.hull > 0 && alienShipGenerator.length > 0) {
            alert(`There are ${alienShipGenerator.length} ships left in the alien fleet.`);
            return checkScore();
        } else {
            alert(`The ${player1.name} is victorious! The last alien ship has been destroyed!!
            Congratulations, captain! You have won the game!!`);
        }
    }
}

// I had to move all the actions out of the constructor for now because I'm going to eventually make this a
// multiplayer game. Once everything is working with autoplay... I can move the pieces back into the constructor so the
// different players can access them.
function checkScore() { // eventually I will have a parameter to pass in here for the different players
    let action = prompt(`What would you like to do next, captain? 
    Your choices are attack, check hull, or retreat`, 'attack');
    if (action === 'check hull') {
        return hullIntegrity();
    } else if (action === 'attack') {
        return attack(player1, alienShipGenerator[0]); // hard coded for now
    } else if (action === 'retreat') {
        return retreat();
    } else {
        return action;
    }
}

function retreat() {
    alert(`You have retreated from battle. GAME OVER...`);
}

// now that all the elements of the game are working... I want to add some fancy effects to the html
// We discussed using setInterval and setTimout in class so I wanted to add that function to the opening page.
// https://www.w3schools.com/jsref/met_win_settimeout.asp (reminder how to use time out)
// https://stackoverflow.com/questions/55208482/how-to-consequently-change-letter-using-javascript-with-a-second-delay-using-set?noredirect=1 (how to display html text delayed)
// https://stackoverflow.com/questions/31751218/jquery-show-button-after-5-second (how to display a button delayed)

function bulletin() { // originally I had this named 'function alert() which caused an infinite loop as soon as the
    // code hit the first alert! Yikes! Names are important!!
    setTimeout(() => {
        document.getElementById('emergency').innerHTML = 'Emergency news bulletin...';}, 1000);
    setTimeout(() => {
        document.getElementById('p1').innerHTML = 'Earth has been attacked by a horde of aliens!\n' +
            '            You are the captain of the USS Schwarzenegger, on a mission to destroy every last alien ship.';}, 3000);

    setTimeout(() => {
        document.getElementById('p3').innerHTML = 'There are six alien ships. The aliens\' weakness is that they are too logical and attack one at a\n' +
            '            time: they will wait to see the outcome of a battle before deploying another alien ship.\n' +
            '            Your strength is that you have the initiative and get to attack first.\n' +
            '            However, you do not have targeting lasers and can only attack the aliens in order.\n' +
            '            After you have destroyed a ship, you have the option to make a hasty retreat.';}, 5000);
    setTimeout(() => {
        document.getElementById('p4').innerHTML = 'Best of luck captain as you complete your quest to destroy the aliens!!!';}, 10000);

    setTimeout(() => {
        document.getElementById('multi-ship-start').setAttribute('style', 'display: block');},
        11000); // used setAttribute to override the css until after the above messages ran.
    }