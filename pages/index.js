const clientId = "de129d0c7fa34b6a8388a38a864950bb";
const redirectUri = "http://127.0.0.1:5500/pages/index.html"; // Verifique se é o URI correto
const scopes = "playlist-modify-public playlist-modify-private";

document.getElementById('login-button').addEventListener('click', () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;  // Redireciona para autenticação
});

// Obtém o código de autorização da URL após redirecionamento
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');

if (authorizationCode) {
    console.log("Código de autorização obtido:", authorizationCode); // Log do código

    const clientSecret = "9557b3a69e7948fc850a2aa39463fc82";  // Verifique se é o Client Secret correto
    const authString = btoa(`${clientId}:${clientSecret}`);

    // Montando o corpo da requisição
    const body = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    console.log("Corpo da requisição:", body); // Log do corpo da requisição

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authString}`
        },
        body: body
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Erro ao obter o token:', errorData); // Log detalhado do erro
                throw new Error('Erro ao obter o token de acesso');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Token de Acesso:", data.access_token);
        // Armazene o token ou use-o diretamente para fazer outras requisições à API
    })
    .catch(error => console.error('Erro:', error));
} else {
    console.log("Código de autorização não encontrado na URL");
}
