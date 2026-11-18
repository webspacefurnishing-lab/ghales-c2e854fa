const contactDialog = document.querySelector('#contact-dialog');
const feedback = document.querySelector('.copy-feedback');
let lastTrigger;
document.querySelectorAll('[data-contact]').forEach(button => {
  button.addEventListener('click', () => {
    lastTrigger = button;
    document.querySelector('#contact-topic').textContent = button.dataset.contact;
    feedback.textContent = '';
    contactDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', event => {
  if (event.target === contactDialog) {
    const bounds = contactDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) contactDialog.close();
  }
});
contactDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (lastTrigger) lastTrigger.focus();
});
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      feedback.textContent = 'Copied: ' + value;
    } catch {
      const text = button.parentElement.querySelector('strong');
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'Contact detail selected. Use your device copy command to copy it.';
    }
  });
});
