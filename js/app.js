// Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fehcaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');

const contenedorCitas = document.querySelector('#citas');

// Event listener del formulario
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fehcaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);

// Objeto cita
const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
};

// Clases
// Constructor de Notificación
class Notificacion {
  constructor({texto, tipo}) {
    this.texto = texto;
    this.tipo = tipo;
    this.mostrarNotificacion();
  }

  mostrarNotificacion() {
    // Creacion de la notificacion
    const alerta = document.createElement('div');
    alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

    // Eliminar alertas duplicadas 
    const alertaPrevia = document.querySelector('.alert');
    alertaPrevia?.remove()

    // Si es de tipo error, agrega la clase...
    this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

    // Agrega el texto a la notificacion
    alerta.textContent = this.texto;
    
    // Inserta la notificacion en el html
    formulario.parentElement.insertBefore(alerta, formulario);

    // Elimina la notificacion despues de 3 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

class AdminCitas {
  constructor() {
    this.citas = [];
    // this.cargarCitasFromLS();
  }

  agregar(cita) {
    this.citas = [...this.citas, cita];
    this.mostrar();
  }

  mostrar() {
    // Limpiar el html
    while(contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild)
    }

    // Mostrar las citas
    this.citas.forEach(cita => {
      const divCita = document.createElement('div');
      divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
  
      const paciente = document.createElement('p');
      paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
  
      const propietario = document.createElement('p');
      propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
      propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
  
      const email = document.createElement('p');
      email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
  
      const fecha = document.createElement('p');
      fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
      fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
  
      const sintomas = document.createElement('p');
      sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
      sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
  
      // Agregar al HTML
      divCita.appendChild(paciente);
      divCita.appendChild(propietario);
      divCita.appendChild(email);
      divCita.appendChild(fecha);
      divCita.appendChild(sintomas);
      contenedorCitas.appendChild(divCita);
    });
  }
}


// Función para obtener los datos de la cita

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

const citas = new AdminCitas();
function submitCita(e) {
  e.preventDefault();
  
  if (Object.values(citaObj).some(valor => valor.trim() === '')) {
    new Notificacion({ 
      texto: 'Todos los campos son obligatorios', 
      tipo: 'error' 
    });
    return;
  }

  citas.agregar(citaObj);
}