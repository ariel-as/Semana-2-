const { test } = require("node:test");
const assert = require("node:assert");

const {
  esNombreValido,
  esCorreoValido,
  esTelefonoValido,
  esClaveValida
} = require("../app.js");

test("esNombreValido acepta nombres de 3 o más letras", () => {
  assert.strictEqual(esNombreValido("Ana"), true);
  assert.strictEqual(esNombreValido("Ariel Alejandro"), true);
  assert.strictEqual(esNombreValido("  Ana María  "), true);
});

test("esNombreValido rechaza nombres cortos o vacíos", () => {
  assert.strictEqual(esNombreValido("An"), false);
  assert.strictEqual(esNombreValido(""), false);
  assert.strictEqual(esNombreValido("   "), false);
});

test("esCorreoValido acepta correos válidos", () => {
  assert.strictEqual(esCorreoValido("usuario@dominio.com"), true);
  assert.strictEqual(esCorreoValido("a.b+etiqueta@sub.dominio.io"), true);
});

test("esCorreoValido rechaza correos inválidos", () => {
  assert.strictEqual(esCorreoValido("usuario@"), false);
  assert.strictEqual(esCorreoValido("@dominio.com"), false);
  assert.strictEqual(esCorreoValido("usuario dominio.com"), false);
  assert.strictEqual(esCorreoValido(""), false);
});

test("esTelefonoValido acepta exactamente 10 dígitos", () => {
  assert.strictEqual(esTelefonoValido("0999999999"), true);
});

test("esTelefonoValido rechaza teléfonos inválidos", () => {
  assert.strictEqual(esTelefonoValido("099999999"), false);
  assert.strictEqual(esTelefonoValido("09999999999"), false);
  assert.strictEqual(esTelefonoValido("99a9999999"), false);
  assert.strictEqual(esTelefonoValido(""), false);
});

test("esClaveValida acepta contraseñas de 8 o más caracteres", () => {
  assert.strictEqual(esClaveValida("abcdefgh"), true);
  assert.strictEqual(esClaveValida("abcdefghijk"), true);
});

test("esClaveValida rechaza contraseñas cortas o vacías", () => {
  assert.strictEqual(esClaveValida("abc"), false);
  assert.strictEqual(esClaveValida(""), false);
});