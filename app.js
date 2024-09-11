let crafting = ""
let craftingList = ""
let slides = ""
let slideIndex = 0;
const inputPesquisa = document.getElementById('input_pesquisa');
const btnText = document.getElementById('btn-text');

function normalizeString(str) {
    if (str === null || str === undefined) {
        return ''; // Retorna uma string vazia ou outro valor padrão
    }
    // Remover espaços em branco
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    return str;
}

function getCraftingItemImage(recipe, itemLista) {
    let recipeList = ""
    for (let i = 0; i < recipe.length; i++) {
        if (recipe[i] !== null) {
            if (Array.isArray(recipe[i])) {
                let subRecipeList = ""
                for (let j = 0; j < recipe[i].length; j++) {
                    if (recipe[i][j] !== null) { 
                        const sub_item = itemLista.find(item => item.name === recipe[i][j]);
                        if (sub_item) {
                            subRecipeList += `<a href="#" class="tooltip" title="${sub_item.name}"><img src="${sub_item.image}"></a>`
                        }
                    } else {
                        subRecipeList += ''
                    }
                }
                recipeList += `<div class="craft slot carousel"><div class="slide">${subRecipeList}</div></div>`;
            } else {
                const item = itemLista.find(item => item.name === recipe[i]);
                if (item) {
                    recipeList += `<div class="craft slot"><a href="#" class="tooltip" title="${item.name}"><img src="${item.image}"></a></div>`;
                }
            }
        }
        else {
            recipeList += `<div class="craft slot"></div>`; // Sem item na posição retorna nada, coloca uma div vazia
        }
    }
    return recipeList
}

function getItemImage(item, itensLista) {
    for (let j = 0; j < itensLista.length; j++) {
        const iten = itensLista.find(iten => iten.name === item);
        if (iten) {
            return `<a href="#" class="tooltip" title="${iten.name}"><img src="${iten.image}"></a>`;
        }
    }
}

async function pesquisar() {
    let section = document.getElementById("resultados-pesquisa")
    let craftingList = ""
    const itens = await items.then(resultado => {
        return resultado
    }).catch(resultado => {console.log(resultado)})

    crafting = await dados.then(resultado => {
        return resultado
    }).catch(resultado => {console.log(resultado)})

    for (let craft of crafting) {
        let namespaceItem = normalizeString(craft.item)
        let namespacePesquisa = normalizeString(inputPesquisa.value)
        if (namespaceItem.includes(namespacePesquisa)) { // verifica se item é igual pesquisa
            craftingList += `
            <div class="item-resultado">
                <h2>${craft.item}</h2>
                <div class="div-resultado">
                    <div id="craft">
                        ${getCraftingItemImage(craft.recipe, itens)}
                    </div>
                    <div>
                        <span class="craft-arrow"></span>
                    </div>
                    <div style="align-content: center;">
                        <div class="craft result">${craft.quantity > 1 ? `<span class="qtd">${craft.quantity}</span>` : ''}${getItemImage(craft.item, itens)}</div>
                    </div>
                </div>
            </div>
            `
        }
    }
    if (craftingList.length == 0) {
        section.innerHTML = "Nothing found"
    } else {
        section.innerHTML = craftingList
    }
    $( function() {
        function onHoverToggleTooltip( e ) {
            var $this	= $( this ),
                title	= $this.attr( 'title' ),
                type	= e.type,
                offset 	= $this.offset(),
                xOffset = e.pageX - offset.left,
                yOffset = e.pageY - offset.top - 10,
                yOffset = e.pageZ - offset.top;
            if( type == 'mouseenter' ) {
                $this.data( 'tipText', title ).removeAttr( 'title' );
                $this.append( '<span class="title">' + title + '</span>' ).hide().fadeIn(250);
                $this.find ( '.title' )
                    .css( 'top', ( yOffset ) + 'px' )
                    .css( 'left', ( xOffset ) + 'px' );
            } else if ( type == 'mouseleave' ) {
                $this.attr( 'title', $this.data( 'tipText' ) );
                $this.find ( '.title' ).fadeOut().remove();
            } else if ( type == 'mousemove' ) {
                $this.find ( '.title' )
                    .css( 'top', ( yOffset ) + 'px' )
                    .css( 'left', ( xOffset ) + 'px' );
            }
        }
        $( document.querySelectorAll( '.tooltip' ) ).on({ 
            mouseenter: onHoverToggleTooltip, 
            mouseleave: onHoverToggleTooltip, 
            mousemove: onHoverToggleTooltip
        });
    });
    slides = document.querySelectorAll(".slide")
    setInterval(nextSlide, 2000)
}

function atualizarTextoBotao() {
    if (inputPesquisa.value.trim() === '') {
        btnText.textContent = 'Show All';
    } else {
        btnText.textContent = 'Search';
    }
}
// Adiciona um event listener ao input
inputPesquisa.addEventListener('input', atualizarTextoBotao);
// Chama a função inicialmente para setar o texto correto
atualizarTextoBotao();

function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach(slide => {
        const images = slide.querySelectorAll('img');
        images.forEach((image, imgIndex) => {
            image.classList.toggle('active', imgIndex === index);
            image.classList.toggle('hidden', imgIndex !== index);
        });
    })
}

function nextSlide() {
    showSlide(slideIndex + 1);
}