/* Reparación Beko Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=',
    MARCA: 'Beko', MARCA_RE: /\b(BEKO)\b/g, SAT_TXT: '<a href="https://www.beko.com/es-es/soporte/contacto" rel="nofollow noopener" target="_blank">beko.com/es-es</a> · 93 295 86 50', ETIQUETA: 'número de modelo', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"e01-lavadora","cod":"E01 / H1","ap":"lavadora","keys":["E01","E1","H1","H01"],"titulo":"Sensor de temperatura (lava en frío)","sig":"La sonda NTC que mide la temperatura del agua está en corto o abierta: la lavadora no sabe a cuánto está el agua y lava en frío. En las WMB sin pantalla es el H1.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre: el sensor es una pieza barata y la mano de obra, corta."},{"id":"e02-lavadora","cod":"E02 / H2","ap":"lavadora","keys":["E02","E2","H2","H02"],"titulo":"No calienta (resistencia)","sig":"La resistencia no calienta o el circuito está abierto; en Valladolid, casi siempre cal. En las WMB sin pantalla es el H2.","pasos":["Comprobar que el programa era con temperatura, no en frío","Ciclo vacío a 60 ° con antical","Desenchufar 10 minutos y probar"],"sem":"ambar","llamar":"Si sigue lavando en frío: resistencia (reparación habitual y barata)."},{"id":"e03-lavadora","cod":"E03 / H3","ap":"lavadora","keys":["E03","E3","H3","H03"],"titulo":"Calienta sin parar (triac pegado)","sig":"El triac o relé de la placa que manda la resistencia se ha quedado pegado y el agua no deja de calentar. En las WMB sin pantalla es el H3.","pasos":[],"sem":"ambar","llamar":"Siempre, y desenchúfala ya: es la placa electrónica."},{"id":"e04-lavadora","cod":"E04 / H4","ap":"lavadora","keys":["E04","E4","H4","H04"],"titulo":"Exceso de llenado","sig":"Entra más agua de la debida: triac de la electroválvula o presostato. En las WMB sin pantalla es el H4.","pasos":["Cerrar el grifo","Comprobar si sigue entrando agua con la lavadora apagada: entonces es la electroválvula"],"sem":"ambar","llamar":"Siempre; con el grifo cerrado hasta la visita."},{"id":"e05-lavadora","cod":"E05 / H5","ap":"lavadora","keys":["E05","E5","H5","H05"],"titulo":"No desagua","sig":"La lavadora no vacía el agua en el tiempo previsto: filtro de la bomba o la propia bomba. En las WMB sin pantalla es el H5.","pasos":["Desenchufar y vaciar por la manguera de emergencia (tapa inferior derecha, con bandeja)","Desenroscar y limpiar el filtro de la bomba (monedas, horquillas, pelusa)","Manguera de desagüe sin dobleces y sifón limpio"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"e06-lavadora","cod":"E06 / H6 · E11","ap":"lavadora","keys":["E06","E6","H6","H06","E11"],"titulo":"Motor: triac o tacómetro","sig":"Fallo del motor: el triac de la placa (E06/H6) o el tacómetro y las escobillas (E11). El tambor no gira o gira a tirones.","pasos":["Desenchufar y comprobar que el tambor gira a mano sin forzar"],"sem":"ambar","llamar":"Siempre: escobillas en las WMB, módulo en las ProSmart (si tiene menos de 10 años registrados, te decimos si lo cubre Beko)."},{"id":"e07-lavadora","cod":"E07 / H7","ap":"lavadora","keys":["E07","E7","H7","H07"],"titulo":"Presostato (nivel de agua)","sig":"El sensor de nivel no da una lectura válida: se vacía mientras llena o no arranca el lavado. En las WMB sin pantalla es el H7.","pasos":["Desenchufar 10 minutos","Comprobar que la manguera de desagüe no está más alta de 1 m ni sifonando"],"sem":"ambar","llamar":"Si persiste: presostato o su tubo."},{"id":"e08-lavadora","cod":"E08","ap":"lavadora","keys":["E08","E8"],"titulo":"No entra agua o entra lenta","sig":"La lavadora no alcanza el nivel de agua en el tiempo previsto.","pasos":["Grifo abierto del todo y manguera sin dobleces","Limpiar el filtro de la electroválvula (desenroscar la manguera con el grifo cerrado)","Abrir otro grifo de casa para ver si hay presión"],"sem":"verde","llamar":"Con presión normal y sigue igual → electroválvula."},{"id":"e09-lavadora","cod":"E09 / E10","ap":"lavadora","keys":["E09","E9","E10"],"titulo":"Puerta: bloqueo o cierre no detectado","sig":"El blocapuertas no cierra o no se libera (E09), o la lavadora no detecta la puerta cerrada (E10).","pasos":["Retirar ropa atrapada en la goma y cerrar con firmeza","Esperar 2 minutos tras el fin de programa antes de abrir"],"sem":"verde","llamar":"Si persiste con la puerta bien cerrada: cierre eléctrico."},{"id":"e17-lavadora","cod":"E17","ap":"lavadora","keys":["E17"],"titulo":"Exceso de espuma","sig":"Hay demasiada espuma y la lavadora se para para no rebosar.","pasos":["Dejar reposar 30 minutos","Programa Aclarado sin detergente","Reducir la dosis o usar detergente de baja espuma (en AutoDose, revisar el ajuste)"],"sem":"verde","llamar":"Si aparece sin detergente: presostato."},{"id":"e18-lavadora","cod":"E18","ap":"lavadora","keys":["E18","UNB"],"titulo":"Carga desequilibrada (no centrifuga)","sig":"La lavadora detecta la ropa mal repartida y no centrifuga (en algunos modelos, UNB).","pasos":["Redistribuir la ropa; no lavar una sola prenda pesada","Nivelar las patas"],"sem":"verde","llamar":"Si pasa siempre con carga normal: amortiguadores (frecuente en WMB 2008–2014)."},{"id":"luces-lavadora","cod":"Luces parpadeando","ap":"lavadora","keys":["LUCES","PARPADEA","PARPADEAN","PILOTOS"],"titulo":"Modelos sin pantalla: el fallo se lee como H","sig":"Las WMB y WML (2005–2013) no muestran E: cuando fallan parpadean los pilotos. El código real (H1–H7, equivalente a E01–E07) se lee en modo servicio.","pasos":["Anotar qué pilotos parpadean y en qué programa","Desenchufar 10 minutos y probar","Si no desagua, limpiar el filtro de la bomba (tapa inferior derecha)"],"sem":"verde","llamar":"Si sigue parpadeando: nos mandas la foto de los pilotos y lo traducimos a H antes de ir.","aviso":1},{"id":"e01-lavasecadora","cod":"E01 / H1","ap":"lavasecadora","keys":["E01","E1","H1"],"titulo":"Sensor de temperatura (lava en frío)","sig":"La sonda NTC del agua está en corto o abierta; misma electrónica que la lavadora.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre: sensor barato y mano de obra corta."},{"id":"e02-lavasecadora","cod":"E02 / H2","ap":"lavasecadora","keys":["E02","E2","H2"],"titulo":"No calienta el lavado (resistencia)","sig":"La resistencia de lavado no calienta (cal); el vapor SteamCure tampoco funcionará.","pasos":["Comprobar que el programa era con temperatura","Ciclo vacío a 60 ° con antical","Desenchufar 10 minutos"],"sem":"ambar","llamar":"Si sigue lavando en frío: resistencia."},{"id":"e04-lavasecadora","cod":"E04 / H4","ap":"lavasecadora","keys":["E04","E4","H4"],"titulo":"Exceso de llenado","sig":"Entra más agua de la debida: electroválvula o presostato.","pasos":["Cerrar el grifo","Ver si sigue entrando agua con la máquina apagada"],"sem":"ambar","llamar":"Siempre; grifo cerrado hasta la visita."},{"id":"e05-lavasecadora","cod":"E05 / H5","ap":"lavasecadora","keys":["E05","E5","H5"],"titulo":"No desagua","sig":"No vacía el agua en el tiempo previsto: filtro de la bomba o la bomba.","pasos":["Desenchufar y vaciar por la manguera de emergencia (tapa inferior derecha)","Limpiar el filtro de la bomba","Manguera de desagüe sin dobleces y sifón limpio"],"sem":"verde","llamar":"Filtro limpio y sigue → bomba de desagüe."},{"id":"e06-lavasecadora","cod":"E06 / H6 · E11","ap":"lavasecadora","keys":["E06","E6","H6","E11"],"titulo":"Motor: triac o tacómetro","sig":"Fallo del motor: triac de la placa (E06) o tacómetro/escobillas (E11).","pasos":["Desenchufar y comprobar que el tambor gira a mano"],"sem":"ambar","llamar":"Siempre; si el motor ProSmart tiene menos de 10 años registrados, te decimos si lo cubre Beko."},{"id":"e07-lavasecadora","cod":"E07 / H7","ap":"lavasecadora","keys":["E07","E7","H7"],"titulo":"Presostato (nivel de agua)","sig":"El sensor de nivel no da una lectura válida.","pasos":["Desenchufar 10 minutos","Manguera de desagüe no más alta de 1 m"],"sem":"ambar","llamar":"Si persiste: presostato o su tubo."},{"id":"e08-lavasecadora","cod":"E08","ap":"lavasecadora","keys":["E08","E8"],"titulo":"No entra agua o entra lenta","sig":"No alcanza el nivel de agua en el tiempo previsto.","pasos":["Grifo abierto del todo y manguera sin dobleces","Limpiar el filtro de la electroválvula con el grifo cerrado"],"sem":"verde","llamar":"Con presión normal y sigue → electroválvula."},{"id":"e09-lavasecadora","cod":"E09 / E10","ap":"lavasecadora","keys":["E09","E9","E10"],"titulo":"Puerta: bloqueo o cierre no detectado","sig":"Blocapuertas (E09) o puerta no detectada como cerrada (E10).","pasos":["Retirar ropa de la goma y cerrar con firmeza","Esperar 2 minutos tras el fin de programa"],"sem":"verde","llamar":"Si persiste: cierre eléctrico."},{"id":"e17-lavasecadora","cod":"E17","ap":"lavasecadora","keys":["E17"],"titulo":"Exceso de espuma","sig":"Demasiada espuma; la máquina se para para no rebosar.","pasos":["Dejar reposar 30 minutos","Aclarado sin detergente y reducir la dosis"],"sem":"verde","llamar":"Si aparece sin detergente: presostato."},{"id":"e18-lavasecadora","cod":"E18","ap":"lavasecadora","keys":["E18","UNB"],"titulo":"Carga desequilibrada (no centrifuga)","sig":"Ropa mal repartida: no centrifuga.","pasos":["Redistribuir la ropa","Nivelar las patas"],"sem":"verde","llamar":"Si pasa siempre con carga normal: amortiguadores."},{"id":"e01-lavavajillas","cod":"E01","ap":"lavavajillas","keys":["E01","E1"],"titulo":"No entra agua o agua en la base","sig":"Según la generación, E01 es \"no entra agua\" (DFN/DIN con pantalla) o el flotador de la base activado por una fuga. Mira las dos cosas.","pasos":["Grifo abierto, manguera sin dobleces y filtro de entrada limpio","Desenchufar e inclinarlo hacia atrás con cuidado: si sale agua por debajo, hay fuga"],"sem":"ambar","llamar":"Si sale agua por la base: siempre. Sin agua y con grifo bien: electroválvula."},{"id":"e02-lavavajillas","cod":"E02","ap":"lavavajillas","keys":["E02","E2"],"titulo":"Entrada de agua lenta o desagüe","sig":"Falta de agua o llenado lento; en algunos modelos, anomalía del desagüe. Revisa entrada y salida.","pasos":["Grifo abierto del todo y filtro de entrada limpio","Limpiar el filtro cilíndrico del fondo de la cuba","Manguera de desagüe y sifón sin obstrucción"],"sem":"verde","llamar":"Si persiste: electroválvula o bomba de desagüe."},{"id":"e03-lavavajillas","cod":"E03","ap":"lavavajillas","keys":["E03","E3"],"titulo":"No calienta (no seca)","sig":"El agua no alcanza la temperatura del programa: la vajilla sale fría y mojada.","pasos":["Ciclo vacío con limpiador de lavavajillas a 65 °","Desenchufar 20 minutos"],"sem":"ambar","llamar":"Si persiste: resistencia de paso o sonda NTC."},{"id":"e04-lavavajillas","cod":"E04","ap":"lavavajillas","keys":["E04","E4"],"titulo":"Exceso de agua / flotador","sig":"Demasiada agua en la cuba o el flotador de la base ha detectado una fuga.","pasos":["Cerrar el grifo y desenchufar","Comprobar si hay agua bajo el aparato"],"sem":"ambar","llamar":"Siempre."},{"id":"e05-lavavajillas","cod":"E05 / E06","ap":"lavavajillas","keys":["E05","E5","E06","E6"],"titulo":"Sonda de temperatura de la cuba","sig":"La sonda NTC de la cuba está abierta (E05) o en corto (E06). No confundir con el E05 de la lavadora, que es el desagüe.","pasos":["Desenchufar 20 minutos y probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e07-lavavajillas","cod":"E07 / E08","ap":"lavavajillas","keys":["E07","E7","E08","E8"],"titulo":"Sonda del calentador o caudalímetro","sig":"Sonda del calentador abierta o en corto; en algunos modelos, E07 es el caudalímetro.","pasos":["Desenchufar 20 minutos y probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e09-lavavajillas","cod":"E09","ap":"lavavajillas","keys":["E09","E9"],"titulo":"Comunicación entre placas / espera de llenado","sig":"Las placas no se comunican o el aparato espera agua por baja presión.","pasos":["Desenchufar 20 minutos","Comprobar la presión del grifo"],"sem":"ambar","llamar":"Si persiste."},{"id":"h2-lavavajillas","cod":"H2","ap":"lavavajillas","keys":["H2"],"titulo":"Sensor de turbidez sucio","sig":"El sensor que mide la suciedad del agua da una lectura anómala, casi siempre por restos en el fondo (modelos con LCD).","pasos":["Limpiar los filtros y el fondo de la cuba","Ciclo vacío con limpiador"],"sem":"verde","llamar":"Si vuelve con la cuba limpia: sensor de turbidez."},{"id":"h3-lavavajillas","cod":"H3 / H4","ap":"lavavajillas","keys":["H3","H4"],"titulo":"Válvula desviadora o sonda NTC","sig":"Fallo de la válvula que reparte el agua entre brazos (H3) o de la sonda de temperatura (H4), en modelos con LCD.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"h6-lavavajillas","cod":"H6","ap":"lavavajillas","keys":["H6"],"titulo":"Sin entrada de agua","sig":"El lavavajillas no recibe agua (modelos con LCD).","pasos":["Grifo abierto y manguera sin dobleces","Limpiar el filtro de entrada de la manguera"],"sem":"verde","llamar":"Con grifo y filtro bien → electroválvula."},{"id":"h5-lavavajillas","cod":"H5 / H7","ap":"lavavajillas","keys":["H5","H7"],"titulo":"Entrada de agua excesiva o calentamiento","sig":"Entra demasiada agua (H5) o el circuito de calentamiento falla (H7), en modelos con LCD.","pasos":[],"sem":"ambar","llamar":"Siempre; con H5, cierra el grifo hasta la visita."},{"id":"diferido-lavavajillas","cod":"H:01 – H:24","ap":"lavavajillas","keys":["H01","H02","H03","H12","H24","DIFERIDO","RETARDO"],"titulo":"No es un error: inicio diferido","sig":"H seguido de dos cifras (H:01 a H:24) es el inicio diferido en horas: el lavavajillas arrancará cuando pase ese tiempo.","pasos":["Mantener pulsado el botón de retardo o inicio diferido hasta que desaparezca la H","Volver a pulsar Inicio"],"sem":"verde","llamar":"Solo si desaparece la H y aun así no arranca.","aviso":1},{"id":"e0-frigorifico","cod":"E0","ap":"frigorifico","keys":["E0","E00"],"titulo":"Sensor de aire del congelador","sig":"La sonda que mide el aire del congelador falla: compresor y ventilador funcionan sin parar y la barra del congelador se apaga.","pasos":["Desenchufar 5 minutos y comprobar si vuelve"],"sem":"ambar","llamar":"Siempre (sensor NTC)."},{"id":"e1-frigorifico","cod":"E1","ap":"frigorifico","keys":["E1","E01"],"titulo":"Sensor del evaporador (desescarche)","sig":"La sonda del evaporador del congelador falla: el desescarche no se hace bien y aparece hielo.","pasos":["Desenchufar 5 minutos","Si hay hielo, vaciar y desescarchar un día entero con las puertas abiertas"],"sem":"ambar","llamar":"Siempre."},{"id":"e3-frigorifico","cod":"E3","ap":"frigorifico","keys":["E3","E03"],"titulo":"Sensor de aire del frigorífico","sig":"La sonda que mide el aire del compartimento frigorífico falla: la barra del frigorífico se apaga en la pantalla.","pasos":["Desenchufar 5 minutos y comprobar si vuelve"],"sem":"ambar","llamar":"Siempre (sensor NTC)."},{"id":"e4-frigorifico","cod":"E4","ap":"frigorifico","keys":["E4","E04"],"titulo":"Resistencia de desescarche","sig":"El desescarche no termina en el tiempo previsto (60 minutos en tres ciclos): resistencia o termofusible. Hielo en la pared y el frigorífico deja de enfriar.","pasos":["Vaciar y desescarchar un día entero con las puertas abiertas","Volver a enchufar y esperar unas horas a que estabilice"],"sem":"verde","llamar":"Si el hielo vuelve en dos semanas: resistencia o termofusible de desescarche."},{"id":"e8-frigorifico","cod":"E8 / E9","ap":"frigorifico","keys":["E8","E08","E9","E09"],"titulo":"Fábrica de hielo (americanos)","sig":"Sensor de la fábrica de hielo (E8) o su motor (E9), solo en los americanos GN/GNE con dispensador.","pasos":["Vaciar los cubitos y dejar la bandeja libre","Reiniciar la fábrica de hielo desde el panel"],"sem":"verde","llamar":"Si vuelve: sensor o motor de la fábrica de hielo."},{"id":"alarma-frigorifico","cod":"Alarma / termómetro rojo","ap":"frigorifico","keys":["ALARMA","TERMOMETRO","PITA","HIGHTEMP"],"titulo":"Temperatura demasiado alta","sig":"Aviso de alta temperatura (símbolo \"!\", termómetro rojo o HIGH TEMP): puerta abierta, carga grande o corte de luz. No es un código de avería.","pasos":["Cerrar bien la puerta y comprobar la junta","Esperar un día a que recupere temperatura","Pulsar el botón de alarma para silenciarla una vez comprobado"],"sem":"verde","llamar":"Si en un día no baja o salta sin causa: avería de frío.","aviso":1},{"id":"e0-congelador","cod":"E0","ap":"congelador","keys":["E0","E00"],"titulo":"Sensor de aire del congelador","sig":"La sonda de aire falla: compresor y ventilador no paran y la barra de temperatura se apaga (verticales con pantalla).","pasos":["Desenchufar 5 minutos y comprobar si vuelve"],"sem":"ambar","llamar":"Siempre (sensor NTC)."},{"id":"e1-congelador","cod":"E1","ap":"congelador","keys":["E1","E01"],"titulo":"Sensor del evaporador (desescarche)","sig":"La sonda del evaporador falla y el desescarche no se hace bien: aparece escarcha en un NoFrost.","pasos":["Desenchufar 5 minutos","Si hay hielo, vaciar y desescarchar un día entero"],"sem":"ambar","llamar":"Siempre."},{"id":"e4-congelador","cod":"E4","ap":"congelador","keys":["E4","E04"],"titulo":"Resistencia de desescarche","sig":"El desescarche no termina en el tiempo previsto: resistencia o termofusible. Escarcha y pierde frío.","pasos":["Vaciar y desescarchar un día entero con la puerta abierta","Volver a enchufar y esperar unas horas"],"sem":"verde","llamar":"Si la escarcha vuelve en dos semanas: resistencia o termofusible."},{"id":"alarma-congelador","cod":"Alarma / piloto rojo","ap":"congelador","keys":["ALARMA","PILOTO","PITA","TERMOMETRO"],"titulo":"Temperatura demasiado alta","sig":"Aviso de alta temperatura: puerta abierta, carga grande o corte de luz. En los arcones HSA es el piloto rojo. No es un código de avería.","pasos":["Cerrar bien la puerta y comprobar la junta","Esperar un día sin abrir","Silenciar la alarma desde el botón una vez comprobado"],"sem":"verde","llamar":"Si en un día no baja o salta sin causa: avería de frío.","aviso":1},{"id":"deposito-secadora","cod":"Símbolo depósito","ap":"secadora","keys":["DEPOSITO","TANQUE","WATERTANK","LLENO"],"titulo":"Depósito de condensados lleno","sig":"El depósito está lleno o la bomba no lo vacía. Es lo que ve el usuario en casi todas las Beko: un símbolo, no un código.","pasos":["Vaciar el depósito y limpiar su boquilla","Si va al sifón, manguera sin dobleces","Si salta con el depósito vacío en un ciclo: bomba o flotador"],"sem":"verde","llamar":"Se repite con el depósito vacío → bomba de condensados o flotador.","aviso":1},{"id":"filtro-secadora","cod":"Símbolo filtro","ap":"secadora","keys":["FILTRO","LIMPIAR","CLEANFILTER"],"titulo":"Filtro o condensador obstruido","sig":"El filtro de la puerta o el condensador inferior están saturados de pelusa: no seca y se calienta.","pasos":["Lavar el filtro de la puerta con agua y jabón","Lavar el condensador inferior con agua (bomba de calor: cepillar el evaporador suave)","Dejar secar 30 minutos antes de usar"],"sem":"verde","llamar":"Limpio y sigue → sensor de flujo de aire.","aviso":1},{"id":"e01-secadora","cod":"E01","ap":"secadora","keys":["E01","E1"],"titulo":"Puerta abierta durante el ciclo","sig":"La secadora no detecta la puerta cerrada o se ha abierto durante el programa.","pasos":["Cerrar hasta el clic","Retirar ropa del marco de la puerta"],"sem":"verde","llamar":"Si persiste: microinterruptor de la puerta."},{"id":"e02-secadora","cod":"E02","ap":"secadora","keys":["E02","E2"],"titulo":"Nivel de agua / depósito","sig":"Lectura contradictoria del nivel de condensados: depósito lleno o bomba que no vacía.","pasos":["Vaciar el depósito","Si va al sifón, manguera sin dobleces"],"sem":"verde","llamar":"Si persiste: bomba de condensados."},{"id":"e03-secadora","cod":"E03","ap":"secadora","keys":["E03","E3"],"titulo":"Resistencia / circuito térmico","sig":"Fallo en el circuito de calor: resistencia o termostatos (en bomba de calor, sonda del compresor).","pasos":["Pulsar el botón rojo de rearme trasero si tu modelo de condensación lo tiene"],"sem":"ambar","llamar":"Si vuelve a saltar: resistencia o termostato."},{"id":"e09-secadora","cod":"E09","ap":"secadora","keys":["E09","E9"],"titulo":"Electrónica / sobrecalentamiento","sig":"Fallo de alimentación o de la placa, a menudo tras un sobrecalentamiento.","pasos":["Desenchufar 20 minutos","Probar en otro enchufe"],"sem":"ambar","llamar":"Si persiste: módulo electrónico."},{"id":"e14-secadora","cod":"E14","ap":"secadora","keys":["E14"],"titulo":"Sube de temperatura demasiado rápido","sig":"El flujo de aire está bloqueado y la temperatura sube más deprisa de lo normal.","pasos":["Limpiar filtro y condensador a fondo","Dejar enfriar 30 minutos"],"sem":"verde","llamar":"Limpio y se repite: sonda NTC o resistencia."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"},"aire-acondicionado":{"id":"aire-acondicionado","nombre":"Aire acondicionado","art":"un aire acondicionado","slug":"aire-acondicionado"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      if (input.value.trim()) go(input.value); else if (res) { res.innerHTML = ''; }
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' ' + CONFIG.MARCA + '.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ---------- mini formulario del hero (landings de aparato) */
  function validaTel(tel) { var g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, ''); var ok = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !ok); return ok; }
  $$('.form-mini').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', f).value) return;
      var tel = $('[name=telefono]', f), rg = $('[name=rgpd]', f), gr = rg.closest('.f-g');
      var okTel = validaTel(tel); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = $('[name=aparato]', f).value, si = $('[name=sintoma]', f).value;
      var t = 'Hola, quiero que me llaméis. Aparato: ' + ap + ' ' + CONFIG.MARCA + '.' + (si ? ' Le pasa: ' + si.toLowerCase() + '.' : '') + (Z.get() ? ' Zona: ' + Z.get() + '.' : '') + ' Teléfono: ' + tel.value.trim() + '.';
      abreWA(t); f.hidden = true; var ok = $('.f-ok', f.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });
  var hfb = $('.hero-form-b');
  if (hfb) hfb.addEventListener('click', function () { var on = hfb.getAttribute('aria-expanded') === 'true'; hfb.setAttribute('aria-expanded', on ? 'false' : 'true'); hfb.parentNode.classList.toggle('on', !on); if (!on) setTimeout(function () { $('.form-mini [name=telefono]').focus({ preventScroll: false }); }, 50); });
  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'); Z.set(n);
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
  }
})();
