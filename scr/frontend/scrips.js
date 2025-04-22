/**
 * Frontend Scripts
 * Handles dynamic content fetching and interactivity for the app.
 */

// Base URL do backend (ajuste conforme necessário)
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch e renderização da lista de cursos
 */
async function fetchCourses() {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '<p>Carregando cursos...</p>'; // Loader temporário

    try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        if (!response.ok) {
            throw new Error('Erro ao buscar cursos');
        }

        const courses = await response.json();
        courseList.innerHTML = ''; // Limpa o loader
        courses.forEach(course => {
            courseList.innerHTML += `
                <div class="card">
                    <h3>${course.name}</h3>
                    <p>Duração: ${course.duration_in_hours} horas</p>
                    <p>Validade: ${course.validity_in_years} anos</p>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
        courseList.innerHTML = '<p>Erro ao carregar cursos. Tente novamente mais tarde.</p>';
    }
}

/**
 * Fetch e renderização da lista de treinamentos
 */
async function fetchTrainings() {
    const trainingList = document.getElementById('training-list');
    trainingList.innerHTML = '<p>Carregando treinamentos...</p>'; // Loader temporário

    try {
        const response = await fetch(`${API_BASE_URL}/trainings`);
        if (!response.ok) {
            throw new Error('Erro ao buscar treinamentos');
        }

        const trainings = await response.json();
        trainingList.innerHTML = ''; // Limpa o loader
        trainings.forEach(training => {
            trainingList.innerHTML += `
                <div class="card">
                    <h3>${training.courseName}</h3>
                    <p>Funcionário: ${training.employeeName}</p>
                    <p>Data de Conclusão: ${new Date(training.completion_date).toLocaleDateString()}</p>
                    <p>Validade Até: ${new Date(training.expiration_date).toLocaleDateString()}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
        trainingList.innerHTML = '<p>Erro ao carregar treinamentos. Tente novamente mais tarde.</p>';
    }
}

/**
 * Inicialização do app
 */
function initApp() {
    console.log('Iniciando aplicação...');
    fetchCourses();
    fetchTrainings();
}

// Inicializa o app quando o DOM está totalmente carregado
document.addEventListener('DOMContentLoaded', initApp);