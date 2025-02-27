const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const Max_pantalla = 15;
const operadores = ["+", "-", "*", "/"];

// Agregar eventos de clic a los botones
botones.forEach(boton => {
    boton.addEventListener("click", () => manejarEntrada(boton.textContent));
});

// Manejar la entrada del usuario
function manejarEntrada(valorBoton) {
    if (pantalla.textContent === "0" && pantalla.textContent.length === 1 && valorBoton !== ".") {
        pantalla.textContent = "";
    }

    // Limpiar pantalla con "C"
    if (valorBoton === "C") {
        pantalla.textContent = "";
        return;
    }

    // Calcular resultado con "=" usando eval()
    if (valorBoton === "=") {
        try {
            if (pantalla.textContent.includes("..") || pantalla.textContent.includes("++") || 
                pantalla.textContent.includes("--") || pantalla.textContent.includes("**") || 
                pantalla.textContent.includes("//")) {
                pantalla.textContent = "Error";
                return;
            }
            pantalla.textContent = eval(pantalla.textContent);
        } catch (error) {
            pantalla.textContent = "Error";
        }
        return;
    }

    // Borrar último carácter con "←"
    if (valorBoton === "←") {
        if (pantalla.textContent.includes("Error")) {
            pantalla.textContent = "";
        } else {
            pantalla.textContent = pantalla.textContent.slice(0, -1);
        }
        return;
    }

    // Evitar que la pantalla tenga más de 15 caracteres
    if (pantalla.textContent.length >= Max_pantalla) {
        pantalla.textContent = "Error maximo de digitos";
        return;
    }

    // Evitar operadores consecutivos (ej. "5++5")
    if (operadores.includes(valorBoton) && operadores.includes(pantalla.textContent.slice(-1))) {
        return;
    }

    // Evitar múltiples puntos decimales en un mismo número
    if (valorBoton === "." && pantalla.textContent.split(/[\+\-\*\/]/).pop().includes(".")) {
        return;
    }

    // Agregar el valor a la pantalla
    pantalla.textContent += valorBoton;
}

// Permitir el uso del teclado
document.addEventListener("keydown", (event) => {
    const tecla = event.key;

    if ((tecla >= "0" && tecla <= "9") || operadores.includes(tecla) || tecla === ".") {
        manejarEntrada(tecla);
    } else if (tecla === "Enter") {
        manejarEntrada("=");
    } else if (tecla === "Backspace") {
        manejarEntrada("←");
    } else if (tecla === "Escape") {
        manejarEntrada("C");
    }
});
