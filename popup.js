const pickBtn = document.querySelector('.change-color-btn');
const colorGrid = document.querySelector('.color-grid');
const colorVal = document.querySelector('.color-hex');


pickBtn.addEventListener('click', async () => {
    // console.log('your click was registered!');
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // console.log(tab);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async (injectionResults) => {
        const [data] = injectionResults;
        if (data.result) {
            const color = data.result.sRGBHex;
            // colorGrid.body.style.backgroundColor = color;
            colorVal.innerText = color;
            try {
                await navigator.clipboard.writeText(rgba2hex(color));
                alert('Hex value has been copied to your clipboard :D');
            } catch (error) {
                console.error(error);
            }
        }
        // console.log(injectionResults);
    });
});

function rgba2hex(orig) {
    var a, isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) +
            (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    if (alpha !== "") {
        a = alpha;
    } else {
        a = 01;
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1)
    hex = hex + a;
    hex=hex.replace(/0+$/,"");
    return hex;
}

async function pickColor() {
    // running in a different context
    // console.log('control is at script');
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        // console.log(selectedColor);
        // activate picker

    } catch (error) {
        console.log(error);
    }
}