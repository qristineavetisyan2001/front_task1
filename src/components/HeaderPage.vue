<template>
 <div>

  <nav class="admin-navbar">
    <div class="admin-navbar-logo" style="margin-left:48px">Admin Dashboard</div>
    <ul class="admin-navbar-menu">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/user-page">Users</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
      <div class="search-bar">
        <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search..."
        />
      </div>
    </ul>
  </nav>
   <div><button style="left:22px; top:18px; position: absolute" @click="hideAsideBar()">☰</button></div>
   <div class="d-flex">
        <div class="aside-bar" ref="aside-bar" v-if="show">
  <ul class="nav">
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class=" fs-5 fas fa-th-large"></i>
        <span class="menu-title">Dashboard</span>
      </a>
    </li>
    <li class="nav-item nav-category">UI Elements</li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="ui-basic">
        <i class=" fs-5 fab fa-elementor"></i>
        <span class="menu-title">UI Elements</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="collapse" id="ui-basic">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item"> <a class="nav-link" href="#">Buttons</a></li>
          <li class="nav-item"> <a class="nav-link" href="#">Dropdowns</a></li>
          <li class="nav-item"> <a class="nav-link" href="#">Typography</a></li>
        </ul>
      </div>
    </li>
    <li class="nav-item nav-category">Forms and Datas</li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="form-elements">
        <i class="fs-5 far fa-credit-card"></i>
        <span class="menu-title">Form elements</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="collapse" id="form-elements">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item"><a class="nav-link" href="#">Basic Elements</a></li>
        </ul>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="charts">
        <i class="fs-5 fas fa-chart-line"></i>
        <span class="menu-title">Charts</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="collapse" id="charts">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item"> <a class="nav-link" href="#">ChartJs</a></li>
        </ul>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="tables">
        <i class="fs-5 fas fa-table"></i>
        <span class="menu-title">Tables</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="collapse" id="tables">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item"> <a class="nav-link" href="#">Basic table</a></li>
        </ul>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="icons">
        <i class="fs-5  fas fa-layer-group"></i>
        <span class="menu-title">Icons</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="collapse" id="icons">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item"> <a class="nav-link" href="#">Mdi icons</a></li>
        </ul>
      </div>
    </li>
    <li class="nav-item nav-category">pages</li>
    <li class="nav-item">
      <a class="nav-link" data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="auth">
        <i class="fs-5 fas fa-user-circle"></i>
        <span class="menu-title">User Pages</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="collapse" id="auth">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item"> <a class="nav-link" href="#"> Login </a></li>
        </ul>
      </div>
    </li>
    <li class="nav-item nav-category">help</li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="fs-5 fas fa-file-alt"></i>
        <span class="menu-title">Documentation</span>
      </a>
    </li>
  </ul>
  </div>
     <div class="ins_post_div container-fluid" id="container-wrapper">
       <form method="post" enctype="multipart/form-data">
         <div class = "row">
           <div class = "col-lg-4">
             <input v-model="titleEng" class = "mt-3 w-100" type = "text"  placeholder = "english title" />
           </div>
           <div class = "col-lg-4">
             <input v-model="titleArm" class = "mt-3 w-100" type = "text"  placeholder = "armenian title" />
           </div>
           <div class = "col-lg-4 my-3">
<!--             <input type = "file" name = "image"/>-->
             <input type="file" name="image" @change="onImageChange">
           </div>

         </div>
         <div class = "row">
          <div class = "col-lg-4">
            <textarea v-model="textEng" class = "mt-3 w-100" type = "text"  placeholder = "english textarea"></textarea>
          </div>
           <div class = "col-lg-4">
             <textarea v-model="textArm" class = "mt-3 w-100" type = "text"  placeholder = "armenian textarea"></textarea>
           </div>
         </div>
         <div class = "mt-3">
           <button class = "w-50 border border-light p-2" style="background-color: #7B89EC; margin-right: 537px;" @click.prevent="formSubmit()"> Add</button>
         </div>
       </form>
       <div>
<!--         <?= get_session('error'); ?>-->
       </div>
       <table-insert></table-insert>
     </div>
   </div>
 </div>
</template>

<script>
import TableInsert from "@/components/TableInsert.vue";
export default {
  name: 'HeaderPage',
  components: {
    TableInsert
  },
  data() {
    return {
      titleEng:'',
      titleArm:'',
      textEng:'',
      textArm:'',
      image:null,
      searchQuery: "",
      show: true,
      token: localStorage.getItem('token'),
    };
  },

  methods: {
    onImageChange(e) {
      this.image = e.target.files[0];
    },
    formSubmit() {
      let config = {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      }
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('titleEng', this.titleEng);
      formData.append('titleArm', this.titleArm);
      formData.append('textEng', this.textEng);
      formData.append('textArm', this.textArm);
      fetch('http://localhost:8000/admin/dashboard', {
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

      window.location.reload();
    },

    handleSearch() {
      this.$emit("search", this.searchQuery);
    },
    hideAsideBar(){
      this.show = !this.show
    }
  },

};
</script>

<style scoped>
.nav-link,.nav-item{
  color:#fbfcff;
}
.aside-bar{
  width: 14%;
  background: #333;
  height:  calc(100vh - 66px);

}
.search-bar {
  margin-right: 1rem;
}
.admin-navbar {
  display: flex;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 20px;
}

.admin-navbar-logo {
  font-size: 18px;
  margin-right: auto;
}

.admin-navbar-menu {
  list-style: none;
  display: flex;
  align-items: center;
}

.admin-navbar-menu li {
  margin-right: 20px;
}

.admin-navbar-menu a {
  color: white;
  text-decoration: none;
}

.admin-navbar-menu a:hover {
  text-decoration: underline;
}
.nav{
  display: block;
}
</style>

