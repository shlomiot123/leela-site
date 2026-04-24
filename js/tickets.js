// ═══════════════════════════════════════════════════════
//  Ticket Purchase + Credit Card UI
// ═══════════════════════════════════════════════════════

function openTicketModal(eventId, eventTitle, price) {
  const modal = document.getElementById('ticket-modal');
  if (!modal) return;

  document.getElementById('ticket-event-title').textContent = eventTitle;
  document.getElementById('ticket-price').textContent = `₪${price}`;
  document.getElementById('ticket-event-id').value = eventId;
  document.getElementById('ticket-total').textContent = `₪${price}`;
  document.getElementById('ticket-qty').value = 1;
  updateTotal(price);

  modal.classList.add('open');
  resetForm();
}

function closeTicketModal() {
  document.getElementById('ticket-modal')?.classList.remove('open');
}

function updateTotal(basePrice) {
  const qty = parseInt(document.getElementById('ticket-qty')?.value || 1);
  const total = basePrice * qty;
  document.getElementById('ticket-total').textContent = `₪${total}`;
  updateCardDisplay();
}

function updateCardDisplay() {
  const num = document.getElementById('cc-num')?.value || '';
  const name = document.getElementById('cc-name')?.value || '';
  const expiry = document.getElementById('cc-expiry')?.value || '';

  const displayNum = (num.replace(/\D/g, '') + '0000000000000000').slice(0, 16);
  const formatted = displayNum.replace(/(.{4})/g, '$1 ').trim();
  const cardNum = document.getElementById('card-display-num');
  if (cardNum) cardNum.textContent = formatted;

  const cardName = document.getElementById('card-display-name');
  if (cardName) cardName.textContent = name || 'שם בעל הכרטיס';

  const cardExp = document.getElementById('card-display-exp');
  if (cardExp) cardExp.textContent = expiry || 'MM/YY';
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  val = val.replace(/(.{4})/g, '$1 ').trim();
  input.value = val;
  updateCardDisplay();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 4);
  if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
  input.value = val;
  updateCardDisplay();
}

function detectCardBrand(num) {
  const n = num.replace(/\s/g, '');
  if (/^4/.test(n)) return 'Visa';
  if (/^5[1-5]/.test(n)) return 'MasterCard';
  if (/^3[47]/.test(n)) return 'Amex';
  return '';
}

function resetForm() {
  const form = document.getElementById('ticket-form');
  if (form) form.reset();
  updateCardDisplay();
  document.getElementById('payment-success')?.classList.add('hidden');
  document.getElementById('payment-form-wrap')?.classList.remove('hidden');
}

function submitTicketForm(e) {
  e.preventDefault();

  const btn = document.getElementById('pay-btn');
  const originalText = btn.textContent;
  btn.textContent = 'מעבד תשלום...';
  btn.disabled = true;

  // Simulate payment processing (2 seconds)
  setTimeout(() => {
    document.getElementById('payment-form-wrap').classList.add('hidden');
    document.getElementById('payment-success').classList.remove('hidden');
    btn.disabled = false;
    btn.textContent = originalText;

    // Confetti
    launchConfetti();
  }, 2000);
}

function launchConfetti() {
  const colors = ['#7B9E87', '#C4A882', '#D4B896', '#F7F3EE', '#3D3530'];
  const modal = document.querySelector('.modal-box');
  if (!modal) return;
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed; width:8px; height:8px; border-radius:50%;
      background:${colors[i % colors.length]};
      top:${40 + Math.random() * 30}%; left:${20 + Math.random() * 60}%;
      pointer-events:none; z-index:9999;
      animation: confettiFall ${0.8 + Math.random()}s ${Math.random() * 0.5}s ease-out forwards;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 2000);
  }
}

// Inject confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0); opacity: 1; }
    100% { transform: translateY(120px) rotate(${Math.random() * 360}deg); opacity: 0; }
  }
  .hidden { display: none !important; }
`;
document.head.appendChild(confettiStyle);

// Ticket modal HTML — injected once
function injectTicketModal() {
  if (document.getElementById('ticket-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'ticket-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box" style="position:relative">
      <button class="modal-close" onclick="closeTicketModal()">×</button>

      <div style="margin-bottom:24px">
        <div class="section-label" style="margin-bottom:4px">רכישת כרטיס</div>
        <h3 style="font-size:1.5rem;color:var(--brown)" id="ticket-event-title"></h3>
        <div style="font-size:0.9rem;color:var(--brown-l);margin-top:4px">
          מחיר: <strong id="ticket-price"></strong>
        </div>
      </div>

      <input type="hidden" id="ticket-event-id" />

      <!-- Success State -->
      <div id="payment-success" class="hidden" style="text-align:center;padding:40px 20px">
        <div style="font-size:3rem;margin-bottom:16px">🌸</div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--sage);margin-bottom:12px">הרשמתך התקבלה!</h3>
        <p style="color:var(--brown-l);font-size:0.95rem;line-height:1.8;margin-bottom:24px">
          אישור ישלח לכתובת המייל שלך.<br/>נשמח לפגוש אותך בלילא ✦
        </p>
        <button class="btn-primary" onclick="closeTicketModal()">חזרה לאתר</button>
      </div>

      <!-- Form -->
      <div id="payment-form-wrap">
        <!-- Credit Card Visual -->
        <div class="cc-visual">
          <div class="cc-chip"></div>
          <div class="cc-number" id="card-display-num">0000 0000 0000 0000</div>
          <div class="cc-bottom">
            <div>
              <div class="cc-label">שם בעל הכרטיס</div>
              <div class="cc-value" id="card-display-name">שם בעל הכרטיס</div>
            </div>
            <div>
              <div class="cc-label">תוקף</div>
              <div class="cc-value" id="card-display-exp">MM/YY</div>
            </div>
            <div class="cc-brand" id="card-brand"></div>
          </div>
        </div>

        <form id="ticket-form" onsubmit="submitTicketForm(event)">
          <!-- Quantity -->
          <div class="form-group">
            <label class="form-label">מספר כרטיסים</label>
            <div style="display:flex;align-items:center;gap:12px">
              <button type="button" onclick="changeQty(-1)" style="width:36px;height:36px;border-radius:50%;border:1px solid var(--tan);font-size:1.2rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s" onmouseover="this.style.background='var(--sage)';this.style.color='white';this.style.borderColor='var(--sage)'" onmouseout="this.style.background='';this.style.color='';this.style.borderColor='var(--tan)'">−</button>
              <input type="number" id="ticket-qty" class="form-input" value="1" min="1" max="10" style="width:80px;text-align:center" oninput="updateTotal(currentEventPrice)" />
              <button type="button" onclick="changeQty(1)" style="width:36px;height:36px;border-radius:50%;border:1px solid var(--tan);font-size:1.2rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s" onmouseover="this.style.background='var(--sage)';this.style.color='white';this.style.borderColor='var(--sage)'" onmouseout="this.style.background='';this.style.color='';this.style.borderColor='var(--tan)'">+</button>
              <span style="font-size:0.9rem;color:var(--brown-l)">סה"כ: <strong style="color:var(--brown)" id="ticket-total"></strong></span>
            </div>
          </div>

          <!-- Cardholder -->
          <div class="form-group">
            <label class="form-label">שם בעל הכרטיס</label>
            <input type="text" id="cc-name" class="form-input" placeholder="ישראל ישראלי" required
                   oninput="updateCardDisplay()" autocomplete="cc-name"/>
          </div>

          <!-- Card Number -->
          <div class="form-group">
            <label class="form-label">מספר כרטיס</label>
            <input type="text" id="cc-num" class="form-input" placeholder="0000 0000 0000 0000"
                   inputmode="numeric" maxlength="19" required
                   oninput="formatCardNumber(this); document.getElementById('card-brand').textContent=detectCardBrand(this.value)"
                   autocomplete="cc-number" dir="ltr" style="text-align:left;letter-spacing:0.15em"/>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label">תוקף</label>
              <input type="text" id="cc-expiry" class="form-input" placeholder="MM/YY"
                     inputmode="numeric" maxlength="5" required
                     oninput="formatExpiry(this)" autocomplete="cc-exp" dir="ltr" style="text-align:left"/>
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input type="text" id="cc-cvv" class="form-input" placeholder="123"
                     inputmode="numeric" maxlength="4" required autocomplete="cc-csc"
                     dir="ltr" style="text-align:left"/>
            </div>
          </div>

          <!-- Contact -->
          <div class="form-group">
            <label class="form-label">שם מלא</label>
            <input type="text" class="form-input" placeholder="שמך המלא" required autocomplete="name"/>
          </div>
          <div class="form-group">
            <label class="form-label">מייל לאישור</label>
            <input type="email" class="form-input" placeholder="your@email.com" required autocomplete="email" dir="ltr" style="text-align:left"/>
          </div>
          <div class="form-group">
            <label class="form-label">טלפון</label>
            <input type="tel" class="form-input" placeholder="05X-XXXXXXX" autocomplete="tel" dir="ltr" style="text-align:left"/>
          </div>

          <div style="margin-top:8px;margin-bottom:16px;font-size:0.75rem;color:var(--brown-xl);text-align:center;line-height:1.6">
            🔒 תשלום מאובטח ומוצפן | SSL 256-bit<br/>
            <span style="color:var(--sage)">⚡ זהו ממשק הדגמה — לא מתבצעת עסקה אמיתית</span>
          </div>

          <button type="submit" class="btn-primary" id="pay-btn" style="width:100%;padding:16px;font-size:1rem;border-radius:12px">
            לתשלום ←
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close on overlay click
  modal.addEventListener('click', e => {
    if (e.target === modal) closeTicketModal();
  });
}

let currentEventPrice = 0;
function changeQty(delta) {
  const q = document.getElementById('ticket-qty');
  if (!q) return;
  let val = parseInt(q.value) + delta;
  val = Math.max(1, Math.min(10, val));
  q.value = val;
  updateTotal(currentEventPrice);
}

// Override openTicketModal to track price
const _openTicket = openTicketModal;
window.openTicketModal = function(id, title, price) {
  currentEventPrice = price;
  _openTicket(id, title, price);
};

document.addEventListener('DOMContentLoaded', injectTicketModal);
