// Funciones y eventos de la guía del formulario

// Cada vez que el usuario establece el foco o interactua con los parámetros de cada campo del formulario el texto
// y la imagen del formulario lateral cambian, ofreciendo algunos consejos al usuario.
const textoGuiaFormulario = document.getElementById("texto-guia-formulario");
const imagenGuiaFormulario = document.getElementById("imagen-guia-formulario");

function guiaFormularioUno() {
  //NOMBRE PARCELA
  textoGuiaFormulario.textContent =
    'Asigna un nombre para identificar fácilmente esta parcela. Puede ser algo descriptivo y concreto, como "Parcela de Tomates", o más creativo, como "Huerto de Verano".';
  imagenGuiaFormulario.src = "./images/guia/guia02.png";
}

function guiaFormularioDos() {
  //ANCHO PARCELA
  textoGuiaFormulario.textContent =
    "Introduce el ancho de tu parcela en metros. Esto nos ayudará a planificar el espacio necesario para tus cultivos.";
  imagenGuiaFormulario.src = "./images/guia/guia03.png";
}

function guiaFormularioTres() {
  //LARGO PARCELA
  textoGuiaFormulario.textContent =
    "Especifica el largo de tu parcela en metros. Esta medida es clave para calcular el área total disponible.";
  imagenGuiaFormulario.src = "./images/guia/guia04.png";
}

function guiaFormularioCuatro() {
  //ORIENTACIÓN
  textoGuiaFormulario.textContent =
    "Selecciona hacia dónde está orientada tu parcela. Esto afecta la cantidad de luz solar que recibirán tus cultivos.";
  imagenGuiaFormulario.src = "./images/guia/guia05.png";
}

function guiaFormularioCinco() {
  //PH DEL SUSTRATO
  textoGuiaFormulario.textContent =
    "Introduce el rango aproximado del ph de tu sustrato. Esto ayudará a sugerir cultivos que se adapten mejor a tu suelo.";
  imagenGuiaFormulario.src = "./images/guia/guia06.png";
}

function guiaFormularioSeis() {
  //TIPO DE TERRENO
  textoGuiaFormulario.textContent =
    "Indica el tipo de terreno de la parcela. Esto influirá en el riego y la fertilidad del suelo.";
  imagenGuiaFormulario.src = "./images/guia/guia07.png";
}

//-----------------------------------------------------------------------------------------------------------

// GUIA LATERAL PH SUSTRATO -------------------------------------------------------------------------------
// Esta función añade un texto que acompaña al valor del ph del sustrato para mejorar el entendimiento
// del valor de este campo
function guiaPhSustrato() {
  const textoGuiaFormulario = document.getElementById("guiaPhComplementaria");
  let phIntroducidoPorUsuario = parseFloat(
    document.getElementById("phParcela").value
  );
  if (phIntroducidoPorUsuario < 6.5) {
    textoGuiaFormulario.textContent = "Ácido";
  } else if (phIntroducidoPorUsuario > 7.5) {
    textoGuiaFormulario.textContent = "Alcalino";
  } else {
    textoGuiaFormulario.textContent = "Neutro";
  }
}
//-----------------------------------------------------------------------------------------------------------