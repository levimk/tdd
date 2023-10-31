import ChristmasLights from "./ChristmasLights";

function Part1() {
  /*
    x turn on 887,9 through 959,629
    x turn on 454,398 through 844,448
    x turn off 539,243 through 559,965
    x turn off 370,819 through 676,868
    x turn off 145,40 through 370,997
    x turn off 301,3 through 808,453
    x turn on 351,678 through 951,908
    x toggle 720,196 through 897,994
    x toggle 831,394 through 904,860
    */
  const xmasLights = new ChristmasLights(1000, 1000);
  xmasLights
    .turnOn({
      x0: 887,
      y0: 9,
      x1: 959,
      y1: 629,
    })
    .turnOn({
      x0: 545,
      y0: 398,
      x1: 844,
      y1: 448,
    })
    .turnOff({
      x0: 539,
      y0: 243,
      x1: 559,
      y1: 965,
    })
    .turnOff({
      x0: 370,
      y0: 819,
      x1: 676,
      y1: 868,
    })
    .turnOff({
      x0: 145,
      y0: 40,
      x1: 370,
      y1: 997,
    })
    .turnOff({
      x0: 301,
      y0: 3,
      x1: 808,
      y1: 453,
    })
    .turnOn({
      x0: 351,
      y0: 678,
      x1: 951,
      y1: 908,
    })
    .toggle({
      x0: 720,
      y0: 196,
      x1: 897,
      y1: 994,
    })
    .toggle({
      x0: 831,
      y0: 394,
      x1: 904,
      y1: 860,
    });

  console.log("Part 1");
  console.log("Chistmas Lights turned on:", xmasLights.hasOn());
}

Part1();
// Chistmas Lights turned on: 230022
