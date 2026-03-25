/**
 * Journal Club Hub — Feedback & Request Submission
 * Posts to Formsubmit.co → emails troyfowlermd@gmail.com (CC troy.fowler@dhhs.nc.gov)
 */
(function() {
  'use strict';

  var FORMSUBMIT_URL = 'https://formsubmit.co/ajax/troyfowlermd@gmail.com';

  /* --- Generic Feedback Form Handler --- */
  window.submitFeedback = function(event) {
    event.preventDefault();

    var form = event.target;
    var nameInput = form.querySelector('[name="name"]');
    var commentInput = form.querySelector('[name="comment"]');
    var submitBtn = form.querySelector('.feedback-submit');
    var successEl = form.parentElement.querySelector('.feedback-success') || form.nextElementSibling;

    var nameVal = nameInput ? nameInput.value.trim() : '';
    var commentVal = commentInput ? commentInput.value.trim() : '';
    if (!nameVal || !commentVal) return;

    var pageName = document.title || window.location.pathname;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending\u2026';
    }

    var formData = new FormData();
    formData.append('name', nameVal);
    formData.append('comment', commentVal);
    formData.append('page', pageName);
    formData.append('timestamp', new Date().toISOString());
    formData.append('_subject', 'Journal Club Feedback: ' + pageName);
    formData.append('_cc', 'troy.fowler@dhhs.nc.gov');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    fetch(FORMSUBMIT_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(r) { if (!r.ok) throw new Error('Network error'); return r.json(); })
    .then(function() { showSuccess(form, successEl); })
    .catch(function() { showSuccess(form, successEl); })
    .finally(function() {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit'; }
    });
  };

  /* --- +Request Button Handler --- */
  window.submitRequest = function(btn) {
    var card = btn.closest('.idea-card');
    if (!card) return;

    var titleEl = card.querySelector('.idea-title');
    var sourceEl = card.querySelector('.idea-source');
    var articleTitle = titleEl ? titleEl.textContent.trim() : 'Unknown article';
    var articleSource = sourceEl ? sourceEl.textContent.trim() : '';

    btn.disabled = true;
    btn.textContent = 'Sending\u2026';

    var formData = new FormData();
    formData.append('request_type', 'Journal Club Article Request');
    formData.append('article_title', articleTitle);
    formData.append('article_source', articleSource);
    formData.append('page', document.title || window.location.pathname);
    formData.append('timestamp', new Date().toISOString());
    formData.append('_subject', 'JC Request: ' + articleTitle);
    formData.append('_cc', 'troy.fowler@dhhs.nc.gov');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    fetch(FORMSUBMIT_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(r) { if (!r.ok) throw new Error('Network error'); return r.json(); })
    .then(function() { showRequestSuccess(btn); })
    .catch(function() { showRequestSuccess(btn); })
    .finally(function() {
      // Don't re-enable — keep as "Requested" state
    });
  };

  function showSuccess(form, successEl) {
    form.reset();
    if (successEl) {
      successEl.classList.add('visible');
      setTimeout(function() { successEl.classList.remove('visible'); }, 5000);
    }
  }

  function showRequestSuccess(btn) {
    btn.textContent = '\u2713 Requested';
    btn.classList.add('requested');
    btn.disabled = true;
  }
})();
