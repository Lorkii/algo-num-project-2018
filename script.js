
let canvas;
let context;

function setup()
{
  if(context == undefined)
  {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
  }

  main();
}

function main()
{
  //console.log = function(){};
  //drawGoldenRatioGraph(context, 20);
  drawGoldenFlower(context, oneOverOnePlus(25), 200, 10);
  console.log(oneOverOnePlus(25));
}

// generator for fibonacci numbers
function* fibonacci(range)
{
  let cmpt = 0;
  let previous = 0;
  let current  = 1;
  while(cmpt < range)
  {
    let tmp = previous + current;
    previous = current;
    current = tmp;
    yield current;
    cmpt++;
  }
}

// uses fibonacci to calcutate the golden ratio
function* goldenRatioWithFibonacci(range)
{
  let previous = 1;
  for(let n of fibonacci(range))
  {
    yield n/previous;
    previous = n;
  }
}

function actionOnRangeMove()
{
  newNumber = document.getElementById("inputGoldenRatio").value;
  drawGoldenFlower(context, newNumber, 200, 15);
}

function drawGoldenFlower(ctx, number, range, radius)
{
  ctx.save();
  ctx.clearRect(0 ,0 ,canvas.width, canvas.height);
  ctx.translate(canvas.width/2, canvas.height/2)
  dr = 1;
  angle = 0;
  while(range > 0)
  {
    centerX = dr*Math.cos(angle);
    centerY = dr*Math.sin(angle);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#003300';
    ctx.stroke();

    angle += number*Math.PI*2;
    dr += 1.2;
    range--;
  }
  ctx.restore();
}

function drawGoldenRatioGraph(ctx, range)
{
  if(ctx != undefined)
  {
    let index = 0;
    ctx.beginPath();
    //ctx.moveTo(0,0);
    for(let n of goldenRatioFraction(range))
    {
      n*=200;
      ctx.lineTo(index, n);
      ctx.moveTo(index, n);

      index += canvas.width/range;
    }
    ctx.stroke();
  }
}

function* goldenRatioFraction(range)
{
  let x = 1
  while(range > 0)
  {
    range--;
    x = 1/(1+x);
    yield x;
  }
}

//if range=25, precise enough
function oneOverOnePlus(range)
{
  if(range > 0)
  {
    return 1 / (1 + oneOverOnePlus(--range));
  }
  else
  {
    return 0;
  }
}
