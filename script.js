const colors = ["green", "red", "blue", "yellow"];
let playerStorage = [];
let gameStorage = [];
let gameState = false; //oyunun başlayığ başlamadığıyla ilgili starta basınca true olacak oyun başlayacak falan

let lvlText = document.querySelector("#lvl");

// timer adında bir değişken-metod tanımladık bu değişkeni-metodu tanımladığımız yerde delay sağlıyor (await ve async ile kullanılması lazım)
const timer = async (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// tıkladığımız yerdeki elementi bize yolluyor https://developer.mozilla.org/en-US/docs/Web/API/Event/target
addEventListener("click", async function (buttonElement) {
  if (
    // ışıklar yanıp sönerken oyuncu basamıyor arraydaki bütün indexler bitince basabiliyor

    (buttonElement.target.id !== "red" &&
      buttonElement.target.id !== "blue" &&
      buttonElement.target.id !== "green" &&
      buttonElement.target.id !== "yellow") ||
    gameState === false
  ) {
    return;
  }
  playerStorage.push(buttonElement.target.id); // playerStorage'a renkleri puşluyoruz red blue yellow green
  if (gameStorage[playerStorage.length - 1] === buttonElement.target.id) {
    // gamestorage'da olan rengin playerStorage'ta olan renkle eşleşip eşleşmediğine bakıyor
    blinkColor(buttonElement.target.id, true);
    if (gameStorage.length === playerStorage.length) {
      // game storage ve player storage length leri birbirine eşitse yeni turu başlatıyor ve playerStorage'ı sıfırlıyor
      lvlText.innerHTML = "Level : " + (playerStorage.length + 1);
      playerStorage = [];
      await timer(1000);
      game();
    }
  } else {
    blinkColor(buttonElement.target.id, false);
    resetGame();
    alert("yanlış");
  }
});

// ana foksiyon: oyun burada dönecek
async function game() {
  chooseRandomColor();
  gameState = false; // for döngüsü çalışana kadar oyun başlamayacaks
  for (let i = 0; i <= gameStorage.length - 1; i++) {
    blinkColor(gameStorage[i], true);
    await timer(1000);
  }
  gameState = true; // oyun başlayacak
}

// random 1-4 arası sayı seçecek ve hangi butona tekabül etttiğine karar verecek ve  dizi içine atacak(dizi globalde tanımlı olacak)
function chooseRandomColor() {
  const color = colors[Math.ceil(Math.random() * colors.length - 1)]; // numaraları colors'ın indexiyle eşleyip direkt renktleri(değerini) aldık
  gameStorage.push(color); //gamestorage'a color'ı yani rengi puşladık
  return color;
}

// butona bastığımızda ışık yanmasını sağlayan foksiyorun ve buradaki  buttonElement diğer fonksiyondakinden farklı bağımsız
function blinkColor(btnId, isCorrect) {
  const buttonElement = document.getElementById(btnId);
  buttonElement.classList.add(isCorrect ? "pressed" : "error");
  setTimeout(() => {
    buttonElement.classList.remove(isCorrect ? "pressed" : "error");
  }, 100);

  var audio = new Audio(`/sounds/${buttonElement.id}.mp3`);
  audio.play();
}
//bütün stateleri sıfırlayacağız
function resetGame() {
  playerStorage = [];
  gameStorage = [];
  gameState = false;
}
