document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    let notas = [
        { id: 1, titulo: 'Salir a trabajar', texto: 'Para obtener un poco de dinero', realizada: false },
        { id: 2, titulo: 'Comer', texto: 'Un buen almuerzo del dia', realizada: true },
        { id: 3, titulo: 'Estudiar eventos', texto: 'Para aprender muy bien JS', realizada: false },
        { id: 4, titulo: 'Tomar agua', texto: 'Debo hidratarme bien ¡No olvidar!', realizada: true }
    ];

    let idGlobal = 4;
    let mostrarSoloRealizadas = false;
    let terminoBusqueda = '';

    app.innerHTML = `
        <h1 class="text-center text-dark mb-4">Lista De Notas</h1>
        <h2 class="text-dark mb-3">Nueva nota</h2>
        <div class="card mb-4">
            <div class="card-body">
                <input type="text" id="inputTitulo" class="form-control mb-2" placeholder="Título de la nota">
                <textarea id="textareaNota" class="form-control mb-2" placeholder="Texto de la nota"></textarea>
                <button id="btnGuardar" class="btn btn-danger me-2">Guardar nota</button>
                <button id="btnLimpiar" class="btn btn-danger">Borrar</button>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <input type="text" id="buscarInput" class="form-control w-75" placeholder="Buscar notas...">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggleRealizadas">
                <label class="form-check-label" for="toggleRealizadas">Realizadas</label>
            </div>
        </div>
        <div id="contenedorNotas" class="row"></div>
    `;

    const { inputTitulo, textareaNota, btnGuardar, btnLimpiar, buscarInput, toggleRealizadas, contenedorNotas } =
        ['inputTitulo', 'textareaNota', 'btnGuardar', 'btnLimpiar', 'buscarInput', 'toggleRealizadas', 'contenedorNotas']
            .reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});

    function pintarNotas() {
        let notasFiltradas = notas.filter(nota =>
            (!terminoBusqueda || nota.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                nota.texto.toLowerCase().includes(terminoBusqueda.toLowerCase())) &&
            (!mostrarSoloRealizadas || nota.realizada)
        );

        contenedorNotas.innerHTML = notasFiltradas.length ?
            notasFiltradas.map(nota => `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <input class="form-check-input me-2" type="checkbox" id="checkbox-${nota.id}" ${nota.realizada ? 'checked' : ''}>
                                <h5 class="card-title mb-0">${nota.titulo}</h5>
                            </div>
                            <p class="card-text">${nota.texto}</p>
                            <button class="btn btn-danger btn-sm" onclick="borrarNota(${nota.id})">Borrar nota</button>
                        </div>
                    </div>
                </div>
            `).join('') :
            '<p class="text-dark">NO HAY NOTAS PARA MOSTRAR</p>';

        contenedorNotas.querySelectorAll('input[type="checkbox"]').forEach(checkbox =>
            checkbox.addEventListener('change', e => marcarNota(parseInt(checkbox.id.split('-')[1]), e.target.checked))
        );
    }

    btnGuardar.addEventListener('click', () => {
        const titulo = inputTitulo.value.trim();
        const texto = textareaNota.value.trim();
        if (titulo && texto) {
            notas.unshift({ id: ++idGlobal, titulo, texto, realizada: false });
            pintarNotas();
            inputTitulo.value = textareaNota.value = '';
        } else {
            alert('Por favor, completa tanto el título como el texto de la nota.');
        }
    });

    btnLimpiar.addEventListener('click', () => {
        inputTitulo.value = textareaNota.value = '';
    });

    toggleRealizadas.addEventListener('change', () => {
        mostrarSoloRealizadas = toggleRealizadas.checked;
        pintarNotas();
    });

    buscarInput.addEventListener('input', () => {
        terminoBusqueda = buscarInput.value;
        pintarNotas();
    });

    window.borrarNota = id => {
        notas = notas.filter(nota => nota.id !== id);
        pintarNotas();
    };

    window.marcarNota = (id, realizada) => {
        notas.find(nota => nota.id === id).realizada = realizada;
        pintarNotas();
    };

    pintarNotas();
});