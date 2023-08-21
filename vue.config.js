const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    proxy: 'http://localhost:8000/'
  }
}

const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true, // Important for cookies and credentials
};

app.use(cors(corsOptions));

// ... Your other server setup
