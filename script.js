// Variables globales para almacenar los gráficos actuales
let graficoSinAmortiguamiento = null;
let graficoAmortiguado = null;

function calcularFrecuencia() {
    // Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;
    var mensajeError = document.getElementById("mensajeError"); // Elemento para mostrar el mensaje de error

    // Limpiar el mensaje de error antes de hacer nuevas verificaciones
    mensajeError.innerHTML = "";

    // Verificar que los valores sean válidos
    if (masa == "" || k == "" || b == "") {
        mensajeError.innerHTML = "Por favor ingresa tanto la masa como la constante de rigidez y el coeficiente de amortiguamiento.";
        return;
    }

    masa = parseFloat(masa);
    k = parseFloat(k);
    b = parseFloat(b);

    // Verificar que los valores sean números válidos y dentro del rango permitido
    if (isNaN(masa) || isNaN(k) || isNaN(b)) {
        mensajeError.innerHTML = "Por favor ingresa valores válidos.";
        return;
    }

    if (masa <= 0) {
        mensajeError.innerHTML = "La masa debe ser mayor a cero.";
        return;
    }

    if (k < 1 || k > 10000) {
        mensajeError.innerHTML = "La constante de rigidez debe estar entre 1 y 10000.";
        return;
    }

    if (b < 0.1 || b > 1000) {
        mensajeError.innerHTML = "El coeficiente de amortiguamiento debe estar entre 0.1 y 1000.";
        return;
    }

    // Calcular la frecuencia angular no amortiguada (omega_0)
    var omega0 = Math.sqrt(k / masa);  // Frecuencia angular natural

    // Calcular el discriminante (parte bajo la raíz cuadrada para el tipo de amortiguamiento)
    var discriminante = (k / masa) - Math.pow(b / (2 * masa), 2);

    // Variable para almacenar el mensaje sobre el amortiguamiento
    var mensaje = "";

    // Verificar el tipo de amortiguamiento
    if (discriminante > 0) {
        mensaje = "El sistema es subamortiguado";
    } else if (discriminante == 0) {
        mensaje = "El sistema es críticamente amortiguado";
    } else {
        mensaje = "El sistema es sobreamortiguado";
    }

    // Calcular la frecuencia angular amortiguada (omega_d) solo si el sistema es subamortiguado
    var omega_d = 0;
    var gamma = b / (2 * masa); // Coeficiente de amortiguamiento
    if (discriminante > 0) {
        omega_d = Math.sqrt(omega0**2 - Math.pow(b / (2 * masa), 2));  // Fórmula correcta para la frecuencia amortiguada
    }

    // Mostrar resultados
    document.getElementById("frecuencia").innerText = omega0.toFixed(2);
    document.getElementById("mensaje").innerText = mensaje;

    // Mostrar la frecuencia amortiguada solo si el sistema es subamortiguado
    if (discriminante > 0) {
        document.getElementById("amortiguado").innerText = omega_d.toFixed(2);
    } else {
        document.getElementById("amortiguado").innerText = "No aplicable";
    }

    // Graficar la posición vs. tiempo para ambos sistemas
    graficarPosicionSinAmortiguamiento(omega0);
    graficarPosicionAmortiguada(omega_d, gamma);
}

// Función para graficar la posición del sistema sin amortiguamiento
function graficarPosicionSinAmortiguamiento(omega0) {
    var ctx = document.getElementById("graficoSinAmortiguamiento").getContext('2d');

    // Si ya existe un gráfico, destrúyelo
    if (graficoSinAmortiguamiento) {
        graficoSinAmortiguamiento.destroy();
    }
   
    var tiempo = [];
    var posicion = [];

    // Simulación del movimiento sin amortiguamiento: x(t) = A * cos(omega0 * t)
    for (var t = 0; t <= 10; t += 0.1) {
        var x = Math.cos(omega0 * t);
        tiempo.push(t);
        posicion.push(x);
    }

    // Crear gráfico con Chart.js
    graficoSinAmortiguamiento = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tiempo,
            datasets: [{
                label: 'Posición (sin amortiguamiento)',
                data: posicion,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Posición (m)'
                    },
                    min: -1,
                    max: 1
                }
            }
        }
    });
}

// Función para graficar la posición del sistema amortiguado
function graficarPosicionAmortiguada(omega_d, gamma) {
    var ctx = document.getElementById("graficoAmortiguado").getContext('2d');

    // Si ya existe un gráfico, destrúyelo
    if (graficoAmortiguado) {
        graficoAmortiguado.destroy();
    }
   
    var tiempo = [];
    var posicion = [];

    // Simulación del movimiento amortiguado: x(t) = A * exp(-gamma * t) * cos(omega_d * t)
    for (var t = 0; t <= 10; t += 0.1) {
        var x = Math.exp(-gamma * t) * Math.cos(omega_d * t);
        tiempo.push(t);
        posicion.push(x);
    }

    // Crear gráfico con Chart.js
    graficoAmortiguado = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tiempo,
            datasets: [{
                label: 'Posición (amortiguado)',
                data: posicion,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Posición (m)'
                    },
                    min: -1,
                    max: 1
                }
            }
        }
    });
}
