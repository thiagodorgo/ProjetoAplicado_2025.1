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
/**
 * Gerenciar o formulário de login
 */
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const result = await response.json();
        alert('Login realizado com sucesso!');
        console.log(result);
        // Redirecionar para a página principal, por exemplo:
        // window.location.href = '/dashboard.html';
    } catch (error) {
        console.error(error);
        alert('Erro: Verifique suas credenciais.');
    }
});
/**
 * Gerenciar o formulário de cadastro
 */
document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer cadastro');
        }

        const result = await response.json();
        alert('Cadastro realizado com sucesso!');
        console.log(result);
        // Redirecionar para a página de login
        window.location.href = 'login.html';
    } catch (error) {
        console.error(error);
        alert('Erro: Não foi possível realizar o cadastro.');
    }
});