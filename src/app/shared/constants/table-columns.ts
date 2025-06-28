import { TemplateRef } from '@angular/core';
import { AveragedDataPoint, PokemonDetails } from '@shared/models';

export const POKEMON_COLUMNS = [
  'id',
  'name',
  'height',
  'weight',
  'types',
  'image',
];
export const CHART_COLUMNS = ['time', 'value'];

export interface ColumnDef<T> {
  columnDef: string;
  header: string;
  cell: (row: T) => string | number | TemplateRef<any>;
  isImage?: boolean;
}

export const CHART_TABLE_COLUMNS: Array<ColumnDef<AveragedDataPoint>> = [
  { columnDef: 'time', header: 'Vrijeme', cell: (p) => p.time },
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
    cell: p => p.image,
    isImage: true,
  },
];
