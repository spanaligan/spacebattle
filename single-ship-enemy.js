class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

}

let player1 = new Ship('USS Schwarzenegger', 20, 5, .7);

let alienEnemy = new Ship('Skynet\'s Terminator', 30, 4, .6);
alienEnemy.weapons = [{name: 'torpedoes', torpedoes: 2, firepower: 3, hull: 2, accuracy: .5},
    {name: 'liquidator', liquidator: 1, firepower: 7, hull: 5, accuracy: .8}];

function gameStart() {
    //document.getElementById('single-ship-start');
    let move = prompt(`Hello again Captain! Please enter your next move. 
    Your choices are attack, check hull, or retreat`, 'attack');
    if (move === 'retreat') {
        return retreat();
    } else if (move === 'check hull') {
        alert(`The hull can withstand ${player1.hull} more damage.`);
        return gameStart();
    } else if (move === 'attack') {
        return removeWeapons();
    } else {
        return gameStart();
    }
}

function attack(attacker, victim) {
    if (Math.random() < attacker.accuracy) {
        if (victim.hull <= 0) {
            alert(`${victim.name} ship destroyed!`);
            return gameStatus();
        } else if (victim.hull > 0) {
            victim.TotalDamage = [];
            let damage = victim.hull - attacker.firepower;
            victim.TotalDamage.splice(0, 1, damage);
            alert(`GREAT HIT!! 
        ${attacker.name} reduced ${victim.name}'s hull by ${attacker.firepower}!!`);
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
        if (attacker === 'alienEnemy') {
            return checkScore();
        } else {
            return enemyAttack();
        }
    }
}

let enemyHit = [];

function randomNumberBetween(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
}

function removeWeapons() {
    if (alienEnemy.weapons.length !== 0) {
        if (Math.random() < player1.accuracy) {
            if (alienEnemy.weapons[0].torpedoes !== 0) {
                alienEnemy.weapons[0].TotalDamage = alienEnemy.weapons[0].hull - player1.firepower;
                alienEnemy.weapons[0].torpedoes -= 1;
                alert(`GREAT HIT!! 
        ${player1.name} destroyed ${alienEnemy.name}'s ${alienEnemy.weapons[0].name}! 
        There are ${alienEnemy.weapons[0].torpedoes} ${alienEnemy.weapons[0].name} remaining.`);
                return checkScore();
            } else if (alienEnemy.weapons[1].liquidator !== 0) {
                alienEnemy.weapons[1].liquidator = alienEnemy.weapons[1].hull - player1.firepower;
                alert(`GREAT HIT!! 
        ${player1.name} destroyed ${alienEnemy.name}'s ${alienEnemy.weapons[1].name}! 
        There are no alien weapons remaining. Your next hit will target the Mother-ship directly!!`);
                alienEnemy.weapons.pop();
                return checkScore();
            }
        } else {
            alert(`${player1.name} missed!`);
                return enemyAttack();
            }
        }
    }



function enemyAttack() {
    if (player1.hull <= 0) {
        return gameStatus();
    } else if (player1.hull > 0 && alienEnemy.weapons.length !== 0) {
        let weaponIndex = Math.ceil(Math.random() * alienEnemy.weapons.length - 1);
        let randomWeapon = alienEnemy.weapons[weaponIndex];
        return weaponAttack(randomWeapon);
    } else if (player1.hull > 0) {
        return attack(alienEnemy, player1);
        }
    }

function weaponAttack(weapon) {
    if (Math.random() < weapon.accuracy) {
        if (player1.hull <= 0) {
            alert(`${player1.name} ship destroyed!`);
            return gameStatus();
        } else if (player1.hull > 0) {
            player1.TotalDamage = [];
            let damage = player1.hull - weapon.firepower;
            player1.TotalDamage.splice(0, 1, damage);
            alert(`GREAT HIT!! 
        ${alienEnemy.name} reduced ${player1.name}'s hull by ${weapon.firepower}!!`);
            player1.hull = player1.TotalDamage[0];
            if (player1.hull <= 0) {
                return gameStatus();
            } else {
                return checkScore();
            }
        }
    } else {
        alert(`${alienEnemy.name} missed!`);
        return checkScore();

    }
}

let damageAccrued = [];

function hullIntegrity() {
    let damage = player1.hull - enemyHit;
    damageAccrued.splice(0, 1, damage);
    alert(`The hull can withstand ${damageAccrued[0]} more damage.`);
    return checkScore();
}

function gameStatus() {
    if (player1.hull >= 0 && alienEnemy.hull <= 0) {
        alert(`Congratulations! You have won the game!`);
    } else {
        alert(`The ${player1.name} has been destroyed. GAME OVER!`);
    }
}

function checkScore() {
    let action = prompt(`What would you like to do next, captain? 
    Your choices are attack, check hull, or retreat`, 'attack');
    if (action === 'check hull') {
        return hullIntegrity();
    } else if (action === 'attack' && alienEnemy.weapons.length === 2) {
        return removeWeapons();
    } else if (action === 'attack' && alienEnemy.weapons.length === 1) {
        return attack(player1, alienEnemy);
    } else if (action === 'retreat') {
        return retreat();
    } else {
        return action;
    }
}

function retreat() {
    alert(`You have retreated from battle. GAME OVER...`);
}

function bulletin() { // originally I had this named 'function alert() which caused an infinite loop as soon as the
    // code hit the first alert! Yikes! Names are important!!
    setTimeout(() => {
        document.getElementById('emergency').innerHTML = 'Emergency news bulletin...';}, 1000);
    setTimeout(() => {
        document.getElementById('p1').innerHTML = 'Earth has been attacked by a Mother-ship full of aliens! You are' +
            ' the captain of the USS Schwarzenegger, on a mission to destroy every last alien.';}, 2000);
    setTimeout(() => {
        document.getElementById('p2').innerHTML = 'Battle the aliens as you try to destroy them with your lasers, but you must take out the Mother-ship\'s\n' +
            '            weapons before you can do any damage to the Mother-ship itself.';}, 3000);
    setTimeout(() => {
        document.getElementById('p3').innerHTML = 'Fortunately, the aliens haven\'t spotted your ship yet, so you' +
            ' have the element of surprise. Use that initiative to attack first. However, if the battle proves too' +
            ' dangerous, you have the option to make a hasty retreat.';}, 4000);
    setTimeout(() => {
        document.getElementById('p4').innerHTML = 'Best of luck captain as you complete your quest to destroy the' +
            ' aliens!!!';}, 6000);
    setTimeout(() => {
            document.getElementById('single-ship-start').setAttribute('style', 'display: block');},
        8000);
}


