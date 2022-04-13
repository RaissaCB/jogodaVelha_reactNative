import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function App() {
const [tela, setTela]=useState('menu');
const [jogadorAtual, setJogadorAtual]=useState('');
const [tabuleiro, setTabuleiro]=useState([]);
const [jogadasRestantes, setJogadasRestantes]= useState(0);
const [ganhador, setGanhador]=useState('');


function iniciarJogo(jogador){
  setJogadorAtual(jogador);

  setJogadasRestantes(9);
  setTabuleiro([
    ['','',''],
    ['','',''],
    ['','','']
  ]);
  setTela('jogo');
}

function jogar(linha, coluna){
tabuleiro[linha][coluna] = jogadorAtual;
setTabuleiro([...tabuleiro]);

setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

verificarGanhador(tabuleiro, linha, coluna);
}

function verificarGanhador(tabuleiro, linha, coluna){
  if(tabuleiro[linha][0] !== '' && tabuleiro[linha][0]=== tabuleiro[linha][1] && tabuleiro[linha][1]===tabuleiro[linha][2]){
    return finalizarJogo (tabuleiro[linha][0]);
  }
  if(tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna]=== tabuleiro[1][coluna] && tabuleiro[1][coluna]===tabuleiro[2][coluna]){
    return finalizarJogo (tabuleiro[0][coluna]);
  }
  if(tabuleiro[0][0] !== '' && tabuleiro[0][0]=== tabuleiro[1][1] && tabuleiro[1][1]===tabuleiro[2][2]){
    return finalizarJogo (tabuleiro[0][0]);
  }
  if(tabuleiro[0][2] !== '' && tabuleiro[0][2]=== tabuleiro[1][1] && tabuleiro[1][1]===tabuleiro[2][1]){
    return finalizarJogo (tabuleiro[0][2]);
  }
  if((jogadasRestantes -1) === 0){
    return finalizarJogo('');
  }
  setJogadasRestantes((jogadasRestantes - 1));

}

function finalizarJogo(jogador){
  setGanhador(jogador);
  setTela('ganhador');
}

switch(tela){
  case 'menu':
    return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
      case 'ganhador':
        return getTelaGanhador();

}

function getTelaMenu(){
  return(
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.subTitulo}>Selecione o primeiro Jogador</Text>

      <View style={styles.inclineItems}>
      <TouchableOpacity style={styles.boxJogador}    onPress={()=>iniciarJogo('X')}>
        <Text style={styles.jogadorX}>X</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.boxJogador}   onPress={()=>iniciarJogo('O')}>
        <Text style={styles.jogadorO}>O</Text>
      </TouchableOpacity>
      
      </View>
      
    </View>
  );
}

function getTelaJogo(){
  return(
    <View style={styles.container}>
    <StatusBar style='auto'/>
    <Text style={styles.titulo}>Jogo da Velha</Text>
   
    {
       tabuleiro.map((linha, numeroLinha)=>{
         return(
        <View  key={numeroLinha} style={styles.inclineItems} >
          {
            linha.map((coluna, numeroColuna)=>{
              return (
               
                <TouchableOpacity key={numeroColuna}  style={styles.boxJogador}   
                onPress={()=>jogar(numeroLinha,numeroColuna)} 
                disabled={coluna !== ''}>
                <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO }> {coluna}</Text>
              </TouchableOpacity>

              )
            })
          }
        </View>
         )
        })
   }
   <TouchableOpacity style={styles.buttonMenu} onPress={()=>setTela('menu')}>
     <Text style={styles.textButtonMenu}>Voltar ao menu</Text>
   </TouchableOpacity>

  </View>
  );
}

function getTelaGanhador(){
  return(
      <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.subTitulo}>Resultado do Jogo</Text>

{
  ganhador === ' ' && 
  <Text style={styles.ganhador}>Nenhum Jogador</Text>
}
{
  ganhador !== ' ' && 
  <>
  <Text style={styles.ganhador}>Ganhador</Text>
  <View
    style={styles.boxJogador}>
  <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO }> {ganhador}</Text>
  </View>   
</>
  
}

      <TouchableOpacity style={styles.buttonMenu} onPress={()=>setTela('menu')}>
     <Text style={styles.textButtonMenu}>Voltar ao menu</Text>
   </TouchableOpacity>

      
      </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight:'bold',
    color: '#333',

  },
  subTitulo: {
    fontSize: 20,
    color: '#333',
    marginTop: 20,
  },
    boxJogador:{
    width: 80,
    height: 80,
    backgroundColor:'#ddd',
    alignItems:'center' ,
    justifyContent:'center',
    margin: 8,
    padding: 10,
 },
 jogadorX:{
   fontSize: 40,
   color: '#553fda'
 },
 jogadorO:{
  fontSize: 40,
  color: '#da3f3f'
}, 
inclineItems:{
  flexDirection:'row',
}, 
buttonMenu:{
  marginTop:20,
},
textButtonMenu:{
  color: '#4e6fe4'
}, 
ganhador:{
  fontSize:25,
  fontWeight:'bold',
  color: "#333"
}
});
