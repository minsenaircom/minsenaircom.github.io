let currentCategory = 'all';

function filterProducts() {
  const search = document.getElementById('prodSearch').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.prod-card');
  let visible = 0;
  cards.forEach(c => {
    const matchCat = currentCategory === 'all' || c.dataset.cat === currentCategory;
    const matchSearch = !search || c.dataset.name.includes(search) || c.querySelector('h4').textContent.toLowerCase().includes(search) || c.querySelector('p').textContent.toLowerCase().includes(search);
    c.style.display = (matchCat && matchSearch) ? '' : 'none';
    if (matchCat && matchSearch) visible++;
  });
  document.getElementById('prodCount').textContent = 'Showing ' + visible + ' product' + (visible !== 1 ? 's' : '');
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.prod-cat-btns button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

window.addEventListener('scroll', function() {
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
});
