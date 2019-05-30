window.onload = () => {
  Paint.init();
  Paint.getProperty();
  Paint.uploadImage();
  Paint.clear();
  document.querySelector("#drawMode").addEventListener("change", () => {
    switch (Paint.drawMode) {
      case "draw":
        Paint.draw();
        break;
      case "line":
        Paint.line();
        break;
      default:
        Paint.draw();
    }
  });
};

const Paint = {
  init: () => {
    Paint.canvas = document.querySelector("#canvas");
    Paint.ctx = Paint.canvas.getContext("2d");
    Paint.canvas.width = 800;
    Paint.canvas.height = 450;
  },
  getProperty: () => {
    Paint.color = document.querySelector("#color").value;
    Paint.size = document.querySelector("#size").value;
    Paint.drawMode = document.querySelector("#drawMode").value;

    color.addEventListener("change", () => {
      Paint.color = document.querySelector("#color").value;
    });
    size.addEventListener("change", () => {
      Paint.size = document.querySelector("#size").value;
    });
    drawMode.addEventListener("change", () => {
      Paint.drawMode = document.querySelector("#drawMode").value;
      console.log(Paint.drawMode);
    });
  },
  line: () => {
    Paint.canvas.addEventListener("mousedown", e => {
      Paint.ctx.beginPath();
      Paint.ctx.strokeStyle = Paint.color;
      Paint.ctx.lineWidth = Paint.size;
      Paint.ctx.moveTo(
        Paint.getMousePosition(e).x,
        Paint.getMousePosition(e).y
      );
    });
    Paint.canvas.addEventListener("mouseup", e => {
      Paint.ctx.lineTo(
        Paint.getMousePosition(e).x,
        Paint.getMousePosition(e).y
      );
      Paint.ctx.stroke();
      Paint.ctx.closePath();
    });
  },
  draw: () => {
    let canDraw = false;
    Paint.canvas.addEventListener("mousemove", e => {
      Paint.canvas.addEventListener("mousedown", () => {
        canDraw = true;
        let lastPositionX = Paint.getMousePosition(e).x;
        let lastPositionY = Paint.getMousePosition(e).y;
      });

      Paint.canvas.addEventListener("mouseup", () => {
        canDraw = false;
      });

      if (canDraw) {
        Paint.ctx.beginPath();
        Paint.ctx.strokeStyle = Paint.color;
        Paint.ctx.lineWidth = Paint.size;
        Paint.ctx.moveTo(lastPositionX, lastPositionY);
        Paint.ctx.lineTo(
          Paint.getMousePosition(e).x,
          Paint.getMousePosition(e).y
        );
        Paint.ctx.stroke();
        Paint.ctx.closePath();
      }
      lastPositionX = Paint.getMousePosition(e).x;
      lastPositionY = Paint.getMousePosition(e).y;
    });
  },
  uploadImage: () => {
    let image = new Image();
    document.querySelector("#file").addEventListener("change", e => {
      let files = e.target.files;
      let file = files[0];
      if (file.type.match("image.*")) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", e => {
          if (e.target.readyState == FileReader.DONE) {
            image.src = e.target.result;
            // console.log(image);
            Paint.ctx.drawImage(image, 0, 0);
          }
        });
      } else {
        alert("Not an image!");
      }
    });
  },
  // uploadImage: () => {
  //   const image = new Image();
  //   image.src = "bg.jpg";
  //   image.addEventListener("load", () => {
  //     Paint.ctx.drawImage(image, 0, 0);
  //   });
  // },
  getMousePosition: e => {
    return {
      x: e.x - Paint.canvas.getBoundingClientRect().x,
      y: e.y - Paint.canvas.getBoundingClientRect().y
    };
  },
  clear: () => {
    document.querySelector("#clear").addEventListener("click", () => {
      Paint.ctx.clearRect(0, 0, Paint.canvas.width, Paint.canvas.height);
    });
  }
};
