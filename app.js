window.onload = () => {
  Paint.init();
  Paint.getProperty();
  Paint.line();
  Paint.clear();
};

const Var = {};

const Paint = {
  init: () => {
    Paint.canvas = document.querySelector("#canvas");
    Paint.ctx = Paint.canvas.getContext("2d");
    Paint.canvas.width = 800;
    Paint.canvas.height = 450;
  },
  getProperty: () => {
    color.addEventListener("change", () => {
      Paint.color = document.querySelector("#color").value;
    });
    size.addEventListener("change", () => {
      Paint.size = document.querySelector("#size").value;
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
    Paint.canvas.addEventListener("mousedown", () => {
      Paint.canvas.addEventListener("mousemove", () => {});
    });
  },
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
