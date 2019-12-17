const width = 512 * 2;
const height = 512 * 2;
const canvas = document.querySelector('canvas');
canvas.style.width = width / devicePixelRatio + 'px';
canvas.style.height = height / devicePixelRatio + 'px';
const gfx = canvas.getContext('2d');
canvas.width = gfx.width = width;
canvas.height = gfx.height = height;

const targetCellSize = 100;
const count = Math.floor(width * height / (targetCellSize * targetCellSize));
const lineWidth = 10;
const points = [];

for (let i = 0; i < count; i++) {
  points.push([
    Math.random() * (width - lineWidth) + lineWidth / 2,
    Math.random() * (height - lineWidth) + lineWidth / 2
  ]);
}

const del = d3.Delaunay.from(points);
const vor = del.voronoi([0, 0, width, height]);
gfx.fillStyle = 'white';
gfx.fillRect(0, 0, width, height);

gfx.strokeStyle = 'black';
gfx.lineWidth = lineWidth;
gfx.beginPath();
vor.render(gfx);
gfx.stroke();
// Draw a border around the marker
gfx.strokeRect(lineWidth / 2, lineWidth / 2, width - lineWidth, height - lineWidth);

const dlLink = document.createElement('a');
dlLink.href = canvas.toDataURL('image/jpeg');
dlLink.textContent = 'Download';
document.body.appendChild(dlLink);
