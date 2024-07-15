document.addEventListener('DOMContentLoaded', function() {
    const m3uForm = document.getElementById('m3uForm');
    const m3uInput = document.getElementById('m3u');
    const mainScreen = document.getElementById('main-screen');
    const contentScreen = document.getElementById('content-screen');
    const backButton = document.getElementById('back-button');
    const contentList = document.getElementById('content-list');
    const contentTitle = document.getElementById('content-title');
    
    let channelsData = []; // Aqui você pode armazenar os dados dos canais
    let moviesData = []; // Aqui você pode armazenar os dados dos filmes
    let seriesData = []; // Aqui você pode armazenar os dados das séries
    
    // Simulação de dados para demonstração
    channelsData = [
        { name: 'Globo', logo: 'assets/channel-globo.png' },
        { name: 'SBT', logo: 'assets/channel-sbt.png' },
        { name: 'Record', logo: 'assets/channel-record.png' },
        { name: 'RedeTV!', logo: 'assets/channel-redetv.png' },
        { name: 'Band', logo: 'assets/channel-band.png' },
        { name: 'MTV', logo: 'assets/channel-mtv.png' },
        // Adicione mais canais conforme necessário
    ];

    // Simulação de 1000 filmes
    for (let i = 1; i <= 1000; i++) {
        moviesData.push({ title: `Filme ${i}`, poster: `assets/movie-${i}.jpg` });
    }

    // Simulação de 1000 séries
    for (let i = 1; i <= 1000; i++) {
        seriesData.push({ title: `Série ${i}`, poster: `assets/series-${i}.jpg` });
    }

    // Evento para enviar o link M3U
    m3uForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const m3uUrl = m3uInput.value.trim();
        if (m3uUrl) {
            // Simular lógica de validação e processamento do link M3U aqui
            // Exemplo: carregar dados de canais, filmes, séries, etc.
            showMainScreen(); // Mostrar tela principal após processamento do link M3U
        }
    });

    // Mostrar tela principal com opções de categorias
    function showMainScreen() {
        m3uScreen.style.display = 'none';
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