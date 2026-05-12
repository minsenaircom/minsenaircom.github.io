let currentCategory = 'all';

function filterProducts() {
  var search = document.getElementById('prodSearch').value.toLowerCase().trim();
  var cards = document.querySelectorAll('.prod-card');
  var visible = 0;
  cards.forEach(function(c) {
    var matchCat = currentCategory === 'all' || c.dataset.cat === currentCategory;
    var matchSearch = !search || c.dataset.name.includes(search) || c.querySelector('h4').textContent.toLowerCase().includes(search) || c.querySelector('p').textContent.toLowerCase().includes(search);
    c.style.display = (matchCat && matchSearch) ? '' : 'none';
    if (matchCat && matchSearch) visible++;
  });
  document.getElementById('prodCount').textContent = 'Showing ' + visible + ' product' + (visible !== 1 ? 's' : '');
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.prod-cat-btns button').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  filterProducts();
}

// FAQ toggle
function toggleFaq(el) {
  var item = el.closest('.faq-item');
  var allItems = document.querySelectorAll('.faq-item');
  // Close others
  allItems.forEach(function(i) {
    if (i !== item) i.classList.remove('open');
  });
  item.classList.toggle('open');
}

// Quote button — scroll to contact form, prefill product name
function requestQuote(productName) {
  var contactSection = document.getElementById('contact');
  if (contactSection) {
    var msgField = contactSection.querySelector('textarea[name="message"]');
    if (msgField) {
      msgField.value = 'Hi, I am interested in: ' + productName + '.\n\nPlease send me the spec sheet and pricing.\n\nTarget market:\nEstimated quantity:';
    }
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(function() {
      if (msgField) msgField.focus();
    }, 600);
  }
}

// Back-to-top show/hide
window.addEventListener('scroll', function() {
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
});
