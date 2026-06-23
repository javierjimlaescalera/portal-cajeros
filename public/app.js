// --- CONSTANTS & FALLBACK DATA ---
const DEFAULT_CONTENT = {
  "brandName": "LA ESCALERA S. A. S.",
  "version": 2,
  "welcomeTitle": "Portal de Ayuda para Cajeros",
  "welcomeSubtitle": "Tu guía rápida de consulta diaria para DUX y operaciones de caja.",
  "sections": {
    "apertura": {
      "title": "Apertura de Caja",
      "icon": "📥",
      "alertText": "Antes de realizar cualquier venta, es estrictamente obligatorio registrar la apertura en el sistema.",
      "steps": [
        "En el menú lateral de DUX, navegá a: <strong class='route'>Tesorería ➔ Caja Diaria ➔ Apertura de Caja</strong>.",
        "Hacé clic directamente en el botón <strong class='action-btn'>Guardar</strong>.",
        "¡Listo! El sistema ya queda habilitado para registrar transacciones."
      ],
      "checklist": [
        "Verificar que la lectora de barras esté conectada y tenga luz roja.",
        "Controlar que la ticketera tenga rollo de papel cargado (y tener repuestos a mano).",
        "Asegurarse de que el cajón de dinero abre correctamente y tenga los $30.000 fijos de cambio."
      ]
    },
    "cobrar": {
      "title": "Cómo Cobrar",
      "icon": "💰",
      "alertText": "Seguí los pasos en el mostrador para evitar descuadres en los cierres de caja.",
      "shortcuts": [
        "Acceso Rápido 1: Marcador guardado de <strong>Punto de Venta POS</strong> en la barra de marcadores de Chrome.",
        "Acceso Rápido 2: Desde el menú de DUX: <strong>Facturación ➔ Pto. de Venta POS</strong>."
      ],
      "steps": [
        "<strong>1. Buscar y cargar los productos:</strong><br>• <em>Con lectora:</em> Hacé clic en el ícono del Código de barras [█] y pasá el lector por el artículo.<br>• <em>Búsqueda manual:</em> Hacé clic en el ícono de la Lupa [🔍] y escribí el nombre o palabras clave.",
        "<strong>2. Seleccionar el tipo de comprobante (Obligatorio):</strong><br>• Seleccioná <span class='badge badge-success'>COMPROBANTE DE VENTA</span> si pagan con: <strong>Efectivo</strong>.<br>• Seleccioná <span class='badge badge-info'>FACTURA</span> si pagan con: <strong>Tarjetas (Débito o Crédito), Transferencias o Go Cuotas</strong>.",
        "<strong>3. Procesar el cobro:</strong><br>• Hacé clic en el botón verde <strong class='action-btn success'>VENDER</strong>.<br>• Seleccioná el <strong>Medio de pago</strong> que corresponda en la lista.<br>• <em>Si es Efectivo:</em> Completá con el valor exacto del billete con el que te pagan para que el sistema calcule el vuelto.<br>• <em>Si es Combinado:</em> Seleccioná <strong class='action-btn'>COMBINADO</strong> y cargá los importes exactos de cada método (ej: efectivo + transferencia).<br>• Hacé clic en <strong class='action-btn success'>COBRAR</strong>.",
        "<strong>4. Finalizar la operación:</strong><br>• Si el cliente lo solicita, hacé clic en <strong class='action-btn'>Imprimir</strong> para el ticket físico.<br>• Presioná siempre <strong class='action-btn'>Nueva Venta</strong> para limpiar el mostrador digital."
      ],
      "warningText": "SI EL ARTÍCULO NO FIGURA EN EL SISTEMA: Buscá y seleccioná el ítem denominado 'ARTICULO GENERICO' e ingresá el valor monetario correspondiente de forma manual."
    },
    "whatsapp": {
      "title": "Enviar WhatsApp",
      "icon": "📲",
      "alertText": "Si el cliente prefiere recibir el comprobante de forma digital en su celular, realizá este proceso inmediatamente después de presionar 'Nueva Venta'.",
      "steps": [
        "En el menú lateral de DUX, dirígete a: <strong class='route'>Facturación ➔ Ventas</strong>.",
        "Identificá la venta que acabás de realizar (aparecerá en primer lugar de la lista).",
        "Hacé clic sobre el ícono de la <strong>Flechita (Compartir)</strong> asociado a esa venta.",
        "Seleccioná la opción <strong>Enviar vía WhatsApp</strong>.",
        "Completá el número de teléfono con la característica (ej: 54911...) y hacé clic en <strong>Enviar</strong>. Esto abrirá una pestaña de WhatsApp Web.",
        "Presioná el botón de <strong>Enviar</strong> dentro del chat de WhatsApp."
      ],
      "templates": [
        {
          "name": "Envío de Ticket Estándar",
          "text": "¡Hola! Te escribimos de LA ESCALERA S. A. S. Te adjuntamos el comprobante de tu compra. ¡Muchas gracias por elegirnos!"
        },
        {
          "name": "Aviso de Promociones",
          "text": "¡Hola! Gracias por tu compra en LA ESCALERA S. A. S. Recordá que con tu ticket tenés un 10% de descuento en tu próxima compra de los miércoles."
        }
      ]
    },
    "cierre": {
      "title": "Cierre de Caja",
      "icon": "🔒",
      "alertText": "Al concluir tu jornada de trabajo, es mandatorio efectuar el arqueo y cierre para resguardar la seguridad del dinero.",
      "steps": [
        "Ingresá al menú: <strong class='route'>Tesorería ➔ Caja Diaria ➔ Cerrar Caja</strong>.",
        "<strong>Control físico del dinero (Arqueo):</strong><br>• Retirá y separá exactamente <strong>$30.000 fijos</strong> del cajón de dinero. Este monto constituye el cambio inicial obligatorio para el siguiente turno.<br>• Procedé a contar el resto del efectivo físico remanente en el cajón.",
        "El resultado de tu conteo físico <strong>debe coincidir de manera exacta</strong> con el monto de efectivo que el sistema DUX te solicita en la pantalla de cierre."
      ],
      "warningText": "EN CASO DE DISCREPANCIAS O FALTANTES: Si los números no coinciden, verificá que no te hayas olvidado de registrar algún cobro, que no existan errores en los vueltos o movimientos omitidos. Si la diferencia persiste, informá de inmediato al encargado."
    }
  }
};

// Global App State
let appContent = {};
let isServerMode = false;
let isEditorActive = false;
const ADMIN_PASSWORD = "1234"; // default simple password

// --- PAGE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTabs();
  loadContent();
  initCalculator();
  initWhatsAppGenerator();
  initAdminMode();
  
  // Initialize Lucide icons
  lucide.createIcons();
});

// --- CLOCK & DATE FUNCTION ---
function initClock() {
  const dateEl = document.getElementById('current-date');
  const timeEl = document.getElementById('current-time');
  
  function updateTime() {
    const now = new Date();
    
    // Format Date: DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    dateEl.textContent = `${day}/${month}/${year}`;
    
    // Format Time: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}

// --- TAB NAVIGATION ---
function initTabs() {
  const menuButtons = document.querySelectorAll('.menu-item');
  const panels = document.querySelectorAll('.tab-panel');
  
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Deactivate all buttons & panels
      menuButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Activate target
      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

// --- DATA SERVICE: LOAD ---
async function loadContent() {
  // Check if we are running in file:// or http:// protocol
  isServerMode = window.location.protocol.startsWith('http');
  
  // Try loading from Cloud Database (kvdb.io) first so all branches sync!
  try {
    const cloudResponse = await fetch('https://jsonblob.com/api/jsonBlob/019ef6c5-c85f-78e7-9c84-5f9eed528207');
    if (cloudResponse.ok) {
      const cloudData = await cloudResponse.json();
      if (cloudData && cloudData.brandName) {
        appContent = cloudData;
        // Keep local cache updated
        localStorage.setItem('cajeros_portal_content', JSON.stringify(appContent));
        console.log('Contenido sincronizado desde la nube (kvdb.io).');
        renderContent();
        return;
      }
    }
  } catch (e) {
    console.warn('No se pudo conectar a la base de datos en la nube. Cargando copia local...', e);
  }

  // Fallback to local server API (if running in server mode) or local storage
  if (isServerMode) {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        appContent = await response.json();
        console.log('Contenido cargado desde el servidor local.');
      } else {
        throw new Error('Error al cargar archivo de contenido');
      }
    } catch (e) {
      console.warn('Fallo al conectar al servidor backend. Usando datos guardados en LocalStorage o predeterminados.', e);
      loadLocalFallback();
    }
  } else {
    loadLocalFallback();
  }
  
  renderContent();
}

function loadLocalFallback() {
  const localSaved = localStorage.getItem('cajeros_portal_content');
  if (localSaved) {
    try {
      const parsedData = JSON.parse(localSaved);
      // Check version mismatch to force update if content structure/defaults changed
      if (!parsedData.version || parsedData.version < DEFAULT_CONTENT.version) {
        console.log('Nueva versión detectada. Actualizando LocalStorage...');
        appContent = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
        localStorage.setItem('cajeros_portal_content', JSON.stringify(appContent));
      } else {
        appContent = parsedData;
        console.log('Contenido restaurado desde el LocalStorage del navegador.');
      }
    } catch (e) {
      appContent = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    }
  } else {
    appContent = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    localStorage.setItem('cajeros_portal_content', JSON.stringify(appContent));
  }
}

// --- RENDERING ---
function renderContent() {
  // Brand and Headers
  document.getElementById('brand-title').innerHTML = appContent.brandName || "La Escalera Express";
  document.getElementById('welcome-title').innerHTML = appContent.welcomeTitle || "Portal de Ayuda para Cajeros";
  document.getElementById('welcome-subtitle').innerHTML = appContent.welcomeSubtitle || "";

  // 📥 Section: Apertura
  const secApertura = appContent.sections.apertura;
  document.getElementById('apertura-title').innerHTML = secApertura.title;
  document.getElementById('apertura-alert').innerHTML = secApertura.alertText;
  renderList('apertura-steps', secApertura.steps);
  renderChecklist('apertura-checklist', secApertura.checklist);

  // 💰 Section: Cómo Cobrar
  const secCobrar = appContent.sections.cobrar;
  document.getElementById('cobrar-title').innerHTML = secCobrar.title;
  document.getElementById('cobrar-alert').innerHTML = secCobrar.alertText;
  renderShortcuts('cobrar-shortcuts', secCobrar.shortcuts);
  renderList('cobrar-steps', secCobrar.steps);
  document.getElementById('cobrar-warning').innerHTML = secCobrar.warningText;

  // 📲 Section: Enviar WhatsApp
  const secWhatsApp = appContent.sections.whatsapp;
  document.getElementById('whatsapp-title').innerHTML = secWhatsApp.title;
  document.getElementById('whatsapp-alert').innerHTML = secWhatsApp.alertText;
  renderList('whatsapp-steps', secWhatsApp.steps);
  renderWhatsAppTemplates(secWhatsApp.templates);

  // 🔒 Section: Cierre
  const secCierre = appContent.sections.cierre;
  document.getElementById('cierre-title').innerHTML = secCierre.title;
  document.getElementById('cierre-alert').innerHTML = secCierre.alertText;
  renderList('cierre-steps', secCierre.steps);
  document.getElementById('cierre-warning').innerHTML = secCierre.warningText;
  
  // Re-enable editability if editor mode is active
  if (isEditorActive) {
    makeContentEditable(true);
  }
}

function renderList(elementId, items) {
  const container = document.getElementById(elementId);
  if (!container) return;
  container.innerHTML = '';
  
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = item;
    li.setAttribute('data-index', index);
    container.appendChild(li);
  });
}

function renderShortcuts(elementId, items) {
  const container = document.getElementById(elementId);
  if (!container) return;
  container.innerHTML = '';
  
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'shortcut-item';
    div.innerHTML = `<i data-lucide="external-link" class="btn-icon" style="margin-right: 8px; color: var(--success);"></i>${item}`;
    div.setAttribute('data-index', index);
    container.appendChild(div);
  });
  lucide.createIcons({attrs: {class: 'btn-icon'}});
}

function renderChecklist(elementId, items) {
  const container = document.getElementById(elementId);
  if (!container) return;
  container.innerHTML = '';
  
  // Load checked states from session/local storage
  const checkedStates = JSON.parse(localStorage.getItem('apertura_checklist_states') || '{}');
  
  items.forEach((item, index) => {
    const li = document.createElement('li');
    const isChecked = checkedStates[index] || false;
    
    li.className = `check-item ${isChecked ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" id="chk-${index}" ${isChecked ? 'checked' : ''}>
      <span>${item}</span>
    `;
    
    // Add checkbox toggle listener
    const checkbox = li.querySelector('input');
    checkbox.addEventListener('change', (e) => {
      if (isEditorActive) {
        // Disable checklist toggle when editing text
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        return;
      }
      
      const completed = checkbox.checked;
      if (completed) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      
      // Save state
      checkedStates[index] = completed;
      localStorage.setItem('apertura_checklist_states', JSON.stringify(checkedStates));
    });
    
    container.appendChild(li);
  });
}

function renderWhatsAppTemplates(templates) {
  const select = document.getElementById('wa-template-select');
  if (!select) return;
  select.innerHTML = '';
  
  templates.forEach((tpl, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = tpl.name;
    select.appendChild(opt);
  });
  
  updateWhatsAppPreview();
}

// --- INTERACTIVE WHATSAPP TOOL ---
function initWhatsAppGenerator() {
  const nameInput = document.getElementById('wa-name');
  const phoneInput = document.getElementById('wa-phone');
  const select = document.getElementById('wa-template-select');
  const preview = document.getElementById('wa-preview');
  const sendBtn = document.getElementById('wa-send-btn');
  
  // Event listeners to update preview on input
  nameInput.addEventListener('input', updateWhatsAppPreview);
  select.addEventListener('change', updateWhatsAppPreview);
  
  // Send message
  sendBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    
    if (!phone) {
      alert('Por favor, ingresá un número de teléfono válido.');
      phoneInput.focus();
      return;
    }
    
    // Remove symbols and leading zero
    phone = phone.replace(/[^0-9]/g, '');
    
    // If phone starts with 15, remove it
    if (phone.length === 10 && phone.startsWith('15')) {
      // Prompt user warning
      alert('Por favor ingresá la característica sin el 15. Ej: si es 156-123456, ingresá 116123456 o la característica de tu localidad.');
      return;
    }
    
    // Build final phone with Argentinian code 549
    let finalPhone = phone;
    if (!phone.startsWith('549')) {
      // If it starts with 9, prepend 54
      if (phone.startsWith('9')) {
        finalPhone = '54' + phone;
      } else {
        // Prepend 549
        finalPhone = '549' + phone;
      }
    }
    
    const message = preview.value;
    const waUrl = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
  });
}

function updateWhatsAppPreview() {
  const nameInput = document.getElementById('wa-name');
  const select = document.getElementById('wa-template-select');
  const preview = document.getElementById('wa-preview');
  
  if (!select || !preview || !appContent.sections) return;
  
  const templates = appContent.sections.whatsapp.templates;
  if (!templates || templates.length === 0) return;
  
  const activeTemplate = templates[select.value];
  if (!activeTemplate) return;
  
  let text = activeTemplate.text;
  const name = nameInput.value.trim();
  
  if (name) {
    // Replace ¡Hola! with ¡Hola [Nombre]!
    text = text.replace(/¡Hola!/g, `¡Hola, ${name}!`);
    // Fallback if ¡Hola! wasn't exactly matched
    if (!text.includes(name)) {
      text = `¡Hola, ${name}! ` + text;
    }
  }
  
  preview.value = text;
}

// --- INTERACTIVE CLOSING CALCULATOR ---
function initCalculator() {
  const qtyInputs = document.querySelectorAll('.bill-qty');
  const customInput = document.getElementById('calc-others');
  const duxExpectedInput = document.getElementById('dux-expected');
  const resetBtn = document.getElementById('calc-reset');
  
  // Listen on bill inputs
  qtyInputs.forEach(input => {
    input.addEventListener('input', calculateTotal);
  });
  
  // Listen on custom/others input
  if (customInput) {
    customInput.addEventListener('input', calculateTotal);
  }
  
  // Listen on DUX comparison input
  if (duxExpectedInput) {
    duxExpectedInput.addEventListener('input', compareWithDux);
  }
  
  // Reset calculator
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      qtyInputs.forEach(input => input.value = '');
      if (customInput) customInput.value = '';
      if (duxExpectedInput) duxExpectedInput.value = '';
      
      calculateTotal();
    });
  }
}

function calculateTotal() {
  const qtyInputs = document.querySelectorAll('.bill-qty');
  const customInput = document.getElementById('calc-others');
  
  let total = 0;
  
  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const denom = parseInt(input.getAttribute('data-val')) || 0;
    const subtotal = qty * denom;
    
    total += subtotal;
    
    // Update subtotal cell
    const subtotalEl = document.getElementById(`sub-${denom}`);
    if (subtotalEl) {
      subtotalEl.textContent = formatCurrency(subtotal);
    }
  });
  
  // Custom input add
  const otherVal = parseFloat(customInput.value) || 0;
  total += otherVal;
  
  const subOthersEl = document.getElementById('sub-others');
  if (subOthersEl) {
    subOthersEl.textContent = formatCurrency(otherVal);
  }
  
  // Update total
  document.getElementById('calc-total').textContent = formatCurrency(total);
  
  // Subtract 30,000 fixed cash reserve
  const cashReserve = 30000;
  const netAmount = Math.max(0, total - cashReserve);
  
  document.getElementById('calc-net').textContent = formatCurrency(netAmount);
  
  // Update DUX comparison if value exists
  compareWithDux();
}

function compareWithDux() {
  const duxInput = document.getElementById('dux-expected');
  const compareResultEl = document.getElementById('compare-result');
  
  if (!duxInput || !compareResultEl) return;
  
  const expectedValue = parseFloat(duxInput.value);
  
  if (isNaN(expectedValue) || expectedValue === 0) {
    compareResultEl.classList.add('hidden');
    return;
  }
  
  // Get current net value (Efectivo Neto)
  const netText = document.getElementById('calc-net').textContent;
  const netValue = parseFloat(netText.replace(/[^0-9.-]/g, '')) || 0;
  
  const difference = netValue - expectedValue;
  
  compareResultEl.classList.remove('hidden');
  
  if (Math.abs(difference) < 0.01) {
    compareResultEl.className = 'compare-status compare-match';
    compareResultEl.innerHTML = `<i data-lucide="check" class="btn-icon" style="display:inline; vertical-align:middle; margin-right:4px;"></i> ¡Caja Coincide! Arqueo físico igual a DUX.`;
  } else {
    compareResultEl.className = 'compare-status compare-mismatch';
    const sign = difference > 0 ? '+' : '';
    compareResultEl.innerHTML = `
      <i data-lucide="x" class="btn-icon" style="display:inline; vertical-align:middle; margin-right:4px;"></i> 
      Diferencia detectada: <strong>${sign}${formatCurrency(difference)}</strong>
    `;
  }
  lucide.createIcons();
}

function formatCurrency(val) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
}

// --- ADMIN / EDITOR MODE ---
function initAdminMode() {
  const adminBtn = document.getElementById('admin-mode-btn');
  const publishBtn = document.getElementById('publish-btn');
  const modal = document.getElementById('admin-modal');
  const modalCancel = document.getElementById('modal-cancel-btn');
  const modalConfirm = document.getElementById('modal-confirm-btn');
  const passwordInput = document.getElementById('admin-password');
  const passwordError = document.getElementById('password-error');
  
  // Toggle Admin / Edit Mode
  adminBtn.addEventListener('click', () => {
    if (isEditorActive) {
      // Exit Edit Mode
      isEditorActive = false;
      document.body.classList.remove('editor-active');
      adminBtn.classList.remove('btn-primary');
      adminBtn.innerHTML = '<i data-lucide="settings" class="btn-icon"></i><span>Modo Editor</span>';
      publishBtn.classList.add('hidden');
      document.getElementById('editor-indicator').classList.add('hidden');
      
      // Remove contenteditable
      makeContentEditable(false);
      
      // Reload contents from memory to discard unsaved edits
      renderContent();
      lucide.createIcons();
    } else {
      // Open login modal
      modal.classList.remove('hidden');
      passwordInput.value = '';
      passwordError.classList.add('hidden');
      passwordInput.focus();
    }
  });
  
  // Modal Cancel
  modalCancel.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // Modal Confirm
  modalConfirm.addEventListener('click', handlePasswordVerify);
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handlePasswordVerify();
    }
  });
  
  function handlePasswordVerify() {
    if (passwordInput.value === ADMIN_PASSWORD) {
      isEditorActive = true;
      modal.classList.add('hidden');
      document.body.classList.add('editor-active');
      
      adminBtn.classList.add('btn-primary');
      adminBtn.innerHTML = '<i data-lucide="x" class="btn-icon"></i><span>Salir Editor</span>';
      publishBtn.classList.remove('hidden');
      document.getElementById('editor-indicator').classList.remove('hidden');
      
      // Make elements contenteditable
      makeContentEditable(true);
      lucide.createIcons();
    } else {
      passwordError.classList.remove('hidden');
    }
  }
  
  // Publish Changes
  publishBtn.addEventListener('click', handlePublishChanges);
}

function makeContentEditable(editable) {
  const elementsSingle = document.querySelectorAll('.editable-single');
  const elementsBlock = document.querySelectorAll('.editable-block');
  
  elementsSingle.forEach(el => {
    el.contentEditable = editable;
  });
  elementsBlock.forEach(el => {
    el.contentEditable = editable;
  });
  
  // Make lists (steps, checklists) contenteditable
  const stepsLists = document.querySelectorAll('.step-list, .checklist-interactive, .shortcuts-container');
  stepsLists.forEach(list => {
    const children = list.children;
    for (let i = 0; i < children.length; i++) {
      // If it's the checklist interactive list, edit the text span, not the label
      if (children[i].classList.contains('check-item')) {
        const textSpan = children[i].querySelector('span');
        if (textSpan) textSpan.contentEditable = editable;
      } else {
        children[i].contentEditable = editable;
      }
    }
  });
}

// --- DATA SERVICE: PUBLISH / SAVE ---
async function handlePublishChanges() {
  // 1. Gather all values from the UI
  const updatedContent = JSON.parse(JSON.stringify(appContent));
  
  updatedContent.brandName = document.getElementById('brand-title').innerHTML.trim();
  updatedContent.welcomeTitle = document.getElementById('welcome-title').innerHTML.trim();
  updatedContent.welcomeSubtitle = document.getElementById('welcome-subtitle').innerHTML.trim();
  
  // Apertura
  updatedContent.sections.apertura.title = document.getElementById('apertura-title').innerHTML.trim();
  updatedContent.sections.apertura.alertText = document.getElementById('apertura-alert').innerHTML.trim();
  updatedContent.sections.apertura.steps = getListContent('apertura-steps');
  updatedContent.sections.apertura.checklist = getChecklistContent('apertura-checklist');

  // Cobrar
  updatedContent.sections.cobrar.title = document.getElementById('cobrar-title').innerHTML.trim();
  updatedContent.sections.cobrar.alertText = document.getElementById('cobrar-alert').innerHTML.trim();
  updatedContent.sections.cobrar.shortcuts = getShortcutsContent('cobrar-shortcuts');
  updatedContent.sections.cobrar.steps = getListContent('cobrar-steps');
  updatedContent.sections.cobrar.warningText = document.getElementById('cobrar-warning').innerHTML.trim();

  // WhatsApp
  updatedContent.sections.whatsapp.title = document.getElementById('whatsapp-title').innerHTML.trim();
  updatedContent.sections.whatsapp.alertText = document.getElementById('whatsapp-alert').innerHTML.trim();
  updatedContent.sections.whatsapp.steps = getListContent('whatsapp-steps');
  // Templates are not directly editable in UI yet, keep them as is
  
  // Cierre
  updatedContent.sections.cierre.title = document.getElementById('cierre-title').innerHTML.trim();
  updatedContent.sections.cierre.alertText = document.getElementById('cierre-alert').innerHTML.trim();
  updatedContent.sections.cierre.steps = getListContent('cierre-steps');
  updatedContent.sections.cierre.warningText = document.getElementById('cierre-warning').innerHTML.trim();

  // Increment version to force cache reload on other devices
  updatedContent.version = (updatedContent.version || 1) + 1;

  let cloudSaved = false;

  // 2. Perform Cloud Save first (so all branches sync!)
  try {
    const cloudResponse = await fetch('https://jsonblob.com/api/jsonBlob/019ef6c5-c85f-78e7-9c84-5f9eed528207', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContent)
    });
    if (cloudResponse.ok) {
      cloudSaved = true;
      console.log('Guardado exitoso en base de datos en la nube.');
    }
  } catch (e) {
    console.error('Error al guardar en la nube:', e);
  }

  // 3. Perform Local Server Save (if running via express local server)
  if (isServerMode) {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });
    } catch (e) {
      console.warn('Error al guardar copia local en server.js:', e);
    }
  }

  // 4. Update Local cache and notify user
  saveLocal(updatedContent);

  if (cloudSaved) {
    alert('¡Guía publicada con éxito en la nube! Los cambios ya se sincronizaron y están disponibles para todas las sucursales al instante.');
    exitEditorMode();
  } else {
    // If cloud save failed, ask to download JSON for manual updates
    const confirmDownload = confirm('Error al conectar con la base de datos en la nube (revisá tu conexión a internet). Los cambios se guardaron localmente en esta PC.\n\n¿Deseás descargar el archivo "content.json" para copiarlo manualmente en otras computadoras?');
    if (confirmDownload) {
      downloadJson(updatedContent, 'content.json');
    }
    exitEditorMode();
  }
}

function saveLocal(content) {
  appContent = content;
  localStorage.setItem('cajeros_portal_content', JSON.stringify(content));
}

function exitEditorMode() {
  isEditorActive = false;
  document.body.classList.remove('editor-active');
  
  const adminBtn = document.getElementById('admin-mode-btn');
  adminBtn.classList.remove('btn-primary');
  adminBtn.innerHTML = '<i data-lucide="settings" class="btn-icon"></i><span>Modo Editor</span>';
  
  document.getElementById('publish-btn').classList.add('hidden');
  document.getElementById('editor-indicator').classList.add('hidden');
  
  makeContentEditable(false);
  renderContent();
  lucide.createIcons();
}

function getListContent(elementId) {
  const el = document.getElementById(elementId);
  const items = [];
  if (!el) return items;
  
  for (let i = 0; i < el.children.length; i++) {
    items.push(el.children[i].innerHTML.trim());
  }
  return items;
}

function getChecklistContent(elementId) {
  const el = document.getElementById(elementId);
  const items = [];
  if (!el) return items;
  
  for (let i = 0; i < el.children.length; i++) {
    const textSpan = el.children[i].querySelector('span');
    if (textSpan) {
      items.push(textSpan.innerHTML.trim());
    }
  }
  return items;
}

function getShortcutsContent(elementId) {
  const el = document.getElementById(elementId);
  const items = [];
  if (!el) return items;
  
  for (let i = 0; i < el.children.length; i++) {
    // Remove the icon html from innerHTML before storing
    let content = el.children[i].innerHTML;
    // Replace anything like '<i ...></i>' or Lucide SVG representation
    content = content.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '');
    content = content.replace(/<svg[^>]*>([\s\S]*?)<\/svg>/gi, '');
    items.push(content.trim());
  }
  return items;
}

// Helper to download JSON file in client mode
function downloadJson(obj, filename) {
  const str = JSON.stringify(obj, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(str);
  
  const linkEl = document.createElement('a');
  linkEl.setAttribute('href', dataUri);
  linkEl.setAttribute('download', filename);
  document.body.appendChild(linkEl);
  linkEl.click();
  document.body.removeChild(linkEl);
}
