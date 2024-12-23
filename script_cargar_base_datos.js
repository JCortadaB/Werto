// CARGAR BASE DE DATOS CULTIVOS-------------------------------------------------------------------------------------------------

// Este script carga los datos que contiene el documento json y los distribuye
// mediante el DOM en el listado que hay a la izquierda de la aplicación

const url = "./data.json";

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const container = document.querySelector("#listado-cultivos");
    const containerFiltrado = document.querySelector(
      "#listado-cultivos-filtrados"
    );

    data.forEach((cultivo) => {
      //LISTADO DE CULTIVOS COMPLETO SIN FILTRAR---------------------------------------
      const li = document.createElement("li");
      li.classList.add("detalles-cultivo" + "-" + cultivo.nombre);
      li.setAttribute("ficha-cultivo", cultivo.nombre);
      li.addEventListener("click", fichaCultivoOculta);
      container.appendChild(li);

      const nombreCultivo = document.createElement("h3");
      nombreCultivo.classList.add("nombre-cultivo");
      nombreCultivo.textContent = cultivo.nombre;
      li.appendChild(nombreCultivo);

      const imagenCultivo = document.createElement("img");
      imagenCultivo.classList.add("imagen-cultivo");
      imagenCultivo.src = cultivo.imagen;
      imagenCultivo.draggable = true;
      li.appendChild(imagenCultivo);

      const cultivoDetalladoDIV = document.createElement("div");
      cultivoDetalladoDIV.classList.add("cultivo-detallado");
      li.appendChild(cultivoDetalladoDIV);
      cultivoDetalladoDIV.style.display = "none";

      const espacioCultivo = document.createElement("p");
      espacioCultivo.classList.add("espacio-cultivo");
      espacioCultivo.innerHTML = "<strong>Espacio:</strong> " + cultivo.espacio;
      cultivoDetalladoDIV.appendChild(espacioCultivo);

      const tiempoCrecimientooCultivo = document.createElement("p");
      tiempoCrecimientooCultivo.classList.add("tiempo-crecimiento-cultivo");
      tiempoCrecimientooCultivo.innerHTML =
        "<strong>Tiempo de crecimiento:</strong> " + cultivo.tiempo_crecimiento;
      cultivoDetalladoDIV.appendChild(tiempoCrecimientooCultivo);

      const sustratoCultivo = document.createElement("p");
      sustratoCultivo.classList.add("sustrato-cultivo");
      sustratoCultivo.innerHTML =
        "<strong>Sustrato:</strong> " + cultivo.necesidades.sustrato;
      cultivoDetalladoDIV.appendChild(sustratoCultivo);

      const aguaCultivo = document.createElement("p");
      aguaCultivo.classList.add("agua-cultivo");
      aguaCultivo.innerHTML =
        "<strong>Riego:</strong> " + cultivo.necesidades.agua;
      cultivoDetalladoDIV.appendChild(aguaCultivo);

      const phCultivo = document.createElement("p");
      phCultivo.classList.add("ph-cultivo");
      phCultivo.innerHTML =
        "<strong>PH:</strong> " +
        (cultivo.necesidades.phMin + " - " + cultivo.necesidades.phMax);
      cultivoDetalladoDIV.appendChild(phCultivo);

      const terrenoCultivo = document.createElement("p");
      terrenoCultivo.classList.add("terreno-cultivo");
      terrenoCultivo.innerHTML =
        "<strong>Tipo de terreno:</strong> " +
        cultivo.terreno_compatible.join(", ");
      cultivoDetalladoDIV.appendChild(terrenoCultivo);

      const epocaSiembraCultivo = document.createElement("p");
      epocaSiembraCultivo.classList.add("epoca-siembra-cultivo");
      epocaSiembraCultivo.innerHTML =
        "<strong>Época de siembra:</strong> " + cultivo.epoca_siembra;
      cultivoDetalladoDIV.appendChild(epocaSiembraCultivo);

      const epocaCosechaaCultivo = document.createElement("p");
      epocaCosechaaCultivo.classList.add("epoca-cosecha-cultivo");
      epocaCosechaaCultivo.innerHTML =
        "<strong>Época de cosecha:</strong> " + cultivo.epoca_cosecha;
      cultivoDetalladoDIV.appendChild(epocaCosechaaCultivo);

      const notasAdicionalesCultivo = document.createElement("p");
      notasAdicionalesCultivo.classList.add("notas-adicionales-cultivo");
      notasAdicionalesCultivo.innerHTML =
        "<strong>Notas adicionales:</strong> " + cultivo.notas_adicionales;
      cultivoDetalladoDIV.appendChild(notasAdicionalesCultivo);

      //REVISIÓN IDEONEIDAD CULTIVO ---------------------------------------
      // Obtiene la parcela desde el localStorage
      const parcela = JSON.parse(localStorage.getItem("nombreParcela")) || {};

      // Obtiene el ph de la parcela o asigna un valor predeterminado en caso de que esté vacío
      const phParcelaParaFiltraje = !isNaN(parseFloat(parcela._parcelaPH))
        ? parseFloat(parcela._parcelaPH)
        : 6.5;

      //LISTADO CULTIVOS FILTRADOS -------------------------------------------
      // Validamos si el ph está dentro del rango definido por el cultivo
      // y en caso afirmativo lo añadimos al listado de cultivos filtrados

      //LISTADO DE CULTIVOS FILTRADOS---------------------------------------
      if (
        phParcelaParaFiltraje >= parseFloat(cultivo.necesidades.phMin) &&
        phParcelaParaFiltraje <= parseFloat(cultivo.necesidades.phMax)
      ) {
        const li = document.createElement("li");
        li.classList.add("detalles-cultivo" + "-" + cultivo.nombre);
        li.setAttribute("ficha-cultivo", cultivo.nombre);
        li.addEventListener("click", fichaCultivoOculta);
        containerFiltrado.appendChild(li);

        const nombreCultivo = document.createElement("h3");
        nombreCultivo.classList.add("nombre-cultivo");
        nombreCultivo.textContent = cultivo.nombre;
        li.appendChild(nombreCultivo);

        const imagenCultivo = document.createElement("img");
        imagenCultivo.classList.add("imagen-cultivo");
        imagenCultivo.src = cultivo.imagen;
        imagenCultivo.draggable = true;
        li.appendChild(imagenCultivo);

        const cultivoDetalladoDIV = document.createElement("div");
        cultivoDetalladoDIV.classList.add("cultivo-detallado");
        li.appendChild(cultivoDetalladoDIV);
        cultivoDetalladoDIV.style.display = "none";

        const espacioCultivo = document.createElement("p");
        espacioCultivo.classList.add("espacio-cultivo");
        espacioCultivo.innerHTML =
          "<strong>Espacio:</strong> " + cultivo.espacio;
        cultivoDetalladoDIV.appendChild(espacioCultivo);

        const tiempoCrecimientooCultivo = document.createElement("p");
        tiempoCrecimientooCultivo.classList.add("tiempo-crecimiento-cultivo");
        tiempoCrecimientooCultivo.innerHTML =
          "<strong>Tiempo de crecimiento:</strong> " +
          cultivo.tiempo_crecimiento;
        cultivoDetalladoDIV.appendChild(tiempoCrecimientooCultivo);

        const sustratoCultivo = document.createElement("p");
        sustratoCultivo.classList.add("sustrato-cultivo");
        sustratoCultivo.innerHTML =
          "<strong>Sustrato:</strong> " + cultivo.necesidades.sustrato;
        cultivoDetalladoDIV.appendChild(sustratoCultivo);

        const aguaCultivo = document.createElement("p");
        aguaCultivo.classList.add("agua-cultivo");
        aguaCultivo.innerHTML =
          "<strong>Riego:</strong> " + cultivo.necesidades.agua;
        cultivoDetalladoDIV.appendChild(aguaCultivo);

        const phCultivo = document.createElement("p");
        phCultivo.classList.add("ph-cultivo");
        phCultivo.innerHTML =
          "<strong>PH:</strong> " +
          (cultivo.necesidades.phMin + " - " + cultivo.necesidades.phMax);
        cultivoDetalladoDIV.appendChild(phCultivo);

        const terrenoCultivo = document.createElement("p");
        terrenoCultivo.classList.add("terreno-cultivo");
        terrenoCultivo.innerHTML =
          "<strong>Tipo de terreno:</strong> " +
          cultivo.terreno_compatible.join(", ");
        cultivoDetalladoDIV.appendChild(terrenoCultivo);

        const epocaSiembraCultivo = document.createElement("p");
        epocaSiembraCultivo.classList.add("epoca-siembra-cultivo");
        epocaSiembraCultivo.innerHTML =
          "<strong>Época de siembra:</strong> " + cultivo.epoca_siembra;
        cultivoDetalladoDIV.appendChild(epocaSiembraCultivo);

        const epocaCosechaaCultivo = document.createElement("p");
        epocaCosechaaCultivo.classList.add("epoca-cosecha-cultivo");
        epocaCosechaaCultivo.innerHTML =
          "<strong>Época de cosecha:</strong> " + cultivo.epoca_cosecha;
        cultivoDetalladoDIV.appendChild(epocaCosechaaCultivo);

        const notasAdicionalesCultivo = document.createElement("p");
        notasAdicionalesCultivo.classList.add("notas-adicionales-cultivo");
        notasAdicionalesCultivo.innerHTML =
          "<strong>Notas adicionales:</strong> " + cultivo.notas_adicionales;
        cultivoDetalladoDIV.appendChild(notasAdicionalesCultivo);
      } else {
        console.log("El ph de la parcela NO es apto para: " + cultivo.nombre);
      }
    });
  } catch (error) {
    console.error("Error al obtener los datos JSON:", error);
  }
}
fetchData();
// -------------------------------------------------------------------------------------------------------------

// FILTRAR CULTIVOS -----------------------------------------------------------------------------------------------
// Esta función se utiliza en el buscador de cultivos que hay sobre el listado.
function filtrarCultivos() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("filtro-cultivos");
  filter = input.value.toUpperCase();
  ul = document.getElementById("listado-cultivos");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h3")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
// -------------------------------------------------------------------------------------------------------------

// GESTOR ARRASTRAR CULTIVOS A LA PARCELA ----------------------------------------------------------------------------------------
// Este serie de funciones de Konva se utilizan para controlar el drag-and-drop desde el listado de cultivos hasta el canvas
let itemURL = "";
let idCultivo = "";
const misCultivos = [];

// Eventos asociados al listado de cultivos completos
document
  .getElementById("listado-cultivos")
  .addEventListener("dragstart", function (e) {
    itemURL = e.target.src; // URL de la imagen del cultivo
    const liElement = e.target.closest("li"); // Encuentra el <li> padre más cercano del puntero
    if (liElement) {
      idCultivo = liElement.getAttribute("ficha-cultivo"); // Obtiene el atributo 'ficha-cultivo'
    }
  });

// Eventos asociados al listado de cultivos filtrados
document
  .getElementById("listado-cultivos-filtrados")
  .addEventListener("dragstart", function (e) {
    itemURL = e.target.src; // URL de la imagen del cultivo
    const liElement = e.target.closest("li"); // Encuentra el <li> padre más cercano del puntero
    if (liElement) {
      idCultivo = liElement.getAttribute("ficha-cultivo"); // Obtiene el atributo 'ficha-cultivo'
    }
  });

let con = stage.container();
//Evento de Konva que se dispara al arrastrar un elemento sobre el contenedor del canvas (Stage)
con.addEventListener("dragover", function (e) {
  e.preventDefault();
});

//Evento que ubica en las coordenadas donde el usuario ha arrastrado el cultivo la imagen de este
//generando adicionalmente una serie de modificaciones (Ver a continuación)
con.addEventListener("drop", function (e) {
  e.preventDefault();
  stage.setPointersPositions(e); //Obtenemos las coordenadas del pointer

  let img = new Image();
  img.src = itemURL;

  img.onload = async function () {
    const data = await fetch(url).then((res) => res.json());
    const cultivo = data.find((c) => c.nombre === idCultivo); //Buscamos en nuestro JSON según el nombre del cultivo

    // Ubicamos la propiedad del espacio que ocupa el cultivo
    // Y lo convertimos a píxeles usando el primer valor como referencia
    const espacio = cultivo.espacio.match(/\d+/); // Con esta expresión extraemos la primera cifra entera
    const espacioPx = espacio ? parseInt(espacio[0]) * 5 : 400; // Y la escalamos para que sea proporcional a los valores de nuestro canvas

    //Escalamos la imagen para ajustarla al canvas/stage
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const maxWidth = 25;
    const maxHeight = 25;

    let width = naturalWidth;
    let height = naturalHeight;

    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = naturalWidth / naturalHeight;
      if (width > height) {
        width = maxWidth;
        height = width / aspectRatio;
      } else {
        height = maxHeight;
        width = height * aspectRatio;
      }
    }

    // Creamos un grupo para la imagen y el circulo de fondo que contiene las medidas del espacio que ocupa el cultivo
    // Se utilizan las coordenadas de la posición respecto al stage de Konva
    // Así como que se puede arrastrar y el id asociado al cultivo. Esto nos permite después eliminarlo y también tener un
    // control de que cultivos hemos añadido a la parcela, que nos sirve despues para preparar las fichas en formato pdf
    let group = new Konva.Group({
      x: Math.round(stage.getPointerPosition().x),
      y: Math.round(stage.getPointerPosition().y),
      draggable: true,
      id: idCultivo,
    });

    // Propiedades del círculo de fondo con el tamaño ajustado al espacio entre cultivos
    let espaciadoCultivo = new Konva.Rect({
      x: 0,
      y: 0,
      width: espacioPx,
      height: espacioPx,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 1,
      opacity: 1,
      cornerRadius: espacioPx,
    });

    // Incorporar la imagen del cultivo
    Konva.Image.fromURL(itemURL, function (image) {
      image.width(width);
      image.height(height);
      image.x((espaciadoCultivo.width() - width) / 2); // Centramos la imagen en el círculo en el eje X
      image.y((espaciadoCultivo.height() - height) / 2); // Centramos la imagen en el círculo en el eje Y
      image.name(idCultivo); // ID específico para cada cultivo

      // Añadimos la imagen del cultivo y su circulo de espacio al grupo
      group.add(espaciadoCultivo);
      group.add(image);

      // Y finalmente añadimos el grupo a la capa del stage de Konva
      layer.add(group);
    });

    // Guardamos el nombre del cultivo en el array
    // En este array los cultivos se duplican para evitar que al eliminarlos mediante clickderecho el array
    // se quede vacío. Cuando se preparan las fichas por cada cultivo, el array se filtra para eliminar duplicados
    // pero conservamos nuestro historial completo sin alterar
    if (idCultivo) {
      misCultivos.push(idCultivo);
      console.log("Cultivos arrastrados al canvas:", misCultivos);
    }
  };
});
// -------------------------------------------------------------------------------------------------------------

// CANVAS DROP EVENTS ---------------------------------------------------------------------------------------------
// Código aprovechado y modificado del tutorial de Konva Drag and Drop Multiple Shapes
// (https://konvajs.org/docs/sandbox/Drag_and_Drop_Multiple_Shapes.html)
// Control de arrastre para el stage que afecta a los grupos creados
stage.on("dragstart", function (e) {
  console.log("dragstart");
  if (e.target instanceof Konva.Group) {
    // Movemos el grupo a una capa temporal, lo que nos permite superponerlos a los otros elementos
    // y así evitamos que algunos cultivos estén siempre encima de otros
    e.target.moveTo(tempLayer);
    layer.draw();
  }
});

let previousShape; // Variable para rastrear la forma anterior

//Función que monitorea cuando se está moviendo un grupo sobre el stage
stage.on("dragmove", function (evt) {
  console.log("dragmove");
  if (evt.target instanceof Konva.Group) {
    // Evento que solo afecta a grupos
    let pos = stage.getPointerPosition(); // Obtiene la posición actual del puntero
    let shape = layer.getIntersection(pos); // Obtiene la forma en la que el puntero está actualmente situado

    if (previousShape && shape) {
      if (previousShape !== shape) {
        previousShape.fire("dragleave", { evt: evt.evt }, true);
        shape.fire("dragenter", { evt: evt.evt }, true);
        previousShape = shape;
      } else {
        previousShape.fire("dragover", { evt: evt.evt }, true);
      }
    } else if (!previousShape && shape) {
      previousShape = shape;
      shape.fire("dragenter", { evt: evt.evt }, true);
    } else if (previousShape && !shape) {
      previousShape.fire("dragleave", { evt: evt.evt }, true);
      previousShape = undefined;
    }
  }
});

stage.on("dragend", function (e) {
  if (e.target instanceof Konva.Group) {
    let pos = stage.getPointerPosition();
    let shape = layer.getIntersection(pos);

    if (shape) {
      previousShape.fire("drop", { evt: e.evt }, true);
    }
    previousShape = undefined;
    e.target.moveTo(layer); // Devolvemos el grupo a su capa original
    console.log("dragend");
  }
});
// -------------------------------------------------------------------------------------------------------------

// CONTROL VISIBILIDAD DE LA FICHA DE CADA CULTIVO --------------------------------------------------------------------
// Función que se encarga de modificar la visibilidad de la ficha ampliada del
// listado de cultivos al hacer click sobre este
function fichaCultivoOculta() {
  let detalles = this.querySelector(".cultivo-detallado");
  if (detalles.style.display === "none") {
    detalles.style.display = "block";
  } else {
    detalles.style.display = "none";
  }
}
// -------------------------------------------------------------------------------------------------------------------

// CONTROL TABS CULTIVOS --------------------------------------------------------------------------------------------
// Código aprovechado y modificado de W3Schools How to - Tabs (https://www.w3schools.com/howto/howto_js_tabs.asp)
function openTab(evt, listadoCultivos) {
  // Declaración de las variables asociadas a las pestañas (tabs)
  let i, tabcontent, tablinks;

  // Selecciona los diferentes elementos con la clase "tabcontent" y las esconde de forma predefinida
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Selecciona y elimina la clase "active" a los diferentes elementos con la clase "tablinks"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Muestra la "tab" actual, y añade la clase "active" al botón que abre el "tab"
  document.getElementById(listadoCultivos).style.display = "block";
  evt.currentTarget.className += " active";
}
// Selecciona los elementos con id "defaultOpen" y los activa
document.getElementById("defaultOpen").click();
// -------------------------------------------------------------------------------------------------------------

// ELIMINAR CULTIVOS AÑADIDOS A LA PARCELA -----------------------------------------------------------------------
// Funciones y eventos que controlan la eliminación de cultivos de la parcela en el stage
let currentShape;
let menuNode = document.getElementById("menu");

// Mantenemos una referencia al grupo actualmente seleccionado
let currentGroup;
let selectedCrop;

// Evento de clic que maneja la selección de grupos
stage.on("click", function (e) {
  if (e.target instanceof Konva.Image) {
    currentGroup = e.target.getParent(); // Obtenemos el grupo padre del objeto seleccionado
    selectedCrop = e.target.attrs.name; // Extraemos el nombre del target
  }
});

// Evento de clic para eliminar el grupo seleccionado
document.getElementById("delete-button").addEventListener("click", () => {
  if (currentGroup instanceof Konva.Group) {
    console.log("Has eliminado una instancia de: " + selectedCrop);
    misCultivos.splice(misCultivos.indexOf(selectedCrop), 1);
    console.log(misCultivos);
    currentGroup.destroy(); // Destruimos el grupo completamente
    // Redibujamos la capa para actualizar la vista
    // No es imprescindible porque la versión de Konva actual ya efectua batchDraw de forma automática
    // Pero se ha preferido dejar como una medida extra de seguridad
    layer.batchDraw();
  }
});

// Estos eventos controlan la visibilidad del botón que nos permite eliminar el cultivo
// seleccionado con click derecho, así como su ubicación en el stage
window.addEventListener("click", () => {
  menuNode.style.display = "none";
});

stage.on("contextmenu", function (e) {
  e.evt.preventDefault();
  if (e.target === stage) {
    return;
  }
  currentShape = e.target;
  menuNode.style.display = "initial";
  let containerRect = stage.container().getBoundingClientRect();
  menuNode.style.top = containerRect.top + stage.getPointerPosition().y + "px";
  menuNode.style.left =
    containerRect.left + stage.getPointerPosition().x + "px";
});
// -------------------------------------------------------------------------------------------------------------
