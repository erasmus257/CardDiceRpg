// Application ZCorps - Gestion de fiches de personnage

// Variables globales
let characters = [];
let currentCharacter = null;
let currentCharacterIndex = null;
let selectedSkills = [];
let pendingSkill = null; // Pour gérer l'ajout de compétence avec valeur

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    loadCharacters();
    setupEventListeners();
    updateAttributePoints();
    
    // Masquer la section de création au démarrage
    document.getElementById('creation-section').classList.add('hidden');
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
    document.getElementById('new-char-btn').addEventListener('click', showCreationForm);
    document.getElementById('cancel-btn').addEventListener('click', showCharactersList);
    document.getElementById('back-to-list-btn').addEventListener('click', showCharactersList);
    
    // Formulaire de création
    document.getElementById('character-form').addEventListener('submit', saveCharacter);
    document.getElementById("char-name").addEventListener("input", validateForm);
    document.getElementById("char-name").addEventListener("change", validateForm);
    document.getElementById('add-skill-btn').addEventListener('click', addSelectedSkills);
    document.getElementById("save-char-btn").addEventListener("click", function(e) {
        if (!this.disabled) {
            document.getElementById("character-form").dispatchEvent(new Event("submit"));
        }
    });
    
    // Écouteurs pour les caractéristiques
    const attrInputs = document.querySelectorAll('[data-attr]');
    attrInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateAttributePoints();
            validateForm();
        });
    });
    
    // Écouteurs pour les checkboxes de compétences
    const skillCheckboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]');
    skillCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedSkillsCount();
            validateForm();
        });
    });
    
    // Boutons de la vue de fiche
    document.getElementById('edit-char-btn').addEventListener('click', editCharacter);
    document.getElementById('delete-char-btn').addEventListener('click', deleteCharacter);
    
    // Modal de dés
    document.getElementById('close-modal-btn').addEventListener('click', closeDiceModal);
    
    // Modal de valeur de compétence
    document.getElementById('confirm-skill-value-btn').addEventListener('click', confirmSkillValue);
    document.getElementById('cancel-skill-value-btn').addEventListener('click', cancelSkillValue);
}

// Afficher le formulaire de création
function showCreationForm() {
    document.getElementById('list-section').classList.add('hidden');
    document.getElementById('view-section').classList.add('hidden');
    document.getElementById('creation-section').classList.remove('hidden');
    
    // Réinitialiser le formulaire
    resetForm();
}

// Afficher la liste des personnages
function showCharactersList() {
    document.getElementById('creation-section').classList.add('hidden');
    document.getElementById('view-section').classList.add('hidden');
    document.getElementById('list-section').classList.remove('hidden');
    
    displayCharactersList();
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('char-name').value = '';
    document.getElementById('char-type').value = 'Joueur';
    
    // Réinitialiser les caractéristiques à 2D
    const attrInputs = document.querySelectorAll('[data-attr]');
    attrInputs.forEach(input => {
        input.value = 2;
        const diceIndicator = input.nextElementSibling;
        if (diceIndicator && diceIndicator.classList.contains('dice-indicator')) {
            diceIndicator.textContent = '2D';
        }
    });
    
    // Réinitialiser les compétences
    const skillCheckboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]');
    skillCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
    
    selectedSkills = [];
    updateSelectedSkillsDisplay();
    updateAttributePoints();
    validateForm();
    
    currentCharacter = null;
    currentCharacterIndex = null;
    pendingSkill = null;
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
    document.getElementById('creation-section').classList.add('hidden');
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

// Mettre à jour le compteur de compétences sélectionnées
function updateSelectedSkillsCount() {
    const checkboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]:checked');
    const count = checkboxes.length;
    document.getElementById('skills-count').textContent = count;
    
    // Désactiver les checkboxes si on a déjà 12 compétences (maximum)
    const allCheckboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        if (count >= 12 && !checkbox.checked) {
            checkbox.disabled = true;
        } else {
            checkbox.disabled = false;
        }
    });
    
    validateForm();
}

// Mettre à jour l'affichage des compétences sélectionnées
function updateSelectedSkillsDisplay() {
    const container = document.getElementById('skills-list');
    container.innerHTML = '';
    
    selectedSkills.forEach((skill, index) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        
        const attrId = getSkillAttribute(skill.name);
        const pointsAboveOne = skill.value - 1;
        const pointsText = pointsAboveOne > 0 ? ` (+${pointsAboveOne}D)` : '';
        
        skillDiv.innerHTML = `
            <span>${skill.name}</span>
            <input type="number" min="1" max="7" value="${skill.value}" data-index="${index}" class="skill-value-input">
            <span class="dice-indicator">${skill.value}D${pointsText}</span>
            <span class="remove-skill" data-index="${index}">&times;</span>
        `;
        
        container.appendChild(skillDiv);
    });
    
    // Ajouter les écouteurs pour les inputs de valeur
    const valueInputs = container.querySelectorAll('.skill-value-input');
    valueInputs.forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.dataset.index);
            let value = parseInt(this.value) || 1;
            // Limiter à max 7
            if (value > 7) value = 7;
            if (value < 1) value = 1;
            selectedSkills[index].value = value;
            this.value = value;
            updateSkillsPoints();
            validateForm();
            
            // Mettre à jour l'affichage
            const diceIndicator = this.nextElementSibling;
            if (diceIndicator && diceIndicator.classList.contains('dice-indicator')) {
                const pointsAboveOne = value - 1;
                const pointsText = pointsAboveOne > 0 ? ` (+${pointsAboveOne}D)` : '';
                diceIndicator.textContent = `${value}D${pointsText}`;
            }
        });
    });
    
    // Ajouter les écouteurs pour les boutons de suppression
    const removeButtons = container.querySelectorAll('.remove-skill');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const skillName = selectedSkills[index].name;
            selectedSkills.splice(index, 1);
            updateSelectedSkillsDisplay();
            updateSkillsPoints();
            updateSelectedSkillsCount();
            validateForm();
            
            // Réactiver la checkbox correspondante
            const checkboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.dataset.skill === skillName) {
                    checkbox.checked = false;
                    checkbox.disabled = false;
                }
            });
        });
    });
    
    updateSkillsPoints();
}

// Ajouter les compétences sélectionnées
function addSelectedSkills() {
    const checkboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert("Veuillez sélectionner au moins une compétence");
        return;
    }
    
    // Pour chaque compétence cochée, demander sa valeur
    const skillsToAdd = [];
    checkboxes.forEach(checkbox => {
        const skillName = checkbox.dataset.skill;
        const attrId = checkbox.dataset.attr;
        
        // Vérifier si la compétence est déjà ajoutée
        const exists = selectedSkills.some(skill => skill.name === skillName);
        if (!exists) {
            skillsToAdd.push({ name: skillName, attribute: attrId });
        }
    });
    
    if (skillsToAdd.length === 0) {
        alert("Toutes les compétences sélectionnées sont déjà ajoutées");
        return;
    }
    
    // Si une seule compétence, demander sa valeur directement
    if (skillsToAdd.length === 1) {
        showSkillValueModal(skillsToAdd[0], 0);
    } else {
        // Sinon, ajouter toutes avec valeur par défaut (1D)
        skillsToAdd.forEach(skill => {
            selectedSkills.push({
                name: skill.name,
                attribute: skill.attribute,
                value: 1
            });
        });
        
        updateSelectedSkillsDisplay();
        
        // Décocher toutes les checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        updateSelectedSkillsCount();
        validateForm();
    }
}

// Afficher le modal pour choisir la valeur d'une compétence
function showSkillValueModal(skill, indexInQueue) {
    pendingSkill = skill;
    
    const modal = document.getElementById('skill-value-modal');
    document.getElementById('skill-value-title').textContent = `Valeur pour ${skill.name}`;
    document.getElementById('skill-value-info').textContent = `Définissez la valeur en D pour cette compétence (1D par défaut, + vos points supplémentaires)`;
    document.getElementById('skill-value-input').value = 1;
    document.getElementById('skill-value-input').focus();
    
    modal.classList.remove('hidden');
}

// Confirmer la valeur de la compétence
function confirmSkillValue() {
    const input = document.getElementById('skill-value-input');
    let value = parseInt(input.value) || 1;
    
    if (value < 1) value = 1;
    if (value > 7) value = 7;
    
    if (pendingSkill) {
        selectedSkills.push({
            name: pendingSkill.name,
            attribute: pendingSkill.attribute,
            value: value
        });
        
        // Décocher la checkbox correspondante
        const checkboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.dataset.skill === pendingSkill.name) {
                checkbox.checked = false;
            }
        });
        
        pendingSkill = null;
        updateSelectedSkillsDisplay();
        updateSelectedSkillsCount();
        validateForm();
    }
    
    closeSkillValueModal();
}

// Annuler la valeur de la compétence
function cancelSkillValue() {
    pendingSkill = null;
    closeSkillValueModal();
}

// Fermer le modal de valeur de compétence
function closeSkillValueModal() {
    document.getElementById('skill-value-modal').classList.add('hidden');
}

// Mettre à jour les points utilisés pour les compétences
function updateSkillsPoints() {
    const totalPoints = selectedSkills.reduce((sum, skill) => sum + (skill.value - 1), 0);
    document.getElementById('skills-points-used').textContent = totalPoints;
    
    const warning = document.getElementById('skills-warning');
    if (totalPoints > 7) {
        warning.textContent = 'Maximum recommandé : 7D';
    } else {
        warning.textContent = '';
    }
}

// Mettre à jour les points utilisés pour les caractéristiques
function updateAttributePoints() {
    const attrInputs = document.querySelectorAll('[data-attr]');
    let totalPoints = 0;
    
    attrInputs.forEach(input => {
        let value = parseInt(input.value) || 0;
        // Limiter à max 6
        if (value > 6) value = 6;
        if (value < 0) value = 0;
        input.value = value;
        
        totalPoints += value;
        
        // Mettre à jour l'indicateur de dés
        const diceIndicator = input.nextElementSibling;
        if (diceIndicator && diceIndicator.classList.contains('dice-indicator')) {
            diceIndicator.textContent = `${value}D`;
        }
    });
    
    validateForm();
}

// Valider le formulaire
function validateForm() {
    const name = document.getElementById('char-name').value.trim();
    
    const saveBtn = document.getElementById('save-char-btn');
    const addSkillBtn = document.getElementById('add-skill-btn');
    
    // On permet de sauvegarder tant qu'il y a un nom
    saveBtn.disabled = !name;
    
    // On limite juste à 12 compétences maximum
    addSkillBtn.disabled = selectedSkills.length >= 12;
}

// Sauvegarder un personnage
function saveCharacter(e) {
    e.preventDefault();
    
    const name = document.getElementById('char-name').value.trim();
    const type = document.getElementById('char-type').value;
    
    // Récupérer les caractéristiques
    const attributes = {};
    const attrInputs = document.querySelectorAll('[data-attr]');
    attrInputs.forEach(input => {
        const attrId = input.dataset.attr;
        attributes[attrId] = parseInt(input.value) || 0;
    });
    
    // Créer le personnage
    const character = {
        name: name,
        type: type,
        attributes: attributes,
        skills: selectedSkills.map(skill => ({
            name: skill.name,
            attribute: skill.attribute,
            value: skill.value
        }))
    };
    
    // Mettre à jour ou ajouter le personnage
    if (currentCharacterIndex !== null) {
        characters[currentCharacterIndex] = character;
    } else {
        characters.push(character);
    }
    
    saveCharacters();
    showCharactersList();
}

// Modifier un personnage
function editCharacter() {
    if (!currentCharacter) return;
    
    // Remplir le formulaire avec les données du personnage
    document.getElementById('char-name').value = currentCharacter.name;
    document.getElementById('char-type').value = currentCharacter.type;
    
    // Remplir les caractéristiques
    Object.entries(currentCharacter.attributes).forEach(([attrId, value]) => {
        const input = document.getElementById(`attr-${attrId}`);
        if (input) {
            input.value = value;
            const diceIndicator = input.nextElementSibling;
            if (diceIndicator && diceIndicator.classList.contains('dice-indicator')) {
                diceIndicator.textContent = `${value}D`;
            }
        }
    });
    
    // Remplir les compétences
    selectedSkills = currentCharacter.skills.map(skill => ({
        name: skill.name,
        attribute: skill.attribute,
        value: skill.value
    }));
    
    // Cocher les checkboxes des compétences sélectionnées
    selectedSkills.forEach(skill => {
        const checkboxes = document.querySelectorAll('.skill-checkboxes input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.dataset.skill === skill.name) {
                checkbox.checked = true;
            }
        });
    });
    
    updateSelectedSkillsDisplay();
    updateSelectedSkillsCount();
    updateAttributePoints();
    validateForm();
    
    // Afficher le formulaire
    document.getElementById('list-section').classList.add('hidden');
    document.getElementById('view-section').classList.add('hidden');
    document.getElementById('creation-section').classList.remove('hidden');
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

// Fermer les modals en cliquant à l'extérieur
window.addEventListener('click', function(e) {
    const diceModal = document.getElementById('dice-modal');
    const skillValueModal = document.getElementById('skill-value-modal');
    
    if (e.target === diceModal) {
        closeDiceModal();
    }
    if (e.target === skillValueModal) {
        closeSkillValueModal();
    }
});

// Gérer la touche Échap pour fermer les modals
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDiceModal();
        closeSkillValueModal();
    }
});
