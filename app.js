function esNombreValido(valor) {
  return valor.trim().length >= 3;
}

function esCorreoValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

function esTelefonoValido(valor) {
  return /^[0-9]{10}$/.test(valor.trim());
}

function esClaveValida(valor) {
  return valor.length >= 8;
}

function validarCampo(input, validador, mensajeError) {
  // IMPORTANTE: limpiar el mensaje anterior antes de revisar de nuevo
  input.setCustomValidity("");

  var valido = validador(input.value);
  if (!valido) {
    input.setCustomValidity(mensajeError);
  }

  var errorSpan = document.getElementById(input.id + "-error");
  if (errorSpan) errorSpan.textContent = valido ? "" : mensajeError;
  return valido;
}

if (typeof document !== "undefined") {
  var nombre = document.getElementById("nombre");
  var correo = document.getElementById("correo");
  var telefono = document.getElementById("telefono");
  var clave = document.getElementById("clave");
  var terminos = document.getElementById("terminos");

  nombre.addEventListener("blur", function () {
    validarCampo(nombre, esNombreValido, "Escribe tu nombre completo (mínimo 3 letras).");
  });
  correo.addEventListener("blur", function () {
    validarCampo(correo, esCorreoValido, "Escribe un correo electrónico válido.");
  });
  telefono.addEventListener("blur", function () {
    validarCampo(telefono, esTelefonoValido, "El teléfono debe tener exactamente 10 dígitos.");
  });
  clave.addEventListener("blur", function () {
    validarCampo(clave, esClaveValida, "La contraseña debe tener al menos 8 caracteres.");
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    esNombreValido: esNombreValido,
    esCorreoValido: esCorreoValido,
    esTelefonoValido: esTelefonoValido,
    esClaveValida: esClaveValida,
    validarCampo: validarCampo
  };
}