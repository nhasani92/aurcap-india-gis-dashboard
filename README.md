# AURCAP India GIS Climate Dashboard

A browser-based GIS dashboard for Indian urban climate resilience planning.

## Run

Start any static web server from this folder, then open the printed local URL.

```powershell
python -m http.server 4173
```

## Open Data Used

- Leaflet for the open-source WebGIS map UI.
- OpenStreetMap for the base map.
- NASA GIBS WMTS for live/open raster layers:
  - MODIS Terra corrected reflectance true color
  - MODIS Terra land surface temperature
  - VIIRS SNPP NDVI
  - GPM IMERG precipitation
  - MODIS combined flood extent
  - NASA urban heat island baseline

The risk polygons and infrastructure points are client-side planning overlays for the selected Indian city. They are exported as GeoJSON/CSV from the browser.
