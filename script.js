document.addEventListener('DOMContentLoaded', function() {
    const m3uForm = document.getElementById('m3uForm');
    const m3uInput = document.getElementById('m3u');
    const mainScreen = document.getElementById('main-screen');
    const contentScreen = document.getElementById('content-screen');
    const backButton = document.getElementById('back-button');
    const contentList = document.getElementById('content-list');
    const contentTitle = document.getElementById('content-title');
    
    let channelsData = []; // Dados dos canais

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
        // Aqui você pode implementar a lógica para carregar os dados dos canais do link M3U
        fetch(m3uUrl)
            .then(response => response.text())
            .then(data => {
                channelsData = parseM3U(data); // Função para analisar o conteúdo do M3U e extrair os canais
                showMainScreen();
            })
            .catch(error => {
                console.error('Erro ao carregar dados do M3U:', error);
                alert('Não foi possível carregar os dados do M3U. Verifique o link e tente novamente.');
            });
    }

    // Função para analisar o conteúdo do M3U e extrair os canais
    function parseM3U(m3uContent) {
        const channels = [];
        // Exemplo simples de análise de um M3U básico
        const lines = m3uContent.split('\n');
        let currentChannel = {};
        lines.forEach(line => {
            if (line.startsWith('#EXTINF:')) {
                // Extrair informações do canal
                const parts = line.split(',');
                const title = parts[1];
                currentChannel = { name: title };
            } else if (line.startsWith('http')) {
                // URL do canal
                currentChannel.url = line.trim();
                channels.push(currentChannel);
                currentChannel = {};
            }
        });
        return channels;
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
        
        // Aqui você pode adicionar lógica para outras categorias se necessário
        switch (category) {
            default:
                break;
        }
    }

    // Renderizar o conteúdo da categoria selecionada
    function renderContent(data, title) {
        contentTitle.textContent = title;
        data.forEach(item => {
            const element = document.createElement('div');
            element.innerHTML = `<p>${item.name}</p>`;
            element.addEventListener('click', function() {
                // Lógica para o que acontece quando o usuário clica em um canal
                alert(`Você clicou em ${item.name}`);
            });
            contentList.appendChild(element);
        });
    }

    // Voltar para a tela principal ao clicar no botão Voltar
    backButton.addEventListener('click', function() {
        contentScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    });

    // Inicialização: mostrar tela principal ao carregar
    showMainScreen();
});