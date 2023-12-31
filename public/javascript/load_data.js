import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';

let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

    //Obtenga la fecha actual
    let actual = fechaActual();

    //Defina un arreglo temporal vacío
    let datosPrecipitacion = []
    
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]


        if(tiempo.includes(actual)) {
        datosPrecipitacion.push(precipitacion)

        }
    }  

    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datosPrecipitacion);
    let min = Math.min(...datosPrecipitacion);
    let sum = datosPrecipitacion.reduce((a, b) => a + b, 0);
    let prom = (sum / datosPrecipitacion.length) || 0;

    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let precipitacionMinValue = document.getElementById("precipitacionMinValue")
    let precipitacionPromValue = document.getElementById("precipitacionPromValue")
    let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")  

    //Actualice los elementos HTML con los valores correspondientes
    precipitacionMinValue.textContent = `Min ${min} [mm]`
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    precipitacionMaxValue.textContent = `Max ${max} [mm]`
  
  }

  cargarPrecipitacion()

let cargarUv = () => {

    //Obtenga la fecha actual
    let actual = fechaActual();

    //Defina un arreglo temporal vacío

    let datosUv=[]

    
    //Itere en el arreglo tiempoArr para filtrar los valores 
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const uv =uvArr[index]


        if(tiempo.includes(actual)) {
        datosUv.push(uv)
        }
    }  

    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datosUv);
    let min = Math.min(...datosUv);
    let sum = datosUv.reduce((a, b) => a + b, 0);
    let prom = (sum / datosUv.length) || 0;

    //Obtenga la referencia a los elementos HTML 
    let uvMinValue = document.getElementById("uvMinValue")
    let uvPromValue = document.getElementById("uvPromValue")
    let uvMaxValue = document.getElementById("uvMaxValue")  

    //Actualice los elementos HTML con los valores correspondientes
    uvMinValue.textContent = `Min ${min} [--]`
    uvPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [--]`
    uvMaxValue.textContent = `Max ${max} [--]`
  
  }
  
  cargarUv()

let cargarTemperatura= () => {

    //Obtenga la fecha actual
    let actual = fechaActual();

    //Defina un arreglo temporal vacío
    let datosTemperatura=[]
    
    //Itere en el arreglo tiempoArr para filtrar los valores 
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const temperatura = temperaturaArr[index]

        if(tiempo.includes(actual)) {
        datosTemperatura.push(temperatura)
        }
    }  

    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datosTemperatura);
    let min = Math.min(...datosTemperatura);
    let sum = datosTemperatura.reduce((a, b) => a + b, 0);
    let prom = (sum / datosTemperatura.length) || 0;

    //Obtenga la referencia a los elementos HTML
    let temperaturaMinValue = document.getElementById("temperaturaMinValue")
    let temperaturaPromValue = document.getElementById("temperaturaPromValue")
    let temperaturaMaxValue = document.getElementById("temperaturaMaxValue")  

    //Actualice los elementos HTML con los valores correspondientes
    temperaturaMinValue.textContent = `Min ${min} [°C]`
    temperaturaPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [°C]`
    temperaturaMaxValue.textContent = `Max ${max} [°C]`
  
  }  

  cargarTemperatura()

let cargarFechaActual = () => {
  
    //Obtenga la referencia al elemento h6
    let coleccionHTML = document.getElementsByTagName("h6")

    let tituloH6 = coleccionHTML[0]

    //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
    tituloH6.textContent = fechaActual()

  }
  

  
  cargarFechaActual()

  let cargarOpenMeteo = () => {

    //URL que responde con la respuesta a cargar
    let URL1 = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m'; 
    let URL2 = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=relativehumidity_2m,precipitation_probability";

    fetch( URL1 )
      .then(responseText => responseText.json())
      .then(responseJSON => {
        
        //Respuesta en formato JSON
    
    
        //Referencia al elemento con el identificador plot
        let plotRef = document.getElementById('plot1');

    
        //Etiquetas del gráfico
        let labels = responseJSON.hourly.time;
    
        //Etiquetas de los datos
        let data = responseJSON.hourly.temperature_2m;
    
        //Objeto de configuración del gráfico
        let config = {
          type: 'line',
          data: {
            labels: labels, 
            datasets: [
              {
                label: 'Temperature [2m]',
                data: data, 
              }
            ]
          }
        };
    
        //Objeto con la instanciación del gráfico
        let chart1  = new Chart(plotRef, config);
      })

    
      .catch(console.error);
  
    fetch(URL2)
      .then(responseText => responseText.json())
      .then(responseJSON => {
        
        //Respuesta en formato JSON
    
    
        //Referencia al elemento con el identificador plot
        let plotRef = document.getElementById('plot2');

    
        //Etiquetas del gráfico
        let labels = responseJSON.hourly.time;
    
        //Etiquetas de los datos
        let data1 = responseJSON.hourly.precipitation_probability;
        let data2 = responseJSON.hourly.relativehumidity_2m
    
        //Objeto de configuración del gráfico
        let config = {
          type: 'line',
          data: {
            labels: labels, 
            datasets: [
              {
                label: 'Precipitation',
                data: data1, 
              },
              {
                label: 'Humedad',
                data: data2, 
              }
            ]
          }
        };
    
        //Objeto con la instanciación del gráfico
        let chart2  = new Chart(plotRef, config);
      }) 
  }
  
  

 

  
  cargarPrecipitacion()
  cargarFechaActual()
  cargarOpenMeteo()
  
  let parseXML = (responseText) => {

    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "application/xml");


    // Referencia al elemento `#forecastbody` del documento HTML

    let forecastElement = document.querySelector("#forecastbody")
    forecastElement.innerHTML = ''

    // Procesamiento de los elementos con etiqueta `<time>` del objeto xml
    let timeArr = xml.querySelectorAll("time")

    timeArr.forEach(time => {
        
        let from = time.getAttribute("from").replace("T", " ")

        let humidity = time.querySelector("humidity").getAttribute("value")
        let windSpeed = time.querySelector("windSpeed").getAttribute("mps")
        let precipitation = time.querySelector("precipitation").getAttribute("probability")
        let pressure = time.querySelector("pressure").getAttribute("value")
        let cloud = time.querySelector("clouds").getAttribute("all")

        let template = `
            <tr>
                <td>${from}</td>
                <td>${humidity}</td>
                <td>${windSpeed}</td>
                <td>${precipitation}</td>
                <td>${pressure}</td>
                <td>${cloud}</td>
            </tr>
        `

        //Renderizando la plantilla en el elemento HTML
        forecastElement.innerHTML += template;
    })

}

  
  //Callback
  let selectListener = async (event) => {

    let selectedCity = event.target.value

     // Lea la entrada de almacenamiento local
     let cityStorage = localStorage.getItem(selectedCity);
    
    if (cityStorage == null) {
    try {

        //API key
        let APIkey = 'b2d0ca46b16e304d53a781c0e8207a2d'
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`

        let response = await fetch(url)
        let responseText = await response.text()
        
        await parseXML(responseText)

        // Guarde la entrada de almacenamiento local
        await localStorage.setItem(selectedCity, responseText)

    } catch (error) {
        console.log(error)
    } 
    }
    else {
      // Procese un valor previo
      parseXML(cityStorage)
  }

}
  
  let loadForecastByCity = () => {
  
    //Handling event
    let selectElement = document.querySelector("select")
    selectElement.addEventListener("change", selectListener)
  
  }
  
  loadForecastByCity()

  let loadExternalTable = async (event) => {
    // Requerimiento asíncrono
    try {
      let proxyURL = 'https://cors-anywhere.herokuapp.com/';
      let originalURL = 'https://www.gestionderiesgos.gob.ec/monitoreo-de-inundaciones/';
      
      
      let responseXml = await fetch(proxyURL + originalURL);
      let dataXml = await responseXml.text();
  
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(dataXml, "text/html");
  
      let elementoXML = xmlDoc.querySelector("#postcontent table");
  
      let elementoDOM = document.getElementById("monitoreo");
  
      elementoDOM.innerHTML = elementoXML.outerHTML;
    } catch (error) {
      console.log(error);
    }
  };
   
   loadExternalTable()