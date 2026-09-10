const SUPABASE_URL = "https://xxgcwmpuuijihhhhlvrv.supabase.co/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4Z2N3bXB1dWlqaWhoaGhsdnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwNjE3OTcsImV4cCI6MjEwNDYzNzc5N30.AIFWHeXjqnos-tIuLomnl44mhQYsk-iQGyqCwo-JEAE";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const input1 = document.getElementById("nombre-obra");
const input2 = document.getElementById("descripcion");
const boton = document.getElementById("crear");

boton.addEventListener("click", async () => {

    const nombre = input1.value;
    const descripcion = input2.value;

    if (nombre.trim() === "") {
        alert("Ingrese un nombre");
        return;
    }

    const { data, error } = await supabaseClient
        .from("obra")
        .insert([
            {
                nombre_o: nombre,
                descripcion: descripcion
            }
        ]);

    if (error) {
        console.error(error);
        alert("Error al crear la obra");
        return;
    }

    alert("Obra creada correctamente");
    input.value = "";
});

async function cargarObras() {
    const contenedor = document.getElementById('contenedor-obras');

    const {data, error} = await supabaseClient
        .from('obra')
        .select('*')
        .order('created_at', {ascending: false});

    if (error) {
        contenedor.innerText = 'Error al cargar las obras';
        console.error(error);
        return;
    }

    if (obra.length === 0){
        contenedor.innerText = 'No tienes obras creadas todavia.';
        return;
    }

    contenedor.innerHTML = '';

    obra.forEach(obra => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('caja-obra');

        tarjeta.innerHTML = `
                    <h3>${obra.nombre}</h3>
                    <p>${obra.descripcion}</p>
        `;

        contenedor.appendChild(tarjeta);
    })
} 

document.addEventListener('DOMContentLoaded', cargarObras);