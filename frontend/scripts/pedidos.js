// Proteção de acesso
if (!localStorage.getItem("adm_token")) {
  window.location.href = "login.html";
}

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("adm_token");
  window.location.href = "login.html";
});

// Carregar pedidos
function carregarPedidos() {
  fetch("http://localhost:5000/api/pedidos")
    .then(res => res.json())
    .then(pedidos => {
      const tbody = document.getElementById("lista-pedidos");
      tbody.innerHTML = "";

      pedidos.forEach(pedido => {
        const tr = document.createElement("tr");

        const produtosFormatados = Array.isArray(pedido.produtos)
          ? pedido.produtos.join(", ")
          : pedido.produtos;

        tr.innerHTML = `
          <td>#${pedido.id}</td>
          <td>${pedido.cliente}</td>
          <td>${produtosFormatados}</td>
          <td>R$ ${pedido.total.toFixed(2)}</td>
          <td>
            <select class="status-select" onchange="atualizarStatus(${pedido.id}, this.value)">
              <option ${pedido.status === "Pendente" ? "selected" : ""}>Pendente</option>
              <option ${pedido.status === "Processando" ? "selected" : ""}>Processando</option>
              <option ${pedido.status === "Enviado" ? "selected" : ""}>Enviado</option>
              <option ${pedido.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
            </select>
          </td>
          <td>
            <button class="btn-acao" onclick="removerPedido(${pedido.id})">Remover</button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    });
}

carregarPedidos();

// Atualizar status
function atualizarStatus(id, novoStatus) {
  fetch(`http://localhost:5000/api/pedidos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: novoStatus })
  })
    .then(res => res.json())
    .then(() => {
      console.log("Status atualizado.");
    });
}

// Remover pedido
function removerPedido(id) {
  if (confirm("Deseja remover este pedido?")) {
    fetch(`http://localhost:5000/api/pedidos/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => carregarPedidos());
  }
}