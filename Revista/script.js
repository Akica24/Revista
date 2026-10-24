/* ============================================================
   VOCES DEL SABER — Revista Escolar Digital
   Lógica de navegación, índice, test y participación.
   ============================================================ */

/* ---------- 1. LISTA DE SECCIONES ---------- */
const SECCIONES = [
  { id: 'cover',                   num: '00', titulo: 'Portada' },
  { id: 'carta-editor',            num: '01', titulo: 'Carta del Editor' },
  { id: 'indice',                  num: '02', titulo: 'Índice' },
  { id: 'constitucion-participacion', num: '03', titulo: 'Constitución y Participación' },
  { id: 'infografia-mecanismos',   num: '04', titulo: 'Mecanismos de Participación' },
  { id: 'constitucion-corrupcion', num: '05', titulo: 'Constitución y Corrupción' },
  { id: 'entrevista-constitucional', num: '06', titulo: 'Entrevista Constitucional' },
  { id: 'accion-tutela',           num: '07', titulo: 'Acción de Tutela' },
  { id: 'codigo-infancia',         num: '08', titulo: 'Código de Infancia y Adolescencia' },
  { id: 'principios-infancia',     num: '09', titulo: 'Principios del Código de Infancia' },
  { id: 'infografia-srpa',         num: '10', titulo: 'Infografía del SRPA' },
  { id: 'encuesta-bullying',       num: '11', titulo: 'Encuesta de Bullying y Ciberacoso' },
  { id: 'directorio-proteccion',   num: '12', titulo: 'Directorio de Protección' },
  { id: 'deberes-derechos',        num: '13', titulo: 'Deberes versus Derechos' },
  { id: 'violencia-genero',        num: '14', titulo: 'Violencia de Género' },
  { id: 'banderas-rojas',          num: '15', titulo: 'Banderas Rojas' },
  { id: 'ley-rosa-elvira',         num: '16', titulo: 'Ley Rosa Elvira Cely' },
  { id: 'derechos-sexuales',       num: '17', titulo: 'Derechos Sexuales y Reproductivos' },
  { id: 'test-mito-realidad',      num: '18', titulo: 'Test Mito vs. Realidad' },
  { id: 'poster-prevencion',       num: '18b', titulo: 'Póster de Prevención' },
  { id: 'convivencia-policia',     num: '19', titulo: 'Convivencia y Código de Policía' },
  { id: 'fotoreportaje-movilidad', num: '20', titulo: 'Fotoreportaje de Movilidad' },
  { id: 'proteccion-animal',       num: '21', titulo: 'Protección Animal' },
  { id: 'tenencia-responsable',    num: '22', titulo: 'Tenencia Responsable' },
  { id: 'reto-ecologico',          num: '23', titulo: 'Reto Ecológico' },
  { id: 'pasatiempos',             num: '24', titulo: 'Pasatiempos' },
  { id: 'creditos',                num: '25', titulo: 'Créditos y Referencias' },
  { id: 'contraportada',          num: '26', titulo: 'Contraportada' },
];

/* ---------- 2. NAVEGACIÓN ENTRE SECCIONES ---------- */
function irASeccion(id) {
  document.querySelectorAll('.seccion').forEach(function(sec) {
    sec.classList.remove('seccion-activa');
  });

  var destino = document.getElementById(id);
  if (destino) {
    destino.classList.add('seccion-activa');
  }

  cerrarMenuMovil();
  actualizarBotonSubir(id);
  resaltarMenuActivo(id);
}

/* ---------- 3. MENÚ MÓVIL ---------- */
function configurarMenuMovil() {
  var btnMenu = document.getElementById('btnMenu');
  var nav = document.getElementById('nav');
  if (!btnMenu || !nav) return;

  btnMenu.addEventListener('click', function() {
    nav.classList.toggle('abierto');
  });

  document.querySelectorAll('.nav-boton').forEach(function(boton) {
    boton.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        var categoria = boton.closest('.nav-categoria');
        document.querySelectorAll('.nav-categoria').forEach(function(c) {
          if (c !== categoria) c.classList.remove('desplegado');
        });
        categoria.classList.toggle('desplegado');
      }
    });
  });

  document.querySelectorAll('.nav-submenu a').forEach(function(enlace) {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      var id = enlace.getAttribute('data-seccion');
      if (id) irASeccion(id);
    });
  });

  document.addEventListener('click', function(e) {
    if (
      window.innerWidth <= 768 &&
      nav.classList.contains('abierto') &&
      !nav.contains(e.target) &&
      !btnMenu.contains(e.target)
    ) {
      cerrarMenuMovil();
    }
  });
}

function cerrarMenuMovil() {
  var nav = document.getElementById('nav');
  if (nav) nav.classList.remove('abierto');
  document.querySelectorAll('.nav-categoria').forEach(function(c) {
    c.classList.remove('desplegado');
  });
}

function resaltarMenuActivo(idSeccion) {
  document.querySelectorAll('.nav-boton').forEach(function(b) {
    b.classList.remove('activo');
  });
  document.querySelectorAll('.nav-categoria').forEach(function(cat) {
    var enlaces = cat.querySelectorAll('.nav-submenu a');
    enlaces.forEach(function(a) {
      if (a.getAttribute('data-seccion') === idSeccion) {
        cat.querySelector('.nav-boton').classList.add('activo');
      }
    });
  });
}

/* ---------- 4. ÍNDICE AUTOMÁTICO ---------- */
function generarIndice() {
  var contenedor = document.getElementById('indiceGrid');
  if (!contenedor) return;

  var items = SECCIONES.filter(function(s) {
    return s.id !== 'cover' && s.id !== 'indice';
  });

  var html = '';
  items.forEach(function(s, i) {
    var pagina = (i + 1) * 2;
    html += '<div class="indice-item" onclick="irASeccion(\'' + s.id + '\')" role="button" tabindex="0">';
    html += '<span class="indice-item-num">' + s.num + '</span>';
    html += '<span class="indice-item-texto">' + s.titulo + '</span>';
    html += '<span class="indice-item-pagina">p. ' + pagina + '</span>';
    html += '</div>';
  });
  contenedor.innerHTML = html;

  contenedor.querySelectorAll('.indice-item').forEach(function(item) {
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

/* ---------- 5. BOTÓN FLOTANTE ---------- */
function actualizarBotonSubir(idActual) {
  var btn = document.getElementById('btnSubir');
  if (!btn) return;
  if (idActual === 'cover') {
    btn.classList.remove('visible');
  } else {
    btn.classList.add('visible');
  }
}

/* ---------- 6. TEST INTERACTIVO ---------- */
var PREGUNTAS_TEST = [
  {
    enunciado: 'Los hombres y las mujeres tienen los mismos derechos en la Constitución de Colombia.',
    opciones: [
      { texto: 'Mito', correcta: false },
      { texto: 'Realidad', correcta: true }
    ],
    explicacion: 'Realidad. El Artículo 13 consagra la igualdad sin discriminación por sexo.'
  },
  {
    enunciado: 'El consentimiento es necesario para cualquier actividad sexual.',
    opciones: [
      { texto: 'Mito', correcta: false },
      { texto: 'Realidad', correcta: true }
    ],
    explicacion: 'Realidad. El consentimiento libre e informado es esencial; sin él, hay abuso.'
  },
  {
    enunciado: 'Solo las mujeres pueden sufrir violencia de género.',
    opciones: [
      { texto: 'Mito', correcta: true },
      { texto: 'Realidad', correcta: false }
    ],
    explicacion: 'Mito. Cualquier persona puede ser víctima de violencia por razones de género.'
  },
  {
    enunciado: 'La acción de tutela tiene un costo elevado y solo los abogados pueden presentarla.',
    opciones: [
      { texto: 'Mito', correcta: true },
      { texto: 'Realidad', correcta: false }
    ],
    explicacion: 'Mito. La tutela es gratuita y cualquier persona puede presentarla sin abogado.'
  },
  {
    enunciado: 'Adoptar una mascota implica un compromiso de varios años.',
    opciones: [
      { texto: 'Mito', correcta: false },
      { texto: 'Realidad', correcta: true }
    ],
    explicacion: 'Realidad. Una mascota puede vivir de 10 a 15 años.'
  },
  {
    enunciado: 'Los animales son seres sintientes protegidos por la ley en Colombia.',
    opciones: [
      { texto: 'Mito', correcta: false },
      { texto: 'Realidad', correcta: true }
    ],
    explicacion: 'Realidad. La Ley 1774 de 2016 reconoce a los animales como seres sintientes.'
  }
];

var testEstado = { actual: 0, aciertos: 0, respondida: false };

function configurarTest() {
  var btnIniciar = document.getElementById('btnIniciarTest');
  var btnReiniciar = document.getElementById('btnReiniciarTest');
  if (!btnIniciar) return;
  btnIniciar.addEventListener('click', iniciarTest);
  if (btnReiniciar) btnReiniciar.addEventListener('click', reiniciarTest);
}

function iniciarTest() {
  testEstado = { actual: 0, aciertos: 0, respondida: false };
  document.getElementById('testInicio').hidden = true;
  document.getElementById('testResultado').hidden = true;
  document.getElementById('testPregunta').hidden = false;
  mostrarPregunta();
}

function mostrarPregunta() {
  var p = PREGUNTAS_TEST[testEstado.actual];
  testEstado.respondida = false;

  document.getElementById('testContador').textContent =
    'Pregunta ' + (testEstado.actual + 1) + ' de ' + PREGUNTAS_TEST.length;
  var progreso = (testEstado.actual / PREGUNTAS_TEST.length) * 100;
  document.getElementById('testBarraRelleno').style.width = progreso + '%';
  document.getElementById('testEnunciado').textContent = p.enunciado;

  var contenedorOpciones = document.getElementById('testOpciones');
  contenedorOpciones.innerHTML = '';

  p.opciones.forEach(function(op, index) {
    var btn = document.createElement('button');
    btn.textContent = op.texto;
    btn.addEventListener('click', function() {
      responderPregunta(index, op);
    });
    contenedorOpciones.appendChild(btn);
  });
}

function responderPregunta(index, opcion) {
  if (testEstado.respondida) return;
  testEstado.respondida = true;

  var p = PREGUNTAS_TEST[testEstado.actual];
  var todosBotones = document.querySelectorAll('#testOpciones button');

  todosBotones.forEach(function(b, i) {
    if (p.opciones[i].correcta) {
      b.classList.add('correcta');
    } else if (i === index && !opcion.correcta) {
      b.classList.add('incorrecta');
    }
    b.disabled = true;
  });

  if (opcion.correcta) testEstado.aciertos++;

  var contenedorOpciones = document.getElementById('testOpciones');
  var exp = contenedorOpciones.querySelector('.test-explicacion');
  if (!exp) {
    exp = document.createElement('div');
    exp.className = 'test-explicacion';
    contenedorOpciones.appendChild(exp);
  }
  exp.textContent = p.explicacion;

  var btnContinuar = document.createElement('button');
  btnContinuar.textContent = testEstado.actual < PREGUNTAS_TEST.length - 1
    ? 'Siguiente pregunta →'
    : 'Ver resultado 🏁';
  btnContinuar.style.marginTop = '1rem';
  btnContinuar.style.width = '100%';
  btnContinuar.classList.add('btn', 'btn-primario');
  btnContinuar.addEventListener('click', function() {
    testEstado.actual++;
    if (testEstado.actual < PREGUNTAS_TEST.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  });
  contenedorOpciones.appendChild(btnContinuar);
}

function mostrarResultado() {
  document.getElementById('testPregunta').hidden = true;
  document.getElementById('testResultado').hidden = false;

  var total = PREGUNTAS_TEST.length;
  var aciertos = testEstado.aciertos;
  var porcentaje = Math.round((aciertos / total) * 100);

  document.getElementById('testPuntaje').textContent = aciertos + '/' + total;

  var titulo, mensaje;
  if (porcentaje === 100) {
    titulo = '¡Excelente! 🌟';
    mensaje = 'Demuestras gran conocimiento sobre derechos y género.';
  } else if (porcentaje >= 70) {
    titulo = '¡Muy bien! 👏';
    mensaje = 'Tienes una buena base. Repasa las preguntas que fallaste.';
  } else if (porcentaje >= 40) {
    titulo = 'Vas por buen camino 📚';
    mensaje = 'Hay temas que reforzar. Vuelve a leer las secciones de derechos.';
  } else {
    titulo = 'A repasar 💡';
    mensaje = 'Te recomendamos revisar las secciones sobre derechos, género y constitución.';
  }

  document.getElementById('testTituloResultado').textContent = titulo;
  document.getElementById('testMensaje').textContent = mensaje;
}

function reiniciarTest() {
  document.getElementById('testResultado').hidden = true;
  document.getElementById('testInicio').hidden = false;
}

/* ---------- 7. NAVEGACIÓN CON TECLADO ---------- */
function configurarTeclado() {
  document.addEventListener('keydown', function(e) {
    var tag = document.activeElement.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 'ArrowLeft') navegarRelativo(-1);
    else if (e.key === 'ArrowRight') navegarRelativo(1);
  });
}

function navegarRelativo(direccion) {
  var actual = document.querySelector('.seccion.seccion-activa');
  if (!actual) return;
  var indice = SECCIONES.findIndex(function(s) { return s.id === actual.id; });
  if (indice === -1) return;
  var nuevoIndice = indice + direccion;
  if (nuevoIndice >= 0 && nuevoIndice < SECCIONES.length) {
    irASeccion(SECCIONES[nuevoIndice].id);
  }
}

/* ---------- 8. RESPUESTAS DE LA ENTREVISTA ---------- */
var CLAVE_RESPUESTAS = 'vocesDelSaber_respuestasEntrevista';

function guardarRespuesta(event) {
  event.preventDefault();

  var nombre = document.getElementById('respNombre').value.trim();
  var p1 = document.getElementById('respP1').value.trim();
  var p2 = document.getElementById('respP2').value.trim();
  var p3 = document.getElementById('respP3').value.trim();

  if (!nombre || !p1 || !p2 || !p3) return false;

  var respuestas = obtenerRespuestas();
  var nueva = {
    nombre: nombre,
    p1: p1,
    p2: p2,
    p3: p3,
    fecha: new Date().toLocaleDateString('es-CO', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  };

  respuestas.unshift(nueva);

  try {
    localStorage.setItem(CLAVE_RESPUESTAS, JSON.stringify(respuestas));
  } catch (e) {
    alert('No se pudo guardar la respuesta en este dispositivo.');
    return false;
  }

  document.getElementById('formEntrevista').reset();
  mostrarRespuestas();
  return false;
}

function obtenerRespuestas() {
  try {
    var datos = localStorage.getItem(CLAVE_RESPUESTAS);
    return datos ? JSON.parse(datos) : [];
  } catch (e) {
    return [];
  }
}

function mostrarRespuestas() {
  var contenedor = document.getElementById('listaRespuestas');
  var contador = document.getElementById('contadorRespuestas');
  if (!contenedor) return;

  var respuestas = obtenerRespuestas();
  contador.textContent = respuestas.length + ' respuesta' + (respuestas.length !== 1 ? 's' : '');

  if (respuestas.length === 0) {
    contenedor.innerHTML = '<p class="respuesta-vacia">Aún no hay respuestas. ¡Sé el primero en participar!</p>';
    return;
  }

  var html = '';
  respuestas.forEach(function(r) {
    html += '<div class="respuesta-card">';
    html += '<p class="respuesta-autor">' + escaparTexto(r.nombre) + ' <small>' + r.fecha + '</small></p>';
    html += '<div class="respuesta-item"><strong>1. ¿Cuáles son los derechos fundamentales que más se vulneran en tu comunidad educativa?</strong>' + escaparTexto(r.p1) + '</div>';
    html += '<div class="respuesta-item"><strong>2. ¿Qué derechos fundamentales se promueven o protegen con mayor éxito en tu colegio?</strong>' + escaparTexto(r.p2) + '</div>';
    html += '<div class="respuesta-item"><strong>3. ¿Qué mecanismo de protección usarías para defender un derecho vulnerado en la institución?</strong>' + escaparTexto(r.p3) + '</div>';
    html += '</div>';
  });
  contenedor.innerHTML = html;
}

function borrarRespuestas() {
  if (!confirm('¿Seguro que deseas borrar todas las respuestas guardadas?')) return;
  try {
    localStorage.removeItem(CLAVE_RESPUESTAS);
  } catch (e) {}
  mostrarRespuestas();
}

function escaparTexto(texto) {
  var div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- 9. INICIALIZACIÓN ---------- */
document.addEventListener('DOMContentLoaded', function() {
  generarIndice();
  configurarMenuMovil();
  configurarTest();
  configurarTeclado();
  mostrarRespuestas();
  iniciarSopa();
  iniciarCrucigrama();
  irASeccion('cover');
});

/* ============================================================
   10. SOPA DE LETRAS INTERACTIVA
   ============================================================ */

// Tablero 12x12 con las palabras ocultas
var SOPA_TABLERO = [
  ['T','U','T','E','L','A','X','Q','W','R','M','P'],
  ['X','I','C','B','F','Z','K','J','V','H','N','L'],
  ['P','L','E','B','I','S','C','I','T','O','A','Q'],
  ['F','E','M','I','N','I','C','I','D','I','O','W'],
  ['C','O','M','P','A','R','E','N','D','O','X','Z'],
  ['K','B','D','R','S','T','U','V','W','Y','Z','A'],
  ['Q','L','E','Y','C','O','N','S','T','I','T','U'],
  ['X','M','R','T','U','T','E','L','A','Z','Q','W'],
  ['V','N','E','O','P','A','R','T','I','C','I','P'],
  ['Z','O','C','I','J','U','S','T','I','C','I','A'],
  ['P','R','H','C','O','N','V','I','V','E','N','C'],
  ['A','B','O','G','A','D','O','R','T','U','X','Y'],
];

var sopaPalabras = [
  { palabra: 'TUTELA',      celdas: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]] },
  { palabra: 'ICBF',        celdas: [[1,1],[1,2],[1,3],[1,4]] },
  { palabra: 'PLEBISCITO',  celdas: [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]] },
  { palabra: 'FEMINICIDIO', celdas: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10]] },
  { palabra: 'COMPARENDO',  celdas: [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]] },
];

var sopaSeleccion = [];
var sopaEncontradas = [];

function iniciarSopa() {
  sopaSeleccion = [];
  sopaEncontradas = [];
  var grid = document.getElementById('sopaGrid');
  if (!grid) return;

  var html = '';
  SOPA_TABLERO.forEach(function(fila, r) {
    fila.forEach(function(letra, c) {
      html += '<div class="sopa-celda" data-r="' + r + '" data-c="' + c + '" onclick="sopaClick(this)">' + letra + '</div>';
    });
  });
  grid.innerHTML = html;

  // Limpiar badges
  sopaPalabras.forEach(function(p) {
    var badge = document.getElementById('sopa-' + p.palabra);
    if (badge) badge.classList.remove('encontrada');
  });
  var msg = document.getElementById('sopaMsg');
  if (msg) msg.textContent = '';
}

function sopaClick(celda) {
  var r = parseInt(celda.dataset.r);
  var c = parseInt(celda.dataset.c);
  var clave = r + '-' + c;

  // Verificar si ya está encontrada
  if (celda.classList.contains('sopa-encontrada')) return;

  if (sopaSeleccion.length === 0) {
    // Primera celda
    sopaSeleccion = [{ r: r, c: c, el: celda }];
    celda.classList.add('sopa-activa');
  } else if (sopaSeleccion.length === 1 && sopaSeleccion[0].r === r && sopaSeleccion[0].c === c) {
    // Misma celda — deseleccionar
    sopaSeleccion[0].el.classList.remove('sopa-activa');
    sopaSeleccion = [];
  } else {
    // Segunda celda — verificar palabra
    var inicio = sopaSeleccion[0];
    sopaSeleccion[0].el.classList.remove('sopa-activa');
    sopaSeleccion = [];
    verificarPalabraSopa(inicio.r, inicio.c, r, c);
  }
}

function verificarPalabraSopa(r1, c1, r2, c2) {
  var encontrada = false;
  sopaPalabras.forEach(function(p) {
    if (sopaEncontradas.indexOf(p.palabra) !== -1) return;
    var celdas = p.celdas;
    var primC = celdas[0];
    var ultC  = celdas[celdas.length - 1];
    var coincide =
      (primC[0] === r1 && primC[1] === c1 && ultC[0] === r2 && ultC[1] === c2) ||
      (primC[0] === r2 && primC[1] === c2 && ultC[0] === r1 && ultC[1] === c1);

    if (coincide) {
      encontrada = true;
      sopaEncontradas.push(p.palabra);
      // Marcar celdas
      celdas.forEach(function(pos) {
        var el = document.querySelector('.sopa-celda[data-r="' + pos[0] + '"][data-c="' + pos[1] + '"]');
        if (el) { el.classList.add('sopa-encontrada'); el.classList.remove('sopa-activa'); }
      });
      // Marcar badge
      var badge = document.getElementById('sopa-' + p.palabra);
      if (badge) badge.classList.add('encontrada');

      var msg = document.getElementById('sopaMsg');
      if (msg) msg.textContent = '✅ ¡' + p.palabra + ' encontrada!';

      if (sopaEncontradas.length === sopaPalabras.length) {
        msg.textContent = '🎉 ¡Encontraste todas las palabras!';
      }
    }
  });

  if (!encontrada) {
    var msg = document.getElementById('sopaMsg');
    if (msg) { msg.textContent = '❌ No coincide, intenta de nuevo'; }
  }
}

function reiniciarSopa() {
  iniciarSopa();
}

/* ============================================================
   11. CRUCIGRAMA INTERACTIVO
   ============================================================ */

/*
  Layout del crucigrama (fila, col, dirección, respuesta, número):
  1H  TUTELA       fila 0, col 0-5  horizontal
  2V  COMPARENDO   fila 0, col 3, filas 0-8  vertical
  3H  FEMINICIDIO  fila 4, col 0-10 horizontal
  4V  PLEBISCITO   fila 0, col 7, filas 0-9  vertical
  5H  ICBF         fila 6, col 0-3  horizontal
*/

var CRUCI_PALABRAS = [
  { num: 1, dir: 'H', fila: 0, col: 0, respuesta: 'TUTELA' },
  { num: 2, dir: 'V', fila: 0, col: 3, respuesta: 'COMPARENDO' },
  { num: 3, dir: 'H', fila: 4, col: 0, respuesta: 'FEMINICIDIO' },
  { num: 4, dir: 'V', fila: 0, col: 7, respuesta: 'PLEBISCITO' },
  { num: 5, dir: 'H', fila: 6, col: 0, respuesta: 'ICBF' },
];

// Construir mapa de celdas
function buildCruciMap() {
  var mapa = {}; // "fila-col" -> { palabras: [{idx, pos}], num: null }
  CRUCI_PALABRAS.forEach(function(p, idx) {
    for (var i = 0; i < p.respuesta.length; i++) {
      var r = p.dir === 'H' ? p.fila : p.fila + i;
      var c = p.dir === 'H' ? p.col + i : p.col;
      var clave = r + '-' + c;
      if (!mapa[clave]) mapa[clave] = { palabras: [], num: null, r: r, c: c };
      mapa[clave].palabras.push({ idx: idx, pos: i, letra: p.respuesta[i] });
      if (i === 0) mapa[clave].num = p.num;
    }
  });
  return mapa;
}

function iniciarCrucigrama() {
  var grid = document.getElementById('crucigramaGrid');
  if (!grid) return;

  var mapa = buildCruciMap();

  // Determinar dimensiones
  var maxR = 0, maxC = 0;
  Object.values(mapa).forEach(function(c) { if (c.r > maxR) maxR = c.r; if (c.c > maxC) maxC = c.c; });

  var filas = maxR + 1;
  var cols  = maxC + 1;

  grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
  grid.innerHTML = '';

  for (var r = 0; r <= maxR; r++) {
    for (var c = 0; c <= maxC; c++) {
      var clave = r + '-' + c;
      var celda = document.createElement('div');
      if (mapa[clave]) {
        celda.className = 'cruci-celda';
        var input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'cruci-input';
        input.dataset.r = r;
        input.dataset.c = c;
        // Avance automático al escribir
        input.addEventListener('input', function(e) {
          e.target.value = e.target.value.toUpperCase().slice(-1);
          var nr = parseInt(e.target.dataset.r);
          var nc = parseInt(e.target.dataset.c);
          var siguiente = grid.querySelector('.cruci-input[data-r="' + nr + '"][data-c="' + (nc+1) + '"]');
          if (siguiente) siguiente.focus();
        });
        if (mapa[clave].num) {
          var numSpan = document.createElement('span');
          numSpan.className = 'cruci-num';
          numSpan.textContent = mapa[clave].num;
          celda.appendChild(numSpan);
        }
        celda.appendChild(input);
      } else {
        celda.className = 'cruci-celda cruci-vacia';
      }
      grid.appendChild(celda);
    }
  }
}

function verificarCrucigrama() {
  var grid = document.getElementById('crucigramaGrid');
  var mapa = buildCruciMap();
  var correctas = 0;
  var total = 0;

  // Limpiar clases previas
  grid.querySelectorAll('.cruci-input').forEach(function(inp) {
    inp.classList.remove('cruci-ok', 'cruci-error');
  });

  CRUCI_PALABRAS.forEach(function(p) {
    for (var i = 0; i < p.respuesta.length; i++) {
      var r = p.dir === 'H' ? p.fila : p.fila + i;
      var c = p.dir === 'H' ? p.col + i : p.col;
      var inp = grid.querySelector('.cruci-input[data-r="' + r + '"][data-c="' + c + '"]');
      if (!inp) continue;
      total++;
      if (inp.value.toUpperCase() === p.respuesta[i]) {
        correctas++;
        inp.classList.add('cruci-ok');
      } else if (inp.value !== '') {
        inp.classList.add('cruci-error');
      }
    }
  });

  var msg = document.getElementById('cruciMsg');
  if (msg) {
    if (correctas === total) {
      msg.textContent = '🎉 ¡Crucigrama completo!';
    } else {
      msg.textContent = correctas + ' de ' + total + ' letras correctas';
    }
  }
}

function reiniciarCrucigrama() {
  var grid = document.getElementById('crucigramaGrid');
  if (!grid) return;
  grid.querySelectorAll('.cruci-input').forEach(function(inp) {
    inp.value = '';
    inp.classList.remove('cruci-ok', 'cruci-error');
  });
  var msg = document.getElementById('cruciMsg');
  if (msg) msg.textContent = '';
}
