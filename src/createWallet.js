//importando as dependências

const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

//definir a rede
//bitcoin - rede principal - mainnet
const network = bitcoin.networks.testnet //rede de teste bitcoin (testnet)

//derivação de carteiras HD

const path = `m/44'/1'/0'/0`


//criando o mnemonic para a seed (palavras)
let mnemonic = bip39.generateMnemonic() //bip39 gera as palavras dentre um conjunto de palavras espeficos com regras especificas do protocolo (mnemonic é uma forma amigavel de gerar a seed)
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par de pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0) // como é uma HD, então ela tem derivações de uma carteira raiz

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF()) //para wallet import format, pra importar pra um software gerenciador de carteira - electrum neste caso
console.log("Seed: ", mnemonic)