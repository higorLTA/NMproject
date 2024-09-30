document.getElementById('form').addEventListener('submit', async (event) => {
event.preventDefault(); // Previne o comportamento padrão do formulário

    const login = document.getElementById('login').value
    const senha = document.getElementById('senha').value

try{
    const response = await fetch('http://localhost:3000/items/',{
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({login,senha })
    })

    if (response.ok){
        alert('Usuario criado com sucesso ')
    }else{
        alert('erro ao criar usuário')
    }
} catch {
    console.error('erro:', error)
}


})