<template>
  <div class="slider-container mt-5">
    <div class="slider">
      <div
          v-for="(post, index) in data"
          :key="post.id"
          class="slide nk"
          :class="{ active: index === currentIndex }"
      ><div class = "flex center p-3 nk" id = "abs2_content">
        <div class="bg tooltip ">
            <img :src="post.image" class="bg" alt="Slide" />
            <span class="tooltiptext">{{ post.titleEng  }}</span>
        </div>
      </div>
      </div>

    </div>
    <div class="controls">
      <button class="control-button" @click="prevSlide">Previous</button>
      <button class="control-button" @click="nextSlide">Next</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageSlideshow',
  data() {
    return {
      data: [],
      currentIndex: 0,
    };
  },
  methods: {
    getPost() {
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
    prevSlide() {
      this.currentIndex =
          (this.currentIndex - 1 + this.data.length) % this.data.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.data.length;
    },
  },
  mounted() {
    this.getPost();
  },
};
</script>

<style scoped>

.slider-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.slider {
  display: flex;
  overflow: hidden;
  position: relative;
}

.slide {
  transition: transform 0.3s ease-in-out;
  display: none;
}

.slide img {
  width: 800px;
  height: 600px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.control-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.active {
  display: block;
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
  left: 350px;
  top: 250px;
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





//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;
//rest Api