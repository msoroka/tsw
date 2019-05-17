<template>
  <div>
    <table>
      <tr>
        <td>Numer</td>
        <td>{{ horse.numer }}</td>
      </tr>
      <tr>
        <td>Klasa</td>
        <td>{{ horse.klasa }}</td>
      </tr>
      <tr>
        <td>Nazwa</td>
        <td>{{ horse.nazwa }}</td>
      </tr>
      <tr>
        <td>Kraj</td>
        <td>{{ horse.kraj }}</td>
      </tr>
      <tr>
        <td>Rocznik</td>
        <td>{{ horse.rocznik }}</td>
      </tr>
      <tr>
        <td>Maść</td>
        <td>{{ horse.masc }}</td>
      </tr>
      <tr>
        <td>Płeć</td>
        <td>{{ horse.plec }}</td>
      </tr>
      <tr>
        <td>Hodowca</td>
        <td>{{ horse.hodowca.nazwa }} ({{ horse.hodowca.kraj }})</td>
      </tr>
      <tr>
        <td>Właściciel</td>
        <td>{{ horse.wlasciciel.nazwa }} ({{ horse.wlasciciel.kraj }})</td>
      </tr>
      <tr>
        <td>Ojciec</td>
        <td>{{ horse.rodowod.o.nazwa }} ({{ horse.rodowod.o.kraj }})</td>
      </tr>
      <tr>
        <td>Matka</td>
        <td>{{ horse.rodowod.m.nazwa }} ({{ horse.rodowod.m.kraj }})</td>
      </tr>
      <tr>
        <td>Ojciec Matki</td>
        <td>{{ horse.rodowod.om.nazwa }} ({{ horse.rodowod.om.kraj }})</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    horse: {}
  }
};
</script>

<style scoped></style>
