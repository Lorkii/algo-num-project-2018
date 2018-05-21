
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
  drawGoldenRatioGraph(context, 20);
  for(let n of fibonacci(20))
  {
    //console.log(n);
  }

  console.log(1 + oneOverOnePlus(100));
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
function* goldenRatio(range)
{
  let previous = 1;
  for(let n of fibonacci(range))
  {
    yield n/previous;
    previous = n;
  }
}


function drawGoldenRatioGraph(ctx, range)
{
  if(ctx != undefined)
  {
    let index = 0;
    ctx.beginPath();
    //ctx.moveTo(0,0);
    for(let n of goldenRatio(range))
    {
      n*=200;
      ctx.lineTo(index, n);
      ctx.moveTo(index, n);

      index += canvas.width/range;
    }
    ctx.stroke();
  }
}

function oneOverOnePlus(range)
{
  if(range > 0)
  {
    return 1/(1 + oneOverOnePlus(--range));
  }
  else
  {
    return 0;
  }
}
