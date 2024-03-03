var balde;
var teclado;
var plataforma;
var agua;
var plataforma2;
var plataforma3;
var pontuacao = 0;
var placar;
var imagens = [balde, plataforma, agua, plataforma2, plataforma3];

class Jogo extends Phaser.Scene{
        constructor(){
           super({
            key:'jogo'
           })
        }
        

        // Carregamento de Imagens 
        preload() {
            this.load.image('background', 'assets/fundoGelo.png');
            this.load.image('player', 'assets/balde.png');
            this.load.image('plataforma', 'assets/plataforma.png');
            this.load.image('plataforma2', 'assets/plataforma.png');
            this.load.image('plataforma3', 'assets/plataforma.png');
            this.load.image('agua', 'assets/agua.png');
        }
        
        create() {
            // Adicionando Plano de Fundo
            this.add.image(larguraJogo/2, alturaJogo/2, 'background');

            // Adicionar o Balde no jogo
            imagens[0] = this.physics.add.sprite(larguraJogo/2, 0, 'player');
            imagens[0].setCollideWorldBounds(true);

            // Controle do Balde por meio das setas
            teclado = this.input.keyboard.createCursorKeys();

            // Adicionar a Plataforma
            imagens[1] = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'plataforma');
            this.physics.add.collider(imagens[0], imagens[1]);

            // Adicionar a segunda Plataforma 
            imagens[3] = this.physics.add.staticImage(larguraJogo/7.5, alturaJogo/3, 'plataforma2');
            this.physics.add.collider(imagens[0], imagens[3]);
            //this.physics.add.collider(imagens[3], imagens[4]); 

            // Adicionar a Terceira Plataforma 
            imagens[4] = this.physics.add.staticImage(larguraJogo/1.1, alturaJogo/1.5, 'plataforma3');
            this.physics.add.collider(imagens[0], imagens[4]);
            
            // Adicionar a Água
            imagens[2] = this.physics.add.sprite(larguraJogo / 2, 0, 'agua');
            imagens[2].setCollideWorldBounds(true);
            imagens[2].setBounce(0.7);
            this.physics.add.collider(imagens[2], imagens[1]);
            this.physics.add.collider(imagens[2], imagens[3]); 
            this.physics.add.collider(imagens[2], imagens[4]); 

            // Adicionar Placar 
            placar = this.add.text(50, 50, 'agua' + pontuacao, {fontSize:'45px', fill:'#495613'});
            placar.setVisible(true);
            
            // Para quando o Balde encostar na moeda
            this.physics.add.overlap(imagens[0], imagens[2], function(){
                imagens[2].setVisible(false);
                var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650);
                imagens[2].setPosition(posicaoMoeda_Y, 100);
                pontuacao += 1;
                placar.setText('Água: ' + pontuacao);
                imagens[2].setVisible(true);
            });

        }

        update() {
            if (teclado.left.isDown) {
                // Movimento para Esquerda
                imagens[0].setVelocityX(-150);

            } else if (teclado.right.isDown) { 
                //Movimento para a Direita
                imagens[0].setVelocityX(150);

            } 
            else { 
                // Sem Movimento horizontal
                imagens[0].setVelocityX(0);
            }

            if (teclado.up.isDown) {
                //Movimento para Cima
                imagens[0].setVelocityY(-150);
            }

            if (pontuacao >= 20) {
                this.scene.start('urso');
            }

        }
    }