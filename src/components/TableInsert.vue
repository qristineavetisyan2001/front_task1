<template>
  <div>
    <table class="item_class_0 class_5 mt-5" id="myTable">
      <thead>

        <th scope="col">English title<br /></th>
        <th scope="col">English text</th>
        <th scope="col">Armenia title</th>
        <th>Armenia text</th>
        <th scope="col">Image<br /></th>

      </thead>
      <tbody class="js-rows" id="sortable">
      <tr
          v-for="post in data"
          :key="post.id"
          class="item_class_1 class_10 post_div"
          style="cursor: pointer;"
      >
        <td>{{ post.textArm }}</td>
        <td>{{ post.titleEng }}</td>
        <td>{{ post.textEng }}</td>
        <td>{{ post.titleArm }}</td>
        <td>
          <img :src="post.image" alt="img" class="img_style" />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    name: 'TableInsert',
    data() {
      return {
        data: [],
      };
    },
  mounted() {
    this.getPost()
    this.initSortable();
  },
  methods: {
    initSortable() {
      const options = {
        animation: 150,
        onUpdate: (event) => {
          const movedItem = this.data.splice(event.oldIndex, 1)[0];
          this.data.splice(event.newIndex, 0, movedItem);
        },
      };
      new Sortable(document.getElementById('sortable'), options);
    },
    getPost(){
      fetch('http://localhost:8000/admin/getPost', {
        method: 'GET',
        // / headers: {
        /*  'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'multipart/form-data',*/
        /*'Content-Type': 'application/json',*/
        // /  'Authorization': `Bearer ${this.token}`,
        // / },
      })
          .then(response => response.json())
          .then(data => {
            this.data = data
          })
          .catch(error => {
            console.error(error);
          });
    },
  }
};
</script>

<style scoped>
.insert_post{
  margin-top: 100px;
  padding-left: 30px;
}
.ins_post_div{
  width: 1000px;
}
tbody, tr, th, td, tfoot, thead{
  border: 1px solid #e2e5e9;
}
table{
  border-collapse: collapse;
  caption-side: bottom;
}
td{
  width: 180px;
  text-align: center;
}
th{
  text-align: center;
  padding: 10px;
}
.img_style{
  width: 50px;
  height: 40px;
}

.products{
  width: 100%;
  margin-top: 80px;
}
.center{
  width: 1270px;
  margin: 0 auto;
}
.product_h2{
  border-bottom: 1px solid #dcdcdc;
}
.product_h2 h2{
  font-weight: 600;
  line-height: 23px;
  font-size:23px;
  letter-spacing: 0.5px;
  padding-bottom: 20px;
}
.display{
  display: inline-block;
}
.arrow{
  float:right;
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
}
.right_arrow{
  margin-left:15px;
}
.product_arrow{
  margin-top:30px;
}
.flex{
  display: flex;
  gap: 30px;
}
.user_src{
  width: 397px;
  height: 300px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted blue;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.bg{
  opacity: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.nk:hover .bg{
  opacity:0.5;
}
</style>