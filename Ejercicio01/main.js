document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow">
                        <div class="card-body p-4">
                            <h2 class="card-title text-center mb-4">Calculadora de IMC</h2>
                            <div class="mb-3">
                                <label for="estatura" class="form-label">Estatura (cm)</label>
                                <input type="number" class="form-control" id="estatura" placeholder="Ingrese su estatura en centímetros">
                            </div>
                            <div class="mb-3">
                                <label for="peso" class="form-label">Peso (kg)</label>
                                <input type="number" class="form-control" id="peso" placeholder="Ingrese su peso en kilogramos">
                            </div>
                            <div class="mb-3">
                                <label for="resultado" class="form-label">Su IMC es:</label>
                                <input type="number" class="form-control bg-light" id="resultado" readonly>
                            </div>
                            <button id="calcular" class="btn btn-primary w-100 mt-3">Calcular IMC</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('calcular').addEventListener('click', function () {
        const estatura = document.getElementById('estatura').value / 100;
        const peso = document.getElementById('peso').value;
        const imc = peso / (estatura * estatura);
        const resultado = document.getElementById('resultado');

        resultado.value = imc.toFixed(1);
        resultado.className = 'form-control ' +
            (imc < 18.5 ? 'text-warning' :
                imc < 25 ? 'text-success' :
                    imc < 30 ? 'text-warning' : 'text-danger');
    });
});