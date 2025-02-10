import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {

const [bairro, setBairro] = useState('Monte Verde')
const [vetorObjetosUsuarios, setVetorObjetosUsuarios] = useState([])
const [usuarioLogado, setUsuarioLogado] = useState(false)
const [posicaoUsuario, setPosicaoUsuario] = useState('vazio')
const [posicaoUsuarioID, setPosicaoUsuarioID] = useState(null)
const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState('')
const [livroAcessado, setLivroAcessado] = useState('')
const [listaResenhas, setListaResenhas] = useState([])

const [biblioteca, setBiblioteca] = useState([
    {
        capaLivro: './images/dom_casmurro.jpg',
        idLivro: 0,
        tituloLivro: 'Dom Casmurro',
        autorLivro: 'Machado de Assis',
        isbnLivro: '9788594318602',
        anoLivro: '1899',
        editoraLivro: 'Livraria Garnier',
        sinopseLivro: 'Dom Casmurro, a obra mais conhecida do escritor Machado de Assis, conta a história de Bentinho e Capitu, que, apaixonados na adolescência, têm que enfrentar um obstáculo à realização de seus anseios amorosos, pois a mãe de Bentinho, D. Glória, fez uma promessa de que seu filho seria padre. Assim, no seminário, Bentinho conhece Escobar, que se torna seu melhor amigo e encontra uma solução para o problema.',
        generoLivro: ['Romance', 'Realista'],
        resenhasLivro: [{

            nomeUsuario: '',
            resenhaUsuario: '',

        }],
    },
    {
        capaLivro: './images/vidas_secas.jpg',
        tituloLivro: 'Vidas secas',
        autorLivro: 'Graciliano Ramos',
        isbnLivro: '9788501114785',
        anoLivro: '2019',
        editoraLivro: 'Record; 159ª edição',
        sinopseLivro: 'Lançado originalmente em 1938, Vidas secas retrata a vida miserável de uma família de retirantes sertanejos obrigada a se deslocar de tempos em tempos para áreas menos castigadas pela seca. O pai, Fabiano, caminha pela paisagem árida da caatinga do Nordeste brasileiro com a sua mulher, Sinha Vitória, e os dois filhos. São também acompanhados pela cachorrinha da família, Baleia. O livro denuncia fortemente as mazelas do povo brasileiro, principalmente a situação de miséria do sertão nordestino. É o romance em que Graciliano alcança o máximo da expressão que vinha buscando em sua prosa: o que impulsiona os personagens é a seca, áspera e cruel, e paradoxalmente a ligação telúrica, afetiva, que expõe naqueles seres em retirada, à procura de meios de sobrevivência e um futuro.',
        generoLivro: ['Romance'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/battle_royale.jpg',
        tituloLivro: 'Battle Royale',
        autorLivro: 'Koushun Takami',
        isbnLivro: '9788525056122',
        anoLivro: '2014',
        editoraLivro: 'Globo Livros',
        sinopseLivro: 'Battle Royale se passa em uma versão fictícia do Japão, apresentado como um estado policial. O estado, conhecido como a República da Grande Ásia Oriental (大東亜共和国 Dai Tōa Kyōwakoku), se originou após uma revolta populacional e sofreu uma repressão pela junção das Forças Armadas e das Forças de Polícia. De tempos em tempos, 42 alunos do 9º ano de alguma escola secundária são selecionados aleatoriamente para pegar armas e lutar entre si até que somente um sobreviva. O Programa foi criado, supostamente, como uma forma de pesquisa militar, com o resultado de cada batalha sendo transmitido na televisão.',
        generoLivro: ['Thriller psicológico', 'Ficção Científica', 'Horror'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/romeu-julieta.png',
        tituloLivro: 'Romeu e Julieta',
        autorLivro: 'William Shakespeare',
        isbnLivro: '9788582850404',
        anoLivro: '2016',
        editoraLivro: 'Penguin-Companhia; 1ª edição',
        sinopseLivro: 'Há muito tempo duas famílias banham em sangue as ruas de Verona. Enquanto isso, na penumbra das madrugadas, ardem as brasas de um amor secreto. Romeu, filho dos Montéquio, e Julieta, herdeira dos Capuleto, desafiam a rixa familiar e sonham com um impossível futuro, longe da violência e da loucura. Romeu e Julieta é a primeira das grandes tragédias de William Shakespeare, e esta nova tradução de José Francisco Botelho recria com maestria o ritmo ao mesmo tempo frenético e melancólico do texto shakespeariano.',
        generoLivro: ['Romance', 'Drama'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/bichos.jpg',
        tituloLivro: 'A Revolução dos\nBichos',
        autorLivro: 'George Orwell',
        isbnLivro: '9788535914389',
        anoLivro: '1945',
        editoraLivro: 'Companhia das Letras',
        sinopseLivro: 'Em A Revolução dos Bichos, os animais de uma fazenda se rebelam contra seu opressor, o fazendeiro Mr. Jones, buscando uma sociedade mais justa e igualitária. Sob a liderança de dois porcos, Napoleão e Bola-de-Neve, os animais estabelecem um novo regime, onde todos são iguais, mas rapidamente os ideais de liberdade e fraternidade são corrompidos. A obra é uma sátira feroz ao totalitarismo e à manipulação política, oferecendo uma crítica profunda ao poder, à opressão e às falácias da ideologia.',
        generoLivro: ['Política', 'Distopia'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro:  './images/magico_de_oz.jpg',
        tituloLivro: 'O Mágico de Oz',
        autorLivro: 'L. Frank Baum',
        isbnLivro: '9788551301777',
        anoLivro: '1900',
        editoraLivro: 'George M. Hill Company',
        sinopseLivro: 'Dorothy Gale, uma jovem que vive no Kansas com sua tia Em e tio Henry, é levada por um ciclone para a mágica Terra de Oz. Lá, ela descobre um mundo colorido e fantástico, habitado por bruxas, criaturas mágicas e cidades deslumbrantes. Determinada a voltar para casa, Dorothy embarca em uma jornada até a Cidade das Esmeraldas para buscar a ajuda do misterioso Mágico de Oz. No caminho, ela faz amizades inesquecíveis com o Espantalho, que deseja um cérebro, o Homem de Lata, que anseia por um coração, e o Leão Covarde, que busca coragem. Juntos, eles enfrentam desafios, superam seus medos e descobrem que possuem a força necessária para alcançar seus objetivos. Uma história sobre amizade, autodescoberta e o poder do lar.',
        generoLivro: ['Romance', 'Realismo Crítico'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }]
    },
    {
        capaLivro: './images/sombras_de_outubro.jpg',
        tituloLivro: 'As Sombras de Outubro',
        autorLivro: 'Søren Sveistrup',
        isbnLivro: '9788555340858',
        anoLivro: '2019',
        editoraLivro: 'Suma de Letras',
        sinopseLivro: 'Em Copenhague, a polícia encontra uma mulher brutalmente assassinada em um parque infantil. Próximo ao corpo, há uma misteriosa figura feita de castanhas — o Homem de Castanhas. O caso é atribuído aos detetives Naia Thulin e Mark Hess, que descobrem uma conexão chocante entre o assassinato e um caso arquivado de uma menina desaparecida há um ano. À medida que a investigação avança, novos crimes surgem, todos envolvendo a figura das castanhas. Em um enredo sombrio e intrigante, os detetives precisam correr contra o tempo para desvendar a mente de um assassino engenhoso antes que ele faça mais vítimas.',
        generoLivro: ['Thriller Policial', 'Fantasia', 'Mistério'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/ultimo_adeus.jpg',
        tituloLivro: 'O Último Adeus',
        autorLivro: 'Cynthia Hand',
        isbnLivro: '9788581637044',
        anoLivro: '2015',
        editoraLivro: 'DarkSide Books',
        sinopseLivro: 'Lex tem 18 anos e está tentando lidar com a perda devastadora de seu irmão caçula, Tyler, que cometeu suicídio. Carregando o peso da culpa e do luto, Lex tenta reconstruir sua vida enquanto enfrenta memórias dolorosas, a distância emocional de sua mãe e a sensação de que seu irmão ainda está presente de alguma forma. Por meio de entradas no diário e reflexões profundas, O Último Adeus é uma história emocionante sobre amor, perda e a força necessária para seguir em frente.',
        generoLivro: ['Ficção psicológica', 'Romance', 'Drama'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/culpa_estrelas.jpg',
        tituloLivro: 'A Culpa é das Estrelas',
        autorLivro: 'John Green',
        isbnLivro: '9788580572261',
        anoLivro: '2012',
        editoraLivro: 'Intrínseca',
        sinopseLivro: 'Hazel Grace Lancaster é uma jovem de 16 anos que luta contra o câncer e vive com a ajuda de um cilindro de oxigênio. Em um grupo de apoio, ela conhece Augustus Waters, um sobrevivente de câncer com um olhar único sobre a vida. Juntos, eles embarcam em uma jornada de amor, reflexão e busca por significado, desafiando a finitude da vida e celebrando os momentos que fazem valer a pena viver. A Culpa é das Estrelas é uma história emocionante sobre amor, perdas e a força da resiliência.',
        generoLivro: ['Romance', 'Drama'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/ilha.jpg',
        tituloLivro: 'A Ilha',
        autorLivro: 'Adrian McKinty',
        isbnLivro: '9786555653541',
        anoLivro: '2022',
        editoraLivro: 'Record',
        sinopseLivro: 'Heather e os adolescentes acabam se separando de Tom, sendo forçados a escapar sozinhos de perseguidores implacáveis. Agora, cabe a Heather garantir a própria segurança e a dos enteados, mesmo que eles não confiem nela, porque, nessa ilha inóspita, a família O\`Neill não é o único perigo à espreita.',
        generoLivro: ['Thriller', 'Mistério'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/game_of_thrones.jpg',
        tituloLivro: 'A Game of Thrones',
        autorLivro: 'George R. R. Martin',
        isbnLivro: '9780553103540',
        anoLivro: '1996',
        editoraLivro: 'Bantam Spectra',
        sinopseLivro: 'Em Westeros, um continente marcado por intrigas políticas e batalhas pelo poder, famílias nobres lutam pelo controle do Trono de Ferro. Enquanto a Casa Stark, liderada por Eddard Stark, é arrastada para o perigoso jogo político em Porto Real, forças sombrias ressurgem além da Muralha no extremo norte. Paralelamente, Daenerys Targaryen, última descendente de uma dinastia destronada, inicia sua jornada no continente oriental em busca de poder.',
        generoLivro: ['Fantasia', 'Aventura', 'Épico'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/it.jpg',
        tituloLivro: 'It: A Coisa',
        autorLivro: 'Stephen King',
        isbnLivro: '9781501110352',
        anoLivro: '1986',
        editoraLivro: 'Viking Penguin',
        sinopseLivro: 'Em Derry, uma cidade no estado do Maine, um grupo de sete crianças enfrenta uma força maligna que assume a forma do palhaço Pennywise. Ao longo dos anos, eles se separam, mas quando uma série de assassinatos misteriosos começa a acontecer novamente, o grupo se reúne para enfrentar a criatura que assombra sua cidade e ameaça suas vidas. It é uma história de terror psicológico sobre amizade, medo e a luta contra o mal que se esconde nas profundezas da infância.',
        generoLivro: ['Suspense', 'Terror'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/diario_banana.jpg',
        tituloLivro: 'Diário de um Banana',
        autorLivro: 'Jeff Kinney',
        isbnLivro: '9781419702237',
        anoLivro: '2007',
        editoraLivro: 'Abril',
        sinopseLivro: 'Greg Heffley é um adolescente que acaba de começar o ensino médio e precisa lidar com todos os desafios dessa nova fase da vida, como amizades, desentendimentos familiares e as dificuldades da escola. O livro é um relato de seu dia a dia, com muitas situações engraçadas e embaraçosas, apresentadas de uma forma leve e bem humorada. Diário de um Banana é o primeiro volume da série que segue as desventuras de Greg e sua tentativa de lidar com os altos e baixos da adolescência.',
        generoLivro: ['Comédia',  'Infantil'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/brave_new_world.jpg',
        tituloLivro: 'Brave New World',
        autorLivro: 'Aldous Huxley',
        isbnLivro: '9788535912025',
        anoLivro: '1932',
        editoraLivro: 'Companhia das Letras',
        sinopseLivro: 'Em um futuro distópico, a sociedade é governada pela tecnologia, pela engenharia genética e pelo consumo. O Estado Mundial é dividido em castas e a liberdade individual é suprimida em nome da estabilidade social. Bernard Marx, um indivíduo que se sente deslocado em sua sociedade, começa a questionar as normas e as ideologias que regem sua vida. Quando ele conhece John, um "selvagem" que vive fora da civilização, suas ideias sobre a liberdade e a felicidade começam a ser desafiadas. Mundo Novo é uma reflexão profunda sobre o controle social, os limites da liberdade e o preço do progresso tecnológico.',
        generoLivro: ['Ficção Científica', 'Distopia'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/pequeno_principe.jpg',
        tituloLivro: 'O Pequeno Príncipe',
        autorLivro: 'Antoine de Saint-Exupéry',
        isbnLivro: '9788522021057',
        anoLivro: '1943',
        editoraLivro: 'Editora Agir',
        sinopseLivro: 'O Pequeno Príncipe é uma história encantadora que mistura filosofia e poesia, onde um aviador, perdido no deserto, encontra um menino vindo de outro planeta. O príncipe conta ao aviador sobre suas viagens por diferentes asteroides e os seres excêntricos que encontrou, como um rei sem súditos e um acendedor de lampiões que segue uma rotina sem sentido. Ao longo do livro, o príncipe compartilha suas descobertas sobre amizade, amor e a importância de olhar o mundo com os olhos do coração, ensinando ao leitor que "o essencial é invisível aos olhos".',
        generoLivro: ['Fábula', 'Filosofia'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/da_vinci.jpg',
        tituloLivro: 'O Código Da Vinci',
        autorLivro: 'Dan Brown',
        isbnLivro: '9780307474278',
        anoLivro: '2003',
        editoraLivro: 'Doubleday',
        sinopseLivro: 'Robert Langdon, professor de simbologia de Harvard, é chamado para investigar o assassinato do curador do Museu do Louvre, Jacques Saunière. No local, Langdon e a criptóloga Sophie Neveu descobrem pistas enigmáticas que os levam a um segredo milenar envolvendo a Igreja Católica. Em uma corrida contra o tempo, eles tentam desvendar um mistério que pode abalar as bases da história religiosa e do cristianismo. *O Código Da Vinci* é uma história cheia de suspense, enigmas e segredos históricos, que prende o leitor do início ao fim.',
        generoLivro: ['Thriller', 'Mistério'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/1984.jpg',
        tituloLivro: '1984',
        autorLivro: 'George Orwell',
        isbnLivro: '9780451524935',
        anoLivro: '1949',
        editoraLivro: 'Secker and Warburg',
        sinopseLivro: 'Em um futuro distópico, Winston Smith vive sob o regime totalitário do Partido, liderado pelo Grande Irmão, que controla todos os aspectos da vida das pessoas. Winston trabalha para o governo, alterando registros históricos para se adequar à narrativa oficial. Porém, ele começa a questionar a opressão e busca uma maneira de rebelar-se contra o sistema. 1984 é um relato sombrio sobre vigilância, censura e a luta pela liberdade individual em um mundo sem privacidade.',
        generoLivro: ['Distopia', 'Ficção Científica', 'Política'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/cem_anos.jpg',
        tituloLivro: 'Cem Anos de Solidão',
        autorLivro: 'Gabriel García Márquez',
        isbnLivro: '9788501059781',
        anoLivro: '1967',
        editoraLivro: 'Editora Record',
        sinopseLivro: 'A obra-prima de Gabriel García Márquez narra a história da família Buendía, na fictícia cidade de Macondo, ao longo de várias gerações. Através de um realismo mágico único, o autor entrelaça eventos históricos, sociais e familiares, onde o fantástico e o real se misturam, criando uma narrativa profunda sobre o amor, o destino e a solidão. Cem Anos de Solidão é considerado um dos maiores romances da literatura mundial, abordando temas universais com uma linguagem poética e inovadora.',
        generoLivro: ['Realismo Mágico', 'Fantasia'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/hobbit.jpg',
        tituloLivro: 'O Hobbit',
        autorLivro: 'J.R.R. Tolkien',
        isbnLivro: '9788544000341',
        anoLivro: '1937',
        editoraLivro: 'HarperCollins',
        sinopseLivro: 'Bilbo Bolseiro, um hobbit que vive tranquilamente em sua toca, é inesperadamente arrastado para uma aventura com o mago Gandalf e um grupo de anões. Juntos, eles embarcam em uma jornada para recuperar um tesouro guardado pelo dragão Smaug, em uma montanha distante. Ao longo da viagem, Bilbo enfrenta desafios, encontra criaturas fantásticas e, mais importante, descobre sua própria coragem e capacidade de liderança. O Hobbit é uma história de aventura, amizade e autodescoberta, que precede os eventos de O Senhor dos Anéis.',
        generoLivro: ['Fantasia', 'Aventura'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    },
    {
        capaLivro: './images/mockingbird.jpg',
        tituloLivro: 'To Kill a Mockingbird',
        autorLivro: 'Harper Lee',
        isbnLivro: '9788535910077',
        anoLivro: '1960',
        editoraLivro: 'Editora José Olympio',
        sinopseLivro: 'Ambientado na década de 1930, no sul dos Estados Unidos, Matar um Rouxinol acompanha a história de Scout Finch, uma jovem que cresce na cidade de Maycomb, Alabama, e testemunha os desafios de sua comunidade, marcada pelo preconceito racial. O pai de Scout, Atticus Finch, é um advogado que defende um homem negro injustamente acusado de estuprar uma mulher branca. O romance explora temas como justiça, moralidade, empatia e os efeitos do racismo, sendo uma reflexão profunda sobre as complexidades da humanidade e da sociedade.',
        generoLivro: ['Drama', 'Suspense'],
        resenhasLivro: [{
            nomeUsuario: '',
            resenhaUsuario: '',
        }],
    }
    
])

    return(
        <GlobalContext.Provider value={{bairro, setBairro, vetorObjetosUsuarios, setVetorObjetosUsuarios, usuarioLogado, setUsuarioLogado, posicaoUsuario, setPosicaoUsuario, posicaoUsuarioID, setPosicaoUsuarioID, dadosUsuarioLogado, setDadosUsuarioLogado, biblioteca, setBiblioteca, livroAcessado, setLivroAcessado}}>
            {children}
        </GlobalContext.Provider>
    )
}
