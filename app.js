const INDIA_BOUNDS = L.latLngBounds([6.2, 67.3], [36.2, 98.5]);

const cities = {
  delhi: {
    name: "Delhi NCR",
    center: [28.6139, 77.209],
    zoom: 10,
    score: 61,
    confidence: 88,
    heat: 44.2,
    ndvi: 0.19,
    flood: 18,
    rainfall: 22,
    exposed: "1.7M",
    green: 13,
    assets: 64,
    critical: 12,
    summary: "Dense impervious cover and low canopy continuity make Delhi a high-priority heat mitigation city.",
  },
  mumbai: {
    name: "Mumbai",
    center: [19.076, 72.8777],
    zoom: 11,
    score: 58,
    confidence: 90,
    heat: 37.8,
    ndvi: 0.27,
    flood: 41,
    rainfall: 72,
    exposed: "2.1M",
    green: 16,
    assets: 83,
    critical: 18,
    summary: "Coastal exposure, intense rainfall, and reclaimed lowlands drive flood and infrastructure risk.",
  },
  hyderabad: {
    name: "Hyderabad",
    center: [17.385, 78.4867],
    zoom: 11,
    score: 73,
    confidence: 89,
    heat: 41.9,
    ndvi: 0.28,
    flood: 24,
    rainfall: 39,
    exposed: "840k",
    green: 18,
    assets: 41,
    critical: 7,
    summary: "Urban growth corridors show strong heat signatures, while lake-linked drainage pockets raise flood exposure.",
  },
  bengaluru: {
    name: "Bengaluru",
    center: [12.9716, 77.5946],
    zoom: 11,
    score: 76,
    confidence: 87,
    heat: 36.4,
    ndvi: 0.34,
    flood: 27,
    rainfall: 48,
    exposed: "680k",
    green: 23,
    assets: 52,
    critical: 8,
    summary: "Lake chains and valley drains define flood-prone corridors despite comparatively stronger vegetation cover.",
  },
  chennai: {
    name: "Chennai",
    center: [13.0827, 80.2707],
    zoom: 11,
    score: 57,
    confidence: 91,
    heat: 39.6,
    ndvi: 0.24,
    flood: 46,
    rainfall: 66,
    exposed: "1.4M",
    green: 14,
    assets: 71,
    critical: 16,
    summary: "Coastal plains, monsoon bursts, and built-up expansion combine into severe pluvial flood risk.",
  },
  kolkata: {
    name: "Kolkata",
    center: [22.5726, 88.3639],
    zoom: 11,
    score: 60,
    confidence: 86,
    heat: 38.9,
    ndvi: 0.26,
    flood: 38,
    rainfall: 58,
    exposed: "1.3M",
    green: 17,
    assets: 67,
    critical: 14,
    summary: "Low elevation, wetland edges, and dense infrastructure create linked flood and heat vulnerability.",
  },
  ahmedabad: {
    name: "Ahmedabad",
    center: [23.0225, 72.5714],
    zoom: 11,
    score: 63,
    confidence: 88,
    heat: 45.1,
    ndvi: 0.18,
    flood: 14,
    rainfall: 20,
    exposed: "760k",
    green: 12,
    assets: 38,
    critical: 6,
    summary: "Extreme surface temperatures dominate the resilience profile, with priority cooling needed around industrial belts.",
  },
  pune: {
    name: "Pune",
    center: [18.5204, 73.8567],
    zoom: 11,
    score: 78,
    confidence: 86,
    heat: 37.2,
    ndvi: 0.35,
    flood: 22,
    rainfall: 42,
    exposed: "520k",
    green: 25,
    assets: 35,
    critical: 5,
    summary: "Pune performs better overall, but river-adjacent corridors still need flood-aware asset planning.",
  },
  guwahati: {
    name: "Guwahati",
    center: [26.1445, 91.7362],
    zoom: 11,
    score: 55,
    confidence: 84,
    heat: 34.8,
    ndvi: 0.42,
    flood: 52,
    rainfall: 82,
    exposed: "410k",
    green: 31,
    assets: 29,
    critical: 11,
    summary: "Brahmaputra floodplain exposure and steep drainage response make flood prediction the dominant module.",
  },
};

const layerCatalog = {
  trueColor: {
    label: "NASA true color",
    source: "MODIS Terra corrected reflectance",
    layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
    matrixSet: "GoogleMapsCompatible_Level9",
    ext: "jpeg",
    maxNativeZoom: 9,
    dateAware: true,
    attribution: "NASA GIBS",
  },
  lst: {
    label: "Land surface temperature",
    source: "MODIS Terra LST 8-day day",
    layer: "MODIS_Terra_L3_Land_Surface_Temp_8Day_Day",
    matrixSet: "GoogleMapsCompatible_Level7",
    ext: "png",
    maxNativeZoom: 7,
    dateAware: true,
    attribution: "NASA GIBS / MODIS",
  },
  ndvi: {
    label: "Vegetation index",
    source: "VIIRS SNPP NDVI 8-day",
    layer: "VIIRS_SNPP_NDVI_8Day",
    matrixSet: "GoogleMapsCompatible_Level8",
    ext: "png",
    maxNativeZoom: 8,
    dateAware: true,
    attribution: "NASA GIBS / VIIRS",
  },
  rain: {
    label: "Precipitation rate",
    source: "IMERG precipitation",
    layer: "IMERG_Precipitation_Rate",
    matrixSet: "GoogleMapsCompatible_Level6",
    ext: "png",
    maxNativeZoom: 6,
    dateAware: true,
    attribution: "NASA GIBS / GPM IMERG",
  },
  flood: {
    label: "Observed flood extent",
    source: "MODIS combined flood 1-day",
    layer: "MODIS_Combined_Flood_1-Day",
    matrixSet: "GoogleMapsCompatible_Level9",
    ext: "png",
    maxNativeZoom: 9,
    dateAware: true,
    attribution: "NASA GIBS / MODIS",
  },
  uhi: {
    label: "Urban heat baseline",
    source: "NASA UHI summer day max LST 2013",
    layer: "UHI_Avg_Summer_Day_Max_Land_Surface_Temp_2013",
    matrixSet: "GoogleMapsCompatible_Level7",
    ext: "png",
    maxNativeZoom: 7,
    dateAware: false,
    attribution: "NASA GIBS",
  },
};

const screenConfig = {
  overview: {
    title: "City Resilience Overview",
    kicker: "India urban resilience",
    priorityTitle: "Intervention Queue",
    layers: ["trueColor", "lst", "uhi"],
    legend: [
      ["center", "City center"],
      ["heat", "NASA LST/UHI"],
      ["flood", "Flood or rain layer"],
    ],
  },
  heat: {
    title: "Urban Heat Island Mitigation",
    kicker: "Thermal remote sensing",
    priorityTitle: "Cooling Actions",
    layers: ["trueColor", "lst", "ndvi", "uhi"],
    legend: [
      ["center", "City center"],
      ["heat", "MODIS LST"],
      ["ndvi", "VIIRS NDVI"],
    ],
  },
  flood: {
    title: "Flood Risk Prediction",
    kicker: "Rainfall and inundation",
    priorityTitle: "Flood Response Zones",
    layers: ["trueColor", "rain", "flood"],
    legend: [
      ["center", "City center"],
      ["rain", "IMERG rainfall"],
      ["flood", "MODIS flood extent"],
    ],
  },
  assets: {
    title: "Infrastructure Health Monitoring",
    kicker: "Climate-exposed assets",
    priorityTitle: "Asset Maintenance Queue",
    layers: ["trueColor", "lst", "flood"],
    legend: [
      ["center", "City center"],
      ["heat", "Thermal layer"],
      ["flood", "Flood layer"],
    ],
  },
  scenario: {
    title: "Adaptation Scenario Simulator",
    kicker: "Planning scenario",
    priorityTitle: "Strategy Comparison",
    layers: ["trueColor", "lst", "ndvi", "rain"],
    legend: [
      ["center", "City center"],
      ["ndvi", "Vegetation layer"],
      ["rain", "Rainfall layer"],
    ],
  },
  reports: {
    title: "Reports and Decision Support",
    kicker: "Exportable GIS outputs",
    priorityTitle: "Report Sections",
    layers: ["trueColor", "lst", "ndvi", "rain", "flood", "uhi"],
    legend: [
      ["center", "City center"],
      ["heat", "Thermal layer"],
      ["ndvi", "Vegetation layer"],
    ],
  },
};

let activeScreen = "overview";
let selectedCityKey = "hyderabad";
let rasterLayers = {};
let userClickMarker = null;

const map = L.map("map", {
  zoomControl: false,
  maxBounds: L.latLngBounds([2.5, 60.5], [39, 102]),
  maxBoundsViscosity: 0.5,
}).setView(cities[selectedCityKey].center, cities[selectedCityKey].zoom);

L.control.zoom({ position: "bottomleft" }).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const analysisLayer = L.layerGroup().addTo(map);
const cityMarkers = L.layerGroup();

Object.entries(cities).forEach(([key, city]) => {
  const marker = L.circleMarker(city.center, {
    radius: key === selectedCityKey ? 8 : 5,
    color: key === selectedCityKey ? "#237d85" : "#4f8b5d",
    weight: 3,
    fillColor: key === selectedCityKey ? "#d8e967" : "#ffffff",
    fillOpacity: 0.9,
  })
    .bindTooltip(city.name, { permanent: false, direction: "top" })
    .on("click", () => setCity(key));
  marker.cityKey = key;
  cityMarkers.addLayer(marker);
});

const elements = {
  citySelect: document.querySelector("#city-select"),
  screenTitle: document.querySelector("#screen-title"),
  panelKicker: document.querySelector("#panel-kicker"),
  panelTitle: document.querySelector("#panel-title"),
  screenSummary: document.querySelector("#screen-summary"),
  scoreRing: document.querySelector("#score-ring"),
  scoreValue: document.querySelector("#score-value"),
  confidenceValue: document.querySelector("#confidence-value"),
  metricGrid: document.querySelector("#metric-grid"),
  priorityTitle: document.querySelector("#priority-title"),
  priorityList: document.querySelector("#priority-list"),
  layerReadout: document.querySelector("#layer-readout"),
  activeCityLabel: document.querySelector("#active-city-label"),
  coordinate: document.querySelector("#map-coordinate"),
  legend: document.querySelector("#map-legend"),
  date: document.querySelector("#sat-date"),
  opacity: document.querySelector("#raster-opacity"),
};

function gibsUrl(layerDefinition, date) {
  if (layerDefinition.dateAware) {
    return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layerDefinition.layer}/default/${date}/${layerDefinition.matrixSet}/{z}/{y}/{x}.${layerDefinition.ext}`;
  }
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layerDefinition.layer}/default/${layerDefinition.matrixSet}/{z}/{y}/{x}.${layerDefinition.ext}`;
}

function buildRasterLayers() {
  Object.values(rasterLayers).forEach((layer) => map.removeLayer(layer));
  rasterLayers = {};

  const date = elements.date.value;
  const opacity = Number(elements.opacity.value);

  Object.entries(layerCatalog).forEach(([key, definition]) => {
    rasterLayers[key] = L.tileLayer(gibsUrl(definition, date), {
      tileSize: 256,
      maxNativeZoom: definition.maxNativeZoom,
      maxZoom: 14,
      minZoom: 1,
      opacity,
      bounds: INDIA_BOUNDS,
      attribution: definition.attribution,
    });
  });
}

function syncRasterVisibility() {
  document.querySelectorAll("[data-layer-toggle]").forEach((input) => {
    const layer = rasterLayers[input.dataset.layerToggle];
    if (!layer) return;
    if (input.checked && !map.hasLayer(layer)) {
      layer.addTo(map);
    }
    if (!input.checked && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  });
  renderLayerReadout();
}

function applyScreenLayerDefaults(screen) {
  const activeLayers = new Set(screenConfig[screen].layers);
  document.querySelectorAll("[data-layer-toggle]").forEach((input) => {
    input.checked = activeLayers.has(input.dataset.layerToggle);
  });
  syncRasterVisibility();
}

function offset(center, latDelta, lngDelta) {
  return [center[0] + latDelta, center[1] + lngDelta];
}

function drawCityAnalysis() {
  analysisLayer.clearLayers();
  const city = cities[selectedCityKey];

  const centerMarker = L.marker(city.center, {
    icon: cityCenterIcon(city.name),
    keyboard: false,
  }).bindPopup(popupHtml("City center", city.name, "Selected city focal point"));
  analysisLayer.addLayer(centerMarker);
}

function cityCenterIcon(name) {
  return L.divIcon({
    className: "city-center-pin",
    html: `<span>${name}</span>`,
    iconSize: [28, 34],
    iconAnchor: [14, 34],
  });
}

function focusCity(city, animate = true) {
  if (animate) {
    map.flyTo(city.center, city.zoom, { duration: 0.65 });
  } else {
    map.setView(city.center, city.zoom);
  }
}

function assetPoints(city) {
  const c = city.center;
  const base = [
    ["Bridge B-17", "Bridge", 0.012, 0.09, "Critical", 91],
    ["Storm drain D-4", "Drainage", -0.06, 0.03, city.flood > 30 ? "Critical" : "Watch", city.flood > 30 ? 88 : 74],
    ["Hospital feeder", "Power", 0.07, -0.05, "Watch", 72],
    ["Metro depot", "Transit", -0.02, -0.08, "Stable", 42],
    ["Substation S-2", "Energy", 0.04, 0.045, city.heat > 41 ? "Watch" : "Stable", city.heat > 41 ? 76 : 46],
  ];
  return base.map(([name, type, lat, lng, status, score]) => ({
    name,
    type,
    latLng: offset(c, lat, lng),
    status,
    score,
  }));
}

function popupHtml(title, metric, source) {
  return `<div class="risk-popup"><h4>${title}</h4><p>${metric}</p><p><strong>${source}</strong></p></div>`;
}

function metricsFor(city) {
  const scenarioBenefit = Math.round((city.critical * 1.8 + city.green * 0.4) * 10) / 10;
  const config = {
    overview: [
      ["Resilience", `${city.score}/100`, "Composite heat, flood, asset index"],
      ["Max LST", `${city.heat} C`, "MODIS/UHI thermal signal"],
      ["Flood exposure", `${city.flood}%`, "Rainfall and low-lying zones"],
      ["Critical assets", city.critical, `${city.assets} total monitored assets`],
    ],
    heat: [
      ["Max LST", `${city.heat} C`, "Surface temperature"],
      ["Mean NDVI", city.ndvi.toFixed(2), "Vegetation index"],
      ["Green cover", `${city.green}%`, "Urban canopy proxy"],
      ["People exposed", city.exposed, "Heat-prone population"],
    ],
    flood: [
      ["Rainfall intensity", `${city.rainfall} mm`, "IMERG-derived event proxy"],
      ["Flood exposure", `${city.flood}%`, "Modeled urban area"],
      ["Roads exposed", `${Math.round(city.flood * 3.4)} km`, "Transport vulnerability"],
      ["Buildings at risk", `${Math.round(city.flood * 310)}`, "Planning estimate"],
    ],
    assets: [
      ["Critical", city.critical, "Immediate inspection"],
      ["Watch list", Math.round(city.assets * 0.36), "Maintenance queue"],
      ["Stable", Math.max(city.assets - city.critical - Math.round(city.assets * 0.36), 0), "Routine monitoring"],
      ["Avg condition", Math.max(100 - city.critical * 3, 42), "Asset health score"],
    ],
    scenario: [
      ["Flood delta", `+${Math.round(city.flood * 0.42)}%`, "High-rain scenario"],
      ["UHI reduction", `-${Math.max(1.1, city.green / 12).toFixed(1)} C`, "Green + cool roof"],
      ["Assets protected", Math.round(city.critical * 2.8), "After intervention"],
      ["Benefit ratio", `${scenarioBenefit}x`, "Screening estimate"],
    ],
    reports: [
      ["Maps selected", 6, "WMTS + vector overlays"],
      ["Priority actions", 5, "Ready to export"],
      ["GeoJSON features", analysisGeoJson().features.length, "Current AOI"],
      ["CSV rows", assetPoints(city).length, "Infrastructure list"],
    ],
  };
  return config[activeScreen];
}

function prioritiesFor(city) {
  const floodWord = city.flood > 38 ? "Severe" : city.flood > 24 ? "High" : "Medium";
  const heatWord = city.heat > 41 ? "Severe" : city.heat > 37 ? "High" : "Medium";
  const config = {
    overview: [
      ["Heat mitigation corridor", heatWord],
      ["Drainage upgrade basin", floodWord],
      ["Critical asset inspection", `${city.critical} assets`],
    ],
    heat: [
      ["Cool roofs in dense wards", `${Math.round(city.heat - 32)} C excess`],
      ["Tree corridor near transit", `${city.green}% cover`],
      ["Waterbody edge restoration", "Priority 2"],
    ],
    flood: [
      ["Low-lying drainage basin", floodWord],
      ["River or lake edge assets", `${Math.round(city.flood * 2.2)} hotspots`],
      ["Emergency road continuity", `${Math.round(city.flood * 3.4)} km`],
    ],
    assets: assetPoints(city)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((asset) => [asset.name, asset.status]),
    scenario: [
      ["Mixed green + drainage strategy", "Best"],
      ["Cool roof package", `${Math.max(1.1, city.green / 12).toFixed(1)} C`],
      ["Drain widening package", `${Math.round(city.flood * 0.3)}% less risk`],
    ],
    reports: [
      ["Executive summary", "Ready"],
      ["Satellite layer inventory", "Ready"],
      ["Intervention GeoJSON", "Ready"],
      ["Infrastructure CSV", "Ready"],
    ],
  };
  return config[activeScreen];
}

function renderPanel() {
  const city = cities[selectedCityKey];
  const config = screenConfig[activeScreen];

  elements.screenTitle.textContent = config.title;
  elements.panelKicker.textContent = config.kicker;
  elements.panelTitle.textContent = `${city.name} ${activeScreen === "overview" ? "Climate Snapshot" : config.title}`;
  elements.screenSummary.textContent = city.summary;
  elements.scoreRing.style.setProperty("--score", city.score);
  elements.scoreValue.textContent = city.score;
  elements.confidenceValue.textContent = `${city.confidence}%`;
  elements.priorityTitle.textContent = config.priorityTitle;
  elements.activeCityLabel.textContent = city.name;

  elements.metricGrid.innerHTML = metricsFor(city)
    .map(
      ([label, value, helper]) =>
        `<article class="metric-card"><span>${label}</span><strong>${value}</strong><small>${helper}</small></article>`,
    )
    .join("");

  elements.priorityList.innerHTML = prioritiesFor(city)
    .map(([label, value]) => `<div class="priority-item"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  elements.legend.innerHTML = config.legend
    .map(([key, label]) => `<div class="legend-row"><span><i class="swatch ${key}"></i>${label}</span></div>`)
    .join("");
}

function renderLayerReadout() {
  const activeKeys = [...document.querySelectorAll("[data-layer-toggle]:checked")].map(
    (input) => input.dataset.layerToggle,
  );
  elements.layerReadout.innerHTML = activeKeys
    .map((key) => {
      const layer = layerCatalog[key];
      const date = layer.dateAware ? elements.date.value : "static";
      return `<div class="layer-item"><span>${layer.label}</span><small>${date}</small></div>`;
    })
    .join("");
}

function setScreen(screen, updateDefaults = true) {
  activeScreen = screenConfig[screen] ? screen : "overview";
  document.querySelectorAll(".module-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === activeScreen);
  });
  if (updateDefaults) {
    applyScreenLayerDefaults(activeScreen);
  }
  drawCityAnalysis();
  renderPanel();
  history.replaceState(null, "", `#${activeScreen}`);
}

function setCity(key, animate = true) {
  selectedCityKey = cities[key] ? key : "hyderabad";
  const city = cities[selectedCityKey];
  elements.citySelect.value = selectedCityKey;
  focusCity(city, animate);
  cityMarkers.eachLayer((marker) => {
    const selected = marker.cityKey === selectedCityKey;
    marker.setStyle({
      radius: selected ? 8 : 5,
      color: selected ? "#237d85" : "#4f8b5d",
      fillColor: selected ? "#d8e967" : "#ffffff",
    });
  });
  drawCityAnalysis();
  renderPanel();
}

function pseudoRiskScore(latLng) {
  const city = cities[selectedCityKey];
  const distanceKm = map.distance(latLng, city.center) / 1000;
  const distanceFactor = Math.max(0, 1 - distanceKm / 22);
  const screenFactor =
    activeScreen === "flood" ? city.flood : activeScreen === "heat" ? city.heat : city.critical * 4 + city.flood;
  return Math.round(Math.min(99, 28 + distanceFactor * 44 + screenFactor * 0.45));
}

function handleMapClick(event) {
  const score = pseudoRiskScore(event.latlng);
  elements.coordinate.textContent = `${event.latlng.lat.toFixed(4)}, ${event.latlng.lng.toFixed(4)} | risk ${score}`;

  if (userClickMarker) {
    map.removeLayer(userClickMarker);
  }

  userClickMarker = L.circleMarker(event.latlng, {
    radius: 9,
    color: "#202421",
    weight: 2,
    fillColor: score > 72 ? "#c64a43" : score > 54 ? "#d39a2d" : "#4f8b5d",
    fillOpacity: 0.9,
  })
    .bindPopup(popupHtml("Sampled pixel", `Composite risk ${score}/100`, screenConfig[activeScreen].title))
    .addTo(map)
    .openPopup();
}

function analysisGeoJson() {
  const city = cities[selectedCityKey];

  return {
    type: "FeatureCollection",
    name: `aurcap_${selectedCityKey}_${activeScreen}`,
    features: [
      {
        type: "Feature",
        properties: {
          kind: "city_center",
          city: city.name,
          module: activeScreen,
        },
        geometry: {
          type: "Point",
          coordinates: [city.center[1], city.center[0]],
        },
      },
    ],
  };
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function exportGeoJson() {
  downloadFile(
    `aurcap-${selectedCityKey}-${activeScreen}.geojson`,
    JSON.stringify(analysisGeoJson(), null, 2),
    "application/geo+json",
  );
}

function exportCsv() {
  const city = cities[selectedCityKey];
  const rows = [
    ["city", "asset", "type", "status", "score", "latitude", "longitude"],
    ...assetPoints(city).map((asset) => [
      city.name,
      asset.name,
      asset.type,
      asset.status,
      asset.score,
      asset.latLng[0].toFixed(5),
      asset.latLng[1].toFixed(5),
    ]),
  ];
  downloadFile(
    `aurcap-${selectedCityKey}-assets.csv`,
    rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n"),
    "text/csv",
  );
}

document.querySelectorAll(".module-tab").forEach((button) => {
  button.addEventListener("click", () => setScreen(button.dataset.screen));
});

document.querySelectorAll("[data-layer-toggle]").forEach((input) => {
  input.addEventListener("change", syncRasterVisibility);
});

["input", "change"].forEach((eventName) => {
  elements.citySelect.addEventListener(eventName, (event) => setCity(event.target.value));
});

elements.opacity.addEventListener("input", () => {
  Object.values(rasterLayers).forEach((layer) => layer.setOpacity(Number(elements.opacity.value)));
});

document.querySelector("#apply-date").addEventListener("click", () => {
  buildRasterLayers();
  syncRasterVisibility();
});

document.querySelector("#locate-city").addEventListener("click", () => {
  const city = cities[selectedCityKey];
  focusCity(city);
});

document.querySelector("#fit-india").addEventListener("click", () => map.fitBounds(INDIA_BOUNDS));
document.querySelector("#export-geojson").addEventListener("click", exportGeoJson);
document.querySelector("#export-csv").addEventListener("click", exportCsv);
document.querySelector("#print-report").addEventListener("click", () => window.print());
map.on("click", handleMapClick);

selectedCityKey = cities[elements.citySelect.value] ? elements.citySelect.value : selectedCityKey;
elements.citySelect.value = selectedCityKey;
buildRasterLayers();
const initialScreen = location.hash.replace("#", "");
setScreen(screenConfig[initialScreen] ? initialScreen : "overview");
setCity(selectedCityKey, false);

if (window.lucide) {
  window.lucide.createIcons();
}
