// Kaikki kentät paitsi Lisätietoja ovat pakollisia
// Käyttäjä ID pitää olla vähintään 6 merkkiä pitkä
// Postinumerossa pitää olla 5 numeroa
// Sähköpostiosoitteen tulee olla sähköpostiosoitteen muotoinen

window.onload = function() {
    Clear()
    
    document.getElementById("submit-btn").addEventListener("click", function() { ValidateSubmit(); })
    
    document.getElementsByName("Fid")[0].addEventListener("input", function() {
        document.getElementById("FidV").innerHTML = (document.getElementsByName("Fid")[0].value.length >= 6) ? "✓" : "✗";
    })

    document.getElementsByName("Fpst")[0].addEventListener("input", function() {
        document.getElementById("FpstV").innerHTML = (document.getElementsByName("Fpst")[0].value.length == 5) ? "✓" : "✗";
    })

    document.getElementsByName("Fmail")[0].addEventListener("input", function() {
        document.getElementById("FmailV").innerHTML = (IsEmailValid(document.getElementsByName("Fmail")[0].value)) ? "✓" : "✗";
    })
}

function ValidateSubmit() {
    
    var id = document.getElementsByName("Fid")[0].value
    if (id.length <= 0) {
        alert("ID on tyhjä!")
        return
    } else if (id.length < 6) {
        alert("ID on oltava vähintään 6 merkkiä pitkä!")
        return
    }
    
    var pwd = document.getElementsByName("Fpwd")[0].value
    if (pwd.length <= 0) {
        alert("Salasana on tyhjä!")
        return
    }

    var usr = document.getElementsByName("Fusr")[0].value
    if (usr.length <= 0) {
        alert("Nimi on tyhjä!")
        return
    }

    var add = document.getElementsByName("Fadd")[0].value
    if (add.length <= 0) {
        alert("Osoite on tyhjä!")
        return
    }

    var cntr = document.getElementsByName("Fcntr")[0].value
    // if (cntr.length <= 0) {
    //     alert("Maa on tyhjä!")
    //     return
    // }

    var pst = document.getElementsByName("Fpst")[0].value
    if (pst.length <= 0) {
        alert("Postinumero on tyhjä!")
        return
    } else if (pst.length < 5) {
        alert("Postinumerossa on oltava vähintään 5 merkkiä!")
        return
    }

    var mail = document.getElementsByName("Fmail")[0].value
    if (mail.length <= 0) {
        alert("Sähköpostiosoite on tyhjä!")
        return
    } else if (!IsEmailValid(mail)) {
        alert("Sähköpostiosoitteesi pitää olla kunnollinen!")
        return
    }

    if (!document.getElementById("Fg0").checked && !document.getElementById("Fg1").checked) {
        alert("Valitse sukupuoli!")
        return
    }
    var ge = (document.getElementById("Fg0").checked) ? "male" : "female";

    //kielitaito
    var lng0 = document.getElementsByName("Flng0")[0].checked
    var lng1 = document.getElementsByName("Flng1")[0].checked
    var plng = ""
    if (lng0) {
        if (lng1) plng = "suomi + muu";
        else plng = "suomi";
    } else plng = "muu";
    
    var info = document.getElementsByName("Finfo")[0].value

    Submit([id, pwd, usr, add, cntr, pst, ge, plng, info])
}

function IsEmailValid(val) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
}

function Submit(vars) {
    alert("Kirjauduit onnistuneesti!")
    console.log(vars)
    Clear()
}

function Clear() {
    document.getElementsByName("Fid")[0].value = ""
    document.getElementsByName("Fpwd")[0].value = ""
    document.getElementsByName("Fusr")[0].value = ""
    document.getElementsByName("Fadd")[0].value = ""
    document.getElementsByName("Fcntr")[0].value = "0"
    document.getElementsByName("Fpst")[0].value = ""
    document.getElementsByName("Fmail")[0].value = ""
    document.getElementById("Fg0").checked = false
    document.getElementById("Fg1").checked = false
    document.getElementsByName("Flng0")[0].checked = false
    document.getElementsByName("Flng1")[0].checked = false
    document.getElementsByName("Finfo")[0].value = ""
    
    document.getElementById("FidV").innerHTML = ""
    document.getElementById("FpstV").innerHTML = ""
    document.getElementById("FmailV").innerHTML = ""
}