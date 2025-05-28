document.addEventListener('DOMContentLoaded', () => {
    const username = 'j-tiago'; 
    const projetosLista = document.getElementById('projetos-lista');
    
    async function buscarProjetosGitHub() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
            
            if (!response.ok) {
                throw new Error('Não foi possível carregar os projetos do GitHub');
            }
            
            const projetos = await response.json();
            
            projetosLista.innerHTML = '';
            
            if (projetos.length === 0) {
                projetosLista.innerHTML = '<p>Nenhum projeto público encontrado.</p>';
                return;
            }
            
            projetos.forEach(projeto => {
                const projetoElement = document.createElement('div');
                projetoElement.className = 'projeto-item';
                
                const nomeLinguagem = projeto.language || 'Não especificado';
                
                projetoElement.innerHTML = `
                    <a href="${projeto.html_url}" target="_blank" class="projeto-nome">
                        <i class="fas fa-code-branch"></i> ${projeto.name}
                    </a>
                    <p class="projeto-descricao">${projeto.description || 'Sem descrição disponível'}</p>
                    <span class="projeto-linguagem">${nomeLinguagem}</span>
                `;
                
                projetosLista.appendChild(projetoElement);
            });
            
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            projetosLista.innerHTML = `<p>Erro ao carregar projetos: ${error.message}</p>`;
        }
    }
    
    buscarProjetosGitHub();
    
    document.querySelector('.botao-saiba-mais').addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});