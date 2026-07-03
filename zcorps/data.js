// Données pour le JDR ZCorps

const ZCORPS_DATA = {
    attributes: {
        agilite: {
            name: "Agilité",
            description: "Elle mesure l'équilibre, la rapidité, la souplesse et les capacité motrices du corps."
        },
        adresse: {
            name: "Adresse",
            description: "Elle donne une idée des capacités de coordination oeil-main du personnage, comme la manipulation de petits objets, les travaux minutieux, faire passer un objet d'une main à l'autre, la faculté d'attraper quelque chose au vol, etc."
        },
        puissance: {
            name: "Puissance",
            description: "C'est la capacité de résistance aux dégâts mais aussi la puissance physique du personnage."
        },
        connaissances: {
            name: "Connaissances",
            description: "Représente la capacité de mémoriser et d'apprendre, ainsi que le savoir, la culture des personnages."
        },
        perception: {
            name: "Perception",
            description: "C'est la vivacité d'esprit ainsi que l'attention portée aux détails."
        },
        presence: {
            name: "Présence",
            description: "Elle indique la force émotionnelle, la personnalité et le charisme du personnage, mais aussi sa volonté, sa force de caractère."
        }
    },
    
    skills: {
        agilite: [
            "Acrobaties",
            "Bagarre",
            "Contorsion",
            "Discrétion",
            "Équitation",
            "Esquive",
            "Grimper",
            "Mêlée",
            "Sauter"
        ],
        adresse: [
            "Armes à feu",
            "Arme de jet",
            "Crochetage",
            "Dextérité",
            "Lancer",
            "Pilotage",
            "Réparer"
        ],
        puissance: [
            "Courir",
            "Endurance",
            "Nager",
            "Soulever"
        ],
        connaissances: [
            "Affaires",
            "Contrefaçon",
            "Démolition",
            "Électronique",
            "Érudition",
            "Informatique",
            "Langues",
            "Médecine",
            "Navigation",
            "Sécurité",
            "Sciences occultes"
        ],
        perception: [
            "Art",
            "Camouflage",
            "Chercher",
            "Connaissance de la Rue",
            "Investigation",
            "Jeux",
            "Pister",
            "Survie"
        ],
        presence: [
            "Charmer",
            "Commander",
            "Déguisement",
            "Dressage",
            "Empathie",
            "Escroquerie",
            "Intimidation",
            "Persuasion",
            "Volonté"
        ]
    },
    
    skillDescriptions: {
        "Acrobaties": "Accomplir des performances en gymnastique, en équilibre, ou en danse (ou toute autre performance artistique identique), tout comme des chutes en arts martiaux. Peut être utilisée pour les courses d'obstacles ou les ballets nautiques.",
        "Bagarre": "Compétence en combat à mains nues.",
        "Contorsion": "S'échapper de liens physiques en se tortillant et en se contorsionnant.",
        "Discrétion": "Se déplacer silencieusement et éviter les détections, que ce soit en se fondant dans l'ombre ou dans une foule.",
        "Équitation": "Contrôler et monter des montures domestiquées.",
        "Esquive": "Se mettre hors de danger, soit en évitant une attaque ou un traquenard quelconque",
        "Grimper": "Escalader diverses surfaces.",
        "Mêlée": "Utiliser des armes de mêlée en combat",
        "Sauter": "Sauter par dessus des obstacles.",
        
        "Armes à feu": "Tirer avec des armes à feu de n'importe quel type, des petits calibres aux lance-missiles.",
        "Arme de jet": "Combattre avec des armes de jet.",
        "Crochetage": "Ouvrir une serrure mécanique (pas un système électronique) ou un coffre sans en avoir la clé ou la combinaison. Cela permet aussi de désarmer de petits pièges mécaniques.",
        "Dextérité": "Avoir les doigts agiles permet de subtiliser les objets, faire les poches et pratiquer la prestidigitation.",
        "Lancer": "Toucher une cible avec précision avec un objet lancé, comme des grenades, des pierres et des couteaux. Cette Compétence sert aussi à rattraper des projectiles.",
        "Pilotage": "Utiliser tous types de véhicules que ce soit sur Terre, dans les airs, sur ou sous l'eau.",
        "Réparer": "Créer, réparer ou modifier des gadgets, des armes, des véhicules.",
        
        "Courir": "Se déplacer rapidement sur le sol, tout en évitant les obstacles et sans trébucher.",
        "Endurance": "Endurance physique et résistance à la douleur et au poison.",
        "Nager": "Se déplacer et survivre dans un élément liquide.",
        "Soulever": "Déplacer et soulever des objets lourds.",
        
        "Affaires": "Connaissances de la pratique des affaires, et de la valeur monétaire des biens et des procédures, ce qui inclut la capacité de déterminer comment faire de l'argent avec une autre Compétence que le personnage possède.",
        "Contrefaçon": "Créer ou remarquer des données fausses ou altérées dans divers médias (papier, électronique, cartes de crédit, etc), ce qui inclut la falsification, bien que certaines tâches puissent requérir d'autres Compétences pour aider à détecter ou fabriquer les faux.",
        "Démolition": "Utiliser des explosifs pour obtenir des effets destructeurs.",
        "Électronique": "Utiliser et inventer (pas fabriquer) de l'équipement électronique ou mécanique complexe.",
        "Érudition": "Cette Compétence représente le savoir et/ou l'éducation dans des domaines non couverts par d'autres Compétences. Cette Compétence correspond à une culture générale, des connaissances larges.",
        "Informatique": "Programmer, utiliser des ordinateurs et manipuler des outils de communication.",
        "Langues": "Capacité à utiliser diverses formes de langages : lu, parlé, écrit ou non-verbal. Les personnages peuvent choisir leur langue maternelle dans laquelle ils s'expriment couramment.",
        "Médecine": "C'est l'utilisation des techniques de premiers secours ainsi que la compréhension et l'application des procédures médicales. Ceci comprend le diagnostic de maladies et la pratique de la chirurgie.",
        "Navigation": "Déterminer une trajectoire correcte en utilisant des points de référence extérieurs, comme les étoiles, les cartes, ou les points de repère. Cette Compétence comprend aussi la cartographie.",
        "Sécurité": "Installer, modifier et pirater la sécurité électronique et les systèmes de surveillance.",
        "Sciences occultes": "Connaissances des bases de diverses pratiques ésotériques : astrologie, kabbale, tarots, numérologie, etc.",
        
        "Art": "Créer des œuvres d'art en peinture, photographie, ainsi que musique ou littérature, etc.",
        "Camouflage": "Se cacher ou dissimuler des objets en utilisant des techniques de camouflage.",
        "Chercher": "Retrouver des objets ou des personnes dissimulées, effectuer des reconnaissances.",
        "Connaissance de la Rue": "Trouver des informations, des biens et des contacts dans un environnement urbain, tout particulièrement par le biais d'organisations criminelles, du marché noir, et autres opérations illégales. Cette Compétence permet également de déterminer des possibles motivations et techniques criminelles.",
        "Investigation": "Recueillir des informations, faire des recherches sur certains sujets, analyser des données, et faire le lien entre les indices.",
        "Jeux": "Jouer et/ou tricher aux jeux de stratégie et de hasard.",
        "Pister": "Suivre à la trace une autre personne, un animal, ou une créature, ou la filer sans se faire remarquer.",
        "Survie": "Savoir survivre dans un environnement sauvage, en pleine nature",
        
        "Charmer": "Utiliser une attitude amicale, la flatterie ou la séduction pour influencer une tierce personne. Cette Compétence est très utile dans les affaires ou les situations réclamant une certaine conduite ou étiquette.",
        "Commander": "Donner des ordres et coordonner les actions des autres de manière efficace dans une équipe.",
        "Déguisement": "Altérer ses traits ou/et ses vêtements pour qu'ils soient méconnaissables ou pour ressembler à quelqu'un d'autre. Très utile dans les performances d'acteur.",
        "Dressage": "Contrôler les animaux et leur faire faire des tours ou simplement suivre des ordres.",
        "Empathie": "C'est la Compétence qui permet d'identifier les ressentis, les émotions d'autrui. Cela ne signifie pas que le personnage les partage, mais il sera plus à même d'y réagir alors correctement.",
        "Escroquerie": "Mentir, bluffer, piéger ou tromper les autres, mais également savoir rester vague dans ses propos, fanfaronner, mal orienter. Très utile dans les performances d'acteur.",
        "Intimidation": "Utiliser la prestance physique, les menaces verbales, les moqueries, la torture ou la peur pour influencer autrui ou en obtenir des informations.",
        "Persuasion": "Influencer les autres ou en tirer des informations par des pots-de-vin, une discussion franche, un débat, de la diplomatie, ou des discours. Très utile dans les négociations, les transactions en affaires.",
        "Volonté": "Capacité de supporter le stress, la tentation, les tentatives d'interactions d'autres personnes, les attaques mentales et la douleur."
    }
};

// Fonction pour obtenir le nom de l'attribut à partir de l'ID
function getAttributeName(attrId) {
    return ZCORPS_DATA.attributes[attrId]?.name || attrId;
}

// Fonction pour obtenir la description d'une compétence
function getSkillDescription(skillName) {
    return ZCORPS_DATA.skillDescriptions[skillName] || "Description non disponible";
}

// Fonction pour obtenir l'attribut associé à une compétence
function getSkillAttribute(skillName) {
    for (const [attrId, skills] of Object.entries(ZCORPS_DATA.skills)) {
        if (skills.includes(skillName)) {
            return attrId;
        }
    }
    return null;
}

// Fonction pour obtenir toutes les compétences d'un attribut
function getSkillsByAttribute(attrId) {
    return ZCORPS_DATA.skills[attrId] || [];
}
