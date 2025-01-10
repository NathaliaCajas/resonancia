function calcularFrecuencia() {
    // Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;

    // Verificar que los valores sean válidos
    if (masa == "" || k == "" || b == "") {
        alert("Por favor ingresa tanto la masa como la constante de rigidez.");
        return;
    }

    masa = parseFloat(masa);
    k = parseFloat(k);
    b = parseFloat(b);

    // Calcular el discriminante (parte bajo la raíz cuadrada)
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

    // Calcular la frecuencia angular solo si el discriminante es mayor o igual a 0
    var omega = Math.sqrt(discriminante > 0 ? discriminante : 0);

    
    var frecuencia = omega / (2 * Math.PI);

    
    document.getElementById("frecuencia").innerText = frecuencia.toFixed(2); 
    document.getElementById("mensaje").innerText = mensaje; 
}

