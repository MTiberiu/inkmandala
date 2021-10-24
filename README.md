## SVG Coloring APP

### React JS , SCSS

![alt text](https://media-exp1.licdn.com/dms/image/C4E2DAQE130H9K-w8kA/profile-treasury-image-shrink_480_480/0/1633779347332?e=1634904000&v=beta&t=NPyfOIV0ouOI5-LV4dd-caRW21m47REYr-kaKLwIXmY)

## Video Demo

[Demo](https://youtu.be/VzO2J6Fo5ZQ "Demo")

## App Demo

[Live Demo](https://inkmandala.com "Live Demo")

The app introduce a new way to color vector graphic shapes.
The solution was to add "mouse wheel" in the proces of coloring.

The mouse wheel motode, dosn't try to replace the classic mothods of chosing colors, on the contrary, after a color is chosed for the given shape, the method adds the possibility to make fine changes on the colors, keeping the focus on the shapes and not on the color that needs to be chosen.

```ruby
 const addEventsToPaths = (props) => {
    props.querySelectorAll("path").forEach(path => path.onwheel = eventSwitchValues );
  };

```

The HSL color model played an important role in finding a logic that can add a value in the process of coloring, when the decision was to use mouse wheel as a tool to color vector shapes.

The logic is divided in 3 steps.
Depends on the user choise, you can use mouse whell to change the hue, saturation or light of the color.

```ruby
 const updateMode = (param) => {
    selectedHSL = param;
    if (param === select.hsl.hue) {
      setColorRange(0, 360);
    } else {
      setColorRange(10, 90);
    }
  };
```

Using detection of the scroll direction, helped to calculate the value of the hue, saturation and light colors.

```ruby
window.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      dY = -1;
    } else if (event.deltaY > 0) {
      dY = 1;
    }
  });

```

```ruby
const changeColorValue = () => {
    if (dY < 0 && colorValues < colorRangeMax) {
      colorValues = colorValues + 5;
    } else if (dY > 0 && colorValues > colorRangeMin) {
      colorValues = colorValues - 5;
    } else if (colorValues >= 360) {
      colorValues = colorValues - 360;
    } else if (colorValues <= 0) {
      colorValues = colorValues + 360;
    }
  };

```
