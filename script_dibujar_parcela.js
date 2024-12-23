// CONSTANTES -------------------------------------------------------------

const factorAumento = 500; //Factor de aumento para visualizar la parcela más grande
const parcela = JSON.parse(localStorage.getItem('nombreParcela')); // Obtiene el nombre de la parcela desde el formulario
const anchoCanvas = parcela._parcelaAncho * factorAumento; // Ancho de la parcela
const altoCanvas = parcela._parcelaAlto * factorAumento; // Alto de la parcela
const container = document.getElementById('dibujo-parcela'); // Obtiene el contenedor del stage que es donde se dibujará la parcela

//------------------------------------------------------------------------




// Función para ajustar el tamaño del stage al tamaño del contenedor
function ajustarMedidasStage() {
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Aplicamos las medidas
  stage.width(width);
  stage.height(height);
}

// Crear el stage
let stage = new Konva.Stage({
  container: 'dibujo-parcela',
  width: container.offsetWidth,
  height: container.offsetHeight,
  draggable: true,
});

// Cambiamos el estilo del cursor según la ubicación de nuestro ratón
stage.on('mouseenter', function () {
  stage.container().style.cursor = 'move';
});

stage.on('mouseleave', function () {
  stage.container().style.cursor = 'default';
});

// Ajustamos el tamaño del stage al tamaño del contenedor al cargar la página
ajustarMedidasStage();

// Ajustar el tamaño del stage cuando la ventana cambia de tamaño
window.addEventListener('resize', ajustarMedidasStage);

// Añadimos una serie de capas al stage
let baseLayer = new Konva.Layer();
stage.add(baseLayer);

let layer = new Konva.Layer();
stage.add(layer);


//Dibujamos el terreno de la parcela (de color marrón)
let superficieParcela = new Konva.Rect({
    x: container.offsetWidth/2 - anchoCanvas/2,
    y: container.offsetHeight/2 - altoCanvas/2,
    width: anchoCanvas,
    height: altoCanvas,
    fill: '#C4A98A',
    stroke: '#C4A98A',
    strokeWidth: 20,
  });
  // Añadimos la parcela a la capa base
  baseLayer.add(superficieParcela);

  let gridGroup = new Konva.Group();

// Bucle for que dibuja el grid sobre la parcela
// Se han establecido las medidas para que el metro de parcela se divida cada 4 centimetros (100cm / 25 = 4cm)
// Por ejemplo, un tomate ocupa como mínimo 60 cm, que equivale a 15 cuadrados (4x15 = 60)
for(let j = 0; j < (25 * parcela._parcelaAlto); j++){
  for(let i = 0; i < (25 * parcela._parcelaAncho); i++){
      let slotParcela = new Konva.Rect({
          x: container.offsetWidth/2 - anchoCanvas/2 + (i*20),
          y: container.offsetHeight/2 - altoCanvas/2 + (j*20),
          width: 20,
          height: 20,
          fill: 'transparent',
          stroke: 'white',
          strokeWidth: 1,
          opacity: 1,
          cornerRadius: 0,
          draggable: false,
        });
        gridGroup.add(slotParcela);  // Añadir el rectángulo al grupo
      }
}
layer.add(gridGroup); // Añadir el grupo a la capa


// Capa temporal superior a la que pasamos los cultivos cuando los arrastramos
let tempLayer = new Konva.Layer();
stage.add(tempLayer);

// Agregamos el listener para el botón que muestra u oculta las guias
const botonVisibilidadGuias = document.getElementById('visibilidadGuias');
const textoBotonVisibilidadGuias = document.getElementById('textoBotonVisibilidadGuias');

// El estado de visibilidad de las guías inicial es verdadero
let estadoVisibilidadGuias = true;

function visibilidadGuias() {
  if (estadoVisibilidadGuias) {
    gridGroup.hide();  // Ocultamos el grupo del grid
    estadoVisibilidadGuias = false;  // Actualizamos el estado de visibilidad
    textoBotonVisibilidadGuias.innerHTML = "Mostrar guias"; // Modificamos el texto del botón

  } else {
    gridGroup.show();  // Mostramos el grupo del grid
    estadoVisibilidadGuias = true;  // Actualizamos el estado de visibilidad
    textoBotonVisibilidadGuias.innerHTML = "Ocultar guias"; // Modificamos el texto del botón

  }
  
  layer.batchDraw();  // Redibujar la capa para aplicar los cambios (Aunque como en otras ocasiones, no es estrictamente necesario)
}



// ZOOM IN Y ZOOM OUT DE LA PARCELA  ---------------------------------------------------------------------------------------------------------------
// Código aprovechado y modificado de la demo de Konva - Zooming stage relative to pointer position (https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html)
let scaleBy = 1.3; // Unidades incrementales del zoom in y out
stage.on('wheel', (e) => {
  // Detiene el scroll por defecto
  e.evt.preventDefault();

  let oldScale = stage.scaleX();
  let pointer = stage.getPointerPosition();

  let mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  // Fórmula para calcular el cambio de zoom in y out
  let direction = e.evt.deltaY > 0 ? 1 : -1;

  if (e.evt.ctrlKey) {
    direction = -direction;
  }

  let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });
  
  
  let newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };


  console.log(newScale);


  stage.position(newPos);
});

// -------------------------------------------------------------------------------------------------------------------------------------------------