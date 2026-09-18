function esNombreValido(valor) {
  return typeof valor === "string" && valor.trim().length >= 3;
}

function esCorreoValido(valor) {
  return typeof valor === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

function esTelefonoValido(valor) {
  return typeof valor === "string" && /^[0-9]{10}$/.test(valor.trim());
}

function esClaveValida(valor) {
  return typeof valor === "string" && valor.length >= 8;
}

function esTerminosValida(marcado) {
  return marcado === true;
}

function validarCampo(input, validador, mensajeError) {
  // IMPORTANTE: limpiar el mensaje anterior antes de revisar de nuevo
  input.setCustomValidity("");

  var valido = validador(input.value);
  input.setCustomValidity(valido ? "" : mensajeError);

  if (typeof document !== "undefined") {
    var errorSpan = document.getElementById(input.id + "-error");
    if (errorSpan) errorSpan.textContent = valido ? "" : mensajeError;
  }
  return valido;
}

function validarSeleccion(checkbox, mensajeError) {
  var valido = esTerminosValida(checkbox.checked);
  var errorSpan = document.getElementById(checkbox.id + "-error");
  if (errorSpan) errorSpan.textContent = valido ? "" : mensajeError;
  return valido;
}

function validarFormulario() {
  var resultado = true;
  resultado = validarCampo(nombre, esNombreValido, "Escribe tu nombre completo (mínimo 3 letras).") && resultado;
  resultado = validarCampo(correo, esCorreoValido, "Escribe un correo electrónico válido.") && resultado;
  resultado = validarCampo(telefono, esTelefonoValido, "El teléfono debe tener exactamente 10 dígitos.") && resultado;
  resultado = validarCampo(clave, esClaveValida, "La contraseña debe tener al menos 8 caracteres.") && resultado;
  resultado = validarSeleccion(terminos, "Debes aceptar los términos y condiciones.") && resultado;
  return resultado;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    esNombreValido: esNombreValido,
    esCorreoValido: esCorreoValido,
    esTelefonoValido: esTelefonoValido,
    esClaveValida: esClaveValida,
    esTerminosValida: esTerminosValida,
    validarCampo: validarCampo
  };
}

if (typeof document !== "undefined") {
  var form = document.getElementById("registro");
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
  terminos.addEventListener("change", function () {
    validarSeleccion(terminos, "Debes aceptar los términos y condiciones.");
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var mensajeExito = document.getElementById("mensajeExito");
    if (validarFormulario()) {
      mensajeExito.textContent = "¡Tu cuenta fue creada correctamente!";
      form.reset();
      var errores = document.querySelectorAll(".mensaje-error");
      for (var i = 0; i < errores.length; i++) {
        errores[i].textContent = "";
      }
    } else {
      mensajeExito.textContent = "";
    }
  });
}