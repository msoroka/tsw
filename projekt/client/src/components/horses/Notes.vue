<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Sędzia</th>
          <th>Typ</th>
          <th>Głowa</th>
          <th>Kłoda</th>
          <th>Nogi</th>
          <th>Ruch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, index) in notes" :key="index">
          <td v-if="getJudge(judges[index])">
            {{ getJudge(judges[index]).sedzia }} ({{
              getJudge(judges[index]).kraj
            }})
          </td>
          <td>{{ notes[index].typ }}</td>
          <td>{{ notes[index].glowa }}</td>
          <td>{{ notes[index].kloda }}</td>
          <td>{{ notes[index].nogi }}</td>
          <td>{{ notes[index].ruch }}</td>
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
    horse: {},
    notes: {}
  },
  data: function() {
    return {
      notesSum: 0,
      typeSum: 0,
      moveSum: 0,
      judges: []
    };
  },
  methods: {
    countSums: function() {
      this.notesSum = this.typeSum = this.moveSum = 0;

      this.notes.forEach(val => {
        this.notesSum += val.typ + val.glowa + val.kloda + val.nogi + val.ruch;
        this.typeSum += val.typ;
        this.moveSum += val.ruch;
      });
    },
    getJudges: function() {
      this.judges = this.$store.getters.fetchClassByNumber(
        this.horse.klasa
      ).komisja;
    },
    getJudge: function(id) {
      return this.$store.getters.fetchJudgeById(id);
    }
  },
  mounted() {
    this.countSums();
    this.getJudges();
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
