const dishes = [
  {id:'salmon',name:'香煎三文鱼藜麦碗',english:'PAN-SEARED SALMON & QUINOA',price:40,category:'main',label:'主厨推荐',image:'assets/salmon.jpg',short:'外酥里嫩的三文鱼，遇见谷物的朴实清香。',description:'把三文鱼的外皮煎至微脆，内里保留柔嫩口感。搭配细火煮熟的藜麦、当季蔬菜与自制柠檬酱汁，让每一口都有轻盈又丰盛的滋味。',ingredients:'主要食材：三文鱼、藜麦、时令蔬菜、柠檬。含鱼类。'},
  {id:'salad',name:'田园时蔬暖沙拉',english:'SEASONAL GARDEN SALAD',price:58,category:'light',label:'自然鲜选',image:'assets/salad.jpg',short:'一盘斑斓的田园，把整个季节尝一遍。',description:'让新鲜蔬菜成为餐桌的主角。烤至甜香的时蔬与清脆嫩叶相遇，加入谷物与牛油果，拌上清爽的油醋汁。简单的一盘，盛着季节的丰富层次。',ingredients:'主要食材：牛油果、嫩叶沙拉、时蔬、谷物、油醋汁。食材随季节调整。'},
  {id:'cake',name:'莓果巴斯克芝士蛋糕',english:'BERRY BASQUE CHEESECAKE',price:42,category:'sweet',label:'甜蜜时光',image:'assets/cake.jpg',short:'微焦的浓郁芝香，和一抹莓果的清甜。',description:'用耐心等待芝士在烤箱里慢慢成熟，焦香的表层下是绵密柔滑的内里。配上一勺莓果酱，酸甜适中，为这一餐留一个温柔的句点。',ingredients:'主要食材：奶油芝士、鸡蛋、奶油、莓果。含乳制品、蛋类与小麦。'},
  {id:'pasta',name:'森林蘑菇奶油意面',english:'WILD MUSHROOM CREAM PASTA',price:72,category:'main',label:'暖心主食',image:'assets/pasta.jpg',short:'慢炒蘑菇与柔滑奶油，把暖意缠进面里。',description:'将蘑菇的香气慢慢炒出，融入柔滑的奶油酱汁，再与保留弹性的意面充分拌匀。撒上芝士与香草，吃一口森林般温暖的鲜香。',ingredients:'主要食材：意面、蘑菇、奶油、帕尔马芝士、香草。含乳制品与小麦。'},
  {id:'toast',name:'牛油果乡村开放吐司',english:'AVOCADO SOURDOUGH TOAST',price:48,category:'light',label:'轻盈一餐',image:'assets/toast.jpg',short:'烘烤面包的香气，唤醒一整天的小确幸。',description:'乡村面包烤出薄脆的表层，铺上绵滑牛油果、鸡蛋和鲜蔬。几滴柠檬汁提亮口感，为不赶时间的一天准备刚刚好的轻食。',ingredients:'主要食材：乡村面包、牛油果、鸡蛋、鲜蔬、柠檬。含蛋类与小麦。'},
  {id:'pancake',name:'蜂蜜莓果松饼',english:'HONEY & BERRY PANCAKES',price:46,category:'sweet',label:'手作甜点',image:'assets/pancake.jpg',short:'松软叠起来，给午后多一点甜。',description:'现煎松饼带着淡淡黄油香，搭配莓果与蜂蜜。轻轻切下一角，让松软、酸甜和温暖在口中相遇，很适合与朋友慢慢分享。',ingredients:'主要食材：面粉、牛奶、鸡蛋、黄油、莓果、蜂蜜。含乳制品、蛋类与小麦。'}
];

const menuList = document.querySelector('#menu-list');
const filters = [...document.querySelectorAll('[data-filter]')];
let showAll = false;

function renderMenu(category = 'all') {
  const selected = category === 'all' ? (showAll ? dishes : dishes.slice(0, 3)) : dishes.filter(dish => dish.category === category);
  menuList.innerHTML = selected.map((dish, index) => `<article class="dish-card" style="animation-delay:${index * 45}ms"><button class="dish-image-button" data-dish="${dish.id}" aria-label="查看${dish.name}详情"><img src="${dish.image}" alt="${dish.name}" loading="lazy"><span class="dish-tag">${dish.label}</span><span class="dish-open" aria-hidden="true">↗</span></button><div class="dish-title-row"><h3>${dish.name}</h3><span class="dish-price"><small>¥</small>${dish.price}</span></div><p class="dish-description">${dish.short}</p><span class="dish-english">${dish.english}</span></article>`).join('');
  filters.forEach(button => { const active = button.dataset.filter === category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
}
filters.forEach(button => button.addEventListener('click', () => renderMenu(button.dataset.filter)));
document.querySelector('#full-menu').addEventListener('click', (event) => {
  showAll = !showAll;
  renderMenu('all');
  event.currentTarget.innerHTML = `${showAll ? '收起完整菜单' : '查看完整菜单'} <span>↗</span>`;
  document.querySelector('.filter span').textContent = showAll ? '06' : '03';
  if (showAll) document.querySelector('#menu-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeNavigation() { navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', '展开导航'); mobileNav.hidden = true; }
navToggle.addEventListener('click', () => { const open = navToggle.getAttribute('aria-expanded') !== 'true'; navToggle.setAttribute('aria-expanded', String(open)); navToggle.setAttribute('aria-label', open ? '关闭导航' : '展开导航'); mobileNav.hidden = !open; });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) closeNavigation(); });

const reservationDialog = document.querySelector('#reservation-dialog');
const form = document.querySelector('#reservation-form');
const success = document.querySelector('#reservation-success');
const bookingDate = document.querySelector('#booking-date');
function localDate(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function setDateLimits() { bookingDate.min = localDate(new Date()); const max = new Date(); max.setDate(max.getDate() + 60); bookingDate.max = localDate(max); }
function updateAvailableTimes() {
  setDateLimits();
  const now = new Date();
  const today = bookingDate.value === localDate(now);
  const time = form.elements.time;
  [...time.options].forEach(option => { if (!option.value) return; const [hour, minute] = option.value.split(':').map(Number); option.disabled = today && hour * 60 + minute <= now.getHours() * 60 + now.getMinutes(); });
  if (time.selectedOptions[0]?.disabled) time.value = '';
}
bookingDate.addEventListener('change', updateAvailableTimes);
function openReservation() { closeNavigation(); setDateLimits(); updateAvailableTimes(); reservationDialog.showModal(); }
document.querySelectorAll('[data-reserve]').forEach(button => button.addEventListener('click', openReservation));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  setDateLimits(); updateAvailableTimes();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  try { localStorage.setItem('qinghe-reservation', JSON.stringify(data)); } catch { form.querySelector('.form-note').textContent = '浏览器未允许本机存储，请允许存储后再保存。'; return; }
  document.querySelector('#reservation-summary').textContent = `${data.name} · ${data.date} ${data.time} · ${data.guests} 位`;
  form.hidden = true; success.hidden = false;
  success.querySelector('button').focus();
});
document.querySelector('#edit-reservation').addEventListener('click', () => { success.hidden = true; form.hidden = false; bookingDate.focus(); });
try {
  const saved = JSON.parse(localStorage.getItem('qinghe-reservation') || 'null');
  if (saved && typeof saved === 'object') Object.entries(saved).forEach(([key, value]) => { if (form.elements[key] && typeof value === 'string') form.elements[key].value = value; });
} catch { /* A new plan can still be created if local storage is unavailable. */ }
setDateLimits();

const dishDialog = document.querySelector('#dish-dialog');
menuList.addEventListener('click', event => {
  const button = event.target.closest('[data-dish]');
  if (!button) return;
  const dish = dishes.find(item => item.id === button.dataset.dish);
  const image = document.querySelector('#dish-detail-image'); image.src = dish.image; image.alt = dish.name;
  document.querySelector('#dish-detail-category').textContent = `${dish.label} / ${dish.english}`;
  document.querySelector('#dish-detail-name').textContent = dish.name;
  document.querySelector('#dish-detail-description').textContent = dish.description;
  document.querySelector('#dish-detail-ingredients').textContent = dish.ingredients;
  document.querySelector('#dish-detail-price').textContent = `¥ ${dish.price}`;
  dishDialog.showModal();
});
document.querySelector('#dish-reserve').addEventListener('click', () => { dishDialog.close(); openReservation(); });
document.querySelector('#year').textContent = new Date().getFullYear();
renderMenu();
