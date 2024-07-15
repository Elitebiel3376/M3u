document.addEventListener('DOMContentLoaded', function() {
    const m3uForm = document.getElementById('m3uForm');
    const m3uInput = document.getElementById('m3u');
    const mainScreen = document.getElementById('main-screen');
    const contentScreen = document.getElementById('content-screen');
    const backButton = document.getElementById('back-button');
    const contentList = document.getElementById('content-list');
    const contentTitle = document.getElementById('content-title');
    
    let channelsData = []; // Dados dos canais
    let moviesData = []; // Dados dos filmes
    let seriesData = []; // Dados das séries
    
    // Simulação de dados para demonstração
    channelsData = [
        { name: 'Globo', logo: 'assets/channel-globo.png' },
        { name: 'SBT', logo: 'assets/channel-sbt.png' },
        { name: 'Record', logo: 'assets/channel-record.png' },
        { name: 'RedeTV!', logo: 'assets/channel-redetv.png' },
        { name: 'Band', logo: 'assets/channel-band.png' },
        { name: 'MTV', logo: 'assets/channel-mtv.png' }
    ];

    moviesData = [
        { title: 'Filme 1', poster: 'assets/movie-1.jpg' },
        { title: 'Filme 2', poster: 'assets/movie-2.jpg' },
        { title: 'Filme 3', poster: 'assets/movie-3.jpg' }
    ];

    seriesData = [
        { title: 'Série 1', poster: 'assets/series-1.jpg' },
        { title: 'Série 2', poster: 'assets/series-2.jpg' },
        { title: 'Série 3', poster: 'assets/series-3.jpg' }
    ];

    // Evento para enviar o link M3U
    m3uForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const m3uUrl = m3uInput.value.trim();
        if (m3uUrl) {
            // Simular redirecionamento para o link M3U
            window.location.href = m3uUrl;
        } else {
            alert('Por favor, insira um link M3U válido.');
        }
    });

    // Mostrar tela principal com opções de categorias
    function showMainScreen() {
        mainScreen.style.display = 'block';
    }

    // Mostrar tela de conteúdo com base na categoria selecionada
    function showContentScreen(category) {
        mainScreen.style.display = 'none';
        contentScreen.style.display = 'block';

        // Limpar qualquer conteúdo anterior
        contentList.innerHTML = '';
        
        switch (category) {
            case 'channels':
                renderContent(channelsData, 'Canais');
                break;
            case 'movies':
                renderContent(moviesData, 'Filmes');
                break;
            case 'series':
                renderContent(seriesData, 'Séries');
                break;
            default:
                break;
        }
    }

    // Renderizar o conteúdo da categoria selecionada
    function renderContent(data, title) {
        contentTitle.textContent = title;
        data.forEach(item => {
            const element = document.createElement('div');
            element.innerHTML = `<img src="${item.logo || item.poster}" alt="${item.name || item.title}">
                                <p>${item.name || item.title}</p>`;
            element.addEventListener('click', function() {
                // Lógica para o que acontece quando o usuário clica em um item
                alert(`Você clicou em ${item.name || item.title}`);
            });
            contentList.appendChild(element);
        });
    }

    // Voltar para a tela principal ao clicar no botão Voltar
    backButton.addEventListener('click', function() {
        contentScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    });

    // Event listeners para clicar nas opções (Canais, Filmes, Séries)
    document.getElementById('channels').addEventListener('click', function() {
        showContentScreen('channels');
    });

    document.getElementById('movies').addEventListener('click', function() {
        showContentScreen('movies');
    });

    document.getElementById('series').addEventListener('click', function() {
        showContentScreen('series');
    });

});