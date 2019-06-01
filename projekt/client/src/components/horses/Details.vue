<template>
  <div>
    <table>
      <tr>
        <td>Numer</td>
        <td><input type="text" v-model="horse.numer" /></td>
      </tr>
      <tr>
        <td>Klasa</td>
        <td><input type="text" v-model="horse.klasa" /></td>
      </tr>
      <tr>
        <td>Rocznik</td>
        <td><input type="text" v-model="horse.rocznik" /></td>
      </tr>
      <tr>
        <td>Maść</td>
        <td><input type="text" v-model="horse.masc" /></td>
      </tr>
      <tr>
        <td>Płeć</td>
        <td><input type="text" v-model="horse.plec" /></td>
      </tr>
    </table>

    <table>
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

<style scoped lang="less">
div {
  display: flex;
  justify-content: space-between;
}

table {
  border-collapse: collapse;
  margin-top: 20px;
  width: 45%;

  tr {
    td {
      text-align: left;
      border: 1px solid #000;

      &:first-child {
        padding: 5px;
        background: grey;
        color: #fff;
        font-weight: 700;
        width: 30%;
      }

      &:last-child {
        text-align: right;
      }

      input {
        height: 30px;
        width: 100%;
      }
    }
  }
}
</style>
