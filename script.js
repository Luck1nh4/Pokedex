var quantidade = document.getElementById('quantidade')
quantidade.addEventListener('keyup', ()=>{
    pokedex(quantidade.value)
})

pokedex()

function pokedex(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
.then(response => response.json())
.then(allpokemon => {
    var pokemons = []

    allpokemon.results.map((val)=> {
        fetch(val.url)
        .then(response => response.json())
        .then(pokemonSingle =>{
            pokemons.push({numero: pokemonSingle.order, nome: val.name, imagem: pokemonSingle.sprites.front_default, tipo: pokemonSingle.types})
            console.log(pokemonSingle.types)

            if(pokemons.length == quantidade){
                //finalizamos nossa requisição
                var pokemonBoxes = document.querySelector('.pokemon-boxes')
                pokemonBoxes.innerHTML = ""

                pokemons.map(function(val){
                    pokemonBoxes.innerHTML+=`
                    <div class="pokemon-box">
                    <img src="`+val.imagem+`"/>
                    <p>`+val.numero+`- `+val.nome[0].toUpperCase()+val.nome.substring(1)+`</p>
                </div>
                    `
                })
            }
        })
    })
})

}