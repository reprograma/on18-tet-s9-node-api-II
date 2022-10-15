const app = require("./src/app");

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Servidor rodando no PORT: ${PORT}`);
});
