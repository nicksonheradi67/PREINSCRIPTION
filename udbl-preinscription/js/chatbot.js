/**
 * ═══════════════════════════════════════════
 * UDBL PreInscription — Chatbot Module
 * Gère les interactions du widget chatbot
 * ═══════════════════════════════════════════
 */

/** Base de connaissances du chatbot */
const CHATBOT_KB = {
  salutations: {
    keywords: ['bonjour', 'bonsoir', 'hey', 'salut'],
    response: 'Bonjour !<br><br>Comment puis-je vous aider?'
  },
  filières: {
    keywords: ['filière', 'programme', 'cours', 'département', 'spécialité', 'discipline'],
    response: `L'UDBL propose 4 grandes filières :<br><br>
      📚 <strong>Gestion &amp; Ingénierie Financières</strong><br>
      💻 <strong>Sciences Informatiques</strong><br>
      🌍 <strong>Sciences de l'Homme &amp; Société</strong><br>
      ✝️ <strong>Théologie</strong><br><br>
      Souhaitez-vous des détails sur l'une d'elles ?`
  },
  documents: {
    keywords: ['document', 'pièce', 'fichier', 'dossier', 'requis', 'nécessaire', 'apporter'],
    response: `📎 Voici les documents requis :<br><br>
      • Copie du baccalauréat (ou équivalent)<br>
      • Photo d'identité récente<br>
      • Photocopie de la carte d'identité<br>
      • Lettre de motivation (optionnelle)<br><br>
      <em>Formats acceptés : PDF ou JPEG, max 5 Mo par fichier.</em>`
  },
  frais: {
    keywords: ['frais', 'coût', 'prix', 'payer', 'argent', 'montant', 'tarif', 'inscription'],
    response: `💰 Pour connaître les frais exacts d'inscription, veuillez contacter directement le bureau des inscriptions de l'UDBL.<br><br>
      📞 Bureau des inscriptions : disponible en semaine<br>
      🌐 www.udbl.ac.cd`
  },
  dates: {
    keywords: ['date', 'délai', 'limite', 'quand', 'période', 'calendrier', 'deadline'],
    response: `📅 Les dates importantes pour l'année 2025/2026 :<br><br>
      • Ouverture des pré-inscriptions : en cours<br>
      • Clôture des dossiers : à confirmer<br>
      • Résultats d'admission : après examen des dossiers<br><br>
      Activez les notifications pour ne rien manquer !`
  },
  clubs: {
    keywords: ['club', 'activité', 'sport', 'vie', 'campus', 'association', 'étudiant'],
    response: `🏫 L'UDBL propose plusieurs clubs et activités :<br><br>
      🎭 ESPACE ESIS<br>
      ⚽ INCREA<br>
      💡 TECHNET<br>
      📖 FLASHLIGHTS<br><br>
      La vie universitaire est riche à l'UDBL !`
  },
  contact: {
    keywords: ['contact', 'téléphone', 'email', 'adresse', 'joindre', 'appeler'],
    response: `📞 Pour nous contacter :<br><br>
      🏛️ Bureau des inscriptions — UDBL<br>
      📍 Lubumbashi, Haut-Katanga, RDC<br>
      🌐 www.udbl.ac.cd<br><br>
      Notre équipe est disponible en semaine de 8h à 16h.`
  }
};

/** Réponse par défaut si aucun mot-clé ne correspond */
const DEFAULT_RESPONSE = `je n'ai pas bien compris votre question. 
  Vous pouvez me demander des informations sur :<br>
  • Les <strong>filières</strong> disponibles<br>
  • Les <strong>documents</strong> requis<br>
  • Les <strong>frais</strong> d'inscription<br>
  • Les <strong>dates</strong> importantes<br>
  • Les <strong>clubs</strong> universitaires`;

/**
 * Trouve la réponse correspondant à un message utilisateur
 * @param {string} message - Message de l'utilisateur
 * @returns {string} - Réponse du chatbot
 */
function findResponse(message) {
  const lower = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const [, entry] of Object.entries(CHATBOT_KB)) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.response;
    }
  }

  return DEFAULT_RESPONSE;
}

/**
 * Ajoute un message dans la fenêtre de chat
 * @param {string} content   - Contenu HTML du message
 * @param {'bot'|'user'} who - Expéditeur
 */
function appendMessage(content, who) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `msg msg-${who}`;
  div.innerHTML = content;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/**
 * Simule la réponse du bot avec un délai (effet de frappe)
 * @param {string} userMessage
 */
function handleUserMessage(userMessage) {
  const trimmed = userMessage.trim();
  if (!trimmed) return;

  appendMessage(trimmed, 'user');

  // Indicateur "en train d'écrire"
  const typing = document.createElement('div');
  typing.className = 'msg msg-bot';
  typing.id = 'typing-indicator';
  typing.innerHTML = '<em>⏳ En train d\'écrire…</em>';
  document.getElementById('chat-messages').appendChild(typing);

  setTimeout(() => {
    typing.remove();
    appendMessage(findResponse(trimmed), 'bot');
  }, 700);
}

/** Initialise les listeners du widget chatbot */
function initChatbot() {
  const input   = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const suggestions = document.querySelectorAll('.suggestion');

  if (!input || !sendBtn) return;

  // Envoi via bouton
  sendBtn.addEventListener('click', () => {
    handleUserMessage(input.value);
    input.value = '';
  });

  // Envoi via touche Entrée
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleUserMessage(input.value);
      input.value = '';
    }
  });

  // Suggestions rapides
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      handleUserMessage(btn.dataset.query || btn.textContent.trim());
    });
  });
}

// Démarrage automatique
document.addEventListener('DOMContentLoaded', initChatbot);
