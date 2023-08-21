<template>
  <div>
    <table class="item_class_0 class_5 mt-5" id="myTable">
      <thead>
        <th scope="col">English title<br /></th>
        <th scope="col">English text</th>
        <th scope="col">Armenia title</th>
        <th>Armenia text</th>
        <th scope="col">Image<br /></th>
        <th scope="col">delete<br /></th>
        <th scope="col">edit<br /></th>
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
        <td>
          <b-button id="show-btn" @click="$bvModal.show('bv-modal-example'), postt=post.id">
            <img style="width: 30px" src="../assets/delete.png" />
          </b-button>
        </td>
        <td>
          <b-button v-b-modal.modal-1  @click="getOnePost(post.id), postt=post.id">
            <img style="width: 30px" src="../assets/edit.png" />
          </b-button>

        </td>
      </tr>
      </tbody>
    </table>
    <b-modal id="bv-modal-example" hide-footer v-model="isModalVisible">
      <div class="d-block text-center">
        <h3>do you want to delete? {{postt}} </h3>
      </div>
      <b-button class="mt-3" block @click="confirmDelete(postt)">delete</b-button>
    </b-modal>
    <b-modal id="modal-1" title="Edit Post" >
      <form method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <label for="editedPostTitleEn">English title</label>
        <input v-model="postData.titleEng" id="editedPostTitleEn" type="text" class="form-control">
        <label for="editedPostContentEn">English text</label>
        <textarea v-model="postData.titleArm" id="editedPostContentEn" class="form-control"></textarea>
        <label for="editedPostTitleArm">Armenian title</label>
        <input v-model="postData.textEng" id="editedPostTitleArm" type="text" class="form-control">
        <label for="editedPostContentArm">Armenian text</label>
        <textarea v-model="postData.textArm" id="editedPostContentArm" class="form-control"></textarea>
        <img :src="postData.image" alt="img" class="img_style form-control mt-3"  />
        <img v-if="image" :src="image" alt="img" class="img_style form-control mt-3"  />
        <input type="file"  @change="onImageChange">

        <b-button class="mt-3" block type="submit" @click.prevent="changePost(postt)">Save</b-button>
      </form>
    </b-modal>


  </div>
</template>

<script>

import Sortable from 'sortablejs';
export default {
    name: 'TableInsert',
    data() {
      return {
        isModalVisible: false,
        isModal: false,
        post:{
          id:null,
        },
        data: [],
        selectedPostId: null,
        postt:null,
        postData: {},
        image:null,
        token: localStorage.getItem('token'),
      };
    },

  mounted() {
    this.getPost()
    this.initSortable();
    console.log(this.token)
  },
  methods: {
     confirmDelete(postId) {
        console.log(postId)
        fetch('http://localhost:8000/admin/deletePost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:  postId ,
        })
            .then(response => response.json())
            .then(data => {
              console.log('Post deleted:', data);
              this.isModalVisible = false;
            this. getPost();
            })
            .catch(error => {
              console.error('Error deleting post:', error);
            });
      },
    getOnePost(postId) {
      fetch('http://localhost:8000/admin/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  postId ,
      })
          .then(response => response.json())
          .then(data => {
            this.postData = data
            console.log(data)
          })
          .catch(error => {
            console.error('Error deleting post:', error);
          });
    },
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
    onImageChange(e) {
      this.image = e.target.files[0];
    },
    changePost(postId) {
      let config = {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      }
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('titleEng', this.postData.titleEng);
      formData.append('titleArm', this.postData.titleArm);
      formData.append('textEng', this.postData.textEng);
      formData.append('textArm', this.postData.textArm);
      formData.append('postid',postId);
      fetch('http://localhost:8000/admin/saveChanges', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        config,
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData
      })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.titleEng ='';
            this.titleArm ='';
            this.textEng ='';
            this.textArm ='';
            this.image = null;
          })
          .catch(error => {
            console.error(error);
          });

    },
    /*changePost(postId) {
      let config = {
        headers : {
          'Content-Type' : 'multipart/form-data',
        }
      }
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('titleEng', this.postData.titleEng);
      formData.append('titleArm', this.postData.titleArm);
      formData.append('textEng', this.postData.textEng);
      formData.append('textArm', this.postData.textArm);
      formData.append('postid',postId);
      fetch('http://localhost:8000/admin/saveChanges', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Origin': 'http://localhost:8080',

        },
        config,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData,
      })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });

    },*/
    getPost(){
      fetch('http://localhost:8000/admin/getPost', {
        method: 'GET',
      })
          .then(response => response.json())
          .then(data => {
            this.data = data
          })
          .catch(error => {
            console.error(error);
          });
    },
    handleSubmit() {
      this.$refs.modal.hide(); // Close the modal after submitting
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

