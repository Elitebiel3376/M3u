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

    // Evento para enviar o link M3U
    m3uForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const m3uUrl = m3uInput.value.trim();
        if (m3uUrl) {
            loadChannelsFromM3U(m3uUrl);
        } else {
            alert('Por favor, insira um link M3U válido.');
        }
    });

    // Função para carregar canais a partir do link M3U
    function loadChannelsFromM3U(m3uUrl) {
        fetch(m3uUrl)
            .then(response => response.text())
            .then(data => {
                channelsData = parseM3U(data);
                if (channelsData.length > 0) {
                    // Carregar dados de filmes (simulação)
                    loadMoviesData();
                    showMainScreen();
                } else {
                    alert('Não foi possível carregar os canais do M3U.');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar dados do M3U:', error);
                alert('Não foi possível carregar os dados do M3U. Verifique o link e tente novamente.');
            });
    }

    // Função para analisar o conteúdo do M3U e extrair os canais
    function parseM3U(m3uContent) {
        const channels = [];
        const lines = m3uContent.split('\n');
        let currentChannel = {};

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('#EXTINF:')) {
                const parts = line.split(',');
                const title = parts[1];
                currentChannel = { name: title };
            } else if (line.startsWith('http') || line.startsWith('https')) {
                currentChannel.url = line.trim();
                channels.push(currentChannel);
                currentChannel = {};
            }
        });
        return channels;
    }

    // Simulação de carregamento de dados de filmes
    function loadMoviesData() {
        // Simulação de 100 filmes
        for (let i = 1; i <= 100; i++) {
            moviesData.push({ title: `Filme ${i}`, poster: `assets/movie-${i}.jpg` });
        }
    }

    // Mostrar tela principal com os canais
    function showMainScreen() {
        mainScreen.style.display = 'block';
        contentScreen.style.display = 'none';
        renderContent(channelsData, 'Canais');
    }

    // Mostrar tela de conteúdo com base na categoria selecionada
    function showContentScreen(category) {
        mainScreen.style.display = 'none';
        contentScreen.style.display = 'block';

        // Limpar qualquer conteúdo anterior
        contentList.innerHTML = '';
        
        // Renderizar conteúdo com base na categoria
        switch (category) {
            case 'movies':
                renderContent(moviesData, 'Filmes');
                break;
            // Adicione outros casos conforme necessário para outras categorias
            default:
                break;
        }
    }

    // Renderizar o conteúdo da categoria selecionada
    function renderContent(data, title) {
        contentTitle.textContent = title;
        data.forEach(item => {
            const element = document.createElement('div');
            element.innerHTML = `<p>${item.name || item.title}</p>`;
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
        showMainScreen();
    });

    document.getElementById('movies').addEventListener('click', function() {
        showContentScreen('movies');
    });

    document.getElementById('series').addEventListener('click', function() {
        showContentScreen('series');
    });

    // Inicialização: mostrar tela principal ao carregar
    showMainScreen();
});