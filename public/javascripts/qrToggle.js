function toggleManual(showManual) {
    const qrSection = document.getElementById('qr-section');
    const manualSection = document.getElementById('manual-section');
    const toggleButton = document.getElementById('toggleToManual');
  
    if (qrSection && manualSection) {
      qrSection.style.display = showManual ? 'none' : 'block';
      manualSection.style.display = showManual ? 'block' : 'none';
    }
  
    if (toggleButton) {
      toggleButton.style.display = showManual ? 'none' : 'inline-block';
    }
  }
  
  
  function copySecret() {
    const codeInput = document.getElementById('secretCode');
    if (!codeInput) return;
  
    const code = codeInput.value;
  
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(() => {
        showCopyToast();
      }).catch(() => {
        fallbackCopy(codeInput);
      });
    } else {
      fallbackCopy(codeInput);
    }
  }
  
  function fallbackCopy(input) {
    input.select();
    input.setSelectionRange(0, 99999);
    const success = document.execCommand('copy');
    if (success) {
      showCopyToast();
    } else {
      alert('Could not copy code. Please copy manually.');
    }
  }
  
  function showCopyToast() {
    const toastEl = document.getElementById('copyToast');
    if (!toastEl) return;
  
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      toggleManual(true);
    }
  });
  