function executarCodigo() {
  const codigo = document.getElementById("codigo").value;
  const outputEl = document.getElementById("output");
  const statusEl = document.getElementById("status");

  statusEl.textContent = "";
  statusEl.classList.remove("error");

  const logOriginal = console.log;
  const linhas = [];

  console.log = function (...args) {
    const texto = args
      .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a)))
      .join(" ");
    linhas.push(texto);
    outputEl.textContent = linhas.join("\n");
    logOriginal.apply(console, args);
  };

  try {
    new Function(codigo)();
    statusEl.textContent = "Código executado com sucesso.";
  } catch (e) {
    statusEl.textContent = "Erro: " + e.message;
    statusEl.classList.add("error");
  } finally {
    console.log = logOriginal;
  }
}

function limparOutput() {
  document.getElementById("output").textContent = "";
  const statusEl = document.getElementById("status");
  statusEl.textContent = "Output limpo.";
  statusEl.classList.remove("error");
}
