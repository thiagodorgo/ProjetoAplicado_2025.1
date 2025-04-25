/**
 * Frontend Scripts
 * Handles dynamic content fetching and interactivity for the app.
 */

// Base URL do backend (ajuste conforme necessário)
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch genérico para reutilização
 */
async function fetchData(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao processar a requisição em ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Renderização da lista de cursos
 */
async function fetchCourses() {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '<p>Carregando cursos...</p>'; // Loader temporário

    try {
        const courses = await fetchData('/courses');
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
        courseList.innerHTML = '<p>Erro ao carregar cursos. Tente novamente mais tarde.</p>';
    }
}

/**
 * Renderização da lista de treinamentos
 */
async function fetchTrainings() {
    const trainingList = document.getElementById('training-list');
    trainingList.innerHTML = '<p>Carregando treinamentos...</p>'; // Loader temporário

    try {
        const trainings = await fetchData('/trainings');
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
        trainingList.innerHTML = '<p>Erro ao carregar treinamentos. Tente novamente mais tarde.</p>';
    }
}

/**
 * Gerenciar o formulário de login
 */
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const result = await fetchData('/login', 'POST', { email, password });
        alert('Login realizado com sucesso!');
        console.log(result);
        // Redirecionar para a página principal, por exemplo:
        // window.location.href = '/dashboard.html';
    } catch (error) {
        alert('Erro: Verifique suas credenciais.');
    }
}