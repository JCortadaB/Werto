// Este script se encarga de la exportación del stage y las fichas de cultivos seleccionadas en formato PDF
// Código aprovechado y modificado de Konva - How to convert canvas to pdf (https://konvajs.org/docs/sandbox/Canvas_to_PDF.html)
document.getElementById('save').addEventListener('click', async function () {
  let pdf = new jsPDF('l', 'px', [stage.width() + 200, stage.height() + 200]);
  pdf.setTextColor('#000000');

  // Agregar los textos del canvas Konva
  stage.find('Text').forEach((text) => {
    const size = text.fontSize() / 0.75; // convertir píxeles a puntos
    pdf.setFontSize(size);
    pdf.text(text.text(), text.x(), text.y(), {
      baseline: 'top',
      angle: -text.getAbsoluteRotation(),
    });
  });

  // Agregar imagen del canvas Konva
  pdf.addImage(
    // Este pixel ratio hace que las imágenes se vean bastante borrosas, pero permite que la descarga sea más rápida
    // Es posible aumentar este número, pero relentiza mucho la descarga de las fichas
    stage.toDataURL({ pixelRatio: 1 }), 
    0,
    0,
    stage.width(),
    stage.height()
  );

  // EXPORTAR LA FICHA DE CADA CULTIVO QUE HAY EN EL ARRAY DE MISCULTIVOS
  let misCultivosFiltrados = misCultivos.filter((item, index) => {
    return misCultivos.indexOf(item) === index;
  });

  // Función general para convertir una imagen URL a base64
  // Esta es la única manera de que podamos incrustar y exportar imágenes en jspdf
  async function toDataURL(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  try {
    const data = await fetch('data.json').then((response) => response.json());

    for (let cultivo of misCultivosFiltrados) {
      const objetoEncontrado = data.find((item) => item.nombre === cultivo);

      if (objetoEncontrado) {
        // Agrega una nueva página si se encuentra el cultivo del array de MisCultivos en el JSON
        // El formato de la página es A5 (210x148mm) y se ha establecido en "landscape", es decir, en horizontal
        // de esta manera no es necesario revisar tanto la separación de los párrafos de texto
        pdf.addPage("a5", "l"); 
        pdf.setFontSize(9);
         if (objetoEncontrado.imagen) { // Ubicamos la imagen
          const base64data = await toDataURL(objetoEncontrado.imagen); // Y la convertimos a base 64
          pdf.addImage(base64data, 'JPEG', 10, 10, 50, 50);
        }
        // Después de la imagen añadimos las diferentes propiedades que tiene el cultivo en su ficha JSON
        pdf.text(`Cultivo: ${objetoEncontrado.nombre}`, 10, 80); 
        pdf.text(`Espacio: ${objetoEncontrado.espacio}`, 10, 90);
        pdf.text(`Tiempo de crecimiento: ${objetoEncontrado.tiempo_crecimiento}`, 10, 100);
        pdf.text(`Agua: ${objetoEncontrado.necesidades.agua}`, 10, 110);
        pdf.text(`Sustrato: ${objetoEncontrado.necesidades.sustrato}`, 10, 120);
        pdf.text(`PH: ${objetoEncontrado.necesidades.phMin + " - " + objetoEncontrado.necesidades.phMax}`, 10, 130);
        pdf.text(`Terreno compatible: ${objetoEncontrado.terreno_compatible.join(', ')}`, 10, 140);
        pdf.text(`Época de siembra: ${objetoEncontrado.epoca_siembra}`, 10, 150);
        pdf.text(`Época de cosecha: ${objetoEncontrado.epoca_cosecha}`, 10, 160);
        pdf.text(`Notas Adicionales: ${objetoEncontrado.notas_adicionales}`, 10, 170);

       
      } else {
        console.error(`No se encontró ningún objeto con el nombre "${cultivo}".`);
      }
    }

    // Guardamos el PDF después de que todas las páginas se hayan añadido
    pdf.save('canvas.pdf');
  } catch (error) {
    console.error('Error al cargar el archivo JSON o las imágenes:', error);
  }
});
