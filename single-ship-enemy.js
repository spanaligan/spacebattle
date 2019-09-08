class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

}

let player1 = new Ship('USS Schwarzenegger', 20, 5, .7);

let alienEnemy = new Ship('Skynet\'s Terminator', 40, 4, .6);

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
        return attack(player1, alienEnemy);
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

function enemyAttack() {
    if (player1.hull <= 0) {
        return gameStatus();
    } else if (player1.hull > 0) {
        return attack(alienEnemy, player1);
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
    } else if (action === 'attack') {
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





