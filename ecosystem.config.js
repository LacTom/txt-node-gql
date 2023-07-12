module.exports = {
  apps : [{
    name   : "app1",
    script : "./index.js",
    exec_mode: "cluster",
    instances: "max"
  }]
}
