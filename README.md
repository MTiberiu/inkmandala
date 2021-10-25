## SVG Coloring APP

### React JS , SCSS

![alt text](https://media-exp1.licdn.com/dms/image/C4E2DAQE130H9K-w8kA/profile-treasury-image-shrink_480_480/0/1633779347332?e=1634904000&v=beta&t=NPyfOIV0ouOI5-LV4dd-caRW21m47REYr-kaKLwIXmY)

## Video Demo

[Demo](https://youtu.be/VzO2J6Fo5ZQ "Demo")

## App Demo

[Live Demo](https://inkmandala.com "Live Demo")

The app introduce a new way to color vector graphic shapes.
The solution was to add "mouse wheel" in the process of coloring.

The mouse wheel method, doesn't try to replace the classic methods of choosing colors, on the contrary, after a color is chosen for the given shape, the method adds the possibility to make fine changes on the colors, keeping the focus on the shapes and not on the color that needs to be chosen.

```ruby
 const addEventsToPaths = (props) => {
    props.querySelectorAll("path").forEach(path => path.onwheel = eventSwitchValues );
  };

```

The logic is divided in 3 parts and it uses HSL color model to determinate how to calculate the color values.
Depends on the user choise, you can use mouse whell to change the hue, saturation or light of the color.

```ruby
const updateMode = (checkSelected) => {
    selectedHSL = checkSelected;
    if (checkSelected === select.hsl.hue) {
      setColorRange(0, 360);
    } else {
      setColorRange(10, 90);
    }
  };
```

```ruby
const checkSelected = (modeSelected) => {
    if (!selectedPath[modeSelected]) {
      h = colorValues;
    } else {
      if (selectedHSL === select.hsl.hue) {
        colorValues = selectedPath[modeSelected].h;
        updateDefinedValues(modeSelected);
        changeColorValue();

        h = colorValues;
      } else if (selectedHSL === select.hsl.saturation) {
        colorValues = selectedPath[modeSelected].s;
        updateDefinedValues(modeSelected);
        changeColorValue();
        s = colorValues;
      } else if (selectedHSL === select.hsl.light) {
        colorValues = selectedPath[modeSelected].l;
        updateDefinedValues(modeSelected);
        changeColorValue();
        l = colorValues;
      }
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
