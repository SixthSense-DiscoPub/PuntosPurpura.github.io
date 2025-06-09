const mapa = L.map('mapa').setView([48, 10], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);
const ubicaciones = [
  {coords: [45.4333, 12.2833], texto: 'Isla Poveglia, Venecia', pais: 'Italia'},
  { coords: [38.1115, 13.3493], texto: 'Catacumbas de los Capuchinos, Palermo', pais: 'Italia' },
  { coords: [51.5081, -0.0759], texto: 'Tower of London, Inglaterra', pais: 'Reino Unido' },
  { coords: [55.9500, -3.1890], texto: 'Edinburgh Vaults, Edimburgo', pais: 'Reino Unido' },
  { coords: [47.2952, -0.4411], texto: 'Château de Brissac', pais: 'Francia' },
  { coords: [48.8606, 2.3376], texto: 'Catacumbas de París' , pais: 'Francia'},
  { coords: [50.4687, 14.7294], texto: 'Castillo de Houska' , pais: 'Republica Checa'},
  { coords: [53.0869, -7.7583], texto: 'Leap Castle', pais: 'Irlanda' },
  { coords: [53.2608, -6.3484], texto: 'Hellfire Club, Dublín', pais: 'Irlanda' },
  { coords: [49.7041, 8.5496], texto: 'Castillo de Frankenstein' , pais: 'Alemania'},
  { coords: [51.6254, 7.6335], texto: 'Wewelsburg', pais: 'Alemania' },
  { coords: [45.5158, 25.3670], texto: 'Castillo de Bran', pais: 'Rumania' },
  { coords: [46.7781, 23.5510], texto: 'Bosque de Hoia Baciu' , pais: 'Rumania'},
  { coords: [41.3957, 2.1669], texto: 'Hospital del Tórax, Barcelona', pais: 'España' },
  { coords: [42.5761, -3.4544], texto: 'Ochate, Burgos' , pais: 'España'},
  { coords: [59.1254, 11.3745], texto: 'Fredriksten Fortress', pais: 'Noruega' },
  { coords: [59.6821, 10.1682], texto: 'Lier Sykehus', pais: 'Noruega' },
  { coords: [63.1051, 17.2710], texto: 'Borgvattnet Vicarage', pais: 'Suecia' },
  { coords: [59.3250, 18.0708], texto: 'Stockholm’s Old Town, Gamla Stan', pais: 'Suecia' },
  { coords: [37.8220, 23.8631], texto: 'Davelis Cave' , pais: 'Grecia'},
  { coords: [38.1167, 23.6167], texto: 'Palacio de Tatoi', pais: 'Grecia' },
  { coords: [50.0351, 19.1783], texto: 'Campo de concentración de Auschwitz' , pais: 'Polonia'},
  { coords: [49.4736, 20.3063], texto: 'Castillo de Niedzica', pais: 'Polonia' }
];
const markers = ubicaciones.map(({coords, texto})=>{
    return L.marker(coords).addTo(mapa).bindPopup(texto);
})
const group = new L.featureGroup(markers);
mapa.fitBounds(group.getBounds());

ubicaciones.forEach(lugar => {
  L.circleMarker(lugar.coords, {
    radius: 8,
    color: "#bd96ec",
    fillColor: "#bd96ec",
    fillOpacity: 0.9
  }).addTo(mapa).bindPopup(lugar.nombre);
});
document.querySelectorAll('.elemento2').forEach(elem => {
  elem.addEventListener('click', () => {
    const paisSeleccionado = elem.getAttribute('data-lugares');


    const lugaresPais = ubicaciones.filter(lugar => lugar.pais === paisSeleccionado);

    if (lugaresPais.length > 0) {
      const bounds = L.latLngBounds(lugaresPais.map(l => l.coords));
      mapa.fitBounds(bounds, { padding: [50, 50] });

      lugaresPais.forEach(l => {
        L.popup()
          .setLatLng(l.coords)
          .setContent(l.texto)
          .openOn(mapa);
      });
    }
  });
});
const coordenadasIniciales = [48, 10];
const zoomInicial = 4;

document.querySelector('h1').addEventListener('click', () => {
  mapa.setView(coordenadasIniciales, zoomInicial);
});

function aceptarCookies() {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("cookies-aceptadas", "true");
  }

  window.onload = function() {
    if (localStorage.getItem("cookies-aceptadas") === "true") {
      document.getElementById("cookie-banner").style.display = "none";
    }
  };

  