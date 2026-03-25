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

  /* --- +Request Button Handler ---
   * First click: opens an inline text field below the button.
   * "Send" button in the field: submits the request with optional message. */
  window.submitRequest = function(btn) {
    var card = btn.closest('.idea-card');
    if (!card) return;

    // If field already open, close it
    var existing = card.querySelector('.request-field');
    if (existing) {
      existing.remove();
      return;
    }

    var titleEl = card.querySelector('.idea-title');
    var sourceEl = card.querySelector('.idea-source');
    var articleTitle = titleEl ? titleEl.textContent.trim() : 'Unknown article';
    var articleSource = sourceEl ? sourceEl.textContent.trim() : '';

    // Build inline form
    var wrapper = document.createElement('div');
    wrapper.className = 'request-field';

    var textarea = document.createElement('textarea');
    textarea.className = 'request-textarea';
    textarea.placeholder = 'Add a note (optional)\u2026';
    textarea.rows = 2;

    var actions = document.createElement('div');
    actions.className = 'request-actions';

    var sendBtn = document.createElement('button');
    sendBtn.className = 'request-send';
    sendBtn.textContent = 'Send Request';

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'request-cancel';
    cancelBtn.textContent = 'Cancel';

    actions.appendChild(sendBtn);
    actions.appendChild(cancelBtn);
    wrapper.appendChild(textarea);
    wrapper.appendChild(actions);

    // Insert after the idea-footer
    var footer = card.querySelector('.idea-footer');
    if (footer) {
      footer.insertAdjacentElement('afterend', wrapper);
    } else {
      card.appendChild(wrapper);
    }

    textarea.focus();

    cancelBtn.addEventListener('click', function() {
      wrapper.remove();
    });

    sendBtn.addEventListener('click', function() {
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending\u2026';

      var message = textarea.value.trim();

      var formData = new FormData();
      formData.append('request_type', 'Journal Club Article Request');
      formData.append('article_title', articleTitle);
      formData.append('article_source', articleSource);
      if (message) formData.append('message', message);
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
      .then(function() { showRequestSuccess(btn, wrapper); })
      .catch(function() { showRequestSuccess(btn, wrapper); });
    });
  };

  function showSuccess(form, successEl) {
    form.reset();
    if (successEl) {
      successEl.classList.add('visible');
      setTimeout(function() { successEl.classList.remove('visible'); }, 5000);
    }
  }

  function showRequestSuccess(btn, fieldWrapper) {
    if (fieldWrapper) fieldWrapper.remove();
    btn.innerHTML = '\u2713 Requested';
    btn.classList.add('requested');
    btn.disabled = true;
  }
})();
