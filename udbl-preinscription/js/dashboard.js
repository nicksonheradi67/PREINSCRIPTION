/**
 * ═══════════════════════════════════════════
 * UDBL PreInscription — Dashboard Module
 * Gère les interactions du tableau de bord
 * ═══════════════════════════════════════════
 */

/**
 * Initialise le dashboard au chargement de la page
 */
document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
});

/**
 * Initialise les animations au scroll
 */
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.anim-fade-up, .anim-slide-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Met à jour les statistiques du dashboard
 * @param {Object} stats - Nouvelles statistiques
 */
function updateDashboardStats(stats) {
  const statElements = {
    total: document.querySelector('.stat-num span:first-child'),
    validated: document.querySelectorAll('.stat-num')[1],
    pending: document.querySelectorAll('.stat-num')[2],
    notifications: document.querySelectorAll('.stat-num')[3]
  };

  if (stats.total !== undefined && statElements.total) {
    statElements.total.textContent = stats.total;
  }

  if (stats.validated !== undefined && statElements.validated) {
    statElements.validated.querySelector('span').textContent = stats.validated;
  }

  if (stats.pending !== undefined && statElements.pending) {
    statElements.pending.querySelector('span').textContent = stats.pending;
  }

  if (stats.notifications !== undefined && statElements.notifications) {
    statElements.notifications.querySelector('span').textContent = stats.notifications;
  }
}

/**
 * Ajoute une nouvelle activité à la liste
 * @param {Object} activity - Données de l'activité
 */
function addActivity(activity) {
  const activityList = document.querySelector('.activity-list');
  if (!activityList) return;

  const activityItem = document.createElement('div');
  activityItem.className = 'activity-item';
  activityItem.innerHTML = `
    <div class="activity-icon">
      ${activity.icon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>'}
    </div>
    <div class="activity-content">
      <p>${activity.content}</p>
      <span class="activity-time">${activity.time || 'À l\'instant'}</span>
    </div>
  `;

  // Insérer au début de la liste
  activityList.insertBefore(activityItem, activityList.firstChild);

  // Animation d'entrée
  setTimeout(() => {
    activityItem.classList.add('anim-fade-up');
  }, 100);
}

/**
 * Met à jour le statut d'une candidature
 * @param {string} candidatureId - ID de la candidature
 * @param {string} newStatus - Nouveau statut
 */
function updateCandidatureStatus(candidatureId, newStatus) {
  const candidatureCard = document.querySelector(`[data-candidature-id="${candidatureId}"]`);
  if (!candidatureCard) return;

  const statusElement = candidatureCard.querySelector('.candidature-status');
  if (!statusElement) return;

  // Supprimer les classes de statut existantes
  statusElement.classList.remove('status-validated', 'status-pending');

  // Ajouter la nouvelle classe de statut
  statusElement.classList.add(`status-${newStatus}`);

  // Mettre à jour le texte du statut
  const statusTexts = {
    validated: 'Dossier validé',
    pending: 'En attente de documents'
  };

  const statusText = statusElement.querySelector('span:last-child');
  if (statusText && statusTexts[newStatus]) {
    statusText.textContent = statusTexts[newStatus];
  }
}

// Exposer les fonctions globales nécessaires
window.updateDashboardStats = updateDashboardStats;
window.addActivity = addActivity;
window.updateCandidatureStatus = updateCandidatureStatus;