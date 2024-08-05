document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const tasaCambio = 3900;

    app.innerHTML = `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card mt-5">
                        <div class="card-body">
                            <h2 class="card-title text-center mb-4">Conversor de Dólares a Pesos Colombianos</h2>
                            <div class="mb-3">
                                <label for="dolares" class="form-label">Dólares (USD)</label>
                                <input type="number" class="form-control" id="dolares" placeholder="Ingrese cantidad en dólares">
                            </div>
                            <div class="mb-3">
                                <label for="pesos" class="form-label">Pesos Colombianos (COP)</label>
                                <input type="number" class="form-control" id="pesos" placeholder="Ingrese cantidad en pesos colombianos">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const dolaresInput = document.getElementById('dolares');
    const pesosInput = document.getElementById('pesos');

    dolaresInput.addEventListener('input', function () {
        const dolares = parseFloat(this.value);
        pesosInput.value = !isNaN(dolares) ? Math.round(dolares * tasaCambio) : '';
    });

    pesosInput.addEventListener('input', function () {
        const pesos = parseFloat(this.value);
        dolaresInput.value = !isNaN(pesos) ? (pesos / tasaCambio).toFixed(2) : '';
    });
});