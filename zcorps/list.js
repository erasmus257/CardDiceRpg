// Application ZCorps - Liste et Consultation des fiches

// Variables globales
let characters = [];
let currentCharacter = null;
let currentCharacterIndex = null;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    loadCharacters();
    setupEventListeners();
    
    // Afficher la liste par défaut
    showCharactersList();
});

// Charger les personnages depuis le localStorage
function loadCharacters() {
    const savedCharacters = localStorage.getItem('zcorps_characters');
    if (savedCharacters) {
        characters = JSON.parse(savedCharacters);
    }
    displayCharactersList();
}

// Sauvegarder les personnages dans le localStorage
function saveCharacters() {
    localStorage.setItem('zcorps_characters', JSON.stringify(characters));
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Boutons de navigation
    document.getElementById('back-to-list-btn').addEventListener('click', showCharactersList);
    
    // Boutons de la vue de fiche
    document.getElementById('edit-char-btn').addEventListener('click', editCharacter);
    document.getElementById('delete-char-btn').addEventListener('click', deleteCharacter);
    
    // Modal de dés
    document.getElementById('close-modal-btn').addEventListener('click', closeDiceModal);
}

// Afficher la liste des personnages
function showCharactersList() {
    document.getElementById('view-section').classList.add('hidden');
    document.getElementById('list-section').classList.remove('hidden');
    
    displayCharactersList();
}

// Afficher la liste des personnages
function displayCharactersList() {
    const charactersList = document.getElementById('characters-list');
    
    if (characters.length === 0) {
        charactersList.innerHTML = '<p>Aucune fiche sauvegardée pour l\'instant.</p>';
        return;
    }
    
    charactersList.innerHTML = '';
    
    characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.index = index;
        
        const typeClass = character.type === 'Joueur' ? 'joueur' : 'pnj';
        
        const totalSkillPoints = character.skills.reduce((sum, skill) => sum + (skill.value - 1), 0);
        
        card.innerHTML = `
            <h3>${character.name}</h3>
            <span class="char-type ${typeClass}">${character.type}</span>
            <div class="char-preview">
                ${Object.entries(character.attributes).map(([attrId, value]) => 
                    `<div><span>${getAttributeName(attrId)}:</span> <strong>${value}D</strong></div>`
                ).join('')}
            </div>
            <div class="char-preview">
                <strong>${character.skills.length} compétences</strong> (${totalSkillPoints}D supplémentaires)
            </div>
        `;
        
        card.addEventListener('click', () => viewCharacter(index));
        charactersList.appendChild(card);
    });
}

// Visualiser un personnage
function viewCharacter(index) {
    currentCharacter = characters[index];
    currentCharacterIndex = index;
    
    document.getElementById('list-section').classList.add('hidden');
    document.getElementById('view-section').classList.remove('hidden');
    
    // Mettre à jour les informations
    document.getElementById('view-char-name').textContent = currentCharacter.name;
    const typeBadge = document.getElementById('view-char-type');
    typeBadge.textContent = currentCharacter.type;
    typeBadge.className = `char-type-badge ${currentCharacter.type === 'Joueur' ? 'joueur' : 'pnj'}`;
    
    // Afficher les caractéristiques
    displayViewAttributes();
    
    // Afficher les compétences
    displayViewSkills();
    
    // Effacer le résultat des dés
    document.getElementById('dice-result').innerHTML = '';
}

// Afficher les caractéristiques dans la vue
function displayViewAttributes() {
    const container = document.getElementById('view-attributes');
    container.innerHTML = '';
    
    Object.entries(currentCharacter.attributes).forEach(([attrId, value]) => {
        const attrDiv = document.createElement('div');
        attrDiv.className = 'view-attribute';
        
        attrDiv.innerHTML = `
            <span class="attr-name">${getAttributeName(attrId)}</span>
            <span class="attr-value">${value}D</span>
        `;
        
        container.appendChild(attrDiv);
    });
}

// Afficher les compétences dans la vue
function displayViewSkills() {
    const container = document.getElementById('view-skills');
    container.innerHTML = '';
    
    currentCharacter.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'view-skill';
        
        const attrId = getSkillAttribute(skill.name);
        const attrValue = currentCharacter.attributes[attrId] || 0;
        const totalDice = attrValue + skill.value;
        
        skillDiv.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <span class="skill-value">${skill.value}D</span>
            <span class="skill-attr">${getAttributeName(attrId)}: ${attrValue}D</span>
            <span class="skill-total">Total: ${totalDice}D6</span>
        `;
        
        skillDiv.addEventListener('click', () => rollDice(skill.name, attrId));
        
        container.appendChild(skillDiv);
    });
}

// Lancer les dés pour une compétence
function rollDice(skillName, attrId) {
    const attrValue = currentCharacter.attributes[attrId] || 0;
    const skill = currentCharacter.skills.find(s => s.name === skillName);
    const skillValue = skill ? skill.value : 0;
    
    const numDice = attrValue + skillValue;
    
    if (numDice <= 0) {
        alert("Impossible de lancer des dés : la somme de l'attribut et de la compétence est de 0D");
        return;
    }
    
    // Lancer les dés
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const total = rolls.reduce((sum, roll) => sum + roll, 0);
    
    // Afficher le résultat dans la page
    const diceResult = document.getElementById('dice-result');
    diceResult.innerHTML = `
        <h4>Résultat du jet pour ${skillName}</h4>
        <p><strong>${numDice}D6</strong> : ${rolls.join(' + ')} = <span class="dice-total-display">${total}</span></p>
    `;
    
    // Afficher le modal
    showDiceModal(skillName, attrId, numDice, rolls, total);
}

// Afficher le modal de dés
function showDiceModal(skillName, attrId, numDice, rolls, total) {
    const modal = document.getElementById('dice-modal');
    const attrName = getAttributeName(attrId);
    
    document.getElementById('dice-modal-info').textContent = 
        `Test de ${skillName} (${attrName} + ${skillName}): ${numDice}D6`;
    
    // Animation des dés
    const diceAnimation = document.getElementById('dice-animation');
    diceAnimation.innerHTML = '';
    
    rolls.forEach(roll => {
        const dice = document.createElement('div');
        dice.className = 'dice';
        dice.textContent = roll;
        diceAnimation.appendChild(dice);
    });
    
    document.getElementById('dice-total').textContent = total;
    
    // Détails des dés
    const diceDetails = document.getElementById('dice-details');
    diceDetails.innerHTML = rolls.map(roll => `<span>${roll}</span>`).join(' + ');
    
    modal.classList.remove('hidden');
}

// Fermer le modal de dés
function closeDiceModal() {
    document.getElementById('dice-modal').classList.add('hidden');
}

// Modifier un personnage (redirige vers la page de création)
function editCharacter() {
    if (!currentCharacter) return;
    
    // Stocker l'index dans localStorage pour que la page create.html puisse le récupérer
    localStorage.setItem('zcorps_edit_index', currentCharacterIndex);
    
    // Rediriger vers la page de création
    window.location.href = 'create.html';
}

// Supprimer un personnage
function deleteCharacter() {
    if (currentCharacterIndex === null) return;
    
    if (confirm(`Voulez-vous vraiment supprimer la fiche de ${currentCharacter.name} ?`)) {
        characters.splice(currentCharacterIndex, 1);
        saveCharacters();
        showCharactersList();
    }
}

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', function(e) {
    const modal = document.getElementById('dice-modal');
    if (e.target === modal) {
        closeDiceModal();
    }
});

// Gérer la touche Échap pour fermer le modal
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDiceModal();
    }
});
