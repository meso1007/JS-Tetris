class Block {
    constructor(x, y, size) {
      this.x = x; // x-coordinate of the block
      this.y = y; // y-coordinate of the block
      this.size = size; // Size of the block
    }
    
    draw() {
      // Create a new block element and set its styles
      let $block = $('<div/>').addClass('block').css({
        'left': this.x * this.size, // Set the left position
        'top': this.y * this.size, // Set the top position
        'position': 'absolute', // Set position to absolute
        'width': this.size + 'px', // Set the width of the block
        'height': this.size + 'px', // Set the height of the block
        'background-color': '#000', // Set the background color
        'border': '1px solid #fff' // Set the border color
      });
  
      // Check if this block is on the right wall
      if (this.isRightWall()) {
        $block.addClass('right-aligned'); // Add right-aligned class
      }
  
      $block.appendTo('#game-container'); // Append the block to the game container
    }
  
    // Method to check if the block is on the right wall
    isRightWall() {
      return this.x === 11; // Assuming the right wall is at x-coordinate 11
    }
  }
  
  
  // Mino class for representing tetrominoes (Tetris blocks)
  class Mino {
    constructor(x, y, rot, shape) {
      this.x = x; // x-coordinate of the mino
      this.y = y; // y-coordinate of the mino
      this.rot = rot; // Rotation of the mino
      this.shape = shape; // Shape of the mino
      this.size = 25; // Size of the blocks
    }
  
    // Calculate the positions of all blocks in the mino
    calcBlocks() {
        let blocks = [];
        // Define block shapes based on the mino shape
        switch (this.shape) {
          case 0: // T shape
            blocks = [new Block(-1, 0, this.size), new Block(0, 0, this.size), new Block(0, -1, this.size), new Block(1, 0, this.size)];
            break;
        case 1: // Z shape
          blocks = [new Block(-1, -1, this.size), new Block(0, -1, this.size), new Block(0, 0, this.size), new Block(1, 0, this.size)];
          break;
        case 2: // S shape
          blocks = [new Block(-1, 0, this.size), new Block(0, 0, this.size), new Block(0, -1, this.size), new Block(1, -1, this.size)];
          break;
        case 3: // L shape
          blocks = [new Block(-1, -2, this.size), new Block(-1, -1, this.size), new Block(-1, 0, this.size), new Block(0, 0, this.size)];
          break;
        case 4: // J shape
          blocks = [new Block(0, -2, this.size), new Block(0, -1, this.size), new Block(-1, 0, this.size), new Block(0, 0, this.size)];
          break;
        case 5: // O shape
          blocks = [new Block(-1, -1, this.size), new Block(-1, 0, this.size), new Block(0, 0, this.size), new Block(0, -1, this.size)];
          break;
        case 6: // I shape
          blocks = [new Block(-2, 0, this.size), new Block(-1, 0, this.size), new Block(0, 0, this.size), new Block(1, 0, this.size)];
          break;
      }
  
      // Rotate the blocks based on the rotation value
      let rot = (40000000 + this.rot) % 4;
    for (let r = 0; r < rot; r++) {
      blocks = blocks.map(b => new Block(-b.y, b.x, this.size));
    }

    // Adjust block positions based on the mino's position
    blocks = blocks.map(b => new Block(b.x + this.x, b.y + this.y, this.size));

    return blocks;
    }
  
    // Draw the mino on the game board
    draw() {
        let blocks = this.calcBlocks(); // Calculate block positions
        for (let b of blocks) {
          b.draw(); // Draw each block
        }
      }
  
    // Create a copy of the current mino
    copy() {
        return new Mino(this.x, this.y, this.rot, this.shape); // Create a copy of the mino
      }
    }
  // Field class for representing the game board and managing tiles
  class Field {
    constructor() {
      // Initialize the field with tiles
      this.tiles = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];
      this.size = 25; // Size of the blocks
    }
  
    // Check the tile value at a specific coordinate
    tileAt(x, y) {
      // Check if the coordinates are within the field and return the tile value
      if (y >= 0 && y < this.tiles.length && x >= 0 && x < this.tiles[y].length) {
        return this.tiles[y][x];
      } else {
        // If out of bounds, treat as wall
        return 1;
      }
    }
  
    // Place a block at the specified coordinates
    putBlock(x, y) {
      // Place a block if the coordinates are within the field
      if (y >= 0 && y < this.tiles.length && x >= 0 && x < this.tiles[y].length) {
        this.tiles[y][x] = 1;
      }
    }
  
    removeLineCounter=0
    findLineFilled = () => {
      for (let y = 0; y < 20; y++) {
        let isFilled = this.tiles[y].every((t) => t === 1);
        if (isFilled) {
          if (this.removeLineCounter > 0) {
            scoreCounter += 100;
            $("#score-counter").text(scoreCounter);
            console.log(scoreCounter);
                if (scoreCounter === 500 || scoreCounter === 1000 || scoreCounter === 2000 || scoreCounter === 3000) {
              this.hiScoreSound();
            } else {
              this.playColorChangeSound();
            }
    
            let color = '';
            if (scoreCounter >= 3000) {
              color = '#800080'; // Purple
            } else if (scoreCounter >= 2000) {
              color = '#FF0000'; // Red
            } else if (scoreCounter >= 1000) {
              color = '#FFA500'; // Orange
            } else if (scoreCounter >= 500) {
              color = '#FFD700'; // Gold
            } else {
              color = '#000'; // Default color if score is below 300
            }
            $("#score-counter").css('color', color);
          }
          this.removeLineCounter++;
          return y;
        }
      }
      return -1;
    };
    


    playColorChangeSound = () => {
      const audio = document.getElementById("scoreup-audio");
      audio.currentTime = 0;
      audio.play().catch((error) => {
          console.log("Failed to play color change sound:", error);
      });
  };

  hiScoreSound = () => {
    const audio = document.getElementById("hiscore-audio");
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch((error) => {
        console.log("Failed to play color change sound:", error);
    });
};

  
    // Remove a filled line and add an empty line at the top
    cutLine(y) {
      if (y >= 0 && y < this.tiles.length) {
        this.tiles.splice(y, 1);
        this.tiles.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
      }
    }
  
    // Draw the field and all blocks in it
    draw() {
      for (let y = 0; y < 21; y++) {
        for (let x = 0; x < 12; x++) {
          if (this.tileAt(x, y) === 0) continue;
          new Block(x, y, this.size).draw();
        }
      }
    }
  }
  
  // Game class for managing the game loop and interactions
  class Game {
    constructor(blockSize) {
      this.blockSize = blockSize; // Size of the blocks
      this.mino = Game.makeMino(); // Create a new mino
      this.nextMino = Game.makeMino()
      this.minoVy = 0; // Velocity in the y-direction
      this.minoVx = 0; // Velocity in the x-direction
      this.minoVr = 0; // Rotation velocity
      this.field = new Field(); // Create a new field
      this.fc = 0; // Frame counter
      this.nextMinoContainer = $("#next-mino-container");
    }
  
    // Create a random mino
    static makeMino() {
      let x = 6; // Initial x position
      let y = 1; // Initial y position
      let rot = 0; // Initial rotation
      let shape = Math.floor(Math.random() * 7); // Random shape
      return new Mino(x, y, rot, shape);
    }

    //show up next mino to html
    drawNextMino() {
      this.nextMinoContainer.empty();
      this.nextMino.size = this.blockSize; // Set block size for next mino
      let blocks = this.nextMino.calcBlocks(); // Calculate blocks for next mino
      let blockCont = $("<div></div>").addClass('block-container').css({
        'position': 'relative', // Add this
        'width': this.nextMinoContainer.width(), // Set width to match nextMinoContainer
        'height': this.nextMinoContainer.height() // Set height to match nextMinoContainer
      });
      for (let b of blocks) {
        let blockElement = $('<div/>').addClass('block').css({
          'position': 'absolute', // Add this
          'left': b.x * this.blockSize,
          'top': b.y * this.blockSize,
          'width': this.blockSize,
          'height': this.blockSize,
          'background-color': b.color, // Apply the color
          'border': '1px solid #fff'
        });
        blockCont.append(blockElement);
      }
      this.nextMinoContainer.append(blockCont);
    }
  
    // Check if a mino can move within the field
    static isMinoMovable(mino, field) {
      let blocks = mino.calcBlocks(); // Calculate mino blocks
      return blocks.every(b => field.tileAt(b.x, b.y) === 0); // Check if all blocks are movable
    }
  
    // Process the game state
    proc() {
      if (this.minoDrop || (this.fc % 20) === 19) {
        let futureMino = this.mino.copy(); // Create a copy of the mino
        futureMino.y += 1; // Move the mino down
        if (Game.isMinoMovable(futureMino, this.field)) {
          this.mino.y += 1; // Move the mino down
        } else {
          for (let b of this.mino.calcBlocks()) {
            this.field.putBlock(b.x, b.y); // Place blocks in the field
          }
    
          let minY = Math.min(...this.mino.calcBlocks().map(b => b.y)); // Get the minimum y-coordinate
          if (minY <= 1) {
            this.showGameOverMessage(); // Show game over message
            return; // Stop the game
          }
    
          this.mino = this.nextMino; // Use the next mino
    
          this.nextMino = Game.makeMino(); // Create a new mino

          this.drawNextMino();

        }
    
        let line;
        while ((line = this.field.findLineFilled()) !== -1) {
          this.field.cutLine(line); // Cut filled lines
        }
        this.minoDrop = false; // Reset mino drop flag
      }
  
      if (this.minoVx !== 0) {
        let futureMino = this.mino.copy(); // Create a copy of the mino
        futureMino.x += this.minoVx; // Move the mino horizontally
        if (Game.isMinoMovable(futureMino, this.field)) {
          this.mino.x += this.minoVx; // Move the mino horizontally
        }
        this.minoVx = 0; // Reset horizontal velocity
      }
  
      if (this.minoVr !== 0) {
        let futureMino = this.mino.copy(); // Create a copy of the mino
        futureMino.rot += this.minoVr; // Rotate the mino
        if (Game.isMinoMovable(futureMino, this.field)) {
          this.mino.rot += this.minoVr; // Rotate the mino
        }
        this.minoVr = 0; // Reset rotation velocity
      }
  
      $('#game-container').empty(); // Clear the game container
      this.field.size = this.blockSize; // Set the block size for the field
      this.mino.size = this.blockSize; // Set the block size for the mino
      this.mino.draw(); // Draw the mino
      this.field.draw(); // Draw the field
  
      this.fc++; // Increment the frame counter
    }
  
    // Show the game over message
    showGameOverMessage() {
      $('.game-over').css("display", "block"); // Display the game over message
    }

    

  }
  