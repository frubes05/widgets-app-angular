# Angular Widgets App (AWA)

Link na deployanu stranicu: https://frubes05.github.io/widgets-app-angular

Angular aplikacija s interaktivnim widgetima:

- Karta s početnom lokacijom Heinzelova 70
- Lista lokacija
- Tablični i grafički prikaz podataka
- Stranica s prikazom podataka sa [Poke API](https://pokeapi.co/)

---

## Korištene tehnologije

- [Angular CLI](https://angular.io/cli): v19.2.7
- TypeScript
- RxJS
- [Leaflet](https://leafletjs.com/)
- [Chart.js](https://www.chartjs.org/)
- [Poke API](https://pokeapi.co/)

---

### Instalacija dependencyja

Za instalaciju projektnih ovisnosti (dependencies): <pre> `npm install` </pre>

## Pokretanje aplikacije

Za pokretanje projekta: <pre> `npm start` </pre>

Aplikacija će biti dostupna na adresi `http://localhost:4200/`.

---

## Funkcionalnosti aplikacije

### Karta i lista lokacija

- Prikaz početne lokacije: Heinzelova 70 (Zagreb)
- Lista od 10 lokacija (uzete lokacije kvartova u Zagrebu, ali može se promijeniti po potrebi)
- Klikom na lokaciju iz liste mijenja se lokacija markera na karti

### Prikaz podataka iz datoteke `podaci.json`

- Podaci za aplikaciju spremljeni unutar public/assets foldera
- Učitavanje podataka iz JSON datoteka putem fetcha (simulacija HTTP GET requesta)
- Prikaz u tablici: originalni 15-minutni podaci
- Graf izrađen pomoću Chart.js
- Podaci se transformiraju u satni format uzimanjem prosjeka za svaki sat
- Lokacije također spremljene u JSON formatu (simulacija HTTP GET requesta)

### Prikaz podataka s PokéAPI servisa

- Na `/pokemons` ruti dohvaćaju se podaci o Pokemonima (maksimalno 100)
- Paginacija: prikaz 10 Pokemon-a po stranici
- Klikom na red u tablici otvara se detaljan prikaz odabranog Pokemona
- Povratak s detalja vraća korisnika na prethodnu stranicu i isti položaj u paginaciji
- Podaci uključuju: ID, naziv, visinu, težinu, tip i sliku

---

## Struktura projekta

![Struktura](public/assets/code-structure.png)

---

## Formatiranje koda

Aplikacija koristi Prettier za automatsko formatiranje koda.
Konfiguracija se nalazi u `.prettierrc` i `.vscode/settings.json` datotekama.

Za ručno formatiranje pokrenuti: <pre> `npm run format` </pre>

---

## Testiranje koda

Aplikacija koristi Karma i Jasmine za testiranje Angular komponenti, servisa, direktiva i ostalih modula.

Za ručno izvršavanje testova: <pre> `npm run test` </pre>

---
