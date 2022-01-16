let countNum = 0;
let total = 0;
//lower rate value, lower chance of number being increased.
let rate = 0.2;
let countSwitch = false;

count();

window.addEventListener(
    "keydown",
    function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case " ":
                countSwitch = !countSwitch;
                break;
            case "Enter":
                //check input is number and not null
                let setter = window.prompt();
                if (setter && setter.match(/^[0-9]+$/)) {
                    set(setter);
                } else {
                    set(total);
                }
                break;
            case "ArrowUp":
                total++;
                break;
            case "ArrowDown":
                total--;
                if (countNum > total) {
                    countNum = total;
                }
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    },
    true
);

function set(val) {
    total = val;
    countNum = val;
}

function count() {
    if (countSwitch) {
        document.getElementById("counter").innerHTML = countNum;
        if (countNum < total) {
            if (Math.random() < rate) {
                countNum++;
                console.log("count!");
            }
        }
    }
    // call this function again in 2000ms
    setTimeout(count, 2000);
}
