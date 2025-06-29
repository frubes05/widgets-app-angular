import { TemplateRef } from '@angular/core';
import { AveragedDataPoint, PokemonDetails } from '@shared/models';
import { ChartOptions } from 'chart.js';
import { IconOptions } from 'leaflet';

export const LEAFLET_MAP_ENDPOINT =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const LOCATIONS_ENDPOINT = 'assets/locations/data.json';
export const CHARTS_ENDPOINT = 'assets/timesheet/data.json';
export const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

export const POKEMON_COLUMNS = [
  'id',
  'name',
  'height',
  'weight',
  'types',
  'image',
];
export const CHART_COLUMNS = ['time', 'value'];

export const CHART_OPTIONS: ChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
};

export const MAP_OPTIONS: IconOptions = {
  iconUrl: 'assets/leaflet/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};

export interface ColumnDef<T> {
  columnDef: string;
  header: string;
  cell: (row: T) => string | number | TemplateRef<any>;
  isImage?: boolean;
}

export const CHART_TABLE_COLUMNS: Array<ColumnDef<AveragedDataPoint>> = [
  {
    columnDef: 'time',
    header: 'Vrijeme',
    cell: (p) =>
      new Date(p.time).toLocaleString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
  { columnDef: 'value', header: 'Vrijednost', cell: (p) => p.value },
];

export const POKEMON_TABLE_COLUMNS: Array<ColumnDef<PokemonDetails>> = [
  { columnDef: 'id', header: 'ID', cell: (p) => p.id },
  { columnDef: 'name', header: 'Naziv', cell: (p) => p.name },
  { columnDef: 'height', header: 'Visina', cell: (p) => p.height },
  { columnDef: 'weight', header: 'Težina', cell: (p) => p.weight },
  { columnDef: 'types', header: 'Tip', cell: (p) => p.types.join(', ') },
  {
    columnDef: 'image',
    header: 'Slika',
    cell: (p) => p.image,
    isImage: true,
  },
];
