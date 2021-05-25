const celsius = "https://en.wikipedia.org/wiki/Celsius", 
fahrenheit = "https://en.wikipedia.org/wiki/Fahrenheit", 
kelvin = "https://fi.wikipedia.org/wiki/Kelvin";

const CelsiusToFahrenheit = "(x * 1.8) + 32", CelsiusToKelvin = "(x + 273.15)",
FahrenheitToCelsius = "(x - 32) / 1.8", FahrenheitToKelvin = "(x + 459.67) * 1.8",
KelvinToFahrenheit = "(x * 1.8 - 459.67)", KelvinToCelsius = "(x - 273.15)";

var z, y, EQ, AC, w;
const max = 12;

window.onload = function() {
    FormatChange('in_select', );
    FormatChange('out_select', );
    accuracyChange(document.getElementById("accu_input").value);
    document.getElementById("out_put").value = "";
};

function FormatChange(name, i) {
    document.getElementById("title").innerHTML = i;
    var g;
    if (i == "Celsius") {
        document.getElementById("title").href = celsius;
        g = `The Celsius scale, also known as the centigrade scale, is a temperature scale. As an SI derived unit, it is used worldwide. In the United States, the Bahamas, Belize, the Cayman Islands and Liberia, Fahrenheit remains the preferred scale for everyday temperature measurement. The degree Celsius (symbol: °C) can refer to a specific temperature on the Celsius scale or a unit to indicate a difference between two temperatures or an uncertainty. It is named after the Swedish astronomer Anders Celsius (1701–1744), who developed a similar temperature scale. Before being renamed to honor Anders Celsius in 1948, the unit was called centigrade, from the Latin centum, which means 100, and gradus, which means steps. From 1743, the Celsius scale is based on 0 °C for the freezing point of water and 100 °C for the boiling point of water at 1 atm pressure. Prior to 1743, the scale was also based on the boiling and melting points of water, but the values were reversed (i.e. the boiling point was at 0 degrees and the melting point was at 100 degrees). The 1743 scale reversal was proposed by Jean-Pierre Christin. By international agreement, between 1954 and 2019 the unit degree Celsius and the Celsius scale were defined by absolute zero and the triple point of Vienna Standard Mean Ocean Water (VSMOW), a precisely defined water standard. This definition also precisely related the Celsius scale to the Kelvin scale, which defines the SI base unit of thermodynamic temperature with symbol K. Absolute zero, the lowest temperature possible, is defined as being exactly 0 K and −273.15 °C. Until 19 May 2019, the temperature of the triple point of water was defined as exactly 273.16 K (0.01 °C). This means that a temperature difference of one degree Celsius and that of one kelvin are exactly the same.`
    } else if (i == "Fahrenheit") {
        document.getElementById("title").href = fahrenheit;
        g = `The Fahrenheit scale is a temperature scale based on one proposed in 1724 by German physicist Daniel Gabriel Fahrenheit (1686–1736). It uses the degree Fahrenheit (symbol: °F) as the unit. Several accounts of how he originally defined his scale exist. The lower defining point, 0 °F, was established as the freezing temperature of a solution of brine made from equal parts of ice, water and a salt (ammonium chloride). Further limits were established as the melting point of ice (32 °F) and his best estimate of the average human body temperature (96 °F, about 2.6 °F less than the modern value due to a later redefinition of the scale). The scale is now usually defined by two fixed points: the temperature at which water freezes into ice is defined as 32 °F, and the boiling point of water is defined to be 212 °F, a 180 °F separation, as defined at sea level and standard atmospheric pressure. At the end of the 2010s, Fahrenheit was used as the official temperature scale only in the United States (including its unincorporated territories), its freely associated states in the Western Pacific (Palau, the Federated States of Micronesia and the Marshall Islands), the Cayman Islands, and Liberia. Antigua and Barbuda and other islands which use the same meteorological service, such as Saint Kitts and Nevis, the Bahamas, and Belize use Fahrenheit and Celsius. All other countries in the world officially now use the Celsius scale, named after Swedish astronomer Anders Celsius. A handful of British Overseas Territories still use Fahrenheit alongside Celsius including the British Virgin Islands, Montserrat, Anguilla, and Bermuda.`;
    } else if (i == "Kelvin") {
        document.getElementById("title").href = kelvin;
        g = `The kelvin is the base unit of temperature in the International System of Units (SI), having the unit symbol K. It is named after the Belfast-born, Glasgow University engineer and physicist William Thomson, 1st Baron Kelvin (1824–1907). The kelvin is now defined by fixing the numerical value of the Boltzmann constant k to 1.380 649×10−23 J⋅K−1. This unit is equal to kg⋅m2⋅s−2⋅K−1, where the kilogram, metre and second are defined in terms of the Planck constant, the speed of light, and the duration of the caesium-133 ground-state hyperfine transition. Thus, this definition depends only on universal constants, and not on any physical artifacts as practiced previously, such as the International Prototype of the Kilogram, whose mass diverged over time from the original value. One kelvin is equal to a change in the thermodynamic temperature T that results in a change of thermal energy kT by 1.380 649×10−23 J. The Kelvin scale fulfills Thomson's requirements as an absolute thermodynamic temperature scale. It uses absolute zero as its null point.`;
    }

    document.getElementById("about").innerHTML = g;

    if (name == "in_select") {
        z = i;
    } else {
        y = i;
    }
    if (z != "" && y != "") {
        checkFormats();
    }
}
function checkFormats() {
    if (z != "" && y != "") {
        if (z == "Celsius" && y == "Fahrenheit") { EQ = CelsiusToFahrenheit; }
        else if (z == "Celsius" && y == "Kelvin") { EQ = CelsiusToKelvin; }
        else if (z == "Fahrenheit" && y == "Celsius") { EQ = FahrenheitToCelsius; }
        else if (z == "Fahrenheit" && y == "Kelvin") { EQ = FahrenheitToKelvin; }
        else if (z == "Kelvin" && y == "Celsius") { EQ = KelvinToCelsius; }
        else if (z == "Kelvin" && y == "Fahrenheit") { EQ = KelvinToFahrenheit; }
        else if (z == y) { EQ = "x"; }
        document.getElementById("EQ").innerHTML = "f(x) = " + EQ;
    }
}
function accuracyChange(i) {
    if (i > max) {
        document.getElementById("accu_input").value = max;
        i = max;
    }
    AC = i;
    valueChange(w, 1);
    if (document.getElementById("out_put").innerHTML != "") {
        // w = round(w, AC);
    }
}
function valueChange(x, k) {
    if (EQ != "") {
        if (k == 0) {
            if (z == y) { EQ[0] = x; } else { EQ[1] = x; } 
            x = parseFloat(x);
            w = eval(EQ);
        }
        document.getElementById("out_put").value = round(w, AC);
    }
}
function round(value, decimals) { return Number(Math.round(value+'e'+decimals)+'e-'+decimals); }

function copyToClipboard() {
    var copyText = document.getElementById("out_put");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
} 