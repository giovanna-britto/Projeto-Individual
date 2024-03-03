var player;
var teclado;
var urso;

class Urso extends Phaser.Scene {
    constructor(){
        super({
            key:'urso'
        })
    }

    preload(){
        this.load.image('background', 'assets/fundoGelo.png');
        this.load.image('player', 'assets/balde.png');
        this.load.image('urso', 'assets/urso.png');
        this.load.image('fimdejogo', 'assets/fimdoJogo.png');
    }

    create(){
        this.add.image(larguraJogo/2, alturaJogo/2, 'background');

        player = this.physics.add.sprite(0, 0, 'player');
        player.setCollideWorldBounds(true);

        teclado = this.input.keyboard.createCursorKeys();

        urso = this.physics.add.sprite(larguraJogo/3, 0, 'urso')
        urso.setCollideWorldBounds(true);
        this.physics.add.collider(player, urso);  

        // Detectar colisão entre o balde e o urso para encerrar o jogo
        this.physics.add.overlap(player, urso, () => {
            this.scene.start('fimdejogo');
        });
    }

    update(){
        if (teclado.left.isDown) {
            // Movimento para Esquerda
            player.setVelocityX(-150);
        } else if (teclado.right.isDown) { 
            //Movimento para a Direita
            player.setVelocityX(150);
        } 
    }
}
