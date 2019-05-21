<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Typ</th>
          <th>Głowa</th>
          <th>Kłoda</th>
          <th>Nogi</th>
          <th>Ruch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note in notes">
          <td>{{ note.typ }}</td>
          <td>{{ note.glowa }}</td>
          <td>{{ note.kloda }}</td>
          <td>{{ note.nogi }}</td>
          <td>{{ note.ruch }}</td>
        </tr>
      </tbody>
    </table>
    <div class="sum-notes">
      <p>Suma typ: {{ typeSum }}</p>
      <p>Suma ruch: {{ moveSum }}</p>
      <p>Suma not: {{ notesSum }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {}
  },
  data: function() {
    return {
      notesSum: 0,
      typeSum: 0,
      moveSum: 0
    };
  },
  methods: {
    countSums: function() {
      this.notes.forEach(val => {
        this.notesSum += val.typ + val.glowa + val.kloda + val.nogi + val.ruch;
        this.typeSum += val.typ;
        this.moveSum += val.ruch;
      });
    }
  },
  mounted() {
    this.countSums();
  }
};
</script>

<style scoped lang="less">
table {
  border-collapse: collapse;
  margin-top: 20px;
  width: 100%;

  th {
    background: grey;
    color: #fff;
  }
}
table,
th,
td {
  text-align: left;
  border: 1px solid black;
  padding: 5px;
}
.sum-notes {
  margin-top: 5px;
  display: flex;

  p {
    background: lightgrey;
    font-weight: 700;
    width: 33%;
    text-align: center;
    border: 1px solid #000;
  }
}
</style>
