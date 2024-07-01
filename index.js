const toxicity = require('@tensorflow-models/toxicity');

// El umbral de toxicidad
const threshold = 0.9;

// Las oraciones a analizar
const sentences = [
  'Me gusta tu camisa',
  'Me encanta tu sonrisa',
  'Yo odio a los gatos',
  'Soy un fanático de los perros'
];

// Función para interpretar los resultados
function interpretResults(predictions) {
  predictions.forEach(prediction => {
    prediction.results.forEach((result, index) => {
      if (result.match) {
        console.log(`La oración "${sentences[index]}" ha sido clasificada como "${prediction.label}" con una probabilidad de ${result.probability}.`);
      } else {
        console.log(`La oración "${sentences[index]}" no ha sido clasificada como "${prediction.label}".`);
      }
    });
  });
}

// Cargar el modelo y realizar la predicción
toxicity.load(threshold).then(model => {
  model.classify(sentences).then(predictions => {
    interpretResults(predictions);
  }).catch(error => {
    console.error("Error durante la clasificación:", error);
  });
}).catch(error => {
  console.error("Error al cargar el modelo:", error);
});
