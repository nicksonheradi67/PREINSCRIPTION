/**
 * ═══════════════════════════════════════════
 * UDBL PreInscription — Formulaire Module
 * Validation et soumission du formulaire
 * ═══════════════════════════════════════════
 */

/** Règles de validation des champs */
const VALIDATION_RULES = {
  nom:           { required: true, minLength: 2, label: 'Nom' },
  postnom:       { required: true, minLength: 2, label: 'Post-nom & Prénom' },
  email:         { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, label: 'Email' },
  telephone:     { required: true, minLength: 8, label: 'Téléphone' },
  filiere:       { required: true, label: 'Filière' },
  etablissement: { required: true, minLength: 3, label: 'Établissement' }
};

/**
 * Valide un champ individuel
 * @param {HTMLElement} field
 * @param {object} rules
 * @returns {{ valid: boolean, error: string|null }}
 */
function validateField(field, rules) {
  const value = field.value.trim();

  if (rules.required && !value) {
    return { valid: false, error: `${rules.label} est obligatoire.` };
  }

  if (rules.minLength && value.length < rules.minLength) {
    return { valid: false, error: `${rules.label} doit contenir au moins ${rules.minLength} caractères.` };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return { valid: false, error: `Format de ${rules.label} invalide.` };
  }

  return { valid: true, error: null };
}

/**
 * Affiche ou efface une erreur sur un champ
 */
function setFieldError(field, message) {
  const group = field.closest('.form-group');
  if (!group) return;

  // Supprimer erreur existante
  group.querySelector('.field-error')?.remove();
  field.style.borderColor = '';

  if (message) {
    field.style.borderColor = '#e05252';
    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#e05252;font-size:11.5px;margin-top:2px;';
    err.textContent = message;
    group.appendChild(err);
  }
}

/**
 * Valide tout le formulaire
 * @returns {boolean} - true si tous les champs sont valides
 */
function validateForm() {
  let isValid = true;

  Object.entries(VALIDATION_RULES).forEach(([fieldId, rules]) => {
    const field = document.getElementById(`field-${fieldId}`);
    if (!field) return;

    const { valid, error } = validateField(field, rules);
    setFieldError(field, error);
    if (!valid) isValid = false;
  });

  return isValid;
}

/**
 * Collecte les données du formulaire
 * @returns {object}
 */
function collectFormData() {
  return {
    nom:           document.getElementById('field-nom')?.value.trim(),
    postnom:       document.getElementById('field-postnom')?.value.trim(),
    email:         document.getElementById('field-email')?.value.trim(),
    telephone:     document.getElementById('field-telephone')?.value.trim(),
    filiere:       document.getElementById('field-filiere')?.value,
    etablissement: document.getElementById('field-etablissement')?.value.trim(),
    soumisLe:      new Date().toISOString()
  };
}

/**
 * Affiche le message de succès après soumission
 */
function showSuccess() {
  const formEl    = document.getElementById('preinscription-form');
  const successEl = document.getElementById('form-success');
  if (formEl)    formEl.style.display    = 'none';
  if (successEl) successEl.classList.add('visible');
}

/**
 * Gère la soumission du formulaire
 * @param {Event} e
 */
async function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  const submitBtn = document.getElementById('form-submit-btn');
  if (submitBtn) {
    submitBtn.textContent = '⏳ Envoi en cours…';
    submitBtn.disabled    = true;
  }

  const data = collectFormData();

  // TODO : remplacer par un vrai appel API
  // await fetch('/api/preinscription', { method:'POST', body:JSON.stringify(data) });
  console.log('📋 Données soumises :', data);

  // Simulation délai réseau
  await new Promise(r => setTimeout(r, 1200));

  showSuccess();
}

/** Initialise le formulaire */
function initForm() {
  const form = document.getElementById('preinscription-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Validation en temps réel (on blur)
  Object.entries(VALIDATION_RULES).forEach(([fieldId, rules]) => {
    const field = document.getElementById(`field-${fieldId}`);
    if (!field) return;
    field.addEventListener('blur', () => {
      const { error } = validateField(field, rules);
      setFieldError(field, error);
    });
    // Efface l'erreur dès que l'utilisateur retape
    field.addEventListener('input', () => setFieldError(field, null));
  });
}

document.addEventListener('DOMContentLoaded', initForm);
